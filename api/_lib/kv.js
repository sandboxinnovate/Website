/**
 * Minimal Upstash Redis REST client (Vercel Marketplace "Upstash for Redis" / former Vercel KV).
 * Env: KV_REST_API_URL + KV_REST_API_TOKEN (set automatically when the store is connected to the
 * project), or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN.
 */
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const kvConfigured = () => Boolean(URL_ && TOKEN);

/** Runs one Redis command, e.g. cmd('SET', key, value, 'EX', 60). Returns `result`. */
export async function cmd(...args) {
  if (!kvConfigured()) throw new Error('kv-not-configured');
  const res = await fetch(URL_, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args.map(String)),
    signal: AbortSignal.timeout(5000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.error) throw new Error(`kv ${res.status}: ${data.error || 'error'}`);
  return data.result;
}

/**
 * Fixed-window rate limit. Returns true when the call is allowed.
 * Fails open (allows) when the store is missing or down, so a storage outage never blocks leads.
 */
export async function allow(key, limit, windowSec) {
  if (!kvConfigured()) return true;
  try {
    const n = Number(await cmd('INCR', key));
    if (n === 1) await cmd('EXPIRE', key, windowSec);
    return n <= limit;
  } catch (e) {
    console.error('[kv] rate limit check failed:', e instanceof Error ? e.message : e);
    return true;
  }
}
