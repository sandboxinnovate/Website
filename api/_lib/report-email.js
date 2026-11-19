/**
 * The report email: a short, table-based HTML email (works in Gmail/Outlook) with the headline,
 * the three opportunities and a button to the full report page, plus a plain-text version.
 * Sent with Resend (https://resend.com) using RESEND_API_KEY and REPORT_FROM_EMAIL.
 */

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const T = {
  en: {
    subject: (company) => `Your AI readiness report${company ? ` for ${company}` : ''}`,
    hi: (name) => (name ? `Hi ${name},` : 'Hi,'),
    intro: 'Thanks for taking the AI readiness check. Here is your report, written from your answers.',
    score: 'Your score',
    of100: 'out of 100',
    level: 'Level',
    opps: 'Your three clearest opportunities',
    open: 'Open your full report',
    openNote: 'The full report includes your five areas, a 30/60/90-day plan and what to watch out for.',
    call: 'Book a 30-minute call to review it',
    sign: 'The Sandbox team',
    why: 'Why',
    first: 'First step',
    footer: 'You received this because you asked for your report at sandboxinnovate.com. We will not add you to any newsletter unless you ask.',
  },
  es: {
    subject: (company) => `Tu reporte de preparación en IA${company ? ` para ${company}` : ''}`,
    hi: (name) => (name ? `Hola, ${name}:` : 'Hola:'),
    intro: 'Gracias por hacer el diagnóstico de preparación en IA. Aquí tienes tu reporte, escrito a partir de tus respuestas.',
    score: 'Tu puntaje',
    of100: 'de 100',
    level: 'Nivel',
    opps: 'Tus tres oportunidades más claras',
    open: 'Ver tu reporte completo',
    openNote: 'El reporte completo incluye tus cinco áreas, un plan a 30, 60 y 90 días y en qué tener cuidado.',
    call: 'Agenda una llamada de 30 minutos para revisarlo',
    sign: 'El equipo de Sandbox',
    why: 'Por qué',
    first: 'Primer paso',
    footer: 'Recibiste este correo porque pediste tu reporte en sandboxinnovate.com. No te sumamos a ningún newsletter si no lo pides.',
  },
};

export function buildEmail({ lang, name, company, score, levelName, report, reportUrl, callUrl }) {
  const t = T[lang] || T.en;
  const opps = report.opportunities.slice(0, 3);
  const oppHtml = opps.map((o, i) => `
    <tr><td style="padding:14px 0;border-top:1px solid #ece6df">
      <div style="font:600 16px/1.35 Arial,Helvetica,sans-serif;color:#1d1815">${i + 1}. ${esc(o.title)}</div>
      <div style="font:14px/1.55 Arial,Helvetica,sans-serif;color:#4a423c;margin-top:4px"><b>${t.why}:</b> ${esc(o.why)}</div>
      <div style="font:14px/1.55 Arial,Helvetica,sans-serif;color:#4a423c;margin-top:2px"><b>${t.first}:</b> ${esc(o.firstStep)}</div>
    </td></tr>`).join('');

  const html = `<!doctype html><html lang="${lang}"><body style="margin:0;background:#f4efe9">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4efe9"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px">
<tr><td style="padding:28px 32px 8px">
  <div style="font:700 18px/1 Arial,Helvetica,sans-serif;letter-spacing:.06em;color:#f58327">SANDBOX</div>
</td></tr>
<tr><td style="padding:12px 32px 0;font:15px/1.6 Arial,Helvetica,sans-serif;color:#1d1815">
  <p style="margin:0 0 10px">${esc(t.hi(name))}</p>
  <p style="margin:0 0 18px">${esc(t.intro)}</p>
  <table role="presentation" cellpadding="0" cellspacing="0" style="background:#1d1815;border-radius:12px;width:100%"><tr>
    <td style="padding:18px 20px;font:13px/1.4 Arial,Helvetica,sans-serif;color:#cfc6bd">${t.score}<br>
      <span style="font:700 34px/1.1 Arial,Helvetica,sans-serif;color:#f9a35c">${esc(score)}</span> <span style="color:#cfc6bd">${t.of100}</span></td>
    <td style="padding:18px 20px;font:13px/1.4 Arial,Helvetica,sans-serif;color:#cfc6bd">${t.level}<br>
      <span style="font:700 20px/1.3 Arial,Helvetica,sans-serif;color:#f4efe9">${esc(levelName)}</span></td>
  </tr></table>
  <p style="margin:20px 0 0;font:700 18px/1.4 Arial,Helvetica,sans-serif">${esc(report.headline)}</p>
  <p style="margin:8px 0 0;color:#4a423c">${esc(report.summary)}</p>
  <p style="margin:22px 0 4px;font:700 15px/1.4 Arial,Helvetica,sans-serif">${t.opps}</p>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${oppHtml}</table>
  <p style="margin:22px 0 6px"><a href="${esc(reportUrl)}" style="display:inline-block;background:#f58327;color:#1a0d03;text-decoration:none;font:700 15px/1 Arial,Helvetica,sans-serif;padding:14px 22px;border-radius:999px">${t.open}</a></p>
  <p style="margin:6px 0 0;font-size:13px;color:#6c6158">${esc(t.openNote)}</p>
  <p style="margin:18px 0 0"><a href="${esc(callUrl)}" style="color:#c95f0c">${esc(t.call)}</a></p>
  <p style="margin:22px 0 28px">${esc(t.sign)}</p>
</td></tr>
<tr><td style="padding:16px 32px 24px;border-top:1px solid #ece6df;font:12px/1.5 Arial,Helvetica,sans-serif;color:#8a7f76">${esc(t.footer)}</td></tr>
</table></td></tr></table></body></html>`;

  const text = [
    t.hi(name), '', t.intro, '',
    `${t.score}: ${score} ${t.of100} · ${t.level}: ${levelName}`, '',
    report.headline, report.summary, '',
    t.opps + ':',
    ...opps.map((o, i) => `${i + 1}. ${o.title}\n   ${t.why}: ${o.why}\n   ${t.first}: ${o.firstStep}`), '',
    `${t.open}: ${reportUrl}`, t.openNote, '',
    `${t.call}: ${callUrl}`, '', t.sign, '', t.footer,
  ].join('\n');

  return { subject: t.subject(company), html, text };
}

export async function sendEmail({ to, subject, html, text }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.REPORT_FROM_EMAIL;
  if (!key || !from) return { ok: false, error: 'email-not-configured' };
  const replyTo = process.env.REPORT_REPLY_TO || undefined;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], subject, html, text, ...(replyTo ? { reply_to: replyTo } : {}) }),
      signal: AbortSignal.timeout(10000),
    });
    if (res.ok) return { ok: true };
    console.error('[report] Resend answered', res.status, (await res.text()).slice(0, 300));
    return { ok: false, error: 'email-rejected' };
  } catch (e) {
    console.error('[report] Resend unreachable:', e instanceof Error ? e.message : e);
    return { ok: false, error: 'email-unreachable' };
  }
}
