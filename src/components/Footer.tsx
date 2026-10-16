import Image from "next/image";
import SiteLink from "@/components/SiteLink";
import { nav, site } from "@/content/site";

export default function Footer() {
  const words = Array.from({ length: 4 });
  return (
    <footer className="bg-warm-white text-charcoal">
      {/* Oversized marquee — the footer as the last visual section */}
      <div className="overflow-hidden border-t border-line py-10 md:py-16" aria-hidden>
        <div className="marquee-track flex w-max whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex">
              {words.map((_, i) => (
                <span key={i} className="px-8 font-serif text-[64px] leading-none tracking-tight md:px-14 md:text-[150px]">
                  PANGYO GLOBAL CAMPUS <span className="text-accent">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-charcoal text-white">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-14 md:px-10 md:py-20">
          <div className="grid gap-12 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-3">
              <SiteLink href="/" aria-label="Pangyo Global Campus, home" className="inline-block">
                <Image src="/images/pgc-logo-2026-white.png" alt="Pangyo Global Campus" width={1422} height={296} className="h-auto w-[150px] md:w-[168px]" />
              </SiteLink>
              <p className="mt-6 max-w-[220px] text-[14px] leading-relaxed text-white/60">{site.tagline}</p>
            </div>

            <address className="space-y-2 text-[14px] not-italic leading-relaxed text-white/70 md:col-span-5">
              <p className="font-medium text-white">Pangyo Global Campus (TH212)</p>
              <p>
                {site.address.street} ({site.address.lot})
                <br />
                {site.address.rooms}
              </p>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 pt-4">
                <dt className="text-white/45">Inquiry</dt>
                <dd><a href={`tel:${site.inquiryPhoneTel}`} className="hover:text-white">T. {site.inquiryPhone}</a></dd>
                <dt className="text-white/45">Management Office</dt>
                <dd><a href={`tel:${site.managementPhoneTel}`} className="hover:text-white">T. {site.managementPhone}</a></dd>
                <dt className="text-white/45">Email</dt>
                <dd className="break-all"><a href={`mailto:${site.inquiryEmail}`} className="hover:text-white">{site.inquiryEmail}</a></dd>
              </dl>
            </address>

            <nav aria-label="Footer" className="md:col-span-3 md:col-start-10">
              <ul className="space-y-3 text-[13px] uppercase tracking-[0.02em]">
                {nav.map((n) => (
                  <li key={n.href}>
                    <SiteLink href={n.href} className="text-white/80 hover:text-white">
                      {n.label}
                    </SiteLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 text-[12px] uppercase tracking-[0.16em] text-white/50 md:flex-row md:justify-between">
            <p>© {new Date().getFullYear()} {site.operator === "RONDA KOREA" ? "RONDA Korea" : site.operator}. All rights reserved.</p>
            <SiteLink href="/privacy" className="hover:text-white">
              Privacy Notice
            </SiteLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
