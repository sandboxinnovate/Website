/**
 * Sätteri hast plugin for blog posts (src/content/blog/**). Registered in astro.config.mjs.
 *
 * - h2/h3: stable ASCII ids (accents folded: "¿Qué es?" -> "que-es") and a sibling anchor link
 *   (<div class="h-wrap"><h2 id>…</h2><a class="h-anchor" href="#id">…</a></div>), so the heading
 *   text — and the TOC Astro collects from it — stays clean.
 * - tables: wrapped in a horizontally scrollable, focusable region.
 * - blockquotes that open with a bold label ("> **Example:** …") become callouts:
 *   class="callout callout--example|note|rule|other" + data-label.
 * - fenced code blocks: wrapped with a language label and a Copy button (shown only with JS).
 *
 * Plain .mjs (not TS) because astro.config.mjs imports it directly.
 */

/** @typedef {{ type: 'element', tagName: string, properties: Record<string, unknown>, children: any[] }} El */

const COPY = {
  en: { anchor: 'Link to this section:', table: 'Table (scrolls sideways)', copy: 'Copy', text: 'Text' },
  es: { anchor: 'Enlace a esta sección:', table: 'Tabla (se desplaza hacia los lados)', copy: 'Copiar', text: 'Texto' },
};

const CALLOUTS = {
  example: 'example',
  ejemplo: 'example',
  note: 'note',
  nota: 'note',
  'rule of thumb': 'rule',
  'regla practica': 'rule',
};

const LANG_LABELS = { md: 'Markdown', markdown: 'Markdown', yaml: 'YAML', yml: 'YAML', json: 'JSON', js: 'JavaScript', ts: 'TypeScript', sh: 'Shell', bash: 'Shell', html: 'HTML', css: 'CSS', csv: 'CSV', sql: 'SQL', python: 'Python', py: 'Python' };

const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');

/** "¿Qué es un brain?" -> "que-es-un-brain" (unique within the document). */
function makeSlugger() {
  const seen = new Map();
  return (text) => {
    const base = fold(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'section';
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n ? `${base}-${n}` : base;
  };
}

/** @returns {El} */
const el = (tagName, properties = {}, children = []) => ({ type: 'element', tagName, properties, children });
const text = (value) => ({ type: 'text', value });
const isEl = (n, tag) => n && n.type === 'element' && (!tag || n.tagName === tag);

export function blogHast() {
  return (fctx) => {
    const path = fctx.fileURL ? decodeURIComponent(fctx.fileURL.pathname) : '';
    if (!/\/content\/blog\//.test(path)) return null; // only blog posts
    const lang = /\/content\/blog\/es\//.test(path) ? 'es' : 'en';
    const t = COPY[lang];
    const slug = makeSlugger();

    return {
      name: 'sandbox-blog',
      element: [
        {
          filter: ['h2', 'h3'],
          visit(node, ctx) {
            const label = ctx.textContent(node).trim();
            const existing = node.properties?.id;
            const id = typeof existing === 'string' && existing ? existing : slug(label);
            if (id !== existing) ctx.setProperty(node, 'id', id);
            ctx.wrapNode(
              node,
              el('div', { className: ['h-wrap', `h-wrap--${node.tagName}`] }, [
                el('a', { className: ['h-anchor'], href: `#${id}` }, [
                  el('span', { className: ['sr-only'] }, [text(`${t.anchor} ${label}`)]),
                ]),
              ]),
            );
          },
        },
        {
          filter: ['table'],
          visit(node, ctx) {
            ctx.wrapNode(node, el('div', { className: ['table-wrap'], role: 'region', tabIndex: 0, ariaLabel: t.table, dataTableWrap: '' }));
          },
        },
        {
          filter: ['blockquote'],
          visit(node, ctx) {
            const first = (node.children || []).find((c) => isEl(c));
            if (!isEl(first, 'p')) return;
            const lead = (first.children || []).find((c) => !(c.type === 'text' && !c.value.trim()));
            if (!isEl(lead, 'strong')) return;
            const raw = ctx.textContent(lead).trim();
            const at = ctx.indexOf(lead);
            const next = typeof at === 'number' ? first.children[at + 1] : undefined;
            const colon = /:\s*$/.test(raw) || (next && next.type === 'text' && /^\s*:/.test(next.value));
            if (!colon) return;
            const label = raw.replace(/[:.\s]+$/, '');
            const kind = CALLOUTS[fold(label).toLowerCase()] ?? 'other';
            ctx.setProperty(node, 'className', ['callout', `callout--${kind}`]);
            ctx.setProperty(node, 'dataLabel', label);
          },
        },
        {
          filter: ['pre'],
          visit(node, ctx) {
            const parent = ctx.parent(node);
            if (isEl(parent, 'div') && [].concat(parent.properties?.className || []).includes('code-block')) return;
            const raw = String(node.properties?.dataLanguage ?? 'plaintext');
            const plain = ['plaintext', 'text', 'txt', 'plain', ''].includes(raw);
            const label = plain ? t.text : (LANG_LABELS[raw] ?? raw);
            ctx.wrapNode(
              node,
              el('div', { className: ['code-block'], dataLang: plain ? 'text' : raw }, [
                el('div', { className: ['code-block__bar'] }, [
                  el('span', { className: ['code-block__lang'] }, [text(label)]),
                  el('button', { type: 'button', className: ['code-block__copy'], dataCopyCode: '', dataLabel: t.copy }, [text(t.copy)]),
                ]),
              ]),
            );
          },
        },
      ],
    };
  };
}
