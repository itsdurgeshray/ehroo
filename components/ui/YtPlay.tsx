import { cn } from '@/lib/cn';

const SHAPE =
  'M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z';

/** YouTube's play button (68x48 artwork). Every video on the page is a YouTube video, so every play uses it. */
export function YtPlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 68 48" className={cn('h-auto drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)]', className)} aria-hidden="true">
      <path d={SHAPE} fill="#FF0033" />
      <path d="M45 24 27 14v20z" fill="#fff" />
    </svg>
  );
}

/** Small "YouTube" chip for thumbnails. */
export function YtBadge({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-md bg-white/95 px-1.5 py-0.5 text-[11px] font-semibold font-inter text-[#0F0F0F]', className)}>
      <svg viewBox="0 0 68 48" className="w-3.5 h-auto" aria-hidden="true">
        <path d={SHAPE} fill="#FF0033" />
        <path d="M45 24 27 14v20z" fill="#fff" />
      </svg>
      YouTube
    </span>
  );
}
