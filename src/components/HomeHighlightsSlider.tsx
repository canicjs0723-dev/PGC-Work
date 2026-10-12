"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { homeHighlights } from "@/content/highlights";
import { ArrowLink } from "./ui";

export default function HomeHighlightsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = homeHighlights[activeIndex];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % homeHighlights.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="mt-14 grid min-h-[560px] overflow-hidden bg-charcoal text-white lg:min-h-[640px] lg:grid-cols-2" aria-label="Pangyo Global Campus highlights">
      <div className="relative min-h-[320px] bg-charcoal lg:min-h-[640px]">
        {homeHighlights.map((slide, index) => (
          <Image
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={`object-cover transition-opacity duration-700 ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
            style={{ objectPosition: "50% 50%" }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 lg:bg-gradient-to-r lg:from-black/20 lg:to-transparent" />
      </div>

      <div className="relative flex min-h-[420px] flex-col justify-center bg-charcoal px-7 py-12 sm:px-12 lg:min-h-[640px] lg:px-14 xl:px-20">
        <div className="max-w-xl" aria-live="off">
          <p className="text-[11px] uppercase tracking-[0.4em] text-white/60">{activeSlide.label}</p>
          <h3 className="mt-6 font-serif text-[48px] font-light leading-[0.95] sm:text-[64px] xl:text-[76px]">
            {activeSlide.title}
          </h3>
          <p className="mt-8 text-[18px] font-medium leading-snug sm:text-[21px]">{activeSlide.headline}</p>
          <p className="mt-4 max-w-lg text-[15px] leading-[1.9] text-white/70 sm:text-[16px]">
            {activeSlide.description}
          </p>
          {activeSlide.facts && (
            <p className="mt-6 text-[11px] uppercase tracking-[0.24em] text-white/55">{activeSlide.facts}</p>
          )}
          <div className="mt-10">
            <ArrowLink href={activeSlide.href} light>
              {activeSlide.linkLabel}
            </ArrowLink>
          </div>
        </div>

        <div className="mt-10 flex gap-3 lg:absolute lg:right-8 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:flex-col" aria-label="Choose a highlight">
          {homeHighlights.map((slide, index) => (
            <button
              key={slide.label}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${slide.label}`}
              aria-pressed={activeIndex === index}
              className={`size-2 rounded-full transition-colors ${activeIndex === index ? "bg-white" : "bg-white/35 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
