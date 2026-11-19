/**
 * Client for the AI report endpoint (api/diagnostic-report.js).
 * In `npm run dev` there is no serverless function, so a canned preview is returned after a short
 * wait to let the UI be tested end to end.
 */
export interface ReportPreview {
  headline: string;
  summary: string;
  opportunity?: { title: string; why: string; firstStep: string; service: string };
}

export interface ReportResult {
  ok: boolean;
  emailed?: boolean;
  reportUrl?: string;
  preview?: ReportPreview | null;
  /** invalid | rate-limited | report-failed | network | HTTP <n> */
  error?: string;
  leadSaved?: boolean;
}

const ENDPOINT = '/api/diagnostic-report/';

export async function requestReport(payload: Record<string, unknown>): Promise<ReportResult> {
  const body = {
    ...payload,
    page: typeof location !== 'undefined' ? location.pathname : undefined,
    referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
    submittedAt: new Date().toISOString(),
    timezone: (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone; } catch { return undefined; } })(),
    attribution: (() => { try { return JSON.parse(sessionStorage.getItem('sbx:attr') || 'null') ?? undefined; } catch { return undefined; } })(),
  };

  if (import.meta.env.DEV) {
    console.info('[report:dev]', body);
    await new Promise((r) => setTimeout(r, 1500));
    const es = payload.lang === 'es';
    return {
      ok: true,
      emailed: true,
      preview: {
        headline: es ? 'Vista previa de desarrollo: aquí aparece la conclusión principal.' : 'Development preview: the main conclusion shows here.',
        summary: es ? 'En producción, Claude escribe este resumen a partir de las respuestas.' : 'In production, Claude writes this summary from the answers.',
        opportunity: { title: es ? 'Primera oportunidad' : 'First opportunity', why: '...', firstStep: '...', service: 'brains' },
      },
    };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as ReportResult;
    if (res.ok && data.ok) return data;
    return { ok: false, error: data.error || `HTTP ${res.status}`, leadSaved: data.leadSaved };
  } catch {
    return { ok: false, error: 'network' };
  }
}
