"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Floor plan of both rooms (403, 404 and their lofts), opened from the room overview.
const plan = { src: "/images/floor-plan-403-404-v2.webp", width: 1310, height: 1200, alt: "Floor plan of rooms 403 and 404, including both lofts" };

export default function SpaceOverview() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // When the viewer closes, return focus to the button that opened it.
  useEffect(() => {
    if (open) wasOpen.current = true;
    else if (wasOpen.current) {
      wasOpen.current = false;
      trigger.current?.focus({ preventScroll: true });
    }
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="group mt-10 inline-flex items-center gap-5 rounded-[4px] bg-charcoal px-7 py-4 text-[0.9375rem] uppercase tracking-[0.12em] text-white transition-colors hover:bg-navy"
      >
        Space Overview
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden>
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-charcoal/90 p-4 md:p-10">
          <button type="button" aria-label="Close space overview" onClick={() => setOpen(false)} className="absolute inset-0 cursor-default" />
          <div role="dialog" aria-modal="true" aria-label="Space overview" className="relative z-10 flex h-full w-full max-w-[1100px] flex-col">
            <div className="flex items-center justify-between gap-4 py-2 text-white">
              <p className="text-[0.8125rem] uppercase tracking-[0.12em]">Space Overview · 403 & 404</p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close space overview" className="grid size-11 shrink-0 place-items-center text-3xl leading-none" autoFocus>
                ×
              </button>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center" style={{ containerType: "size" }}>
              <div
                className="relative overflow-hidden rounded-[4px] bg-white"
                style={{ width: `min(100cqw, ${(plan.width / plan.height) * 100}cqh)`, aspectRatio: `${plan.width} / ${plan.height}` }}
              >
                <Image src={plan.src} alt={plan.alt} fill sizes="(min-width: 1100px) 1100px, 95vw" className="object-contain" priority />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
