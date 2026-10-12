import Image from "next/image";
import type { ReactNode } from "react";

export default function PageHero({
  label,
  title,
  subtitle,
  image,
  alt,
  position = "50% 50%",
  tall = false,
}: {
  label: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image: string;
  alt: string;
  position?: string;
  tall?: boolean;
}) {
  return (
    <section
      className={`relative overflow-hidden bg-charcoal text-white ${
        tall ? "h-[92svh] min-h-[600px]" : "h-[72svh] min-h-[520px]"
      }`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="hero-zoom object-cover"
        style={{ objectPosition: position }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/60" />
      <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-16 md:px-10 md:pb-24">
        <p className="fade-up text-[11px] uppercase tracking-[0.36em] text-white/75">{label}</p>
        <h1
          className="fade-up mt-5 font-serif text-[52px] font-light leading-[0.95] md:text-[96px] lg:text-[112px]"
          style={{ "--delay": "150ms" } as React.CSSProperties}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="fade-up mt-6 max-w-xl text-[15px] leading-relaxed text-white/85 md:text-[17px]"
            style={{ "--delay": "300ms" } as React.CSSProperties}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
