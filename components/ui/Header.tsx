'use client';

import { useEffect, useState } from 'react';
import { btnPrimary } from './button';
import { cn } from '@/lib/cn';

/**
 * ehroo.com header: same container, glass bar and button. Like ehroo.com it fades out while scrolling down past
 * 400px and returns on scroll up. The funnel keeps one CTA (no site nav) so visitors stay on the page.
 */
export default function Header({ ctaHref = '#qualify', ctaLabel = 'See if you qualify' }: { ctaHref?: string; ctaLabel?: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 400 && y > last);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-3 md:top-4 z-50 w-full max-w-312 mx-auto px-3 md:px-4 transition-[opacity,transform] duration-300 ease-in-out',
        hidden && 'opacity-0 -translate-y-3 pointer-events-none',
      )}
    >
      <div className="flex items-center justify-between bg-white/75 border border-[#CED7E8]/70 rounded-[12px] py-2 pl-4 md:pl-6 pr-2 backdrop-blur-md shadow-[0_8px_32px_0_rgba(15,23,42,0.04)]">
        <a href="https://ehroo.com/" className="flex items-center gap-2.5 shrink-0 transition-transform active:scale-97">
          <img src="/img/ehroo-logo.svg" alt="Ehroo Logo" width={106} height={32} className="h-6.5 md:h-7 w-auto object-contain" />
        </a>
        <a href={ctaHref} data-slot="button" className={cn(btnPrimary, 'py-2 px-3.5 md:py-2.5 md:px-5 md:min-w-0 text-[13px] md:text-sm rounded-[10px] md:rounded-[10px] md:shadow-[3px_3px_0px_#000000]')}>
          <span>{ctaLabel}</span>
        </a>
      </div>
    </header>
  );
}
