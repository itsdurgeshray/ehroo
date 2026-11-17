'use client';

import { useEffect, useState } from 'react';
import { btnPrimary } from './button';
import { cn } from '@/lib/cn';

/**
 * Phones only: a thumb-reach "See if you qualify" bar pinned to the bottom edge. It appears once the hero CTAs
 * have scrolled away and steps aside while the qualifier form or the footer is on screen.
 */
export default function MobileCta({ href = '#qualify', label = 'See if you qualify' }: { href?: string; label?: string }) {
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const seen = new Map<Element, boolean>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target, e.isIntersecting));
      setBlocked([...seen.values()].some(Boolean));
    });
    document.querySelectorAll('#qualify, footer').forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  const show = pastHero && !blocked;

  return (
    <div
      className={cn(
        'md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] bg-white/90 backdrop-blur-md border-t border-[#CED7E8]/70 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] transition-transform duration-300 ease-out',
        show ? 'translate-y-0' : 'translate-y-full pointer-events-none',
      )}
      aria-hidden={!show}
    >
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0 text-left">
          <p className="text-[13px] font-heading font-semibold text-primary-foreground leading-tight">Book your strategy call</p>
          <p className="text-[11px] font-heading text-[#50607E] leading-tight mt-0.5">Six quick questions to check fit</p>
        </div>
        <a href={href} data-slot="button" tabIndex={show ? 0 : -1} className={cn(btnPrimary, 'shrink-0 px-5')}>
          <span>{label}</span>
        </a>
      </div>
    </div>
  );
}
