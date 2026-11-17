/**
 * Lead qualification questions and rules from "ehroo sales VSL copy page.pdf".
 * Each option is: ok (Qualified), review (manual review, still goes through) or reject (the form stops there).
 * Shared by the form (client) and /api/lead (server), so the server re-scores every submission itself.
 */

export type Verdict = 'ok' | 'review' | 'reject';
export type Option = { value: string; verdict: Verdict };
export type Question = {
  id: QuestionId;
  title: string;
  /** Short label used on the thank-you page ("Your application details"). */
  summaryLabel: string;
  options: Option[];
  /** Shown when a reject option is picked. */
  rejectMessage: string;
};

export type QuestionId = 'revenue' | 'goal' | 'investment' | 'decision' | 'timeline' | 'company';

export const QUESTIONS: Question[] = [
  {
    id: 'revenue',
    title: 'What is your monthly revenue?',
    summaryLabel: 'Monthly Revenue',
    options: [
      { value: '$0-$3,000/month', verdict: 'reject' },
      { value: '$3,000-$10,000/month', verdict: 'reject' },
      { value: '$10,000-$20,000/month', verdict: 'ok' },
      { value: '$20,000-$50,000/month', verdict: 'ok' },
      { value: '$50,000-$100,000/month', verdict: 'ok' },
      { value: '$100,000-$500,000/month', verdict: 'ok' },
      { value: '$500,000+/month', verdict: 'ok' },
    ],
    rejectMessage: 'Our full-funnel growth program is built for companies already doing $10,000+ in monthly revenue, so we would not be the right fit just yet.',
  },
  {
    // Q2 is missing from the PDF; its thank-you summary shows "Growth Goal", so these options are a draft.
    id: 'goal',
    title: 'What is your main growth goal?',
    summaryLabel: 'Growth Goal',
    options: [
      { value: 'Predictable client acquisition', verdict: 'ok' },
      { value: 'More qualified inbound leads', verdict: 'ok' },
      { value: 'Visibility on Google, ChatGPT and AI search', verdict: 'ok' },
      { value: 'Scaling paid acquisition', verdict: 'ok' },
      { value: 'Better conversion and activation', verdict: 'ok' },
    ],
    rejectMessage: '',
  },
  {
    id: 'investment',
    title: 'What is your investment capacity?',
    summaryLabel: 'Investment Capacity',
    options: [
      { value: 'I cannot invest right now', verdict: 'reject' },
      { value: '$1,500-$3,000/month', verdict: 'ok' },
      { value: '$3,000-$5,000/month', verdict: 'ok' },
      { value: '$5,000+/month', verdict: 'ok' },
    ],
    rejectMessage: 'Building a predictable growth engine needs a monthly investment, so it makes sense to talk once you are ready to invest in growth.',
  },
  {
    id: 'decision',
    title: 'Are you the decision-maker for marketing and growth?',
    summaryLabel: 'Decision-maker',
    options: [
      { value: "Yes, I'm the founder/CEO", verdict: 'ok' },
      { value: 'Yes, I make the final decision', verdict: 'ok' },
      { value: 'I influence the decision', verdict: 'review' },
      { value: "No, I'm researching for someone else", verdict: 'reject' },
    ],
    rejectMessage: 'Our strategy calls work best with the person who makes the marketing and growth decisions. Share our case studies with them and have them apply.',
  },
  {
    id: 'timeline',
    title: 'Are you actively looking to invest in growth right now?',
    summaryLabel: 'Timeline',
    options: [
      { value: "Yes, we're ready to start within 30 days", verdict: 'ok' },
      { value: "Yes, we're evaluating options and plan to start within 60 days", verdict: 'ok' },
      { value: "Yes, we're interested but likely to start within 90 days", verdict: 'review' },
      { value: 'Maybe, depending on the strategy and expected ROI', verdict: 'review' },
      { value: '3-6 months', verdict: 'reject' },
      { value: '6+ months / Just researching', verdict: 'reject' },
    ],
    rejectMessage: 'We onboard a limited number of companies each quarter, so we prioritise teams that are ready to start soon. Come back when the timing is right.',
  },
  {
    id: 'company',
    title: 'What type of company do you run?',
    summaryLabel: 'Company Type',
    options: [
      { value: 'B2B SaaS', verdict: 'ok' },
      { value: 'IT / Technology', verdict: 'ok' },
      { value: 'Cybersecurity', verdict: 'ok' },
      { value: 'Other B2B', verdict: 'review' },
      { value: 'B2C / Consumer', verdict: 'reject' },
    ],
    rejectMessage: 'Our growth systems are built for B2B companies, so we are not the right partner for consumer brands.',
  },
];

export type Answers = Partial<Record<QuestionId, string>>;

export function verdictFor(id: QuestionId, value: string | undefined): Verdict | null {
  const q = QUESTIONS.find((x) => x.id === id);
  return q?.options.find((o) => o.value === value)?.verdict ?? null;
}

/** Overall status: any reject wins, then review, else ok. Unanswered or unknown answers count as reject. */
export function scoreAnswers(answers: Answers): Verdict {
  let status: Verdict = 'ok';
  for (const q of QUESTIONS) {
    const v = verdictFor(q.id, answers[q.id]);
    if (!v || v === 'reject') return 'reject';
    if (v === 'review') status = 'review';
  }
  return status;
}

/** Free email domains rejected for "Work Email" ("Please use your company email address."). */
export const FREE_EMAIL_DOMAINS = [
  'gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.in', 'yahoo.in', 'hotmail.com', 'outlook.com', 'live.com',
  'msn.com', 'icloud.com', 'me.com', 'aol.com', 'proton.me', 'protonmail.com', 'rediffmail.com', 'zoho.com', 'gmx.com',
  'yandex.com', 'mail.com',
];

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isWorkEmail = (email: string) =>
  EMAIL_RE.test(email) && !FREE_EMAIL_DOMAINS.includes(email.split('@')[1]?.toLowerCase() ?? '');

/** Same check ehroo.com's audit form uses for websites. */
export const isValidWebsite = (url: string) =>
  /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}/.test(url.trim().replace(/https?:\/\/(www\.)?/, ''));
