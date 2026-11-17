'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { FAQS } from '@/lib/content';
import { btnPrimary } from '@/components/ui/button';

/** Section 3. ehroo.com "Still have a question?" layout and its shadcn/Radix accordion classes. */
export default function Faq() {
  return (
    <section id="faq" className="w-full py-10 md:py-16 lg:py-20 bg-white">
      <div className="max-w-292 mx-auto px-5 md:px-6 flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-20">
        <div className="flex flex-col items-start text-left max-w-md lg:sticky lg:top-32">
          <h2 className="text-primary-foreground text-[26px] leading-[1.12] sm:text-[34px] md:text-[40px] lg:text-[44px] md:leading-[1.08] tracking-[-5%] max-w-200 font-heading">
            Frequently asked <span className="text-accent-foreground font-bold">questions</span>
          </h2>
          <p className="mt-3 md:mt-4 text-secondary-foreground text-[15px] md:text-base leading-normal max-w-104">
            Your market, your ICP, where the pipeline is leaking. We don&apos;t touch a single keyword until we know the whole
            picture.
          </p>
          <div className="mt-6 md:mt-8">
            <a href="#qualify" data-slot="button" className={btnPrimary}>
              <span>See if you qualify</span>
            </a>
          </div>
        </div>
        <div className="flex-1 w-full max-w-160">
          <Accordion.Root type="multiple" data-slot="accordion" className="flex flex-col w-full">
            {FAQS.map((f, i) => (
              <Accordion.Item
                key={i}
                value={`faq-${i}`}
                data-slot="accordion-item"
                className="bg-white data-[state=open]:bg-[#EFF5FF] border-2 border-ring rounded-[12px] md:rounded-[16px] shadow-[3px_3px_0px_#1359E0] md:shadow-[4px_4px_0px_#1359E0] transition-colors duration-200 overflow-hidden mb-3 md:mb-3.5 last:mb-0"
              >
                <Accordion.Header className="flex">
                  <Accordion.Trigger
                    data-slot="accordion-trigger"
                    className="group relative flex flex-1 items-center justify-between gap-3 px-4 py-3.5 md:py-4.5 md:px-5 text-left text-[15px] md:text-lg leading-snug font-medium font-inter tracking-tight text-secondary-foreground transition-all outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-ring"
                  >
                    <span>{f.q}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus pointer-events-none shrink-0 size-5 md:size-6 text-ring group-data-[state=open]:hidden" aria-hidden="true">
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus pointer-events-none hidden shrink-0 size-5 md:size-6 text-ring group-data-[state=open]:inline" aria-hidden="true">
                      <path d="M5 12h14" />
                    </svg>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content
                  data-slot="accordion-content"
                  className="overflow-hidden text-sm md:text-base leading-relaxed text-foreground/60 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
                >
                  <div className="px-4 pb-4 md:px-5 md:pb-5 md:pr-8 leading-relaxed font-inter font-medium md:text-base">{f.a}</div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
}
