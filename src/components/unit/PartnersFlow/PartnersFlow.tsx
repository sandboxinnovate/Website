import { useId, useState, type CSSProperties } from 'react';
import { localize, type Lang } from '@/i18n';
import { ICONS } from '@/components/ui/icons';
import { COPY, type Owner } from './copy';
import { tabKeys } from '../hooks';
import './partners-flow.css';

const Ico = ({ name, size = 16 }: { name: keyof typeof ICONS; size?: number }) => (
  <svg
    viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.8}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[name] }}
  />
);

const POS: Record<Owner, { l: string; w: string }> = {
  you: { l: '0%', w: '50%' },
  sbx: { l: '50%', w: '50%' },
  both: { l: '0%', w: '100%' },
};

/**
 * Partners: "who does what" board. Switching the partnership model slides each stage's
 * owner marker between the agency lane, the Sandbox lane, or across both.
 */
export default function PartnersFlow({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const [sel, setSel] = useState(0);
  const model = t.models[sel];
  const ids = t.models.map((m) => `${uid}-tab-${m.id}`);
  const panelId = `${uid}-panel`;
  const onKey = tabKeys(t.models.length, sel, setSel, ids);
  const label: Record<Owner, string> = { you: t.you, sbx: t.sbx, both: t.both };
  const count = (o: Owner) => model.owners.filter((x) => x === o).length;

  return (
    <div className="pf">
      <div className="pf-bar">
        <span className="pf-bar__dot" aria-hidden="true" />
        <span>{t.bar}</span>
        <span className="pf-bar__meta">{t.barMeta}</span>
      </div>

      <div className="pf-models" role="tablist" aria-label={t.modelsLabel} onKeyDown={onKey}>
        {t.models.map((m, k) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            id={ids[k]}
            aria-selected={k === sel}
            aria-controls={panelId}
            tabIndex={k === sel ? 0 : -1}
            className="pf-model"
            onClick={() => setSel(k)}
          >
            <span className="pf-model__n">{String(k + 1).padStart(2, '0')}</span>
            <span className="pf-model__name">{m.name}</span>
            <span className="pf-model__line">{m.line}</span>
          </button>
        ))}
      </div>

      <div className="pf-panel" role="tabpanel" id={panelId} aria-labelledby={ids[sel]}>
        <div className="pf-board">
          <div className="pf-head" aria-hidden="true">
            <span>{t.stageCol}</span>
            <span className="pf-head__lanes">
              <span className="pf-head__you">{t.you}</span>
              <span className="pf-head__sbx">{t.sbx}</span>
            </span>
          </div>
          <ol className="pf-rows">
            {t.stages.map((s, k) => {
              const o = model.owners[k];
              return (
                <li key={s} className="pf-row">
                  <span className="pf-stage"><span className="pf-stage__n">{String(k + 1).padStart(2, '0')}</span>{s}</span>
                  <span className="pf-track">
                    <span
                      className={`pf-mark pf-mark--${o}`}
                      style={{ '--l': POS[o].l, '--w': POS[o].w, '--k': k } as CSSProperties}
                    >
                      <span className="pf-mark__dot" aria-hidden="true" />
                      <span className="pf-mark__t pf-mark__t--long">{label[o]}</span>
                      <span className="pf-mark__t pf-mark__t--short" aria-hidden="true">{t.short[o]}</span>
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="pf-side">
          <p className="pf-summary" key={model.id}>{model.summary}</p>
          <div className="pf-sees">
            <span className="pf-label">{t.clientSees}</span>
            <span className="pf-sees__v" key={`${model.id}-sees`}>{model.sees}</span>
          </div>
          <div className="pf-split">
            <span className="pf-label">{t.youOwn(count('you'), t.stages.length)}</span>
            <span className="pf-split__bar" aria-hidden="true">
              {model.owners.map((o, k) => <i key={k} className={`pf-seg pf-seg--${o}`} />)}
            </span>
            <span className="pf-legend">
              <span><i className="pf-seg pf-seg--you" />{t.you} · {count('you')}</span>
              <span><i className="pf-seg pf-seg--both" />{t.both} · {count('both')}</span>
              <span><i className="pf-seg pf-seg--sbx" />{t.sbx} · {count('sbx')}</span>
            </span>
          </div>
          <a className="pf-cta" href={localize(lang, `/contact?service=partners&model=${model.id}`)}>
            {t.cta}<Ico name="arrow-up-right" size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
