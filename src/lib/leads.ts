/**
 * Lead capture — one function every form on the site uses.
 *
 * Configure where leads go with an environment variable at build time:
 *   PUBLIC_LEADS_ENDPOINT=https://…   (any endpoint that accepts a JSON POST:
 *                                      Formspree, a serverless function, a CRM webhook…)
 *
 * Without it (local preview), submissions are logged to the console and resolve as success,
 * so the UI flows can be tested end to end.
 */
export type LeadKind = 'contact' | 'diagnostic' | 'newsletter' | 'roi';

export interface LeadPayload {
  kind: LeadKind;
  lang: 'en' | 'es';
  email: string;
  name?: string;
  company?: string;
  [key: string]: unknown;
}

const ENDPOINT = import.meta.env.PUBLIC_LEADS_ENDPOINT as string | undefined;

export const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  const body = {
    ...payload,
    page: typeof location !== 'undefined' ? location.pathname : undefined,
    referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
    submittedAt: new Date().toISOString(),
  };

  if (!ENDPOINT) {
    console.info('[lead:preview]', body);
    await new Promise((r) => setTimeout(r, 700));
    return { ok: true };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
    return res.ok ? { ok: true } : { ok: false, error: `HTTP ${res.status}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Network error' };
  }
}
