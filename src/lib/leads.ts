/**
 * Lead capture — one function every form on the site uses.
 *
 * Configure where leads go with an environment variable at build time:
 *   PUBLIC_LEADS_ENDPOINT=https://…   (any endpoint that accepts a JSON POST:
 *                                      Formspree, a serverless function, a CRM webhook…)
 *
 * Without it:
 *   - `npm run dev`: submissions are logged to the console and resolve as success,
 *     so the UI flows can be tested end to end.
 *   - production build: submissions fail with `not-configured`, so every form shows its
 *     error state and email fallback instead of silently discarding the lead.
 *     Set PUBLIC_LEADS_PREVIEW=1 to get the console-only fake success in a preview build.
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
    timezone: (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { return undefined; } })(),
    // First-party landing page / referrer / utm_* captured by Base.astro for this tab.
    attribution: (() => { try { return JSON.parse(sessionStorage.getItem('sbx:attr') || 'null') ?? undefined; } catch { return undefined; } })(),
  };

  if (!ENDPOINT) {
    if (import.meta.env.PROD && import.meta.env.PUBLIC_LEADS_PREVIEW !== '1') {
      console.error('[lead] PUBLIC_LEADS_ENDPOINT is not set; submission not sent');
      return { ok: false, error: 'not-configured' };
    }
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
