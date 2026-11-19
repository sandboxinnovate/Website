import { useId, useState, type CSSProperties } from 'react';
import { localize, type Lang } from '@/i18n';
import { ICONS } from '@/components/ui/icons';
import { ToolBadge } from '@/components/ui/ToolBadge';
import { COPY } from './copy';
import { tabKeys } from '../hooks';
import './academy-explorer.css';

const Clock = () => (
  <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" />
  </svg>
);

const Ico = ({ name, size = 16 }: { name: keyof typeof ICONS; size?: number }) => (
  <svg
    viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.8}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[name] }}
  />
);

/**
 * Academy: curriculum explorer. One tab per role; each shows a sample four-module track,
 * the lab each module ends with and what people leave with. Static copy, no simulation.
 */
export default function AcademyExplorer({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const [active, setActive] = useState(0);
  const track = t.tracks[active];
  const ids = t.tracks.map((tk) => `${uid}-tab-${tk.id}`);
  const panelId = `${uid}-panel`;
  const onKey = tabKeys(t.tracks.length, active, setActive, ids);

  return (
    <div className="ax">
      <div className="ax-bar">
        <span className="ax-bar__dot" aria-hidden="true" />
        <span className="ax-bar__t">{t.bar}</span>
        <span className="ax-bar__meta">{t.barMeta}</span>
      </div>

      <div className="ax-body">
        <div className="ax-side">
          <span className="ax-label" id={`${uid}-roles`}>{t.rolesLabel}</span>
          <div className="ax-tabs" role="tablist" aria-labelledby={`${uid}-roles`} onKeyDown={onKey}>
            {t.tracks.map((tk, k) => (
              <button
                key={tk.id}
                type="button"
                role="tab"
                id={ids[k]}
                aria-selected={k === active}
                aria-controls={panelId}
                tabIndex={k === active ? 0 : -1}
                className="ax-tab"
                onClick={() => setActive(k)}
              >
                <span className="ax-tab__name">{tk.role}</span>
                <span className="ax-tab__go"><Ico name="arrow-right" size={15} /></span>
              </button>
            ))}
          </div>
        </div>

        <div className="ax-panel" role="tabpanel" id={panelId} aria-labelledby={ids[active]} key={track.id}>
          <div className="ax-head">
            <h3 className="ax-head__t">{track.role}</h3>
            <p className="ax-head__for"><span>{t.forLabel}</span>{track.for}</p>
          </div>

          <span className="ax-label">{t.modulesLabel}</span>
          <ol className="ax-mods">
            {track.modules.map((m, k) => (
              <li key={m.title} className="ax-mod" style={{ '--k': k } as CSSProperties}>
                <div className="ax-mod__top">
                  <span className="ax-mod__n">{t.moduleWord} {k + 1}</span>
                  <span className="ax-mod__time"><Clock />{m.time}</span>
                </div>
                <h4 className="ax-mod__t">{m.title}</h4>
                <p className="ax-mod__lab"><span className="ax-mod__lab-k">{t.labLabel}</span>{m.lab}</p>
              </li>
            ))}
          </ol>

          <div className="ax-tools">
            <span className="ax-label">{t.toolsLabel}</span>
            <ul>
              {track.tools.map((tool) => <li key={tool}><ToolBadge tool={tool} lang={lang} size={26} /></li>)}
            </ul>
          </div>

          <div className="ax-foot">
            <div className="ax-out">
              <span className="ax-label">{t.outcomesLabel}</span>
              <ul>
                {track.outcomes.map((o) => (
                  <li key={o}><span className="ax-out__ic"><Ico name="check" size={13} /></span>{o}</li>
                ))}
              </ul>
            </div>
            <a className="ax-cta" href={localize(lang, `/contact?service=academy&team=${track.id}`)}>
              {t.cta}<Ico name="arrow-up-right" size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
