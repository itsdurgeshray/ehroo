import { CLIENT_LOGOS } from '@/lib/content';

/** ehroo.com "Trusted by world's fastest growing companies" marquee, same markup. */
export default function Logos() {
  const row = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <section className="w-full py-8 md:py-24 bg-white overflow-hidden">
      <div className="max-w-360 mx-auto px-5 md:px-6 flex flex-col items-center">
        <h2 className="text-primary-foreground text-2xl sm:text-4xl md:text-[64px] tracking-[-5%] max-w-67.5 sm:max-w-200 font-heading text-center">
          Trusted by world&rsquo;s <span className="text-accent-foreground font-bold">fastest growing</span> companies
        </h2>
        <div className="relative w-full overflow-hidden mt-8 md:mt-16 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-linear-to-r before:from-(--marquee-fade-color,white) before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-linear-to-l after:from-(--marquee-fade-color,white) after:to-transparent">
          <div className="flex w-max gap-16 md:gap-28 animate-marquee items-center">
            {row.map((l, i) => (
              <div key={i} className="flex items-center justify-center h-6 md:h-10 w-auto shrink-0" aria-hidden={i >= CLIENT_LOGOS.length || undefined}>
                <img src={l.src} alt={i < CLIENT_LOGOS.length ? l.alt : ''} width={l.w} height={l.h} className="h-full w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
