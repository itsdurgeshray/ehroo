/**
 * Page content. Case studies, testimonials, logos and partners are copied from ehroo.com (Sanity CMS) so cards read
 * exactly as they do there. Copy from "ehroo sales VSL copy page.pdf" uses commas or full stops where the PDF has
 * em dashes, and "to" or hyphens for number ranges.
 */

export type Video = { id: string; title: string; duration: string; label: string; vertical?: boolean };

/** "Below for 4 Video Cards": Drishti's three channel videos plus the WeframeTech client story. */
export const VIDEOS: Video[] = [
  { id: 'Od1VyGIczi8', title: "Here's How I generated $3 million in sales with ChatGPT, AI Search", duration: '26:28', label: 'Case study' },
  { id: 'a7hQpQUNbdQ', title: 'Ehroo Helped WeframeTech Secure 300+ Qualified Meetings', duration: '1:16', label: 'Client story' },
  { id: '0-Ppy1wQcPA', title: 'Copy the $100M ARR Inbound Strategy Used by n8n, Figma, Miro, Notion, ClickUp', duration: '13:51', label: 'Growth breakdown' },
  { id: 'SF2vC_ymrcI', title: "Copy ClickUp's $30M/Month Organic Marketing Strategy", duration: '20:15', label: 'Growth breakdown' },
];

export type Logo = { src: string; alt: string; w: number; h: number };

/** Same logos, order and intrinsic sizes as the ehroo.com marquee. */
export const CLIENT_LOGOS: Logo[] = [
  { src: '/img/clients/altima-crm.svg', alt: 'Altima CRM Logo', w: 168, h: 29 },
  { src: '/img/clients/confex.svg', alt: 'Confex Logo', w: 119, h: 32 },
  { src: '/img/clients/upsell.svg', alt: 'Upsell Logo', w: 185, h: 37 },
  { src: '/img/clients/luma.svg', alt: 'Luma Logo', w: 116, h: 33 },
  { src: '/img/clients/weframetech.webp', alt: 'WeframeTech logo', w: 347, h: 61 },
  { src: '/img/clients/nyeon.webp', alt: 'Nyeon Logo', w: 663, h: 96 },
  { src: '/img/clients/learnesy.webp', alt: 'Learnesy Logo', w: 1920, h: 323 },
  { src: '/img/clients/steel-masters-international.svg', alt: 'Steel Masters International Logo', w: 844, h: 245 },
  { src: '/img/clients/dependable-steel.svg', alt: 'Dependable steel logo', w: 966, h: 287 },
  { src: '/img/clients/slingshot.svg', alt: 'Slingshot Logo', w: 220, h: 32 },
  { src: '/img/clients/gravitee.svg', alt: 'Gravitee logo', w: 133, h: 32 },
  { src: '/img/clients/skin-laundry.svg', alt: 'Skin Laundry Logo', w: 73, h: 5 },
  { src: '/img/clients/cerify-os.svg', alt: 'Cerify OS Logo', w: 150, h: 31 },
];

export type CaseStudy = {
  category: string;
  metric: string;
  metricLabel: string;
  quote: string;
  flag: string;
  country: string;
  image: string;
  href: string;
};

const CS = 'https://ehroo.com/case-studies/';

/** Ehroo's client case studies (the growth-playbook teardowns on ehroo.com are left out). */
export const CASE_STUDIES: CaseStudy[] = [
  {
    category: 'B2B Technology Company',
    metric: '$3M+ Sales Pipeline in 6 Months Without Ads',
    metricLabel: 'WeframeTech Case Study',
    quote: 'Discover how we helped this B2B company book 300+ qualified meetings in 6 months, generate over $3 million in sales pipeline, build a fully inbound organic sales channel, and dominate AI search results.',
    flag: 'in',
    country: 'India',
    image: '/img/cases/weframetech.webp',
    href: CS + 'weframetech-seo-geo-ai-search-case-study',
  },
  {
    category: 'B2B SaaS',
    metric: "Supademo's $3M+ ARR Growth Story",
    metricLabel: 'B2B SaaS Case Study',
    quote: 'How Supademo Scaled to $3M+ ARR Using Only Inbound Growth [B2B SaaS Case Study]\nRead how this SaaS company reached $3M+ ARR without spending on paid ads, building a fully inbound growth engine.',
    flag: 'us',
    country: 'US',
    image: '/img/cases/supademo.webp',
    href: CS + 'supademo-growth-strategy-case-study',
  },
  {
    category: 'B2B Technology Company',
    metric: 'Learnesy Case Study',
    metricLabel: 'B2B EdTech Company',
    quote: "Read how we're Helping a B2B EdTech Company Generate Qualified Inbound Demand, Increase Customer Lifetime Value, and Build a $150K to $300K+ Annual Sales Pipeline Through SEO and AI Search Visibility",
    flag: 'se',
    country: 'Sweden',
    image: '/img/cases/learnesy.webp',
    href: CS + 'learnesy-case-study',
  },
  {
    category: 'Steel Masters International',
    metric: '$1M+ Pipeline for Steel Manufacturing',
    metricLabel: 'B2B Manufacturing Company',
    quote: "See how we're helping Steel Masters International generate qualified inbound demand, expand into international markets, and create a $250K to $1M+ annual sales pipeline through SEO and AI search visibility.",
    flag: 'ae',
    country: 'UAE',
    image: '/img/cases/steel-masters.webp',
    href: CS + 'steel-masters-case-study',
  },
  {
    category: 'AltimaCRM',
    metric: 'AltimaCRM Case Study',
    metricLabel: 'B2B SaaS Company',
    quote: 'Explore how we helped AltimaCRM rank #1 across Google, Reddit, ChatGPT, Perplexity, and other AI search platforms for high-intent Forex CRM keywords. By combining SEO and AI Search Optimization, we built a predictable inbound acquisition channel that created $100K+ in annual pipeline opportunity while reducing reliance on paid marketing.',
    flag: 'ae',
    country: 'UAE',
    image: '/img/cases/altimacrm.webp',
    href: CS + 'altima-crm-case-study',
  },
];

export type Testimonial = {
  author: string;
  role: string;
  company: string;
  avatar: string;
  logo: { src: string; w: number; h: number };
  quote: string;
  videoId?: string;
};

/** ehroo.com testimonials, word for word, in the same order. */
export const TESTIMONIALS: Testimonial[] = [
  {
    author: 'Durgesh Ray',
    role: 'Head of Design',
    company: 'WeframeTech',
    avatar: '/img/people/durgesh-ray.webp',
    logo: { src: '/img/clients/weframetech.webp', w: 347, h: 61 },
    quote: "In just six months, Ehroo helped us generate 300+ qualified meetings and significantly grow our visibility across AI search platforms. Working with their team has been one of the best growth decisions we've made.",
    videoId: 'a7hQpQUNbdQ',
  },
  {
    author: 'Nikhil Patel',
    role: 'CEO',
    company: 'Nyeon Technologies',
    avatar: '/img/people/nikhil-patel.webp',
    logo: { src: '/img/clients/nyeon.webp', w: 663, h: 96 },
    quote: "Ehroo has been a valuable growth partner for our business. Their marketing strategies helped us improve our online visibility, attract the right audience, and generate consistent results. If you're looking for a team that genuinely cares about your success, I highly recommend working with them.",
  },
  {
    author: 'Adam Sebastian',
    role: 'CEO',
    company: 'Nordic Stem Cells',
    avatar: '/img/people/adam-sebastian.webp',
    logo: { src: '/img/clients/nordic-stem-cells.svg', w: 259, h: 32 },
    quote: 'Ehroo played a key role in helping us refine our positioning, messaging, and conversion strategy. Through a series of strategic conversations and CRO initiatives, they helped us better communicate our value, improve customer journeys, and drive measurable business results. Their team is proactive, collaborative, and focused on outcomes.',
  },
  {
    author: 'Eshwar Mahadevan',
    role: 'Founder',
    company: 'OnWhitePaper',
    avatar: '/img/people/eshwar-mahadevan.webp',
    logo: { src: '/img/clients/onwhitepaper.webp', w: 1368, h: 229 },
    quote: "Ehroo combines creativity, strategy, and execution exceptionally well. Their team quickly understood our goals They're reliable, proactive, and committed to delivering real business impact.",
  },
  {
    author: 'Simrat Bhandari',
    role: 'Head of Growth',
    company: 'Steel Masters International',
    avatar: '/img/people/simrat-bhandari.webp',
    logo: { src: '/img/clients/steel-masters-international.svg', w: 844, h: 245 },
    quote: 'The team was professional, transparent, and easy to work with throughout our website and digital marketing revamp. Their expertise, clear communication, and valuable recommendations made the process seamless. I highly recommend their services.',
    videoId: 'no5yZ0KcOKk',
  },
];

/** Same partners, order and intrinsic sizes as ehroo.com "Technology partners". */
export const PARTNERS: Logo[] = [
  { src: '/img/partners/sanity.webp', alt: 'Sanity icon', w: 366, h: 138 },
  { src: '/img/partners/strapi.webp', alt: 'Strapi icon', w: 920, h: 245 },
  { src: '/img/partners/directus.webp', alt: 'Directus icon', w: 1080, h: 810 },
  { src: '/img/partners/builderio.webp', alt: 'Builderio icon', w: 1920, h: 415 },
  { src: '/img/partners/contentful.webp', alt: 'Contentful icon', w: 1694, h: 345 },
  { src: '/img/partners/shopify-plus.webp', alt: 'Shopify Plus icon', w: 900, h: 500 },
  { src: '/img/partners/medusa.webp', alt: 'Medusa icon', w: 111, h: 35 },
];

/** FAQ from the copy PDF (em dashes replaced with commas or colons). */
export const FAQS: { q: string; a: string }[] = [
  { q: 'What exactly do you help companies with?', a: 'We build your full-funnel growth engine, from offer creation and Product-Led Growth to SEO, AI visibility, CRO, inbound demand generation and paid acquisition.' },
  { q: 'Do you only do SEO?', a: 'No. SEO is one part of the system. We build the entire inbound sales pipeline across Google, ChatGPT, Reddit and AI search, then optimize the funnel to turn visibility into qualified leads and booked sales calls.' },
  { q: 'What is Product-Led Growth (PLG)?', a: 'We identify and build product-led growth levers that help users discover, adopt, experience value and convert, creating a scalable growth loop around your product.' },
  { q: 'Can you help us create or improve our offer?', a: 'Yes. We help refine your positioning, offer and messaging so your ICP clearly understands the value and has a strong reason to take action.' },
  { q: 'Do you work with paid ads?', a: 'Yes. We can combine the inbound engine with Meta Ads to generate additional qualified meetings and accelerate pipeline growth.' },
  { q: 'How do you measure success?', a: 'We focus on business outcomes: qualified traffic, inbound leads, booked sales calls, pipeline and revenue, rather than vanity metrics like impressions or rankings alone.' },
  { q: 'How long does it take to see results?', a: 'The timeline depends on your market, starting position, offer and execution speed. We build the system for compounding growth rather than relying on short-term traffic spikes.' },
  { q: 'Do you work with companies outside India?', a: 'Yes. Our growth systems can be built for B2B companies targeting customers globally.' },
  { q: 'Can we see your case studies before booking a call?', a: 'Yes. We publish live case studies, client strategies and growth breakdowns on YouTube so you can understand how we work before speaking with us.' },
  { q: 'What makes your approach different?', a: "We don't treat SEO, content, CRO, PLG, AI visibility and paid acquisition as separate activities. We connect them into one full-funnel growth system designed to generate predictable pipeline." },
];
