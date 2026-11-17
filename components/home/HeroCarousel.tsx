'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import HeroVideo from './HeroVideo';
import { VIDEOS } from '@/lib/content';
import { VSL_YOUTUBE_ID } from '@/lib/site';
import { cn } from '@/lib/cn';

type Slide = { id: string; title: string; poster: string };

const SLIDES: Slide[] = [
  { id: VSL_YOUTUBE_ID, title: 'Drishti Kanoi explains how Ehroo builds a predictable full-funnel growth engine', poster: '/img/video/hero-mockup.webp' },
  // The vertical WeframeTech client clip is left out: it letterboxes badly in the 16:9 hero frame.
  ...VIDEOS.filter((v) => v.id !== 'a7hQpQUNbdQ').map((v) => ({ id: v.id, title: v.title, poster: `/img/video/${v.id}.jpg` })),
];

const Arrow = ({ dir }: { dir: 'prev' | 'next' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
    {dir === 'prev' ? <path d="m12 19-7-7 7-7M19 12H5" /> : <path d="M5 12h14m-7-7 7 7-7 7" />}
  </svg>
);

const ARROW =
  'hidden md:flex absolute top-[calc(50%-18px)] -translate-y-1/2 z-30 size-12 rounded-full bg-white border border-[#CED7E8] text-accent-foreground items-center justify-center shadow-[0_6px_20px_rgba(15,23,42,0.12)] hover:border-accent-foreground hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-0 disabled:pointer-events-none';

/**
 * Hero video carousel. The VSL is the first slide, Drishti's four YouTube breakdowns follow. The active video sits
 * centred in the ehroo.com mockup frame; its neighbours peek in at the sides, smaller and faded. Swipe or scroll on
 * touch, arrows on desktop, dots underneath. Leaving a slide stops its video. Auto-advances every 6s unless a video is playing or the visitor is interacting.
 */
export default function HeroCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hold, setHold] = useState(false);
  const n = SLIDES.length;

  const go = useCallback((k: number) => {
    const el = track.current;
    const t = el?.children[k] as HTMLElement | undefined;
    if (!el || !t) return;
    el.scrollTo({ left: t.offsetLeft - (el.clientWidth - t.offsetWidth) / 2, behavior: 'smooth' });
  }, []);

  // Auto-advance every 6s, looping. Holds while a video plays, while hovered or touched, and in a hidden tab.
  useEffect(() => {
    if (playing || hold || document.documentElement.classList.contains('figma')) return;
    const t = setInterval(() => {
      if (!document.hidden) go(i === n - 1 ? 0 : i + 1);
    }, 6000);
    return () => clearInterval(t);
  }, [i, n, playing, hold, go]);

  // A slide that is no longer active has stopped its video (it remounts), so release the hold.
  useEffect(() => setPlaying(false), [i]);

  // Active slide = the one whose centre is closest to the track's centre.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let dist = Infinity;
        [...el.children].forEach((c, k) => {
          const h = c as HTMLElement;
          const d = Math.abs(h.offsetLeft + h.offsetWidth / 2 - mid);
          if (d < dist) {
            dist = d;
            best = k;
          }
        });
        setI(best);
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="hero-carousel relative"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onTouchStart={() => setHold(true)}
      onTouchEnd={() => setTimeout(() => setHold(false), 4000)}
      role="region" aria-roledescription="carousel" aria-label="Ehroo videos">
      <div ref={track} className="hero-track flex overflow-x-auto snap-x snap-mandatory scrollbar-none pt-1 pb-5 md:pb-6">
        {SLIDES.map((s, k) => {
          const active = k === i;
          return (
            <div
              key={s.id}
              className={cn(
                'hero-slide relative shrink-0 snap-center snap-always transition-[transform,opacity] duration-500 ease-out',
                active ? 'scale-100' : 'scale-[0.9]',
              )}
              aria-roledescription="slide"
              aria-label={`${k + 1} of ${n}`}
            >
              {/* Remounts when deactivated so a playing video stops */}
              <HeroVideo key={`${s.id}-${active}`} videoId={s.id} poster={s.poster} alt={s.title} onPlay={() => setPlaying(true)} />
              <div
                className={cn(
                  'absolute -inset-px -right-4 -bottom-4 z-30 rounded-[24px] md:rounded-[42px] lg:rounded-[60px] bg-white/65 transition-opacity duration-500',
                  active ? 'opacity-0 pointer-events-none' : 'opacity-100',
                )}
                aria-hidden="true"
              />
              {!active && (
                <button type="button" onClick={() => go(k)} className="absolute inset-0 z-40 cursor-pointer" aria-label={`Show video ${k + 1}`} tabIndex={-1} />
              )}
            </div>
          );
        })}
      </div>

      <button type="button" onClick={() => go(i - 1)} disabled={i === 0} className={cn(ARROW, 'hero-arrow-prev')} aria-label="Previous video">
        <Arrow dir="prev" />
      </button>
      <button type="button" onClick={() => go(i + 1)} disabled={i === n - 1} className={cn(ARROW, 'hero-arrow-next')} aria-label="Next video">
        <Arrow dir="next" />
      </button>

      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-[#CED7E8]/80 px-2.5 py-2 shadow-[0_2px_8px_rgba(15,23,42,0.06)]">
          {SLIDES.map((s, k) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(k)}
              aria-label={`Go to video ${k + 1}`}
              aria-current={k === i}
              className={cn('h-1.5 rounded-full transition-all duration-300 cursor-pointer', k === i ? 'w-5 bg-accent-foreground' : 'w-1.5 bg-[#CAD5E9] hover:bg-accent-foreground/50')}
            />
          ))}
        </div>
      </div>
      <span className="sr-only" aria-live="polite">
        Video {i + 1} of {n}: {SLIDES[i].title}
      </span>
    </div>
  );
}
