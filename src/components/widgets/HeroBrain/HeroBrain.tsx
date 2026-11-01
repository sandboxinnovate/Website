import type { Lang } from '@/i18n';

// STUB — to be replaced by the real widget.
export default function HeroBrain({ lang }: { lang: Lang; className?: string }) {
  return <div data-stub="HeroBrain" style={{ padding: 24, border: '1px dashed #444', borderRadius: 16, color: '#888' }}>HeroBrain — stub ({lang})</div>;
}
