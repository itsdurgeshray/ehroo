/**
 * ehroo.com footer styling, trimmed for the funnel: no navigation or outbound links, only the social icons.
 * "Backed by WeframeTech" is shown as plain text and logo.
 */
const SOCIAL = [
  ['Instagram', 'https://www.instagram.com/ehrooofficial?igsh=ZngxZjMzeTM0dXYw', '/img/footer/instagram.svg'],
  ['Linkedin', 'https://www.linkedin.com/company/ehroo/', '/img/footer/linkedin.svg'],
  ['X', 'https://x.com/ehrooofficial', '/img/footer/x.svg'],
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#F7F9FC] pt-12 md:pt-14 overflow-hidden border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
          <img src="/img/ehroo-logo.svg" alt="Ehroo" width={106} height={32} className="h-8 w-auto object-contain select-none" />
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#005AE2] tracking-wider uppercase font-heading">Backed By</span>
            <img src="/img/footer/backed-by.svg" alt="WeframeTech" className="h-6.5 w-auto object-contain select-none" />
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
