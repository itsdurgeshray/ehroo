import Qualifier from '@/components/qualifier/Qualifier';

/**
 * Section 4 form block. Layout follows ehroo.com/growth-audit (#audit-form-section): radial glow, side card on the
 * left (lg+), form card on the right. Heading copy is from the copy PDF.
 */
export default function QualifySection() {
  return (
    <section id="qualify" className="w-full py-16 md:py-24 overflow-x-clip relative bg-white">
      <div
        aria-hidden="true"
        style={{ position: 'absolute', width: 520, height: 520, left: -92, top: 120, background: 'radial-gradient(98.99% 98.99% at 30% 30%, rgba(0, 127, 255, 0.13) 0%, rgba(0, 127, 255, 0) 62%)', borderRadius: 260, pointerEvents: 'none', zIndex: 1 }}
      />
      <div className="w-full max-w-275 mx-auto px-5 md:px-6 flex flex-col items-center text-center relative z-10 mb-10 md:mb-16">
        <h2 className="text-primary-foreground text-[32px] sm:text-4xl md:text-[64px] tracking-[-5%] leading-[1.0625] max-w-197 font-heading">
          Build a predictable sales channel that drives recurring <span className="text-accent-foreground font-bold">revenue</span>
        </h2>
        <p className="mt-3 md:mt-4 max-w-165 text-sm md:text-base text-[#50607E] font-heading font-normal leading-normal">
          Answer six quick questions. If we are a fit, you will pick a time with our team on the next screen.
        </p>
      </div>
      <div className="w-full max-w-286 mx-auto px-5 md:px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row gap-5 md:gap-10 items-stretch">
          <div className="shrink-0">
            <div className="bg-white border border-black/17 rounded-[16px] p-5 relative overflow-hidden lg:max-w-79.5 w-full mx-auto h-full flex flex-col">
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#007FFF]/40 filter blur-2xl pointer-events-none" />
              <div className="relative rounded-[8px] overflow-visible bg-[#0B1528] aspect-16/10 border border-black/5 mb-6 flex flex-col p-4">
                <img src="/img/video/loom-card.webp" alt="Strategy call preview" width={308} height={181} className="w-full h-full object-cover rounded-[12px]" />
                <div className="absolute bg-[#0072F3] -bottom-5 -right-1 size-22 rounded-full overflow-hidden shadow-md z-20">
                  <img src="/img/people/drishti-kanoi.webp" alt="Drishti Kanoi" width={261} height={263} className="size-full object-cover select-none" />
                </div>
              </div>
              <div className="space-y-2 text-left">
                <h4 className="text-2xl font-heading font-bold text-slate-900 leading-tight">
                  Book your <span className="text-accent-foreground">strategy call</span> with us
                </h4>
                <p className="text-xs font-heading text-slate-500 leading-relaxed">
                  If you qualify, you pick a time with our team on the next screen and we map your full-funnel growth engine on
                  the call.
                </p>
              </div>
              <span className="text-[10px] font-heading text-slate-400 text-center block mt-auto pt-6 select-none">
                No spam · Reviewed personally within 24h
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center lg:items-start text-left">
            <Qualifier />
          </div>
        </div>
      </div>
    </section>
  );
}
