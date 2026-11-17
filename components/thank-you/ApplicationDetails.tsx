'use client';

import { useEffect, useState } from 'react';
import { LEAD_STORAGE_KEY } from '@/lib/site';

type Stored = { name?: string; status?: string; details?: { label: string; value: string }[] };

/** "Your application details", personalised from the answers saved by the form (sessionStorage). */
export default function ApplicationDetails() {
  const [data, setData] = useState<Stored | null>(null);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(LEAD_STORAGE_KEY);
      if (raw) setData(JSON.parse(raw) as Stored);
    } catch {
      /* no stored application: section stays hidden */
    }
  }, []);

  const rows = data?.details?.filter((d) => d.value) ?? [];
  if (!rows.length) return null;
  return (
    <div className="mt-6 pt-6 border-t border-black/10">
      <h3 className="text-base font-heading font-semibold text-foreground mb-3">Your application details</h3>
      <dl className="grid gap-2.5">
        {rows.map((d) => (
          <div key={d.label} className="flex flex-col sm:flex-row sm:gap-2 text-sm md:text-base font-heading leading-snug">
            <dt className="font-semibold text-primary-foreground shrink-0">{d.label}:</dt>
            <dd className="text-[#50607E]">{d.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
