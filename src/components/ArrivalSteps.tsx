"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

export type ArrivalStep = {
  src: string;
  alt: string;
  caption: string;
  /** Natural size of the photo, used to keep the route overlay aligned with it. */
  width: number;
  height: number;
  /** Crop focus in the square frame, as percentages of the photo (default centre). */
  focus?: [number, number];
  /** Route arrow as an SVG path using M / L / Q with coordinates in percent of the photo, before the floor tilt. */
  route?: string;
};

// Converts a percent-based path ("M 40 90 L 40 70") into the photo's pixel space.
function toPixels(route: string, width: number, height: number) {
  let axis = 0;
  return route.replace(/-?\d+(\.\d+)?/g, (n) => String(((axis++ % 2 === 0 ? width : height) * Number(n)) / 100));
}

// Vertical squash applied around the arrow's starting point so it reads as lying on the floor.
const TILT = 0.55;

// The photo with its direction arrow drawn on top (white outline + amber stroke), sharing one coordinate box.
function RouteOverlay({ step }: { step: ArrivalStep }) {
  const id = useId();
  if (!step.route) return null;
  const d = toPixels(step.route, step.width, step.height);
  const originY = Number(d.match(/-?\d+(\.\d+)?/g)?.[1] ?? 0);
  // Thicker stroke offsets part of the squash so the flattened arrow keeps its weight.
  const stroke = (Math.min(step.width, step.height) * 0.032) / Math.sqrt(TILT);
  return (
    <svg viewBox={`0 0 ${step.width} ${step.height}`} className="route-overlay pointer-events-none absolute inset-0 size-full" aria-hidden>
      <defs>
        <marker id={`${id}-head`} viewBox="0 0 4 4" refX="1.4" refY="2" markerWidth="2.6" markerHeight="2.6" orient="auto">
          <path d="M0 0 L4 2 L0 4 Z" fill="#f5a800" />
        </marker>
        <marker id={`${id}-edge`} viewBox="0 0 4 4" refX="1.4" refY="2" markerWidth="2.6" markerHeight="2.6" orient="auto">
          <path d="M0 0 L4 2 L0 4 Z" fill="#ffffff" />
        </marker>
      </defs>
      <g transform={`translate(0 ${originY}) scale(1 ${TILT}) translate(0 ${-originY})`}>
        <path d={d} fill="none" stroke="#ffffff" strokeWidth={stroke * 1.6} strokeLinecap="round" strokeLinejoin="round" markerEnd={`url(#${id}-edge)`} />
        <path d={d} fill="none" stroke="#f5a800" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" markerEnd={`url(#${id}-head)`} />
      </g>
    </svg>
  );
}

// Positions the photo-sized box inside a frame of `frameRatio` (width / height) the way object-fit: cover
// would, honouring `focus`.
function coverBox({ width, height, focus = [50, 50] }: ArrivalStep, frameRatio: number): React.CSSProperties {
  const ratio = width / height / frameRatio;
  return ratio >= 1
    ? { top: 0, height: "100%", width: `${ratio * 100}%`, left: `${-(ratio - 1) * focus[0]}%` }
    : { left: 0, width: "100%", height: `${100 / ratio}%`, top: `${-(1 / ratio - 1) * focus[1]}%` };
}

// "square" crops each photo to a square tile; "landscape" uses a 3:2 tile so landscape photos show almost whole.
const frames = {
  square: { ratio: 1, className: "aspect-square" },
  landscape: { ratio: 3 / 2, className: "aspect-[3/2]" },
};

// Parking route steps: one row on wide screens, a swipeable strip (scrolling inside this block only)
// on smaller ones. Each photo fills a square frame with its direction arrow; the viewer shows the whole photo.
export default function ArrivalSteps({ steps, frame = "square" }: { steps: ArrivalStep[]; frame?: keyof typeof frames }) {
  const tile = frames[frame];
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
          <li key={step.src} className="flex w-[78%] shrink-0 snap-start sm:w-[44%] md:w-[34%] lg:w-[26%] xl:w-auto">
            <figure className="flex w-full flex-col">
              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                onClick={() => open(i)}
                aria-label={`View step ${i + 1} photo larger`}
                className="group block w-full"
              >
                <span className={`reveal-img relative block overflow-hidden bg-beige ${tile.className}`} style={{ "--delay": `${i * 100}ms` } as React.CSSProperties}>
                  <span className="absolute block transition-transform duration-700 group-hover:scale-[1.025]" style={coverBox(step, tile.ratio)}>
                    <Image src={step.src} alt={step.alt} fill sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
                    <RouteOverlay step={step} />
                  </span>
                </span>
              </button>
              <figcaption className="flex-1 bg-charcoal px-3 py-3 text-[calc(0.78rem+2pt)] uppercase leading-relaxed tracking-[0.03em] text-white/90">{step.caption}</figcaption>
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
            <div className="flex min-h-0 flex-1 items-center justify-center" style={{ containerType: "size" }}>
              <div
                className="relative"
                style={{ width: `min(100cqw, ${(active.width / active.height) * 100}cqh)`, aspectRatio: `${active.width} / ${active.height}` }}
              >
                <Image src={active.src} alt={active.alt} fill sizes="95vw" className="object-cover" priority />
                <RouteOverlay step={active} />
              </div>
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
