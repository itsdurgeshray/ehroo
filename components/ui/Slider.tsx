'use client';

import { Children, cloneElement, createContext, isValidElement, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

/**
 * Port of ehroo.com's Slider (arrow-right.*.js chunk): overflow-x snap track, prev/next buttons that stay enabled
 * after mount (prev at the start jumps to the end, next at the end returns to the start), autoplay every 5s that
 * pauses on touch or while a video plays, and an optional loop that renders the slides three times (left clone,
 * real, right clone), starts on the middle set and silently re-centres after each scroll.
 */
type Ctx = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  loop: boolean;
  setAutoplayPaused: (v: boolean) => void;
};
const SliderCtx = createContext<Ctx | null>(null);
export function useSlider() {
  const c = useContext(SliderCtx);
  if (!c) throw new Error('useSlider must be used within a Slider provider');
  return c;
}
/** Safe outside a Slider (returns null). */
export const useSliderOptional = () => useContext(SliderCtx);

function stepOf(el: HTMLDivElement) {
  const first = el.firstElementChild as HTMLElement | null;
  const gap = (first && parseFloat(getComputedStyle(el).columnGap)) || 0;
  return first ? first.offsetWidth + gap : el.clientWidth;
}

export function Slider({
  children,
  className,
  loop = false,
  autoplayOnlyMobile = false,
  autoplayDelay = 5000,
}: {
  children: React.ReactNode;
  className?: string;
  loop?: boolean;
  autoplayOnlyMobile?: boolean;
  autoplayDelay?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setPrev] = useState(false);
  const [canScrollNext, setNext] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const [paused, setAutoplayPaused] = useState(false);

  useEffect(() => {
    const f = () => setMobile(window.innerWidth < 768);
    f();
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);

  const autoNext = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const step = stepOf(el);
    const remaining = scrollWidth - clientWidth - scrollLeft;
    if (loop) scrollLeft + clientWidth >= scrollWidth - 10 ? el.scrollTo({ left: 0, behavior: 'smooth' }) : el.scrollBy({ left: step, behavior: 'smooth' });
    else remaining < step - 10 ? el.scrollTo({ left: 0, behavior: 'smooth' }) : el.scrollBy({ left: step, behavior: 'smooth' });
  }, [loop]);

  useEffect(() => {
    if (!(autoplayOnlyMobile ? isMobile : true) || paused) return;
    if (document.documentElement.classList.contains('figma')) return;
    const id = setInterval(() => {
      if (!document.hidden) autoNext();
    }, autoplayDelay);
    return () => clearInterval(id);
  }, [isMobile, paused, autoplayOnlyMobile, autoplayDelay, autoNext]);

  const enable = useCallback(() => {
    setPrev(true);
    setNext(true);
  }, []);

  const scrollPrev = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth } = el;
    const step = stepOf(el);
    if (loop && scrollLeft <= 5) el.scrollTo({ left: scrollWidth, behavior: 'smooth' });
    else if (!loop && scrollLeft <= 10) el.scrollTo({ left: scrollWidth, behavior: 'smooth' });
    else el.scrollBy({ left: -step, behavior: 'smooth' });
  }, [loop]);

  const scrollNext = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const step = stepOf(el);
    const remaining = scrollWidth - clientWidth - scrollLeft;
    if (loop && scrollLeft + clientWidth >= scrollWidth - 10) el.scrollTo({ left: 0, behavior: 'smooth' });
    else if (!loop && remaining < step - 10) el.scrollTo({ left: 0, behavior: 'smooth' });
    else el.scrollBy({ left: step, behavior: 'smooth' });
  }, [loop]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    enable();
    el.addEventListener('scroll', enable);
    window.addEventListener('resize', enable);
    const ro = new ResizeObserver(() => enable());
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', enable);
      window.removeEventListener('resize', enable);
      ro.disconnect();
    };
  }, [enable]);

  // Loop: start on the middle (real) set.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !loop) return;
    const center = () => {
      const pl = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      const pr = parseFloat(getComputedStyle(el).paddingRight) || 0;
      const third = (el.scrollWidth - pl - pr) / 3;
      if (third > 0) el.scrollTo({ left: third, behavior: 'instant' as ScrollBehavior });
    };
    const t = setTimeout(center, 100);
    window.addEventListener('resize', center);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', center);
    };
  }, [loop]);

  // Loop: when a scroll ends in a clone set, jump back by one set without animation.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !loop) return;
    const recenter = () => {
      const { scrollLeft, scrollWidth } = el;
      const pl = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      const pr = parseFloat(getComputedStyle(el).paddingRight) || 0;
      const third = (scrollWidth - pl - pr) / 3;
      if (scrollLeft < third - 10) el.scrollTo({ left: scrollLeft + third, behavior: 'instant' as ScrollBehavior });
      else if (scrollLeft >= 2 * third - 10) el.scrollTo({ left: scrollLeft - third, behavior: 'instant' as ScrollBehavior });
    };
    let timer: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      if (!('onscrollend' in window)) {
        clearTimeout(timer);
        timer = setTimeout(recenter, 150);
      }
    };
    el.addEventListener('scroll', onScroll);
    el.addEventListener('scrollend', recenter);
    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('scrollend', recenter);
      clearTimeout(timer);
    };
  }, [loop]);

  const value = useMemo<Ctx>(
    () => ({ containerRef, canScrollPrev, canScrollNext, scrollPrev, scrollNext, loop, setAutoplayPaused }),
    [canScrollPrev, canScrollNext, scrollPrev, scrollNext, loop],
  );

  return (
    <SliderCtx.Provider value={value}>
      <div className={cn('relative w-full', className)} onTouchStart={() => setAutoplayPaused(true)} onTouchEnd={() => setAutoplayPaused(false)}>
        {children}
      </div>
    </SliderCtx.Provider>
  );
}

export function SliderTrack({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  const { containerRef, loop } = useSlider();
  const items = useMemo(() => {
    if (!loop) return children;
    const arr = Children.toArray(children);
    const tag = (prefix: string) => arr.map((c, i) => (isValidElement(c) ? cloneElement(c, { key: `${prefix}-${i}` }) : c));
    return [...tag('clone-left'), ...tag('real'), ...tag('clone-right')];
  }, [children, loop]);
  return (
    <div ref={containerRef} className={cn('flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none', className)} {...rest}>
      {items}
    </div>
  );
}

export function SliderSlide({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('snap-start shrink-0', className)} {...rest}>
      {children}
    </div>
  );
}

export function SliderButton({ direction, children, className, ...rest }: { direction: 'prev' | 'next' } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useSlider();
  const prev = direction === 'prev';
  return (
    <button
      type="button"
      onClick={prev ? scrollPrev : scrollNext}
      disabled={prev ? !canScrollPrev : !canScrollNext}
      className={cn('flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none', className)}
      {...rest}
    >
      {children}
    </button>
  );
}

const ARROW = 'size-10 md:size-6.5 stroke-[1.5] text-accent-foreground';
export const ArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-arrow-left ${ARROW}`} aria-hidden="true">
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);
export const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-arrow-right ${ARROW}`} aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
export const NAV_BTN = 'size-12 md:size-23 rounded-[16px] md:rounded-[20px] border-[#8C8C8C] border-[0.5px] md:border-0 md:bg-[#F4F6FF]';
