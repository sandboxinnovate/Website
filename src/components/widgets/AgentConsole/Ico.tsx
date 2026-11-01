import { AC_ICONS, type IconKey } from './icons';

export default function Ico({ name, size = 16, stroke = 1.5, className }: { name: IconKey; size?: number; stroke?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: AC_ICONS[name] }}
    />
  );
}
