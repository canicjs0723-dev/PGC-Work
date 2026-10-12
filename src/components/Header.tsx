"use client";

import SiteLink from "@/components/SiteLink";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/site";

const LIGHT_PAGES = ["/contact", "/privacy"];

export default function Header() {
  const pathname = usePathname();

  return <HeaderNavigation key={pathname} pathname={pathname} />;
}

function HeaderNavigation({ pathname }: { pathname: string }) {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuOpen = mobileOpen || openMenu !== null;
  const normalizedPathname = pathname.replace(/\/+$/, "");
  const lightPage = LIGHT_PAGES.some((path) => normalizedPathname.endsWith(path));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : previousOverflow;
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  const solid = lightPage || (scrolled && !menuOpen);
  const closeMenus = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "border-b border-line/70 bg-warm-white/90 text-charcoal backdrop-blur-md" : "text-white"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:h-[84px] md:px-10">
        <SiteLink href="/" onClick={closeMenus} className="relative z-10 flex items-center gap-3" aria-label="Pangyo Global Campus home">
          <span className={`grid size-9 place-items-center border font-serif text-[11px] leading-[1.05] ${solid || mobileOpen ? "border-charcoal/60" : "border-white/70"}`}>
            <span className="text-center">
              PG
              <br />C
            </span>
          </span>
          <span className="text-[13px] font-semibold tracking-[0.22em]">PANGYO GLOBAL CAMPUS</span>
        </SiteLink>

        <nav className="hidden lg:block" aria-label="Main">
          <ul className="flex items-center gap-6 xl:gap-8">
            {nav.map((item) => {
              const expanded = openMenu === item.label;
              const active = normalizedPathname.endsWith(item.href) || (item.href === "/information" && (normalizedPathname.includes("/information") || normalizedPathname.endsWith("/guide") || normalizedPathname.endsWith("/location"))) || (item.href === "/business-room" && normalizedPathname.endsWith("/guest-room")) || Boolean(item.children?.some((child) => normalizedPathname.endsWith(child.href.split("#")[0])));
              return (
                <li key={item.label} className="relative">
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() => setOpenMenu(expanded ? null : item.label)}
                        className={`block py-8 text-[11px] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-60 xl:text-[12px] ${
                          active ? "underline decoration-1 underline-offset-8" : ""
                        }`}
                      >
                        {item.label}
                      </button>
                      <div className={`absolute left-1/2 top-full -translate-x-1/2 transition-all duration-200 ${expanded ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}>
                        <ul className="min-w-[240px] bg-warm-white py-3 text-charcoal shadow-[0_20px_40px_-20px_rgba(0,0,0,0.25)]">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <SiteLink href={child.href} onClick={closeMenus} className="block px-6 py-3 text-[13px] text-charcoal/75 transition-colors hover:bg-ivory hover:text-charcoal">
                                {child.label}
                              </SiteLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <SiteLink href={item.href} onClick={closeMenus} className={`block py-8 text-[11px] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-60 xl:text-[12px] ${active ? "underline decoration-1 underline-offset-8" : ""}`}>
                      {item.label}
                    </SiteLink>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className={`relative z-10 -mr-2 flex size-11 flex-col items-center justify-center gap-[6px] lg:hidden ${mobileOpen ? "text-charcoal" : ""}`}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span className={`h-px w-6 bg-current transition-transform duration-300 ${mobileOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-current transition-transform duration-300 ${mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-ivory text-charcoal transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenus();
        }}
      >
        <nav className="flex h-full flex-col justify-between overflow-y-auto px-6 pb-10 pt-24" aria-label="Mobile">
          <ul className="space-y-1">
            {nav.map((item, index) => (
              <li key={item.label} className={mobileOpen ? "fade-up" : ""} style={{ "--delay": `${index * 50}ms` } as React.CSSProperties}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={openMenu === item.label}
                      onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                      className="block w-full py-2 text-left font-serif text-[34px] leading-tight"
                    >
                      {item.label}
                    </button>
                    {openMenu === item.label && (
                      <ul className="mb-4 ml-4 border-l border-line pl-4">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <SiteLink href={child.href} onClick={closeMenus} className="block py-2.5 text-[15px] text-charcoal/75">
                              {child.label}
                            </SiteLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <SiteLink href={item.href} onClick={closeMenus} className="block py-2 font-serif text-[34px] leading-tight">
                    {item.label}
                  </SiteLink>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-end justify-between gap-6">
            <div className="space-y-1 text-[13px] text-warm-gray">
              <p>Building 205, Units 403 & 404</p>
              <p>Pangyo Global Campus (TH212)</p>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
