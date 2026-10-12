"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Room } from "@/content/rooms";

type GalleryImage = Room["hero"] & { name: string };

export default function RoomGallery({ room }: { room: Room }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const images: GalleryImage[] = [
    { ...room.living, name: "Living lounge" },
    ...room.spaces.map((space) => ({ ...space, name: space.name })),
  ];
  const slideCount = images.length;

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") setActiveIndex((index) => (index === null ? null : (index + images.length - 1) % images.length));
      if (event.key === "ArrowRight") setActiveIndex((index) => (index === null ? null : (index + 1) % images.length));
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, images.length]);

  useEffect(() => {
    if (activeIndex !== null || slideCount < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveSlide((slide) => (slide + 1) % slideCount);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [activeIndex, slideCount]);

  const activeImage = activeIndex === null ? null : images[activeIndex];
  const currentImage = images[activeSlide];

  return (
    <>
      <div aria-label="Room photo gallery" aria-live="off">
        {currentImage && (
          <figure>
            <button
              type="button"
              onClick={() => setActiveIndex(activeSlide)}
              aria-label={`View ${currentImage.name} image larger`}
              className="group block w-full text-left"
            >
              <span className="relative block aspect-[4/3] overflow-hidden bg-beige">
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  fill
                  sizes="(min-width: 768px) 75vw, 100vw"
                  className="object-contain transition-transform duration-700 group-hover:scale-[1.025]"
                  style={{ objectPosition: currentImage.position ?? "50% 50%" }}
                />
              </span>
              <span className="mt-4 block text-[16px] font-medium md:text-[20px]">{currentImage.name}</span>
              <span className="mt-1 block text-[12px] text-warm-gray">{room.name.replace(/^PGC \d+\s*/, "")}</span>
            </button>
          </figure>
        )}

        {slideCount > 1 && (
          <div className="mt-6 flex items-center">
            <div className="flex gap-2" aria-label="Gallery slides">
              {Array.from({ length: slideCount }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show image ${index + 1}`}
                  aria-pressed={activeSlide === index}
                  className={`h-1 w-8 transition-colors ${activeSlide === index ? "bg-charcoal" : "bg-charcoal/20 hover:bg-charcoal/50"}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {activeImage && activeIndex !== null && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-charcoal/95 p-5 text-white md:p-10">
          <button
            type="button"
            aria-label="Close image viewer"
            onClick={() => setActiveIndex(null)}
            className="absolute inset-0 cursor-default"
          />
          <div role="dialog" aria-modal="true" aria-label="Image viewer" className="relative z-10 flex h-full w-full max-w-[1440px] flex-col">
            <div className="flex items-center justify-between py-2">
              <p className="text-[13px] tracking-[0.12em]">{room.name.replace(/^PGC \d+\s*/, "")} · {activeImage.name}</p>
              <button type="button" onClick={() => setActiveIndex(null)} aria-label="Close image viewer" className="grid size-11 place-items-center text-3xl leading-none">
                ×
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="95vw"
                className="object-contain"
                priority
              />
            </div>
            <p className="py-3 text-center text-[12px] text-white/70">{activeIndex + 1} / {images.length}</p>
          </div>
        </div>
      )}
    </>
  );
}
