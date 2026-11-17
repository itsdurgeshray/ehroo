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

/** Section 1. Markup and spacing follow the ehroo.com hero; the mosaic box is sized in globals.css (.hero-mosaic). */
export default function Hero() {
  return (
    <section className="@container w-full bg-white pt-16 md:pt-34 pb-34 md:pb-0 text-center relative overflow-hidden">
      <div className="hero-mosaic absolute inset-x-0 bottom-0 pointer-events-none z-0 overflow-hidden select-none">
        <img
          src="/img/hero-dither.svg"
          alt=""
          width={1440}
          height={961}
          className="absolute bottom-0 left-0 w-full h-full object-cover object-top"
          fetchPriority="high"
        />
      </div>

      <div className="inline-flex items-center gap-2 bg-[#EFF5FF] border border-[#CAD5E9] rounded-full py-1.5 px-4 mb-5 relative z-20">
        <span className="size-2 rounded-full bg-[#007FFF]" />
        <span className="text-xs text-accent-foreground font-heading">For SaaS, IT &amp; Cybersecurity companies</span>
      </div>

      <div className="w-full max-w-300 mx-auto px-5 md:px-6 flex flex-col items-center relative z-20">
        <h1 className="order-2 text-primary-foreground text-[32px] sm:text-5xl md:text-[64px] tracking-[-5%] leading-tight max-w-197 font-heading">
          Scale to <span className="font-bold text-accent-foreground">₹100Cr+</span> with a predictable full-funnel growth
          engine in 180 days
        </h1>

        <p className="order-3 mt-5 md:mt-9.5 max-w-201 text-sm sm:text-lg text-primary-foreground font-normal leading-relaxed">
          We build your organic sales pipeline end-to-end combining product-led growth, AI visibility, SEO, CRO, inbound
          demand generation, and paid acquisition into one predictable growth system.
        </p>

        <div className="order-4 mt-8 md:mt-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-2.5 text-left">
          {OFFERINGS.map(({ n, title, Icon, body }) => (
            <div
              key={n}
              className="flex flex-col bg-white border border-[#DEEEFF] rounded-[18px] p-6 w-full shadow-[0px_1px_2px_0_#0113240A]"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="text-accent-foreground flex items-center justify-center">
                  <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <span className="text-xs leading-5.5 font-heading font-bold text-accent-foreground tracking-wider uppercase">
                  {n}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-semibold text-foreground mb-2">{title}</h3>
              <p className="font-heading text-[#50607E] text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Mockup (order 5 on mobile, order 6 on md+) */}
        <div className="order-5 md:order-6 mt-8 md:mt-44 w-full relative">
          <HeroVideo
            videoId={VSL_YOUTUBE_ID}
            poster="/img/video/hero-mockup.webp"
            alt="Drishti Kanoi explains how Ehroo builds a predictable full-funnel growth engine"
          />
        </div>

        {/* CTAs (order 6 on mobile, order 5 on md+) */}
        <div className="order-6 md:order-5 mt-14 md:mt-10 w-full max-w-85 md:max-w-none grid grid-cols-2 gap-4 md:flex md:flex-wrap md:justify-center md:gap-5">
          <a href="#youtube" data-slot="button" className={`${btnSecondary} ${heroBtnExtra}`}>
            <span>Watch case studies</span>
          </a>
          <a href="#qualify" data-slot="button" className={`${btnPrimary} ${heroBtnExtra}`}>
            <span>See if you qualify</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 max-md:-bottom-24 left-0 right-0 h-48 bg-linear-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
    </section>
  );
}
