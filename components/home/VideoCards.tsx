'use client';

import { VIDEOS } from '@/lib/content';
import { useVideoModal } from '@/components/ui/VideoModal';

const PLAY = (
  <svg className="w-5 h-5 text-[#011324] fill-current translate-x-0.5" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

/** "Below for 4 Video Cards". Cards use the ehroo.com case-study card shell and its testimonial play button. */
export default function VideoCards() {
  const open = useVideoModal();
  return (
    <section className="w-full pt-8 md:pt-16 pb-0 bg-white" aria-label="Free growth breakdowns">
      <div className="max-w-300 mx-auto md:px-6">
        <h4 className="px-5 md:px-0 text-center text-accent-foreground text-[15px] leading-5.25 md:text-[16px] md:leading-tight font-heading tracking-[40%] font-medium mb-6 md:mb-8">
          FREE GROWTH BREAKDOWNS
        </h4>
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-none px-5 md:px-0 pb-6 scroll-px-5">
          {VIDEOS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => open(v.id, { title: v.title })}
              className="shrink-0 w-[calc(100vw-44px)] md:w-auto snap-start flex flex-col items-start bg-white border border-ring rounded-[16px] shadow-[6px_6px_0px_#1359E0] p-4 hover:shadow-[8px_8px_0px_#1359E0] transition-all duration-300 text-left group"
            >
              <span className="relative w-full aspect-video rounded-[12px] overflow-hidden flex items-center justify-center bg-slate-950">
                <img src={`/img/video/${v.id}.jpg`} alt="" width={1280} height={720} className="w-full h-full object-cover" />
                <span className="absolute inset-0 bg-black/10" />
                <span
                  className="absolute flex items-center justify-center transition-all duration-200 group-hover:opacity-100 group-hover:scale-105"
                  style={{
                    width: 56,
                    height: 57,
                    borderRadius: 100.76,
                    border: '1.68px solid #011324',
                    backgroundColor: 'var(--primary, #D4EC31)',
                    opacity: 0.9,
                    boxShadow: '6.72px 6.72px 0px 0px #000000',
                  }}
                >
                  {PLAY}
                </span>
                <span className="absolute right-2.5 bottom-2.5 rounded-md bg-black/75 px-1.5 py-0.5 text-xs font-medium font-inter text-white">
                  {v.duration}
                </span>
              </span>
              <span className="inline-block bg-[#0072F3]/10 text-[#50607E] text-xs md:text-sm md:leading-tight tracking-[-3%] font-medium rounded-lg p-2 mt-4 mb-2.5 font-heading">
                {v.label}
              </span>
              <span className="text-lg md:text-xl font-heading font-medium text-accent-foreground leading-tight tracking-[-5%] line-clamp-3">
                {v.title}
              </span>
              <span className="mt-auto pt-4 whitespace-nowrap flex items-center text-sm md:text-base text-accent-foreground font-medium font-heading group-hover:text-accent-foreground/80 transition-colors">
                Watch now
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5 ml-0.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
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
