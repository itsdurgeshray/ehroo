/** ehroo.com closing CTA card ("Build an organic sales channel..."): blue offset layer, radial glows, wave texture. */
export default function CtaCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full py-10 md:py-14 lg:py-16 bg-white">
      <div className="max-w-295 mx-auto px-5 md:px-6">
        <div className="relative">
          <div className="absolute left-1 top-1 -right-1 -bottom-1 bg-[#007FFF] rounded-[28px] pointer-events-none" />
          <div className="relative rounded-[24px] bg-white border border-[#1359E0]/25 overflow-hidden">
            <div className="absolute w-80 h-80 -left-20 -top-20 md:w-165.25 md:h-175 md:-left-31.5 md:-top-28 rounded-full pointer-events-none z-0" style={{ background: 'radial-gradient(98.99% 98.99% at 30% 30%, rgba(0,127,255,0.34) 0%, rgba(0,127,255,0) 60%)' }} />
            <div className="absolute w-55 h-55 -right-16 -bottom-16 md:w-109 md:h-109 md:left-212.5 md:top-49.5 md:right-auto md:bottom-auto rounded-full pointer-events-none z-0" style={{ background: 'radial-gradient(98.99% 98.99% at 30% 30%, rgba(0,127,255,0.34) 0%, rgba(0,127,255,0) 60%)', transform: 'matrix(1,0,0,-1,0,0)' }} />
            <div>
              <img src="/img/gradient-wave.png" alt="" className="absolute inset-0" />
            </div>
            <div className="relative z-10 py-20 md:py-30 px-4 md:px-20 flex flex-col items-center text-center">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
