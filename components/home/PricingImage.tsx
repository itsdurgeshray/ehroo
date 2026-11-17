'use client';

import { useEffect, useState } from 'react';

/** Pricing sheet card: shows the full sheet, opens a full-size, scrollable view on click or tap. */
export default function PricingImage({ src }: { src: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="group relative block w-full aspect-video cursor-zoom-in text-left" aria-label="Open the full pricing breakdown">
        <span className="absolute left-1 top-1 -right-1 -bottom-1 md:left-2.5 md:top-2.5 md:-right-2.5 md:-bottom-2.5 bg-[#005AE2] rounded-[24px] md:rounded-[30px]" />
        <span className="absolute inset-0 rounded-[20px] md:rounded-[26px] border border-[#CED7E8] overflow-hidden bg-white flex items-center justify-center p-3 md:p-4">
          <img src={src} alt="Ehroo pricing breakdown: performance and fixed pricing models" width={1600} height={740} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]" />
          <span className="absolute right-3 bottom-3 md:right-4 md:bottom-4 inline-flex items-center gap-1.5 rounded-full bg-[#011324]/85 px-3 py-1.5 text-xs font-heading font-medium text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            View full pricing
          </span>
        </span>
      </button>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Pricing breakdown" className="fixed inset-0 z-[60] bg-[#011324]/80 backdrop-blur-sm flex flex-col" onClick={() => setOpen(false)}>
          <div className="flex justify-end p-3 md:p-5">
            <button type="button" onClick={() => setOpen(false)} className="size-11 rounded-full bg-white text-[#011324] flex items-center justify-center cursor-pointer" aria-label="Close pricing breakdown" autoFocus>
              <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
                <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-auto px-3 pb-6 md:px-8 md:pb-8 md:flex md:items-center md:justify-center" onClick={(e) => e.stopPropagation()}>
            <img src={src} alt="Ehroo pricing breakdown: performance and fixed pricing models" width={1600} height={740} className="max-w-none w-[1100px] md:w-full md:max-w-[1600px] h-auto rounded-[12px] bg-white" />
          </div>
          <p className="md:hidden text-center text-xs text-white/70 pb-4 font-heading">Scroll sideways to see every column</p>
        </div>
      )}
    </>
  );
}
