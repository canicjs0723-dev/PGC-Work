import SiteLink from "@/components/SiteLink";
import type { ReactNode } from "react";

export function SectionLabel({ children, light = false, tight = false }: { children: ReactNode; light?: boolean; tight?: boolean }) {
  return (
    <p
      className={`text-[11px] font-medium uppercase ${tight ? "tracking-[0.12em]" : "tracking-[0.32em]"} ${
        light ? "text-white/70" : "text-warm-gray"
      }`}
    >
      {children}
    </p>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// "View More ⟶" with a circular arrow, as in the reference layout.
export function ArrowLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <SiteLink
      href={href}
      className={`group inline-flex items-center gap-4 font-serif text-[17px] italic ${
        light ? "text-white" : "text-charcoal"
      }`}
    >
      <span>{children}</span>
      <span
        className={`grid size-11 place-items-center rounded-full transition-transform duration-500 group-hover:translate-x-1 ${
          light ? "border border-white/60" : "bg-charcoal text-white"
        }`}
      >
        <ArrowIcon className="size-4" />
      </span>
    </SiteLink>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 md:px-10 ${className}`}>{children}</div>;
}
