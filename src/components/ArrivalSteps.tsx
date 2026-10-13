"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type ArrivalStep = { src: string; alt: string; caption: string; position?: string };

// Parking route steps: one row on wide screens, a swipeable strip (scrolling inside this block only)
// on smaller ones. Photos fill a square frame; `position` keeps each ceiling sign or entrance number in view,
// and the viewer shows the whole photo.
export default function ArrivalSteps({ steps }: { steps: ArrivalStep[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const lastIndex = useRef(0);

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") setActiveIndex((index) => (index === null ? null : (index + steps.length - 1) % steps.length));
      if (event.key === "ArrowRight") setActiveIndex((index) => (index === null ? null : (index + 1) % steps.length));
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, steps.length]);

  // When the viewer closes, return focus to the photo that opened it.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (activeIndex !== null) wasOpen.current = true;
    else if (wasOpen.current) {
      wasOpen.current = false;
      triggers.current[lastIndex.current]?.focus({ preventScroll: true });
    }
  }, [activeIndex]);

  const open = (index: number) => {
    lastIndex.current = index;
    setActiveIndex(index);
  };
  const active = activeIndex === null ? null : steps[activeIndex];

  return (
    <>
      <ol className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 md:-mx-10 md:scroll-px-10 md:px-10 xl:mx-0 xl:grid xl:grid-cols-5 xl:gap-4 xl:overflow-visible xl:px-0">
        {steps.map((step, i) => (
          <li key={step.src} className="w-[78%] shrink-0 snap-start sm:w-[44%] md:w-[34%] lg:w-[26%] xl:w-auto">
            <figure>
              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                onClick={() => open(i)}
                aria-label={`View step ${i + 1} photo larger`}
                className="group block w-full"
              >
                <span className="reveal-img relative block aspect-square overflow-hidden bg-beige" style={{ "--delay": `${i * 100}ms` } as React.CSSProperties}>
                  <Image
                    src={step.src}
                    alt={step.alt}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 34vw, 78vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                    style={{ objectPosition: step.position ?? "50% 50%" }}
                  />
                </span>
              </button>
              <figcaption className="mt-4 text-[0.8125rem] uppercase leading-relaxed tracking-[0.06em] text-warm-gray">{step.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ol>

      {active && activeIndex !== null && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-charcoal/95 p-5 text-white md:p-10">
          <button type="button" aria-label="Close image viewer" onClick={() => setActiveIndex(null)} className="absolute inset-0 cursor-default" />
          <div role="dialog" aria-modal="true" aria-label="Image viewer" className="relative z-10 flex h-full w-full max-w-[1440px] flex-col">
            <div className="flex items-center justify-between gap-4 py-2">
              <p className="text-[13px] uppercase tracking-[0.12em]">{active.caption}</p>
              <button type="button" onClick={() => setActiveIndex(null)} aria-label="Close image viewer" className="grid size-11 shrink-0 place-items-center text-3xl leading-none">
                ×
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <Image src={active.src} alt={active.alt} fill sizes="95vw" className="object-contain" priority />
            </div>
            <p className="py-3 text-center text-[12px] text-white/70">
              {activeIndex + 1} / {steps.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
