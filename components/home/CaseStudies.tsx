'use client';

import { CASE_STUDIES } from '@/lib/content';
import { Slider, SliderTrack, SliderSlide, SliderButton, ArrowLeft, ArrowRight, NAV_BTN } from '@/components/ui/Slider';

/** ehroo.com "Featured case studies" (ShowcaseContent): same card markup, track geometry and slider behaviour. */
export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative w-full py-8 md:py-26 bg-white overflow-hidden">
      <div className="hidden md:block absolute inset-0 max-w-360 mx-auto pointer-events-none z-0">
        <div className="absolute left-0 -top-26 bottom-[5%] -translate-x-1/2 pointer-events-none hidden md:block">
          <img src="/img/cases/sphere.webp" alt="" width={1920} height={1917} className="h-full w-auto max-w-none" />
        </div>
      </div>
      <div className="relative z-10 max-w-292 mx-auto px-5 md:px-6 text-center mb-8 md:mb-15">
        <h2 className="text-2xl sm:text-4xl md:text-[64px] font-heading text-primary-foreground leading-none tracking-[-5%] whitespace-pre-line">
          Featured <span className="text-accent-foreground font-bold">case studies</span>
        </h2>
      </div>
      <div className="relative z-10 showcase-slider-container w-full max-w-480 mx-auto overflow-hidden">
        <Slider className="w-full" loop={false}>
          <SliderTrack className="gap-3.5 md:gap-10 pb-6 track-cases">
            {CASE_STUDIES.map((c) => (
              <SliderSlide key={c.href} className="select-none w-[calc(100vw-44px)] md:w-93 snap-start">
                <a
                  href={c.href}
                  className="flex flex-col items-start bg-white border border-ring rounded-[16px] shadow-[6px_6px_0px_#1359E0] p-4 hover:shadow-[8px_8px_0px_#1359E0] transition-all duration-300 h-full w-full text-left no-underline group"
                >
                  <span className="inline-block bg-[#0072F3]/10 text-[#50607E] text-xs md:text-base md:leading-tight tracking-[-3%] font-medium rounded-lg p-2.5 mb-3.5 font-heading">
                    {c.category}
                  </span>
                  <h3 className="text-2xl md:text-[32px] font-heading font-medium text-accent-foreground leading-tight tracking-[-5%] mb-1 line-clamp-2 h-22.5 md:h-20">
                    {c.metric}
                  </h3>
                  <span className="block text-xs tracking-wider font-medium text-[#50607E] mb-4 font-heading h-4">{c.metricLabel}</span>
                  <div className="relative w-full aspect-video rounded-[16px] mb-8 overflow-hidden flex items-center justify-center bg-slate-950">
                    <img src={c.image} alt="" width={600} height={337} className="w-full h-full object-cover opacity-85 transition-all duration-300 group-hover:blur-xs" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                      <span
                        data-slot="button"
                        className="group/button inline-flex shrink-0 items-center justify-center bg-clip-padding font-medium font-heading whitespace-nowrap outline-none select-none bg-primary text-black border-2 border-black shadow-[2px_2px_0px_#000000] md:shadow-[4px_4px_0px_#000000] transition-all cursor-pointer rounded-[10px] md:rounded-xl py-3 px-4 md:py-4.5 md:px-8.75 text-sm md:text-base md:min-w-[178px] gap-1.5 pointer-events-none"
                      >
                        <span>Read Case Study</span>
                      </span>
                    </div>
                  </div>
                  <p className="text-base font-heading text-[#50607E] leading-normal italic text-left line-clamp-4 h-24">{c.quote}</p>
                  <div className="mt-auto pt-6 w-full flex items-center justify-between">
                    <div className="inline-flex items-center gap-1 border border-black/20 rounded-[10px] px-2 py-1.5 text-sm md:text-lg font-medium font-heading text-[#50607E]">
                      <img src={`/img/flags/${c.flag}.png`} alt={c.country} className="w-5 md:w-6 h-auto object-contain rounded-xs" />
                      <span>{c.country}</span>
                    </div>
                    <span className="whitespace-nowrap flex items-center text-sm md:text-base text-accent-foreground font-medium font-heading group-hover:text-accent-foreground/80 transition-colors cursor-pointer">
                      Read More
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </a>
              </SliderSlide>
            ))}
          </SliderTrack>
          <div className="flex items-center justify-center gap-8 md:gap-4 mt-5 md:mt-12">
            <SliderButton direction="prev" className={NAV_BTN} aria-label="Previous showcases">
              <ArrowLeft />
            </SliderButton>
            <SliderButton direction="next" className={NAV_BTN} aria-label="Next showcases">
              <ArrowRight />
            </SliderButton>
          </div>
        </Slider>
      </div>
    </section>
  );
}
