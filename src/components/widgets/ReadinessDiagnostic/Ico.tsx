import { ICONS } from '@/components/ui/icons';
import type { IconName } from '@/data/site';

/** Shared line icon (24×24, currentColor). Decorative by default. */
export default function Ico({ name, size = 16, stroke = 1.7, className }: { name: IconName; size?: number; stroke?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      dangerouslySetInnerHTML={{ __html: ICONS[name] }}
    />
  );
}
