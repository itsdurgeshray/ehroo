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
        'sticky top-7 z-50 w-full max-w-312 mx-auto px-4 transition-opacity duration-300 ease-in-out',
        hidden && 'opacity-0 pointer-events-none',
      )}
    >
      <div className="flex items-center justify-between bg-white/75 border border-[#CED7E8]/70 rounded-lg py-2.5 pl-8 pr-3 backdrop-blur-md shadow-[0_8px_32px_0_rgba(15,23,42,0.04)]">
        <a href="https://ehroo.com/" className="flex items-center gap-2.5 shrink-0 transition-transform active:scale-97">
          <img src="/img/ehroo-logo.svg" alt="Ehroo Logo" width={106} height={32} className="h-8 w-auto object-contain" />
        </a>
        <a href={ctaHref} data-slot="button" className={cn(btnPrimary, 'max-md:py-2 max-md:px-3 max-md:text-[13px]')}>
          <span>{ctaLabel}</span>
        </a>
      </div>
    </header>
  );
}
