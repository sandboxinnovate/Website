/**
 * Tiny fuzzy matcher for the command palette.
 * - Accent- and case-insensitive ("diagnostico" finds "Diagnóstico").
 * - Contiguous matches beat scattered ones; word starts beat mid-word hits.
 * - Returns the indices of matched characters in the ORIGINAL string, for highlighting.
 */

export interface Folded {
  /** lowercased, accent-free text */
  s: string;
  /** map: index in `s` → index in the original string */
  map: number[];
}

export interface Hit {
  score: number;
  indices: number[];
}

const BOUNDARY = /[\s\-/·.,:;!?¿¡()"'“”‘’—–&+]/;

export function fold(text: string): Folded {
  let s = '';
  const map: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const c = text[i].normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    for (const ch of c) {
      s += ch;
      map.push(i);
    }
  }
  return { s, map };
}

/** Normalized query tokens. */
export function tokenize(query: string): string[] {
  return fold(query).s.split(/[\s,.;:!?¿¡"“”]+/).filter(Boolean);
}

const isStart = (s: string, i: number) => i === 0 || BOUNDARY.test(s[i - 1]);

/** Contiguous occurrence, preferring one that starts a word. */
export function contiguous(tok: string, f: Folded): Hit | null {
  const { s, map } = f;
  let first = -1;
  let atWord = -1;
  for (let i = s.indexOf(tok); i !== -1; i = s.indexOf(tok, i + 1)) {
    if (first === -1) first = i;
    if (isStart(s, i)) {
      atWord = i;
      break;
    }
  }
  const pos = atWord !== -1 ? atWord : first;
  if (pos === -1) return null;
  let score = 100 + tok.length * 4;
  if (pos === 0) score += 30;
  else if (atWord !== -1) score += 18;
  score -= Math.min(pos, 24) * 0.5;
  const indices: number[] = [];
  for (let k = 0; k < tok.length; k++) indices.push(map[pos + k]);
  return { score, indices };
}

/**
 * Subsequence match that must begin at a word start and stay reasonably tight,
 * so "dgn" finds "Diagnostic" but random letters don't match everything.
 */
function subsequence(tok: string, f: Folded): Hit | null {
  const { s, map } = f;
  if (tok.length < 2) return null;
  let best: Hit | null = null;
  for (let start = s.indexOf(tok[0]); start !== -1; start = s.indexOf(tok[0], start + 1)) {
    if (!isStart(s, start)) continue;
    const pos = [start];
    let last = start;
    for (let k = 1; k < tok.length; k++) {
      // prefer the next char if it continues the run, else the next word start, else any
      const nextAny = s.indexOf(tok[k], last + 1);
      if (nextAny === -1) {
        pos.length = 0;
        break;
      }
      let pick = nextAny;
      if (nextAny !== last + 1) {
        for (let j = nextAny; j !== -1 && j - start <= tok.length * 3 + 2; j = s.indexOf(tok[k], j + 1)) {
          if (isStart(s, j)) {
            pick = j;
            break;
          }
        }
      }
      pos.push(pick);
      last = pick;
    }
    if (!pos.length) continue;
    const span = last - start + 1;
    if (span > tok.length * 3 + 2) continue;
    let consecutive = 0;
    let starts = 0;
    for (let k = 0; k < pos.length; k++) {
      if (k > 0 && pos[k] === pos[k - 1] + 1) consecutive++;
      if (isStart(s, pos[k])) starts++;
    }
    const score = 40 + tok.length * 3 - (span - tok.length) * 2 + consecutive * 4 + starts * 6 + (start === 0 ? 10 : 0);
    if (!best || score > best.score) best = { score, indices: pos.map((p) => map[p]) };
  }
  return best;
}

export function matchToken(tok: string, f: Folded): Hit | null {
  return contiguous(tok, f) ?? subsequence(tok, f);
}

/** Does a token hit one of the (already folded) keywords? Prefix match per word, substring for 3+ chars. */
export function keywordHit(tok: string, keywords: string[]): boolean {
  for (const k of keywords) {
    if (k === tok) return true;
    if (tok.length >= 2 && k.split(' ').some((w) => w.startsWith(tok))) return true;
    if (tok.length >= 4 && k.includes(tok)) return true;
  }
  return false;
}
