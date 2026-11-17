'use client';

import { useState } from 'react';
import { TESTIMONIALS, type Testimonial } from '@/lib/content';
import { Slider, SliderTrack, SliderSlide, SliderButton, ArrowLeft, ArrowRight, NAV_BTN, useSliderOptional } from '@/components/ui/Slider';
import { ytEmbed } from '@/lib/site';

/** One ehroo.com testimonial card: the video plays inside the card and the avatar circle fades out. */
function Card({ t }: { t: Testimonial }) {
  const [playing, setPlaying] = useState(false);
  const [hover, setHover] = useState(false);
  const slider = useSliderOptional();

  return (
    <div className="relative w-full h-full flex items-center pt-14 md:pt-0 md:pl-20">
      <div className="relative z-0 w-full h-full bg-[#EFF5FF] border border-ring rounded-[24px] md:rounded-[28px] shadow-[4px_4px_0px_#1359E0] p-5 md:p-7 pt-15 md:pt-7 md:pl-24 md:pr-12 text-left overflow-hidden flex flex-col">
        <p className="text-[15px] md:text-lg leading-snug font-heading text-secondary-foreground tracking-[-3%] mb-5 md:mb-6 select-none flex-1">{t.quote}</p>
        <div className="flex items-center justify-between w-full">
          <div>
            <h4 className="text-base md:text-lg font-inter font-semibold text-secondary-foreground">{t.author}</h4>
            <p className="text-[13px] md:text-sm font-inter text-secondary-foreground/50">{t.role}</p>
          </div>
          <div className="h-5 md:h-7 shrink-0 flex items-center">
            <img src={t.logo.src} alt={t.company} width={t.logo.w} height={t.logo.h} className="h-full w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
        {playing && t.videoId && (
          <div className="absolute inset-0 bg-black z-30">
            <iframe src={ytEmbed(t.videoId)} className="w-full h-full border-0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title="Testimonial Video" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPlaying(false);
                slider?.setAutoplayPaused(false);
              }}
              className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg"
              aria-label="Close video"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div
        className={`absolute z-10 w-22 h-22 md:w-40 md:h-40 rounded-full border border-ring overflow-hidden bg-white left-5 md:left-0 top-0 md:top-[unset] transition-all duration-500 ease-in-out ${playing ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}
      >
        <div className="absolute inset-0 pointer-events-none">
          <img src="/img/gradient-02.png" alt="" className="w-full h-full object-cover" />
        </div>
        <img src={t.avatar} alt={t.author} width={401} height={401} className="relative z-10 w-full h-full object-cover object-top" />
        {t.videoId && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 transition-colors duration-300">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPlaying(true);
                slider?.setAutoplayPaused(true);
              }}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onFocus={() => setHover(true)}
              onBlur={() => setHover(false)}
              aria-label="Play testimonial video"
              style={{
                width: '56px',
                height: '57px',
                borderRadius: '100.76px',
                border: '1.68px solid #011324',
                backgroundColor: 'var(--primary, #D4EC31)',
                opacity: 0.8,
                boxShadow: hover ? '0px 40.3px 174.65px 0px #E3F0FE, 3.36px 3.36px 0px 0px #000000' : '0px 40.3px 174.65px 0px #E3F0FE, 6.72px 6.72px 0px 0px #000000',
                transform: hover ? 'scale(1.05) translate(1.68px, 1.68px)' : 'scale(1) translate(0, 0)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <svg className="w-5 h-5 text-[#011324] fill-current translate-x-0.5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/** ehroo.com "Hear from our clients" (TestimonialsContent): looping slider, same markup and geometry. */
export default function Testimonials() {
  return (
    <section className="w-full py-10 md:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-292 mx-auto px-5 md:px-6 mb-8 md:mb-10 text-left md:text-center">
        <h2 className="text-primary-foreground text-[26px] leading-[1.12] sm:text-[34px] md:text-[40px] lg:text-[44px] md:leading-[1.08] tracking-[-5%] max-w-197 font-heading whitespace-pre-line md:mx-auto">
          Hear from our <span className="text-accent-foreground font-bold">clients</span>
        </h2>
      </div>
      <div className="relative z-10 testimonials-slider-container w-full max-w-480 mx-auto overflow-hidden">
        <Slider className="w-full" loop>
          <SliderTrack className="gap-6 md:gap-14 pb-6 track-testimonials">
            {TESTIMONIALS.map((t) => (
              <SliderSlide key={t.author} className="select-none w-full md:w-174 snap-center flex">
                <Card t={t} />
              </SliderSlide>
            ))}
          </SliderTrack>
          <div className="flex items-center justify-center gap-8 md:gap-4 mt-4 md:mt-8">
            <SliderButton direction="prev" className={NAV_BTN} aria-label="Previous testimonials">
              <ArrowLeft />
            </SliderButton>
            <SliderButton direction="next" className={NAV_BTN} aria-label="Next testimonials">
              <ArrowRight />
            </SliderButton>
          </div>
        </Slider>
      </div>
    </section>
  );
}
