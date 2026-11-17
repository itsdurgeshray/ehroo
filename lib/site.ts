/** Public settings. Override with NEXT_PUBLIC_* env vars (see .env.example). */
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || 'https://ehroo.com/book-strategy-call';
export const VSL_YOUTUBE_ID = process.env.NEXT_PUBLIC_VSL_YOUTUBE_ID || 'SiRGHaL_yRY';
export const PRICING_YOUTUBE_ID = process.env.NEXT_PUBLIC_PRICING_YOUTUBE_ID || 'sM8C5jHR9JI';
export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@drishtikanoi';

export const ytEmbed = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

/** Session key the thank-you page reads the application summary from. */
export const LEAD_STORAGE_KEY = 'ehroo_application';
/** Screenshot of the pricing breakdown for the pricing section (e.g. /img/pricing.png). Empty shows a placeholder. */
export const PRICING_IMAGE = process.env.NEXT_PUBLIC_PRICING_IMAGE || '/img/pricing-breakdown.jpg';
