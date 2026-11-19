/**
 * Lead relay: the site's forms POST here (PUBLIC_LEADS_ENDPOINT=/api/leads),
 * and this Vercel Function forwards the lead to the Sandbox Brain with a secret.
 *
 * Why a relay: the site is static, so a form talking to the Brain directly would
 * have to ship the secret in the browser bundle, where anyone can read it (and
 * this repo is public). The secret lives only in Vercel's environment:
 *   BRAIN_LEADS_URL     https://<brain>/api/public/leads
 *   BRAIN_LEADS_SECRET  same value as LEADS_INTAKE_SECRET on the Brain
 * Never prefix them with PUBLIC_: that would put them in the browser bundle.
 */
const MAX_BODY = 32 * 1024;

export async function POST(request) {
  const url = process.env.BRAIN_LEADS_URL;
  const secret = process.env.BRAIN_LEADS_SECRET;
  if (!url || !secret) {
    console.error('[leads] BRAIN_LEADS_URL / BRAIN_LEADS_SECRET not set');
    return Response.json({ ok: false, error: 'not-configured' }, { status: 503 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY) return Response.json({ ok: false, error: 'too-large' }, { status: 413 });
  let lead;
  try { lead = JSON.parse(raw); } catch { return Response.json({ ok: false, error: 'bad-json' }, { status: 400 }); }
  if (!lead || typeof lead !== 'object' || Array.isArray(lead)) {
    return Response.json({ ok: false, error: 'bad-json' }, { status: 400 });
  }

  // Visitor IP, only so the Brain can rate-limit per visitor (every request
  // reaches it from Vercel's IPs). Never used for anything else.
  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim();
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-leads-secret': secret, 'x-lead-ip': ip },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) return Response.json({ ok: true });
    console.error('[leads] Brain answered', res.status, (await res.text()).slice(0, 300));
    // A 400 means the lead itself was invalid; anything else is our problem.
    return Response.json({ ok: false, error: 'rejected' }, { status: res.status === 400 ? 400 : 502 });
  } catch (e) {
    console.error('[leads] Brain unreachable:', e instanceof Error ? e.message : e);
    return Response.json({ ok: false, error: 'unreachable' }, { status: 502 });
  }
}
