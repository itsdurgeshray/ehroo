'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { ytEmbed } from '@/lib/site';

type Open = (id: string, opts?: { vertical?: boolean; title?: string }) => void;
const Ctx = createContext<Open>(() => {});
export const useVideoModal = () => useContext(Ctx);

/** One YouTube lightbox for the page (video cards + testimonial videos). Esc, backdrop click and X close it. */
export default function VideoModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ id: string; vertical: boolean; title: string } | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const open = useCallback<Open>((id, opts) => {
    opener.current = document.activeElement as HTMLElement;
    setState({ id, vertical: !!opts?.vertical, title: opts?.title || 'Video' });
  }, []);
  const close = useCallback(() => {
    setState(null);
    opener.current?.focus();
  }, []);

  useEffect(() => {
    if (!state) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [state, close]);

  return (
    <Ctx.Provider value={open}>
      {children}
      {state && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={state.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 md:p-10"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <button
            ref={closeBtn}
            type="button"
            onClick={close}
            aria-label="Close video"
            className="absolute top-4 right-4 md:top-6 md:right-6 size-11 flex items-center justify-center rounded-xl bg-primary border-2 border-black shadow-[3px_3px_0px_#000000] text-black"
          >
            <X className="size-5" />
          </button>
          <div
            className={
              state.vertical
                ? 'h-[min(86vh,820px)] aspect-[9/16] max-w-full rounded-[20px] overflow-hidden bg-black border border-[#F0F6FE]'
                : 'w-full max-w-[1100px] aspect-video rounded-[20px] md:rounded-[35px] overflow-hidden bg-black border border-[#F0F6FE]'
            }
          >
            <iframe
              src={ytEmbed(state.id)}
              title={state.title}
              className="w-full h-full border-0"
              allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
