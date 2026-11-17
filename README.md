# Ehroo VSL + qualification funnel

Next.js 16 (App Router) + Tailwind v4, built on ehroo.com's own design system: the same shadcn tokens, Fontsource
variable fonts (Bricolage Grotesque, Inter Tight, Inter), tw-animate-css and component class strings as ehroo.com,
so shared components render identically. Copy follows "ehroo sales VSL copy page.pdf".

```bash
npm install
npm run dev        # http://localhost:5208
npm run build
```

`?figma` on any page gives a static import mode (no marquee/autoplay motion, header not sticky).

## Pages
- `/`: hero (offerings + VSL), 4 video cards, client logos, YouTube case studies, featured case studies,
  testimonials, technology partners, pricing, FAQ, qualification form, footer.
- `/thank-you`: application received, details summary, book a strategy call, what happens next.

## Form flow (`components/qualifier/Qualifier.tsx`, rules in `lib/qualifier.ts`)
1. Six questions (revenue, growth goal, investment, decision-maker, timeline, company type). A "Reject" answer stops
   the form with an explanation; "Review" answers continue and are flagged.
2. Full name, work email (free email domains refused), phone, then Send OTP.
3. Enter OTP and press Verify Phone, then company name and website, then Continue. The lead goes to `/api/lead`, which
   re-scores the answers on the server (`status: ok | review | reject`) and forwards them to `LEAD_WEBHOOK_URL`.

## Environment (see `.env.example`)
| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BOOKING_URL` | "Book Your Strategy Call" link (default https://ehroo.com/book-strategy-call) |
| `NEXT_PUBLIC_VSL_YOUTUBE_ID` | Hero video (default `SiRGHaL_yRY`) |
| `NEXT_PUBLIC_PRICING_YOUTUBE_ID` | Pricing video; empty shows a "Coming soon" frame |
| `NEXT_PUBLIC_PRICING_IMAGE` | Pricing screenshot path, e.g. `/img/pricing.png`; empty shows a "Coming soon" frame |
| `OTP_PROVIDER` | `demo` (code 123456, no SMS), `twilio` or `msg91` |
| `OTP_TOKEN_SECRET` | HMAC secret for the verified-phone token (required in production) |
| `TWILIO_*` / `MSG91_*` | Provider credentials |
| `LEAD_WEBHOOK_URL` | Where verified leads are POSTed as JSON |

## Still needed from Ehroo
- Pricing video ID and pricing screenshot.
- Question 2 options ("growth goal"): the PDF skips Q2, so the options in `lib/qualifier.ts` are a draft.
- Reject messages in `lib/qualifier.ts` are drafts (the PDF has none).
- Real OTP provider credentials and the lead webhook.

The previous static build is kept in `legacy-static/` (not served).
