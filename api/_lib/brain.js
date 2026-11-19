/**
 * Forwards a lead to the Sandbox Brain with the shared secret (same contract as api/leads.js).
 * Never throws: returns { ok } so callers can carry on when the Brain is down.
 */
export async function forwardToBrain(lead, ip = '') {
  const url = process.env.BRAIN_LEADS_URL;
  const secret = process.env.BRAIN_LEADS_SECRET;
  if (!url || !secret) {
    console.error('[brain] BRAIN_LEADS_URL / BRAIN_LEADS_SECRET not set');
    return { ok: false, error: 'not-configured' };
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-leads-secret': secret, 'x-lead-ip': ip },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) return { ok: true };
    console.error('[brain] answered', res.status, (await res.text()).slice(0, 300));
    return { ok: false, error: `http-${res.status}` };
  } catch (e) {
    console.error('[brain] unreachable:', e instanceof Error ? e.message : e);
    return { ok: false, error: 'unreachable' };
  }
}
