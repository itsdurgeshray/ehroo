import { btnPrimary } from '@/components/ui/button';
import { YOUTUBE_CHANNEL_URL } from '@/lib/site';

/** Section 2. Header uses the ehroo.com split layout ("Helping companies get discovered..."); the channel
 *  screenshot sits in the same blue-offset frame as the hero mockup. */
export default function YouTubeSection() {
  return (
    <section id="youtube" className="w-full py-8 md:py-26 bg-white overflow-hidden">
      <div className="max-w-360 mx-auto px-6">
        <div className="max-w-294.5 mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-12 mb-8 md:mb-16">
          <div className="max-w-160">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading text-primary-foreground leading-[1.2] md:leading-14 tracking-[-5%]">
              Watch the free <span className="text-accent-foreground font-bold">YouTube case studies</span>
            </h2>
          </div>
          <div className="flex flex-col items-start text-left max-w-100">
            <p className="text-primary-foreground text-sm md:text-base leading-normal max-w-104">
              Real case studies, live strategies and growth breakdowns from our clients, plus the frameworks behind winning
              companies.
            </p>
            <p className="mt-3 text-primary-foreground text-sm md:text-base leading-normal max-w-104 font-semibold">
              Watch how we build growth systems, what actually worked, and the strategies you can apply to your own business.
            </p>
            <div className="mt-6">
              <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" data-slot="button" className={btnPrimary}>
                <span>Watch on YouTube</span>
              </a>
            </div>
          </div>
        </div>
        <a
          href={YOUTUBE_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative max-w-250 mx-auto aspect-[2260/1380] mb-3.5 group"
          aria-label="Drishti on YouTube: case studies and growth breakdowns"
        >
          <span className="absolute left-1 top-1 -right-1 -bottom-1 md:left-3.5 md:top-3.5 md:-right-3.5 md:-bottom-3.5 bg-[#005AE2] rounded-[24px] md:rounded-[42px]" />
          <span className="absolute inset-0 rounded-[20px] md:rounded-[35px] border border-[#CED7E8] overflow-hidden bg-white">
            <img src="/img/yt-channel.jpg" alt="Drishti's YouTube channel with Ehroo case studies and growth breakdowns" width={2260} height={1380} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]" />
          </span>
        </a>
      </div>
    </section>
  );
}
