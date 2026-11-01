import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { localize, type Lang } from '@/i18n';
import { ICONS } from '@/components/ui/icons';
import { COPY } from './copy';
import { tabKeys, useActive } from '../hooks';
import './products-selector.css';

const Ico = ({ name, size = 16 }: { name: keyof typeof ICONS; size?: number }) => (
  <svg
    viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.8}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[name] }}
  />
);

const CX = 180, CY = 180, R = 124;
const nodePos = (i: number, n: number) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
  return { x: Math.round((CX + R * Math.cos(a)) * 10) / 10, y: Math.round((CY + R * Math.sin(a)) * 10) / 10 };
};

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setR(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return r;
}

/**
 * Products: industry selector. Pick an industry to see the agents in its package,
 * the tools they connect to and what always stays with people. Agents light up in turn;
 * hovering or focusing one pins it.
 */
export default function ProductsSelector({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const rootRef = useRef<HTMLDivElement>(null);
  const active = useActive(rootRef);
  const reduced = useReducedMotion();
  const [sel, setSel] = useState(0);
  const [hot, setHot] = useState(0);
  const [pinned, setPinned] = useState(false);
  const ind = t.industries[sel];
  const n = ind.agents.length;
  const ids = t.industries.map((i) => `${uid}-tab-${i.id}`);
  const panelId = `${uid}-panel`;

  const select = (i: number) => { setSel(i); setHot(0); };
  const onKey = tabKeys(t.industries.length, sel, select, ids);

  useEffect(() => {
    if (!active || reduced || pinned) return;
    const id = window.setInterval(() => setHot((h) => (h + 1) % n), 2400);
    return () => window.clearInterval(id);
  }, [active, reduced, pinned, n, sel]);

  return (
    <div ref={rootRef} className={`px${active ? '' : ' is-paused'}`}>
      <div className="px-bar">
        <span className="px-bar__dot" aria-hidden="true" />
        <span>{t.bar}</span>
        <span className="px-bar__meta">{t.barMeta}</span>
      </div>

      <div className="px-tabs" role="tablist" aria-label={t.pick} onKeyDown={onKey}>
        {t.industries.map((it, k) => (
          <button
            key={it.id}
            type="button"
            role="tab"
            id={ids[k]}
            aria-selected={k === sel}
            aria-controls={panelId}
            tabIndex={k === sel ? 0 : -1}
            className="px-tab"
            onClick={() => select(k)}
          >
            <span className="px-tab__code">{it.code}</span>
            <span className="px-tab__name">{it.name}</span>
          </button>
        ))}
      </div>

      <div className="px-panel" role="tabpanel" id={panelId} aria-labelledby={ids[sel]} key={ind.id}>
        <div className="px-diagram" aria-hidden="true">
          <svg viewBox="0 0 360 360" className="px-svg">
            <defs>
              <radialGradient id={`${uid}-hub`} cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#f58327" stopOpacity=".5" />
                <stop offset="1" stopColor="#d94c00" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx={CX} cy={CY} r={R} className="px-orbit" />
            <circle cx={CX} cy={CY} r={R + 34} className="px-orbit px-orbit--outer" />
            {ind.connects.map((_, k) => {
              const a = -Math.PI / 2 + Math.PI / ind.connects.length + (k * 2 * Math.PI) / ind.connects.length;
              return <circle key={k} cx={CX + (R + 34) * Math.cos(a)} cy={CY + (R + 34) * Math.sin(a)} r="3.5" className="px-tool" />;
            })}
            <circle cx={CX} cy={CY} r="86" fill={`url(#${uid}-hub)`} />
            {ind.agents.map((_, k) => {
              const p = nodePos(k, n);
              return (
                <g key={k} className={`px-spoke${k === hot ? ' is-hot' : ''}`}>
                  <line x1={CX} y1={CY} x2={p.x} y2={p.y} />
                  <line x1={CX} y1={CY} x2={p.x} y2={p.y} pathLength={100} className="px-spoke__pulse" />
                </g>
              );
            })}
            <circle cx={CX} cy={CY} r="44" className="px-hub" />
            <text x={CX} y={CY - 2} textAnchor="middle" className="px-hub__code">{ind.code}</text>
            <text x={CX} y={CY + 18} textAnchor="middle" className="px-hub__sub">brain</text>
            {ind.agents.map((_, k) => {
              const p = nodePos(k, n);
              return (
                <g key={k} className={`px-node${k === hot ? ' is-hot' : ''}`} style={{ '--k': k } as CSSProperties}>
                  <circle cx={p.x} cy={p.y} r="22" />
                  <text x={p.x} y={p.y + 4} textAnchor="middle">{String(k + 1).padStart(2, '0')}</text>
                </g>
              );
            })}
          </svg>
          <div className="px-status">
            <span className="px-pill"><span className="px-pill__dot" />{t.status}</span>
            <span className="px-pilot"><Ico name="calendar" size={14} />{t.pilotLabel}: {ind.pilot}</span>
          </div>
        </div>

        <div className="px-agents">
          <span className="px-label">{t.agentsLabel}</span>
          <ol onMouseLeave={() => setPinned(false)}>
            {ind.agents.map((a, k) => (
              <li
                key={a.name}
                className={`px-agent${k === hot ? ' is-hot' : ''}`}
                style={{ '--k': k } as CSSProperties}
                onMouseEnter={() => { setHot(k); setPinned(true); }}
              >
                <span className="px-agent__n">{String(k + 1).padStart(2, '0')}</span>
                <span className="px-agent__body">
                  <span className="px-agent__name">{a.name}</span>
                  <span className="px-agent__does">{a.does}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="px-meta">
          <div className="px-meta__col">
            <span className="px-label">{t.connectsLabel}</span>
            <ul className="px-chips">{ind.connects.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
          <div className="px-meta__col">
            <span className="px-label">{t.staysLabel}</span>
            <ul className="px-stays">{ind.stays.map((s) => <li key={s}><Ico name="shield" size={15} />{s}</li>)}</ul>
          </div>
          <a className="px-cta" href={localize(lang, `/contact?service=products&industry=${ind.id}`)}>
            {t.cta(ind.name)}<Ico name="arrow-up-right" size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
