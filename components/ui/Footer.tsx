/** ehroo.com footer, same markup; adds the "© 2026 Ehroo. All rights reserved." line from the copy PDF. */
const LINK =
  "group/button inline-flex shrink-0 items-center rounded-lg border border-transparent bg-clip-padding whitespace-nowrap outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 font-heading bg-transparent shadow-none active:translate-y-0 active:not-aria-[haspopup]:translate-y-0 cursor-pointer justify-start text-left h-auto min-w-0 p-0 gap-0 text-sm font-medium text-[#334155] hover:text-[#005AE2] transition-colors";

const COLS = [
  { title: 'Resources', links: [['Case Studies', 'https://ehroo.com/case-studies'], ['Blogs', 'https://ehroo.com/blogs']] },
  { title: 'Talk To Us', links: [['business@ehroo.com', 'mailto:business@ehroo.com'], ['+91 8961597292', 'tel:+918961597292']] },
  { title: 'LEGAL', links: [['Terms & Conditions', 'https://ehroo.com/terms-and-conditions'], ['Privacy Policy', 'https://ehroo.com/privacy-policy']] },
];

const SOCIAL = [
  ['Instagram', 'https://www.instagram.com/ehrooofficial?igsh=ZngxZjMzeTM0dXYw', '/img/footer/instagram.svg'],
  ['Linkedin', 'https://www.linkedin.com/company/ehroo/', '/img/footer/linkedin.svg'],
  ['X', 'https://x.com/ehrooofficial', '/img/footer/x.svg'],
];

export default function Footer({ ctaHref = '#qualify', ctaLabel = 'See if you qualify', btnClass }: { ctaHref?: string; ctaLabel?: string; btnClass: string }) {
  return (
    <footer className="relative w-full bg-[#F7F9FC] pt-14 md:pt-16 overflow-hidden border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 md:gap-8">
          <div className="shrink-0">
            <a href="https://ehroo.com/" className="inline-flex items-center gap-2.5">
              <img src="/img/ehroo-logo.svg" alt="Ehroo" width={106} height={32} className="h-8 w-auto object-contain" />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12 flex-1 lg:max-w-2xl lg:mx-auto">
            {COLS.map((c) => (
              <div key={c.title} className="flex flex-col gap-4">
                <h4 className="text-xs md:text-sm font-semibold font-heading text-[#64748B] uppercase tracking-wider select-none">{c.title}</h4>
                <ul className="flex flex-col gap-3">
                  {c.links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} data-slot="button" className={LINK}>
                        <span>{label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="shrink-0 lg:ml-auto">
            <a href={ctaHref} data-slot="button" className={btnClass}>
              <span>{ctaLabel}</span>
            </a>
          </div>
        </div>
        <div className="w-full border-t border-[#adaaaa] my-8 md:my-10" />
        <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#005AE2] tracking-wider uppercase font-heading">Backed By</span>
            <a href="https://weframetech.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:opacity-85 transition-opacity">
              <img src="/img/footer/backed-by.svg" alt="Backed By Logo" className="h-6.5 w-auto object-contain" />
            </a>
          </div>
          <div className="flex items-center gap-3.5">
            {SOCIAL.map(([label, href, icon]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="size-10 bg-white border-2 border-[#005AE2] shadow-[3px_3px_0px_#005AE2] text-[#005AE2] flex items-center justify-center rounded-xl hover:scale-105 hover:shadow-[1.5px_1.5px_0px_#005AE2] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200">
                <img src={icon} alt={label} width={20} height={20} className="size-5 object-contain" />
              </a>
            ))}
          </div>
        </div>
        <div className="flex justify-center text-center mt-6 select-none">
          <img src="/img/footer/wordmark.svg" alt="Ehroo" className="w-full h-auto" />
        </div>
        <p className="text-center text-xs font-heading text-[#64748B] pt-4 pb-6">© 2026 Ehroo. All rights reserved.</p>
      </div>
    </footer>
  );
}
