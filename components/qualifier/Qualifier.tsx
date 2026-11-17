'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QUESTIONS, verdictFor, scoreAnswers, isWorkEmail, isValidWebsite, EMAIL_RE, type Answers, type QuestionId } from '@/lib/qualifier';
import { COUNTRY_CODES, isValidPhone, toE164 } from '@/lib/phone';
import { LEAD_STORAGE_KEY } from '@/lib/site';
import { cn } from '@/lib/cn';

/*
 * Lead qualifier in the ehroo.com growth-audit form format (AuditForm): bordered 22px card, logo lockup,
 * "STEP x OF 3" eyebrow, three-segment progress bar (lime = current, blue = done, slate = to do), option cards with
 * a chevron circle, pill back / continue buttons and the centred success-style end state.
 *   Step 1: the six qualification questions (reject answers stop the form)
 *   Step 2: Full Name, Work Email, Phone Number -> Send OTP
 *   Step 3: Enter OTP -> Verify Phone, then Company Name + Company Website -> Continue
 */

type Phase = 'questions' | 'details' | 'verify' | 'reject';
type Field = 'name' | 'email' | 'phone' | 'otp' | 'company' | 'website';

const STEP_LABEL: Record<Exclude<Phase, 'reject'>, string> = {
  questions: 'STEP 1 OF 3 · ABOUT YOUR BUSINESS',
  details: 'STEP 2 OF 3 · BASIC DETAILS',
  verify: 'STEP 3 OF 3 · VERIFY & FINISH',
};
const BARS: Record<Exclude<Phase, 'reject'>, string[]> = {
  questions: ['bg-[#E1FF3B]', 'bg-slate-200', 'bg-slate-200'],
  details: ['bg-accent-foreground', 'bg-[#E1FF3B]', 'bg-slate-200'],
  verify: ['bg-accent-foreground', 'bg-accent-foreground', 'bg-[#E1FF3B]'],
};

const H2 = 'text-2xl md:text-[30px] font-heading font-semibold text-foreground leading-none mb-5.5';
const INPUT =
  'w-full border rounded-[10px] px-4 py-3 text-sm font-heading placeholder:text-black/54 outline-none focus:border-accent-foreground transition-all bg-[#F8F8F8]';
const BACK =
  'py-2.5 px-9 bg-white hover:bg-accent-foreground/5 border border-accent-foreground rounded-full text-accent-foreground transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none';
const SUBMIT =
  'py-2.5 px-9 bg-accent-foreground border border-accent-foreground rounded-full text-white font-heading w-full max-w-56 transition-colors cursor-pointer disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center min-h-[46px]';
const SMALL_PILL =
  'py-2.5 px-6 bg-white hover:bg-accent-foreground/5 border border-accent-foreground rounded-full text-accent-foreground font-heading text-sm whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none min-h-[46px]';

const BackArrow = () => (
  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M10.417 5.208 3.125 12.5l7.292 7.291M3.125 12.5h18.75" stroke="#1359e0" strokeWidth="2.642" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Chevron = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="m6.75 13.5 4.5-4.5-4.5-4.5" stroke="#50607e" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-heading font-medium text-foreground mb-1.5">
      {children}
      <span className="text-red-500">*</span>
    </label>
  );
}
function Help({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <span id={id} className="block text-xs font-heading text-secondary-foreground/70 mt-1.5 leading-relaxed">
      {children}
    </span>
  );
}
function Err({ msg }: { msg?: string }) {
  return msg ? <span className="text-red-500 text-sm font-heading mt-1 block">{msg}</span> : null;
}

export default function Qualifier() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('questions');
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [rejectedBy, setRejectedBy] = useState<QuestionId | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cc, setCc] = useState('+91');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const [busy, setBusy] = useState<'send' | 'verify' | 'submit' | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [demoCode, setDemoCode] = useState<string | null>(null);
  const [resendIn, setResendIn] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const q = QUESTIONS[qIndex];
  const e164 = useMemo(() => toE164(cc, phone), [cc, phone]);

  // Move focus to the new step's heading so keyboard and screen-reader users follow along.
  useEffect(() => {
    cardRef.current?.querySelector<HTMLElement>('[data-step-heading]')?.focus({ preventScroll: true });
  }, [phase, qIndex]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  function pick(value: string) {
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    if (verdictFor(q.id, value) === 'reject') {
      setRejectedBy(q.id);
      setPhase('reject');
      return;
    }
    setTimeout(() => {
      if (qIndex < QUESTIONS.length - 1) setQIndex(qIndex + 1);
      else setPhase('details');
    }, 180);
  }

  function back() {
    setErrors({});
    setFormError(null);
    if (phase === 'reject') {
      setPhase('questions');
      return;
    }
    if (phase === 'verify') return setPhase('details');
    if (phase === 'details') {
      setQIndex(QUESTIONS.length - 1);
      return setPhase('questions');
    }
    if (qIndex > 0) setQIndex(qIndex - 1);
  }

  async function sendOtp(resend = false) {
    setFormError(null);
    setBusy('send');
    try {
      const r = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: e164, resend }),
      });
      const data = (await r.json().catch(() => ({}))) as { ok?: boolean; demo?: boolean; demoCode?: string; error?: string };
      if (!r.ok || !data.ok) {
        setFormError(data.error === 'rate_limited' ? 'Too many attempts. Please wait a minute and try again.' : 'We could not send the code. Please check the number and try again.');
        return false;
      }
      setDemoCode(data.demo ? data.demoCode ?? null : null);
      setResendIn(30);
      return true;
    } catch {
      setFormError('Network error. Please try again.');
      return false;
    } finally {
      setBusy(null);
    }
  }

  async function submitDetails(e: React.FormEvent) {
    e.preventDefault();
    const n: Partial<Record<Field, string>> = {};
    if (!name.trim()) n.name = 'Full name is required';
    if (!email.trim()) n.email = 'Work email is required';
    else if (!EMAIL_RE.test(email.trim())) n.email = 'Please enter a valid email address';
    else if (!isWorkEmail(email.trim())) n.email = 'Please use your company email address';
    if (!isValidPhone(cc, phone)) n.phone = 'Please enter a valid phone number';
    setErrors(n);
    if (Object.keys(n).length) return;
    if (token && e164 === readVerifiedPhone()) return setPhase('verify');
    setToken(null);
    setOtp('');
    if (await sendOtp()) setPhase('verify');
  }

  // A token is only kept for the number it was issued for.
  const verifiedFor = useRef<string | null>(null);
  const readVerifiedPhone = () => verifiedFor.current;

  async function verifyPhone() {
    setFormError(null);
    if (!/^\d{6}$/.test(otp)) {
      setErrors((x) => ({ ...x, otp: 'Enter the 6-digit OTP' }));
      return;
    }
    setErrors((x) => ({ ...x, otp: undefined }));
    setBusy('verify');
    try {
      const r = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: e164, code: otp }),
      });
      const data = (await r.json().catch(() => ({}))) as { verified?: boolean; token?: string; error?: string };
      if (r.ok && data.verified && data.token) {
        setToken(data.token);
        verifiedFor.current = e164;
      } else if (r.ok) {
        setErrors((x) => ({ ...x, otp: 'That code is not right. Check it and try again.' }));
      } else {
        setFormError(data.error === 'rate_limited' ? 'Too many attempts. Please wait a minute and try again.' : 'Verification failed. Please try again.');
      }
    } catch {
      setFormError('Network error. Please try again.');
    } finally {
      setBusy(null);
    }
  }

  async function finish(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      setErrors((x) => ({ ...x, otp: 'Please verify your phone first' }));
      return;
    }
    const n: Partial<Record<Field, string>> = {};
    if (!company.trim()) n.company = 'Company name is required';
    if (!website.trim()) n.website = 'Company website is required';
    else if (!isValidWebsite(website)) n.website = 'Please enter a valid URL';
    setErrors(n);
    if (Object.keys(n).length) return;

    setBusy('submit');
    setFormError(null);
    try {
      const r = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, lead: { answers, name, email, company, website } }),
      });
      const data = (await r.json().catch(() => ({}))) as { ok?: boolean; status?: string; error?: string };
      if (!r.ok || !data.ok) throw new Error(data.error === 'unverified' ? 'Your verification expired. Please verify your phone again.' : 'Failed to submit your application. Please try again.');
      try {
        sessionStorage.setItem(
          LEAD_STORAGE_KEY,
          JSON.stringify({
            name,
            status: data.status ?? scoreAnswers(answers),
            details: QUESTIONS.filter((x) => ['revenue', 'goal', 'investment', 'timeline'].includes(x.id)).map((x) => ({ label: x.summaryLabel, value: answers[x.id] ?? '' })),
          }),
        );
      } catch {
        /* private mode: the thank-you page falls back to generic copy */
      }
      router.push('/thank-you');
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
      setBusy(null);
    }
  }

  const stepPhase = phase === 'reject' ? 'questions' : phase;
  const rejectQ = QUESTIONS.find((x) => x.id === rejectedBy);

  return (
    <div ref={cardRef} className="w-full bg-white border border-black/17 rounded-[22px] p-6 md:p-8 flex flex-col justify-between min-h-120">
      <div className="flex items-center gap-2.5 py-2 mb-6">
        <div className="border border-black/17 rounded-md">
          <img src="/img/logo-mark.png" alt="" className="size-13" />
        </div>
        <span className="text-[30px] font-heading font-bold text-accent-foreground">Ehroo</span>
      </div>

      <div className="mb-6">
        <span className="text-xs font-heading font-medium text-secondary-foreground/70 tracking-wider block mb-3 uppercase">
          {STEP_LABEL[stepPhase]}
        </span>
        <div className="grid grid-cols-3 gap-2" aria-hidden="true">
          {BARS[stepPhase].map((c, i) => (
            <div key={i} className={`h-2.5 rounded transition-all duration-300 ${c}`} />
          ))}
        </div>
      </div>

      {phase === 'questions' && (
        <div className="flex-1 flex flex-col justify-between">
          <fieldset>
            <legend className="sr-only">
              Question {qIndex + 1} of {QUESTIONS.length}
            </legend>
            <span className="block text-xs font-heading font-medium text-accent-foreground tracking-wider mb-2.5 uppercase">
              Question {qIndex + 1} of {QUESTIONS.length}
            </span>
            <h2 data-step-heading tabIndex={-1} className={cn(H2, 'outline-none')}>
              {q.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {q.options.map((o) => {
                const on = answers[q.id] === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={on}
                    onClick={() => pick(o.value)}
                    className={cn(
                      'flex flex-row items-center gap-4 bg-white border border-black/17 rounded-[14px] p-4 text-left cursor-pointer hover:border-accent-foreground transition-all duration-200 group',
                      on && 'border-accent-foreground bg-[#EFF5FF]',
                    )}
                  >
                    <span className="flex-1 text-base font-heading font-semibold text-foreground leading-snug">{o.value}</span>
                    <span className="flex border border-black/17 rounded-full p-2 items-center justify-center shrink-0 group-hover:border-accent-foreground transition-colors">
                      <Chevron />
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
          <div className="flex justify-between items-center gap-3 mt-8">
            {qIndex > 0 ? (
              <button type="button" onClick={back} className={BACK} aria-label="Previous question">
                <BackArrow />
              </button>
            ) : (
              <span />
            )}
            <span className="text-xs font-heading text-secondary-foreground/70">Pick one to continue</span>
          </div>
        </div>
      )}

      {phase === 'details' && (
        <form onSubmit={submitDetails} noValidate className="flex-1 flex flex-col justify-between">
          <div>
            <h2 data-step-heading tabIndex={-1} className={cn(H2, 'outline-none')}>
              Your basic details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="q-name">Full Name</Label>
                <input id="q-name" name="name" autoComplete="name" placeholder="Enter your full name." value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} className={cn(INPUT, errors.name ? 'border-red-500 bg-red-50/10' : 'border-black/17')} />
                <Err msg={errors.name} />
              </div>
              <div>
                <Label htmlFor="q-email">Work Email</Label>
                <input id="q-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} aria-describedby="q-email-help" className={cn(INPUT, errors.email ? 'border-red-500 bg-red-50/10' : 'border-black/17')} />
                <Err msg={errors.email} />
                <Help id="q-email-help">Please use your company email address.</Help>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="q-phone">Phone Number</Label>
                <div className="flex gap-2.5">
                  <select aria-label="Country code" value={cc} onChange={(e) => setCc(e.target.value)} className={cn(INPUT, 'w-auto shrink-0 pr-2 border-black/17')}>
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code + c.name} value={c.code}>
                        {c.code} {c.name}
                      </option>
                    ))}
                  </select>
                  <input id="q-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!errors.phone} aria-describedby="q-phone-help" className={cn(INPUT, errors.phone ? 'border-red-500 bg-red-50/10' : 'border-black/17')} />
                </div>
                <Err msg={errors.phone} />
                <Help id="q-phone-help">
                  We&rsquo;ll send an <span className="font-semibold">OTP verification code</span> to confirm your number.
                </Help>
              </div>
            </div>
          </div>
          <div>
            {formError && <p className="text-red-500 text-sm font-heading mt-4 text-center">{formError}</p>}
            <div className="flex justify-between items-center gap-3 mt-8">
              <button type="button" onClick={back} disabled={!!busy} className={BACK} aria-label="Previous step">
                <BackArrow />
              </button>
              <button type="submit" disabled={!!busy} className={SUBMIT}>
                {busy === 'send' ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          </div>
        </form>
      )}

      {phase === 'verify' && (
        <form onSubmit={finish} noValidate className="flex-1 flex flex-col justify-between">
          <div>
            <h2 data-step-heading tabIndex={-1} className={cn(H2, 'outline-none')}>
              Verify &amp; finish
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="q-otp">Enter OTP</Label>
                {token ? (
                  <div className="flex items-center gap-2.5 rounded-[10px] border border-accent-foreground bg-[#EFF5FF] px-4 py-3 text-sm font-heading text-accent-foreground">
                    <svg width="18" height="18" viewBox="0 0 85 85" fill="none" aria-hidden="true">
                      <rect width="85" height="85" rx="42.5" fill="#1359e0" />
                      <path d="m62.164 26.642-27.038 27.91-12.29-12.687" stroke="#fff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Phone verified ({cc} {phone})
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2.5">
                      <input id="q-otp" name="otp" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="6-digit code" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} aria-invalid={!!errors.otp} aria-describedby="q-otp-help" className={cn(INPUT, 'tracking-[0.3em]', errors.otp ? 'border-red-500 bg-red-50/10' : 'border-black/17')} />
                      <button type="button" onClick={verifyPhone} disabled={busy === 'verify'} className={SMALL_PILL}>
                        {busy === 'verify' ? 'Verifying...' : 'Verify Phone'}
                      </button>
                    </div>
                    <Err msg={errors.otp} />
                    <Help id="q-otp-help">
                      Enter the 6-digit OTP sent to your phone ({cc} {phone}).{' '}
                      {resendIn > 0 ? (
                        <span>Resend in {resendIn}s.</span>
                      ) : (
                        <button type="button" onClick={() => sendOtp(true)} disabled={busy === 'send'} className="text-accent-foreground underline underline-offset-2 cursor-pointer">
                          Resend code
                        </button>
                      )}
                      {demoCode && <span className="block mt-1 text-accent-foreground">Demo mode: use code {demoCode}.</span>}
                    </Help>
                  </>
                )}
              </div>
              <div>
                <Label htmlFor="q-company">Company Name</Label>
                <input id="q-company" name="company" autoComplete="organization" placeholder="Enter your company name." value={company} disabled={!token} onChange={(e) => setCompany(e.target.value)} aria-invalid={!!errors.company} className={cn(INPUT, 'disabled:opacity-50', errors.company ? 'border-red-500 bg-red-50/10' : 'border-black/17')} />
                <Err msg={errors.company} />
              </div>
              <div>
                <Label htmlFor="q-website">Company Website</Label>
                <input id="q-website" name="website" type="url" inputMode="url" autoComplete="url" placeholder="Enter your company website URL." value={website} disabled={!token} onChange={(e) => setWebsite(e.target.value)} aria-invalid={!!errors.website} className={cn(INPUT, 'disabled:opacity-50', errors.website ? 'border-red-500 bg-red-50/10' : 'border-black/17')} />
                <Err msg={errors.website} />
              </div>
            </div>
          </div>
          <div>
            {formError && <p className="text-red-500 text-sm font-heading mt-4 text-center">{formError}</p>}
            <div className="flex justify-between items-center gap-3 mt-8">
              <button type="button" onClick={back} disabled={!!busy} className={BACK} aria-label="Previous step">
                <BackArrow />
              </button>
              <button type="submit" disabled={!!busy || !token} className={SUBMIT}>
                {busy === 'submit' ? 'Submitting...' : 'Continue'}
              </button>
            </div>
          </div>
        </form>
      )}

      {phase === 'reject' && (
        <div className="flex-1 flex flex-col justify-between items-center text-center gap-6">
          <svg width="85" height="85" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="85" height="85" rx="42.5" fill="#eff5ff" />
            <path d="M42.5 38v20" stroke="#1359e0" strokeWidth="5" strokeLinecap="round" />
            <circle cx="42.5" cy="28" r="3.5" fill="#1359e0" />
          </svg>
          <div className="flex flex-col items-center">
            <h2 data-step-heading tabIndex={-1} className="text-lg md:text-xl font-heading font-medium text-black leading-none mb-2 outline-none">
              Thanks for your interest.
            </h2>
            <p className="text-sm md:text-base leading-tight text-[#8C8C8C] font-heading max-w-sm mb-6">
              {rejectQ?.rejectMessage} In the meantime, our free YouTube case studies show exactly how we build growth systems.
            </p>
            <a href="#youtube" className="font-heading font-medium text-accent-foreground underline underline-offset-4">
              Watch the free case studies
            </a>
          </div>
          <button type="button" onClick={back} className="text-sm font-heading text-secondary-foreground/70 underline underline-offset-2 cursor-pointer">
            Change my answer
          </button>
        </div>
      )}
    </div>
  );
}
