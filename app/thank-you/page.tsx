import type { Metadata } from 'next';
import { ClipboardCheck, PhoneCall, Map } from 'lucide-react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import CtaCard from '@/components/ui/CtaCard';
import ApplicationDetails from '@/components/thank-you/ApplicationDetails';
import { btnPrimary } from "@/components/ui/button";
import { BOOKING_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: "Application Received | Ehroo",
  robots: { index: false, follow: false },
};

const STEPS = [
  { n: '01', Icon: ClipboardCheck, title: 'We Review Your Application', body: 'Our team reviews your business, revenue, growth goals, current acquisition channels and investment readiness.' },
  { n: '02', Icon: PhoneCall, title: 'Strategy Call', body: 'We discuss your offer, funnel, PLG opportunities, inbound strategy, paid acquisition and revenue goals.' },
  { n: '03', Icon: Map, title: 'Build Your Growth Roadmap', body: "If there's a strong fit, we'll outline how we can build your full-funnel growth engine and create a predictable sales pipeline." },
];

const Arrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-4 md:size-5" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function ThankYou() {
  return (
    <>
      <Header ctaHref={BOOKING_URL} ctaLabel="Book Your Strategy Call" />
      <main>
        {/* Hero: ehroo.com/growth-audit hero shell */}
        <section className="w-full bg-white pt-16 md:pt-20 pb-0 md:pb-16 text-center relative overflow-x-clip">
          <div aria-hidden="true" style={{ position: 'absolute', width: 520, height: 520, right: -160, top: -120, background: 'radial-gradient(98.99% 98.99% at 30% 30%, rgba(0, 127, 255, 0.13) 0%, rgba(0, 127, 255, 0) 62%)', borderRadius: 260, pointerEvents: 'none', zIndex: 1 }} />
          <div className="w-full max-w-275 mx-auto px-5 md:px-6 flex flex-col items-center relative z-10">
            <svg width="85" height="85" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6" aria-hidden="true">
              <rect width="85" height="85" rx="42.5" fill="#eff5ff" />
              <path d="m62.164 26.642-27.038 27.91-12.29-12.687" stroke="#1359e0" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="inline-flex items-center gap-2 bg-[#EFF5FF] border border-[#CAD5E9] rounded-full py-1.5 px-4 mb-5 relative z-20">
              <span className="size-2 rounded-full bg-[#007FFF]" />
              <span className="text-xs text-accent-foreground font-heading">Application received</span>
            </div>
            <h1 className="text-primary-foreground text-[32px] sm:text-5xl md:text-[64px] tracking-[-5%] leading-tight max-w-197 font-heading">
              Application received. <span className="font-bold text-accent-foreground">You&apos;re one step closer.</span>
            </h1>
          </div>
        </section>

        {/* Thank you + Book your strategy call */}
        <section className="w-full py-12 md:py-16 bg-white relative">
          <div className="w-full max-w-286 mx-auto px-5 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 items-stretch">
            <div className="w-full bg-white border border-black/17 rounded-[22px] p-6 md:p-8 text-left">
              <h2 className="text-2xl md:text-[30px] font-heading font-semibold text-foreground leading-none mb-5.5">Thank You.</h2>
              <p className="text-sm md:text-base font-heading text-[#50607E] leading-normal">
                We&apos;ve received your application. Based on your answers, you may be a good fit for our full-funnel growth
                program.
              </p>
              <p className="mt-3 text-sm md:text-base font-heading text-[#50607E] leading-normal">
                A member of the team will review your application and reach out within 24 hours.
              </p>
              <ApplicationDetails />
            </div>

            <div className="w-full bg-[#EFF5FF] border border-ring rounded-[22px] shadow-[6px_6px_0px_#1359E0] p-6 md:p-8 text-left flex flex-col">
              <h2 className="text-2xl md:text-[30px] font-heading font-semibold text-foreground leading-none mb-5.5">Book Your Strategy Call</h2>
              <p className="text-sm md:text-base font-heading text-[#50607E] leading-normal">
                Don&apos;t wait for our team to reach out.{' '}
                <span className="font-semibold text-primary-foreground">Choose a convenient time to speak with us</span> and
                let&apos;s explore how we can build your growth engine.
              </p>
              <p className="mt-3 text-sm md:text-base font-heading text-[#50607E] leading-normal">
                On the call, we&apos;ll discuss your current acquisition channels, offer, funnel, PLG opportunities, growth goals
                and the biggest opportunities we see for your business.
              </p>
              <div className="mt-8 lg:mt-auto lg:pt-8">
                <a href={BOOKING_URL} data-slot="button" data-icon="inline-end" className={btnPrimary}>
                  <span>Book Your Strategy Call</span>
                  <Arrow />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* What happens next: ehroo.com/growth-audit "How the audit works" */}
        <section className="w-full py-8 md:py-26 bg-[#F6FAFF] overflow-hidden">
          <div className="max-w-292 mx-auto px-5 md:px-6">
            <div className="text-center max-w-240 mx-auto mb-6 flex flex-col items-center">
              <h4 className="text-accent-foreground text-[15px] leading-5.25 md:text-[16px] md:leading-tight font-heading tracking-[40%] font-medium">
                YOUR NEXT STEPS
              </h4>
              <h2 className="text-2xl sm:text-4xl md:text-[64px] font-heading font-medium text-primary-foreground leading-none tracking-[-5%] mt-3">
                What Happens <span className="font-medium text-[#005ae2]">Next</span>
              </h2>
            </div>
            <div className="w-full sm:w-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {STEPS.map(({ n, Icon, title, body }) => (
                <div key={n} className="flex flex-col bg-white border border-[#DEEEFF] rounded-[18px] p-6 w-full sm:max-w-66 shadow-[0px_1px_2px_0_#0113240A] text-left">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="text-accent-foreground flex items-center justify-center">
                      <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <span className="text-xs leading-5.5 font-heading font-bold text-accent-foreground tracking-wider uppercase">STEP {n}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-heading font-semibold text-foreground mb-2">{title}</h3>
                  <p className="font-heading text-[#50607E] text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaCard>
          <h2 className="text-primary-foreground text-[32px] sm:text-4xl md:text-[64px] tracking-[-5%] leading-[1.0625] max-w-197 font-heading">
            Build Your Predictable <span className="text-accent-foreground font-bold">Growth Engine</span>
          </h2>
          <p className="mt-5 text-base md:text-lg font-heading text-primary-foreground leading-normal">
            You bring the product and ambition.
            <br />
            <span className="font-semibold">We bring the strategy, growth systems, technology, marketing and execution.</span>
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a href={BOOKING_URL} data-slot="button" data-icon="inline-end" className={btnPrimary}>
              <span>Book Your Strategy Call</span>
              <Arrow />
            </a>
            <a href="https://www.upwork.com/freelancers/~017f414c6b3c4f5ae8" target="_blank" rel="noopener noreferrer" className="flex items-center shrink-0">
              <img src="/img/upwork-badge.webp" alt="Top Rated on Upwork" width={65} height={43} className="h-10.75 w-auto object-contain" />
            </a>
          </div>
        </CtaCard>
      </main>
      <Footer />
    </>
  );
}
