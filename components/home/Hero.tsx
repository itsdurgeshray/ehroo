import { Search, Megaphone, Infinity as Loop } from 'lucide-react';
import HeroVideo from './HeroVideo';
import { btnPrimary, btnSecondary, heroBtnExtra } from '@/components/ui/button';
import { VSL_YOUTUBE_ID } from '@/lib/site';

const OFFERINGS = [
  {
    n: '01',
    title: 'Inbound Growth',
    Icon: Search,
    body: (
      <>
        Build a full-funnel inbound engine across Google, ChatGPT, Reddit, and AI search, turning organic visibility into
        qualified demand and revenue. Combine this with product-led growth strategies to build scalable growth levers,
        improve user acquisition, drive activation, and accelerate revenue.
      </>
    ),
  },
  {
    n: '02',
    title: 'Meta Ads',
    Icon: Megaphone,
    body: (
      <>
        Generate <span className="font-semibold text-primary-foreground">10-20 qualified meetings per week</span> with a
        proven Meta Ads acquisition system built around your ICP, offer and sales funnel.
      </>
    ),
  },
  {
    n: '03',
    title: 'Combined Growth Engine',
    Icon: Loop,
    body: (
      <>
        Combine <span className="font-semibold text-primary-foreground">inbound + Meta Ads</span> to create a predictable
        flywheel that continuously generates visibility, qualified leads, sales meetings and revenue.
      </>
    ),
  },
];

/**
 * Section 1. Headline, then the VSL sized so the whole video sits inside the first screen (.hero-video-fit),
 * then the CTAs and the three offerings. The mosaic is ehroo.com's exact box, placed from the headline (.hero-mosaic).
 */
export default function Hero() {
  return (
    <section className="@container w-full bg-white pt-6 md:pt-8 text-center relative overflow-hidden">
      <div className="hero-mosaic absolute inset-x-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
        <img
          src="/img/hero-dither.svg"
          alt=""
          width={1440}
          height={961}
          className="absolute bottom-0 left-0 w-full h-full object-cover object-top"
          fetchPriority="high"
        />
      </div>
      <div className="w-full max-w-300 mx-auto px-5 md:px-6 flex flex-col items-center relative z-20">
        <div className="inline-flex items-center gap-2 bg-[#EFF5FF] border border-[#CAD5E9] rounded-full py-1 md:py-1.5 px-3 md:px-4 mb-3 md:mb-4">
          <span className="size-1.5 md:size-2 rounded-full bg-[#007FFF]" />
          <span className="text-[11px] md:text-xs text-accent-foreground font-heading">For SaaS, IT &amp; Cybersecurity companies</span>
        </div>

        <h1 className="text-primary-foreground text-[29px] leading-[1.12] sm:text-[40px] md:text-[44px] lg:text-[50px] md:leading-[1.08] tracking-[-0.045em] max-w-[22ch] md:max-w-245 font-heading text-balance">
          Scale to <span className="font-bold text-accent-foreground">₹100Cr+</span> with a predictable full-funnel growth
          engine in 180 days
        </h1>

        <p className="mt-3 md:mt-4 max-w-192 text-[14px] sm:text-base text-primary-foreground/85 font-normal leading-normal text-pretty">
          We build your organic sales pipeline end-to-end combining product-led growth, AI visibility, SEO, CRO, inbound
          demand generation, and paid acquisition into one predictable growth system.
        </p>
      </div>

      {/* VSL, sized to fit the first screen (globals.css .hero-video-fit) */}
      <div className="relative mt-5 md:mt-7 px-5 md:px-6">
        <div className="hero-video-fit relative mx-auto">
          <div className="relative z-20">
            <HeroVideo
              videoId={VSL_YOUTUBE_ID}
              poster="/img/video/hero-mockup.webp"
              alt="Drishti Kanoi explains how Ehroo builds a predictable full-funnel growth engine"
            />
          </div>
        </div>
        <div className="relative z-20 pt-5 md:pt-7 mx-auto w-full max-w-100 md:max-w-none grid grid-cols-2 gap-3 md:flex md:justify-center md:gap-5">
          <a href="#youtube" data-slot="button" className={`${btnSecondary} ${heroBtnExtra}`}>
            <span>Watch case studies</span>
          </a>
          <a href="#qualify" data-slot="button" className={`${btnPrimary} ${heroBtnExtra}`}>
            <span>See if you qualify</span>
          </a>
        </div>
      </div>

      {/* Offerings: swipe row on phones, three columns from lg */}
      <div className="relative z-20 w-full max-w-300 mx-auto md:px-6 mt-8 md:mt-12">
        <div className="flex lg:grid lg:grid-cols-3 gap-3 md:gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-none px-5 md:px-0 pb-2 scroll-px-5 md:scroll-px-0 text-left">
          {OFFERINGS.map(({ n, title, Icon, body }) => (
            <div
              key={n}
              className="snap-start shrink-0 w-[82%] sm:w-[60%] md:w-[44%] lg:w-auto flex flex-col bg-white border border-[#DEEEFF] rounded-[16px] p-5 shadow-[0px_1px_2px_0_#0113240A]"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Icon size={18} strokeWidth={1.75} className="text-accent-foreground" aria-hidden="true" />
                <span className="text-[11px] leading-5 font-heading font-bold text-accent-foreground tracking-wider">{n}</span>
              </div>
              <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-1.5">{title}</h3>
              <p className="font-heading text-[#50607E] text-[13px] md:text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
        <p className="lg:hidden mt-2 text-[11px] font-heading text-[#50607E]/80" aria-hidden="true">
          Swipe to see all three
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
    </section>
  );
}
