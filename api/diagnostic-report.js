/**
 * AI readiness report.
 *
 * POST /api/diagnostic-report/  (from the diagnostic lead form)
 *   1. validates the form and rate-limits per visitor and per email,
 *   2. asks Claude to write a personalised report from the answers (structured JSON),
 *   3. stores it under a random id (Upstash Redis) so it has a permanent link,
 *   4. emails the report to the lead (Resend),
 *   5. forwards the lead to the Sandbox Brain with the report link attached,
 *   6. answers with a short preview only: the full report is reached through the emailed link,
 *      which is what makes a real email address necessary.
 * GET /api/diagnostic-report/?r=<id> returns a stored report for the report page.
 * DELETE /api/diagnostic-report/ with { r, email } deletes it (the email must match the one the
 *   report was sent to; only a salted hash of it is stored, never the address).
 *
 * Environment (Vercel project settings; never prefix these with PUBLIC_):
 *   ANTHROPIC_API_KEY                         Claude API key
 *   KV_REST_API_URL, KV_REST_API_TOKEN        Upstash Redis (Vercel Marketplace) for reports + rate limits
 *   RESEND_API_KEY, REPORT_FROM_EMAIL         e.g. "Sandbox <diagnostico@sandboxinnovate.com>" (verified domain)
 *   REPORT_REPLY_TO (optional)                where replies to the email go
 *   SITE_URL (optional)                       e.g. https://sandboxinnovate.com, used in links (default: request origin)
 *   BRAIN_LEADS_URL, BRAIN_LEADS_SECRET       same as api/leads.js
 */
import Anthropic from '@anthropic-ai/sdk';
import { createHash, randomUUID, timingSafeEqual } from 'node:crypto';
import { MODEL, REPORT_SCHEMA, SYSTEM_PROMPT, userMessage } from './_lib/report-prompt.js';
import { allow, cmd, kvConfigured } from './_lib/kv.js';
import { buildEmail, sendEmail } from './_lib/report-email.js';
import { forwardToBrain } from './_lib/brain.js';

const MAX_BODY = 48 * 1024;
const REPORT_TTL = 60 * 60 * 24 * 400; // keep reports about 13 months
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const AREAS = ['strategy', 'data', 'processes', 'people', 'stack'];

/** Hash that ties a report to its owner's email without storing the address. */
const emailHash = (email, id) => createHash('sha256').update(`${String(email).trim().toLowerCase()}:${id}`).digest('hex');

const json = (body, status = 200) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const noDash = (s) => s.replace(/\s*[\u2014\u2013]\s*/g, ', ');

/** Recursively replaces em/en dashes in every string of the report. */
function scrub(v) {
  if (typeof v === 'string') return noDash(v);
  if (Array.isArray(v)) return v.map(scrub);
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, scrub(x)]));
  return v;
}

function normalise(raw) {
  const lang = raw.lang === 'es' ? 'es' : 'en';
  const dims = {};
  for (const a of AREAS) dims[a] = Math.max(0, Math.min(100, Math.round(Number(raw.dimensions?.[a]) || 0)));
  const answers = Array.isArray(raw.answers)
    ? raw.answers.slice(0, 12).map((a) => ({
        id: str(a?.id, 40),
        dimension: str(a?.dimension, 20),
        option: Math.max(1, Math.min(4, Number(a?.option) || 1)),
        question: str(a?.question, 240),
        answer: str(a?.answer, 240),
      }))
    : [];
  const phone = str(raw.phone, 30).replace(/[^\d+()\s.-]/g, '');
  return {
    lang,
    email: str(raw.email, 160).toLowerCase(),
    name: str(raw.name, 80),
    company: str(raw.company, 120),
    role: str(raw.role, 80),
    region: str(raw.region, 20),
    phone,
    whatsapp: Boolean(raw.whatsapp) && phone.length >= 6,
    wantsCall: Boolean(raw.wantsCall),
    score: Math.max(0, Math.min(100, Math.round(Number(raw.score) || 0))),
    level: str(raw.level, 20),
    levelName: str(raw.levelName, 40),
    dimensions: dims,
    answers,
    moves: Array.isArray(raw.moves) ? raw.moves.slice(0, 3) : [],
    runId: str(raw.runId, 40),
    page: str(raw.page, 200),
    referrer: str(raw.referrer, 300),
    submittedAt: str(raw.submittedAt, 40),
    timezone: str(raw.timezone, 60),
    attribution: raw.attribution && typeof raw.attribution === 'object' ? raw.attribution : undefined,
  };
}

function validReport(r) {
  return r && typeof r.headline === 'string' && typeof r.summary === 'string'
    && Array.isArray(r.areas) && Array.isArray(r.opportunities) && r.opportunities.length > 0
    && r.plan && Array.isArray(r.plan.days30) && Array.isArray(r.watchouts);
}

async function writeReport(lead) {
  const client = new Anthropic({ timeout: 50_000, maxRetries: 1 });
  const response = await client.beta.messages.create({
    model: MODEL,
    max_tokens: 16000,
    // On a policy decline, re-run on a fallback model chosen by the API.
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
    messages: [{ role: 'user', content: userMessage(lead) }],
    output_config: { effort: 'medium', format: { type: 'json_schema', schema: REPORT_SCHEMA } },
  });
  if (response.stop_reason === 'refusal') throw new Error('refusal');
  if (response.stop_reason === 'max_tokens') throw new Error('max-tokens');
  const text = response.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
  const report = scrub(JSON.parse(text));
  if (!validReport(report)) throw new Error('bad-report-shape');
  // Keep the order and count the page expects.
  report.areas = AREAS.map((a) => report.areas.find((x) => x.area === a)).filter(Boolean);
  report.opportunities = report.opportunities.slice(0, 3);
  return report;
}

export async function POST(request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY) return json({ ok: false, error: 'too-large' }, 413);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ ok: false, error: 'bad-json' }, 400); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return json({ ok: false, error: 'bad-json' }, 400);

  // Honeypot filled in: pretend it worked and do nothing.
  if (typeof body.website === 'string' && body.website.trim()) return json({ ok: true, emailed: true, preview: null });

  const lead = normalise(body);
  if (!EMAIL_RE.test(lead.email) || !lead.name || !lead.company || lead.answers.length < 5) {
    return json({ ok: false, error: 'invalid' }, 400);
  }

  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  if (!(await allow(`rl:report:ip:${ip}`, 6, 3600)) || !(await allow(`rl:report:email:${lead.email}`, 3, 86400))) {
    return json({ ok: false, error: 'rate-limited' }, 429);
  }

  const origin = (process.env.SITE_URL || new URL(request.url).origin).replace(/\/$/, '');
  const prefix = lead.lang === 'es' ? '/es' : '';
  const callUrl = `${origin}${prefix}/contact/?offer=diagnostic`;

  // 1. Write the report.
  let report = null;
  let reportError = '';
  if (!process.env.ANTHROPIC_API_KEY) reportError = 'not-configured';
  else {
    try { report = await writeReport(lead); } catch (e) {
      reportError = e instanceof Error ? e.message : 'error';
      console.error('[report] generation failed:', reportError);
    }
  }

  // 2. Store it for the permanent link (no email or phone in the stored copy).
  let id = '';
  let reportUrl = '';
  if (report && kvConfigured()) {
    id = randomUUID().replace(/-/g, '');
    const record = {
      id, createdAt: new Date().toISOString(), lang: lead.lang, name: lead.name, company: lead.company,
      score: lead.score, level: lead.level, levelName: lead.levelName, dimensions: lead.dimensions, report,
      emailHash: emailHash(lead.email, id),
    };
    try {
      await cmd('SET', `report:${id}`, JSON.stringify(record), 'EX', REPORT_TTL);
      reportUrl = `${origin}${prefix}/diagnostic/report/?r=${id}`;
    } catch (e) {
      console.error('[report] store failed:', e instanceof Error ? e.message : e);
      id = '';
    }
  }

  // 3. Email it.
  let emailed = false;
  if (report) {
    const mail = buildEmail({
      lang: lead.lang, name: lead.name, company: lead.company, score: lead.score, levelName: lead.levelName,
      report, reportUrl: reportUrl || callUrl, callUrl,
    });
    emailed = (await sendEmail({ to: lead.email, ...mail })).ok;
  }

  // 4. Hand the lead to the Brain, with the report attached, whatever happened above.
  const brain = await forwardToBrain(
    {
      kind: 'diagnostic',
      ...lead,
      reportId: id || undefined,
      reportUrl: reportUrl || undefined,
      reportHeadline: report?.headline,
      reportOpportunities: report?.opportunities?.map((o) => ({ title: o.title, service: o.service })),
      reportEmailed: emailed,
      reportError: reportError || undefined,
    },
    ip,
  );

  if (!report) {
    // The lead is safe with the Brain when brain.ok; the team follows up by hand.
    return json({ ok: false, error: 'report-failed', leadSaved: brain.ok }, 503);
  }
  return json({
    ok: true,
    emailed,
    reportUrl: emailed ? undefined : reportUrl || undefined, // only shown on screen if the email could not go out
    preview: { headline: report.headline, summary: report.summary, opportunity: report.opportunities[0] },
  });
}

export async function GET(request) {
  const id = new URL(request.url).searchParams.get('r') || '';
  if (!/^[a-f0-9]{32}$/.test(id)) return json({ ok: false, error: 'not-found' }, 404);
  if (!kvConfigured()) return json({ ok: false, error: 'not-configured' }, 503);
  try {
    const raw = await cmd('GET', `report:${id}`);
    if (!raw) return json({ ok: false, error: 'not-found' }, 404);
    const { emailHash: _hash, ...report } = JSON.parse(raw);
    return json({ ok: true, report });
  } catch (e) {
    console.error('[report] read failed:', e instanceof Error ? e.message : e);
    return json({ ok: false, error: 'unavailable' }, 502);
  }
}

export async function DELETE(request) {
  let body;
  try { body = JSON.parse((await request.text()).slice(0, 2048)); } catch { return json({ ok: false, error: 'bad-json' }, 400); }
  const id = typeof body?.r === 'string' ? body.r : '';
  const email = typeof body?.email === 'string' ? body.email : '';
  if (!/^[a-f0-9]{32}$/.test(id)) return json({ ok: false, error: 'not-found' }, 404);
  if (!kvConfigured()) return json({ ok: false, error: 'not-configured' }, 503);
  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  if (!(await allow(`rl:report:del:${ip}`, 10, 3600))) return json({ ok: false, error: 'rate-limited' }, 429);
  try {
    const raw = await cmd('GET', `report:${id}`);
    if (!raw) return json({ ok: false, error: 'not-found' }, 404);
    const rec = JSON.parse(raw);
    if (rec.emailHash) {
      const a = Buffer.from(rec.emailHash, 'hex');
      const b = Buffer.from(emailHash(email, id), 'hex');
      if (!EMAIL_RE.test(email.trim()) || a.length !== b.length || !timingSafeEqual(a, b)) {
        return json({ ok: false, error: 'email-mismatch' }, 403);
      }
    }
    await cmd('DEL', `report:${id}`);
    return json({ ok: true });
  } catch (e) {
    console.error('[report] delete failed:', e instanceof Error ? e.message : e);
    return json({ ok: false, error: 'unavailable' }, 502);
  }
}
