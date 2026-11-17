import { readVerification } from '@/lib/otp';
import { QUESTIONS, scoreAnswers, isWorkEmail, isValidWebsite, type Answers, type QuestionId } from '@/lib/qualifier';

export const dynamic = 'force-dynamic';

const clip = (v: unknown, n = 300) => (typeof v === 'string' ? v.trim().slice(0, n) : '');

/**
 * POST { lead: { answers, name, email, company, website }, token }.
 * The token from /api/otp/verify proves the phone passed OTP. The server re-scores the answers with the same rules as
 * the form (ok / review / reject), then forwards the lead as JSON to LEAD_WEBHOOK_URL (CRM, Zapier, Make, Sheets...).
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { lead?: Record<string, unknown>; token?: string };
  const phone = readVerification(body.token);
  if (!phone) return Response.json({ error: 'unverified' }, { status: 401 });

  const raw = body.lead ?? {};
  const answers: Answers = {};
  const rawAnswers = (raw.answers && typeof raw.answers === 'object' ? raw.answers : {}) as Record<string, unknown>;
  for (const q of QUESTIONS) {
    const v = rawAnswers[q.id];
    if (typeof v === 'string' && q.options.some((o) => o.value === v)) answers[q.id as QuestionId] = v;
  }

  const name = clip(raw.name, 120);
  const email = clip(raw.email, 200);
  const company = clip(raw.company, 200);
  const website = clip(raw.website, 300);
  if (!name || !isWorkEmail(email) || !company || !isValidWebsite(website)) {
    return Response.json({ error: 'invalid_input' }, { status: 400 });
  }

  const status = scoreAnswers(answers);
  const lead = {
    status, // ok | review | reject
    name,
    email,
    phone,
    phone_verified: true,
    company,
    website,
    answers,
    source: 'ehroo-vsl',
    at: new Date().toISOString(),
  };

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    try {
      const r = await fetch(hook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead), cache: 'no-store' });
      if (!r.ok) console.error('[lead] webhook responded', r.status);
    } catch (err) {
      console.error('[lead] webhook failed', err);
    }
  } else {
    console.info('[lead] LEAD_WEBHOOK_URL not set; lead not forwarded:', { ...lead, phone: '[redacted]', email: '[redacted]' });
  }
  return Response.json({ ok: true, status });
}
