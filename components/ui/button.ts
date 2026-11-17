/**
 * Button class strings copied verbatim from ehroo.com's shadcn Button (data-slot="button").
 * BASE is shared; variants add the fill. Render with data-slot="button" so the base-layer a[data-slot] rule applies.
 */
const BASE =
  "group/button inline-flex shrink-0 items-center justify-center bg-clip-padding font-medium font-heading whitespace-nowrap outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

const PRESS =
  'text-black border-2 border-black shadow-[2px_2px_0px_#000000] md:shadow-[4px_4px_0px_#000000] hover:scale-[1.02] active:scale-98 active:translate-x-0.5 active:translate-y-0.5 active:not-aria-[haspopup]:translate-x-0.5 active:not-aria-[haspopup]:translate-y-0.5 active:shadow-[2px_2px_0px_#000000] active:not-aria-[haspopup]:shadow-[2px_2px_0px_#000000] transition-all cursor-pointer';

const SIZE =
  'rounded-[10px] md:rounded-xl py-3 px-4 md:py-3.5 md:px-7 text-sm md:text-[15px] md:min-w-[164px] gap-1.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2';

/** Lime "Book a strategy call" button. */
export const btnPrimary = `${BASE} bg-primary ${PRESS} ${SIZE}`;
/** White "Get free audit" button. */
export const btnSecondary = `${BASE} bg-white ${PRESS} ${SIZE}`;
/** Hero CTA pair variant (ehroo.com hero adds these to both buttons). */
export const heroBtnExtra = 'max-sm:w-full min-w-0';

/** Footer "Talk to us" button (ehroo.com footer uses its own variant). */
export const btnFooter =
  "group/button inline-flex shrink-0 items-center justify-center bg-clip-padding font-heading whitespace-nowrap outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 md:shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:not-aria-[haspopup]:translate-x-0.5 active:not-aria-[haspopup]:translate-y-0.5 active:shadow-[2px_2px_0px_#000000] active:not-aria-[haspopup]:shadow-[2px_2px_0px_#000000] cursor-pointer md:rounded-xl md:py-3.5 md:px-7 md:text-[15px] md:min-w-[164px] gap-1.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 bg-[#D7FC00] text-black border-2 border-black shadow-[3.5px_3.5px_0px_#000000] rounded-xl px-6 py-3.5 font-semibold text-sm hover:scale-[1.02] active:scale-98 transition-all";
