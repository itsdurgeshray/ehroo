import { ImageIcon, PlayCircle } from 'lucide-react';
import HeroVideo from './HeroVideo';
import PricingImage from './PricingImage';
import { btnPrimary } from '@/components/ui/button';
import { PRICING_IMAGE, PRICING_YOUTUBE_ID } from '@/lib/site';

/** Blue offset frame used by the ehroo.com hero mockup, at card scale. */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full aspect-video">
      <div className="absolute left-1 top-1 -right-1 -bottom-1 md:left-2.5 md:top-2.5 md:-right-2.5 md:-bottom-2.5 bg-[#005AE2] rounded-[24px] md:rounded-[30px]" />
      <div className="absolute inset-0 rounded-[20px] md:rounded-[26px] border border-[#CED7E8] overflow-hidden bg-white">{children}</div>
    </div>
  );
}

function Placeholder({ Icon, title, note }: { Icon: typeof ImageIcon; title: string; note: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#EFF5FF] text-center px-6">
      <Icon className="size-10 text-accent-foreground" strokeWidth={1.5} aria-hidden="true" />
      <span className="font-heading font-semibold text-lg md:text-xl text-primary-foreground">{title}</span>
      <span className="font-heading text-sm text-[#50607E]">{note}</span>
    </div>
  );
}

/** Section 4: "See our pricing, strategy & how we work" with the pricing video and pricing screenshot. */
export default function Pricing() {
  return (
    <section id="pricing" className="w-full py-10 md:py-16 lg:py-20 bg-[#F6FAFF] overflow-hidden">
      <div className="max-w-360 mx-auto px-6">
        <div className="max-w-294.5 mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-12 mb-10 md:mb-10">
          <div className="max-w-160">
            <h2 className="text-[26px] leading-[1.12] sm:text-[34px] md:text-[40px] lg:text-[44px] md:leading-[1.08] font-heading text-primary-foreground tracking-[-5%]">
              See our pricing, strategy &amp; <span className="text-accent-foreground font-bold">how we work</span>
            </h2>
          </div>
          <div className="flex flex-col items-start text-left max-w-100">
            <p className="text-primary-foreground text-sm md:text-base leading-normal max-w-104 font-semibold">
              Watch our free YouTube video to see our pricing, what&rsquo;s included, how our strategies work, and exactly what
              you can expect when working with us.
            </p>
            <p className="mt-3 text-primary-foreground text-sm md:text-base leading-normal max-w-104 font-semibold">
              Get a clear breakdown of our process, deliverables, growth strategies, timelines and more, before you book a call.
            </p>
            <div className="mt-6">
              <a href="#qualify" data-slot="button" className={btnPrimary}>
                <span>See if you qualify</span>
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-294.5 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 pr-1 md:pr-2.5">
          {PRICING_YOUTUBE_ID ? (
            <HeroVideo videoId={PRICING_YOUTUBE_ID} poster={PRICING_YOUTUBE_ID === 'sM8C5jHR9JI' ? '/img/video/sM8C5jHR9JI.jpg' : `https://i.ytimg.com/vi/${PRICING_YOUTUBE_ID}/hqdefault.jpg`} alt="Ehroo pricing, strategy and how we work" />
          ) : (
            <Frame>
              <Placeholder Icon={PlayCircle} title="Pricing walkthrough video" note="Coming soon" />
            </Frame>
          )}
          {PRICING_IMAGE ? (
            <PricingImage src={PRICING_IMAGE} />
          ) : (
            <Frame>
              <Placeholder Icon={ImageIcon} title="Pricing breakdown" note="Coming soon" />
            </Frame>
          )}
        </div>
      </div>
    </section>
  );
}
