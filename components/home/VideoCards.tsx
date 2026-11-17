'use client';

import { VIDEOS } from '@/lib/content';
import { useVideoModal } from '@/components/ui/VideoModal';
import { YtPlayIcon, YtBadge } from '@/components/ui/YtPlay';

/** "Below for 4 Video Cards". Cards use the ehroo.com case-study card shell and its testimonial play button. */
export default function VideoCards() {
  const open = useVideoModal();
  return (
    <section className="w-full pt-10 md:pt-14 pb-0 bg-white" aria-label="Free growth breakdowns">
      <div className="max-w-300 mx-auto md:px-6">
        <h4 className="px-5 md:px-0 text-center text-accent-foreground text-[12px] md:text-[13px] leading-tight font-heading tracking-[0.3em] font-semibold mb-5 md:mb-7">
          FREE GROWTH BREAKDOWNS
        </h4>
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none px-5 md:px-0 pb-6 scroll-px-5">
          {VIDEOS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => open(v.id, { title: v.title })}
              className="shrink-0 w-[78vw] max-w-80 md:max-w-none md:w-auto snap-start flex flex-col items-start bg-white border border-ring rounded-[16px] shadow-[4px_4px_0px_#1359E0] p-3 md:p-3.5 hover:shadow-[6px_6px_0px_#1359E0] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#1359E0] transition-all duration-300 text-left group"
            >
              <span className="relative w-full aspect-video rounded-[12px] overflow-hidden flex items-center justify-center bg-slate-950">
                <img src={`/img/video/${v.id}.jpg`} alt="" width={1280} height={720} className="w-full h-full object-cover" />
                <span className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition-colors" />
                <span className="absolute inset-0 flex items-center justify-center"><YtPlayIcon className="w-15 md:w-14 transition-transform duration-200 group-hover:scale-110" /></span>
                <span className="absolute right-2 bottom-2 rounded-md bg-black/80 px-1.5 py-0.5 text-[11px] font-medium font-inter text-white">
                  {v.duration}
                </span>
                <YtBadge className="absolute left-2 top-2" />
              </span>
              <span className="inline-block bg-[#0072F3]/10 text-[#50607E] text-[11px] md:text-xs leading-tight tracking-[-3%] font-medium rounded-md px-2 py-1.5 mt-3 mb-2 font-heading">
                {v.label}
              </span>
              <span className="text-base md:text-[17px] font-heading font-medium text-accent-foreground leading-snug tracking-[-3%] line-clamp-3">
                {v.title}
              </span>
              <span className="mt-auto pt-3 whitespace-nowrap flex items-center text-sm text-accent-foreground font-medium font-heading group-hover:text-accent-foreground/80 transition-colors">
                Watch now
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-0.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
