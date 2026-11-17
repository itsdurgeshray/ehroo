import { PARTNERS } from '@/lib/content';

/** ehroo.com "Technology partners", same markup. */
export default function Partners() {
  return (
    <section className="w-full py-10 md:py-14 lg:py-16 bg-white overflow-hidden">
      <div className="max-w-312 mx-auto px-5 md:px-6 flex flex-col items-center">
        <h2 className="text-primary-foreground text-[26px] leading-[1.12] sm:text-[34px] md:text-[40px] lg:text-[44px] md:leading-[1.08] tracking-[-5%] text-center font-heading max-w-181 mb-6 md:mb-10">
          Technology <span className="text-accent-foreground font-bold">partners</span>
        </h2>
        <div className="grid grid-cols-3 gap-2.5 md:flex flex-wrap justify-center md:gap-x-5 md:gap-y-5 w-full">
          {PARTNERS.map((p, i) => (
            <div
              key={p.src}
              className={`flex items-center justify-center overflow-hidden bg-white border-2 border-dotted border-ring rounded-[18px] md:rounded-[16px] h-15 md:w-44 md:h-18 p-2.5 md:p-5 hover:scale-[1.03] transition-all duration-300 ${i === PARTNERS.length - 1 && PARTNERS.length % 3 === 1 ? 'col-start-2 md:col-start-auto' : ''}`}
            >
              <img src={p.src} alt={p.alt} width={p.w} height={p.h} className="max-w-full h-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
