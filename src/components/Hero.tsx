import Image from "next/image";
import { ArrowLink } from "./ui";

export default function Hero() {
  return (
    <section className="relative h-svh min-h-[620px] overflow-hidden bg-charcoal text-white">
      <Image
        src="/images/403-hero.png"
        alt="Business Room lounge at Pangyo Global Campus"
        fill
        priority
        sizes="100vw"
        className="hero-zoom object-cover object-[35%_50%] md:object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/55" />

      <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">
        <p className="fade-up text-[11px] uppercase tracking-[0.4em] text-white/80" style={{ "--delay": "200ms" } as React.CSSProperties}>
          Pangyo Global Campus
        </p>
        <h1
          className="fade-up mt-6 font-serif text-[64px] font-light leading-[0.95] tracking-[-0.01em] sm:text-[88px] lg:text-[128px]"
          style={{ "--delay": "350ms" } as React.CSSProperties}
        >
          <span className="block md:inline">Work.</span> <span className="block md:inline">Stay.</span>{" "}
          <span className="block md:inline">Connect.</span>
        </h1>
        <p
          className="fade-up mt-8 max-w-md text-[15px] leading-relaxed text-white/85 md:text-[17px]"
          style={{ "--delay": "550ms" } as React.CSSProperties}
        >
          Where business meets hospitality.
          <span className="hidden md:inline">
            <br />A premium business residence designed for work, rest and meaningful connections.
          </span>
        </p>
        <div className="fade-up mt-10" style={{ "--delay": "750ms" } as React.CSSProperties}>
          <ArrowLink href="/about" light>
            Discover PGC
          </ArrowLink>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 right-6 hidden flex-col items-center gap-4 md:flex"
        aria-label="Scroll to discover"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">Scroll Down</span>
        <span className="h-16 w-px bg-white/30">
          <span className="scroll-line block h-full w-px bg-white" />
        </span>
      </a>
    </section>
  );
}
