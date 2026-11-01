import type { Block } from './copy';

/** One streamed unit: a word (with its trailing space), a recommended name, or a citation chip. */
export type Tok =
  | { k: 'w'; text: string }
  | { k: 'name'; text: string; you: boolean }
  | { k: 'cite'; n: number };

export interface TokBlock {
  kind: Block['kind'];
  toks: Tok[];
  /** Global index of the first token of this block. */
  start: number;
}

export interface Tokenized {
  blocks: TokBlock[];
  total: number;
}

const BRAND = '\u0001'; // sentinel for {brand} while parsing

/**
 * Split answer blocks into stream tokens.
 * Names (**…**) and citations ([n]) stream as single tokens; text streams word by word.
 */
export function tokenize(blocks: Block[], brand: string): Tokenized {
  let idx = 0;
  const out: TokBlock[] = [];
  for (const b of blocks) {
    const toks: Tok[] = [];
    const src = b.text.replace(/\{brand\}/g, BRAND);
    const parts = src.split(/(\*\*[^*]+\*\*|\s?\[\d+\])/g).filter(Boolean);
    for (const part of parts) {
      const bold = part.match(/^\*\*([^*]+)\*\*$/);
      const cite = part.match(/^\s?\[(\d+)\]$/);
      if (bold) {
        const raw = bold[1];
        toks.push({ k: 'name', text: raw.split(BRAND).join(brand), you: raw.includes(BRAND) });
      } else if (cite) {
        toks.push({ k: 'cite', n: Number(cite[1]) });
      } else {
        const words = part.split(BRAND).join(brand).match(/\S+\s*|\s+/g) ?? [];
        for (const w of words) toks.push({ k: 'w', text: w });
      }
    }
    out.push({ kind: b.kind, toks, start: idx });
    idx += toks.length;
  }
  return { blocks: out, total: idx };
}

/** Delay before the next token: a little longer after punctuation and at block edges. */
export function tokenDelay(tok: Tok | undefined, blockEdge: boolean): number {
  let d = 26 + Math.random() * 34;
  if (tok?.k === 'w' && /[.:;,—]\s*$/.test(tok.text)) d += 70;
  if (tok?.k === 'cite') d += 40;
  if (blockEdge) d += 120;
  return d;
}

export function fillBrand(text: string, brand: string): string {
  return text.replace(/\{brand\}/g, brand);
}
