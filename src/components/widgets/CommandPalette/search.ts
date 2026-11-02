import { contiguous, fold, keywordHit, matchToken, tokenize, type Folded } from './fuzzy';
import type { GroupId, Item } from './items';

export interface Row {
  /** DOM id for aria-activedescendant */
  key: string;
  item: Item;
  /** matched character indices in item.label */
  indices: number[];
  score: number;
}

export interface Group {
  id: GroupId;
  rows: Row[];
}

interface Prepared {
  item: Item;
  label: Folded;
  hint: string;
  keywords: string[];
}

export function prepare(items: Item[]): Prepared[] {
  return items.map((item) => ({
    item,
    label: fold(item.label),
    hint: item.hint ? fold(item.hint).s : '',
    keywords: item.keywords.map((k) => fold(k).s),
  }));
}

/** Words that carry no meaning in a question ("how do you…", "¿cómo…?"). */
const STOP = new Set(
  (
    'a an the and or of to in on for with do does did you your we our us is are be it its it’s can could would should what which who how when where why much many me my i im ' +
    'el la los las un una unos unas de del al en con por para y o que qué como cómo cuando cuándo cuanto cuánto cuanta cuánta donde dónde cual cuál es son se su sus tu tus mi mis nos lo le les hay hacen hace ustedes'
  )
    .split(' ')
    .map((w) => fold(w).s),
);

function scoreItem(p: Prepared, tokens: string[]): { score: number; indices: number[] } | null {
  let total = 0;
  const indices: number[] = [];
  for (const tok of tokens) {
    const m = matchToken(tok, p.label);
    const kw = keywordHit(tok, p.keywords) ? 58 + tok.length * 2 : 0;
    const hint = tok.length >= 3 && p.hint.includes(tok) ? 44 : 0;
    const best = Math.max(m?.score ?? 0, kw, hint);
    if (!best) return null;
    total += best;
    if (m) indices.push(...m.indices);
  }
  return { score: total, indices };
}

/** Answers match on meaningful words only, and any one of them is enough. */
function scoreAnswer(p: Prepared, tokens: string[]): { score: number; indices: number[] } | null {
  const toks = tokens.filter((t) => t.length >= 3 && !STOP.has(t));
  if (!toks.length) return null;
  let hits = 0;
  let total = 0;
  const indices: number[] = [];
  for (const tok of toks) {
    const m = contiguous(tok, p.label);
    const kw = keywordHit(tok, p.keywords);
    if (!m && !kw) continue;
    hits++;
    total += Math.max(m?.score ?? 0, 96);
    if (m) indices.push(...m.indices);
  }
  if (!hits) return null;
  return { score: (total / toks.length) * (0.6 + 0.4 * (hits / toks.length)), indices };
}

const ORDER: GroupId[] = ['recent', 'answers', 'pages', 'sections', 'cases', 'posts', 'actions', 'fallback'];

export function search(query: string, prepared: Prepared[], recentIds: string[]): Group[] {
  const tokens = tokenize(query);
  const rowKey = (g: GroupId, id: string) => `cmdk-${g}-${id.replace(/[^a-z0-9]+/gi, '-')}`;

  if (!tokens.length) {
    const groups: Group[] = [];
    const byId = new Map(prepared.map((p) => [p.item.id, p.item]));
    const recent = recentIds.map((id) => byId.get(id)).filter((x): x is Item => !!x && x.group !== 'answers').slice(0, 4);
    if (recent.length) groups.push({ id: 'recent', rows: recent.map((item) => ({ key: rowKey('recent', item.id), item, indices: [], score: 0 })) });
    for (const g of ['pages', 'sections', 'actions'] as const) {
      groups.push({
        id: g,
        rows: prepared.filter((p) => p.item.group === g).map((p) => ({ key: rowKey(g, p.item.id), item: p.item, indices: [], score: 0 })),
      });
    }
    return groups;
  }

  const buckets = new Map<GroupId, Row[]>();
  for (const p of prepared) {
    const r = p.item.group === 'answers' ? scoreAnswer(p, tokens) : scoreItem(p, tokens);
    if (!r) continue;
    const g = p.item.group;
    if (!buckets.has(g)) buckets.set(g, []);
    buckets.get(g)!.push({ key: rowKey(g, p.item.id), item: p.item, indices: r.indices, score: r.score });
  }

  const groups: Group[] = [];
  for (const [id, rows] of buckets) {
    rows.sort((a, b) => b.score - a.score);
    groups.push({ id, rows: id === 'answers' ? rows.slice(0, 3) : rows });
  }
  // Best group first; ties keep the default order.
  groups.sort((a, b) => b.rows[0].score - a.rows[0].score || ORDER.indexOf(a.id) - ORDER.indexOf(b.id));
  return groups;
}

/** Shown when nothing matches, so Enter still does something useful. */
export function fallback(prepared: Prepared[]): Group[] {
  const ids = ['action:book', 'action:copy-email', 'action:diagnostic'];
  const rows = ids
    .map((id) => prepared.find((p) => p.item.id === id))
    .filter((p): p is Prepared => !!p)
    .map((p) => ({ key: `cmdk-fallback-${p.item.id.replace(/[^a-z0-9]+/gi, '-')}`, item: p.item, indices: [], score: 0 }));
  return [{ id: 'fallback', rows }];
}
