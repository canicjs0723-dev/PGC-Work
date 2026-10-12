import Image from "next/image";
import ContactCta from "@/components/ContactCta";
import Hero from "@/components/Hero";
import HomeHighlightsSlider from "@/components/HomeHighlightsSlider";
import SiteLink from "@/components/SiteLink";
import { ArrowLink, Container, SectionLabel } from "@/components/ui";
import { directions, intro, roomUseCases, site } from "@/content/site";

function UseCaseIcon({ title }: { title: string }) {
  const common = {
    className: "size-7 shrink-0 text-warm-gray",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.35,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 32 32",
    "aria-hidden": true as const,
  };

  if (title === "Executive Stay") {
    return <svg {...common}><circle cx="16" cy="10" r="4" /><path d="M7.5 27v-2.2a8.5 8.5 0 0 1 17 0V27z" /></svg>;
  }
  if (title === "Corporate Workshop") {
    return <svg {...common}><rect x="5" y="5" width="22" height="16" rx="1" /><path d="m10 16 4-4 3 2 5-5M16 21v6m-5 0h10" /></svg>;
  }
  if (title === "Partner Meeting") {
    return <svg {...common}><circle cx="11" cy="11" r="3.5" /><circle cx="22" cy="12" r="3" /><path d="M3.5 26v-1.5a7.5 7.5 0 0 1 15 0V26zm16-7a6 6 0 0 1 9 5v2h-6" /></svg>;
  }
  return <svg {...common}><circle cx="16" cy="9" r="3.5" /><circle cx="7" cy="13" r="2.5" /><circle cx="25" cy="13" r="2.5" /><path d="M8 26v-1.5a8 8 0 0 1 16 0V26zm-6 0v-1.5a5 5 0 0 1 5-5m23 6.5v-1.5a5 5 0 0 0-5-5" /></svg>;
}

export default function Home() {
  return (
    <>
      <Hero />

      <section id="about" className="relative overflow-hidden bg-warm-white py-28 md:py-44">
        <svg
          className="pointer-events-none absolute -left-40 top-1/2 hidden size-[640px] -translate-y-1/2 text-line md:block"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.15"
          aria-hidden
        >
          <circle cx="50" cy="50" r="49" />
          <circle cx="50" cy="50" r="36" />
        </svg>
        <Container className="relative grid gap-12 md:grid-cols-12">
          <div className="reveal md:col-span-5 md:col-start-2">
            <SectionLabel>{intro.label}</SectionLabel>
            <h2 className="mt-6 font-serif text-[44px] font-light leading-[1] md:text-[64px]">
              {intro.headline[0]}
              <br />
              {intro.headline[1]}
            </h2>
          </div>
          <div className="reveal md:col-span-5 md:col-start-8 md:pt-16" style={{ "--delay": "150ms" } as React.CSSProperties}>
            <p className="text-[19px] font-medium leading-snug md:text-[21px]">{intro.lead}</p>
            {intro.body.map((body) => (
              <p key={body} className="mt-5 text-[15px] leading-[1.9] text-charcoal/70">
                {body}
              </p>
            ))}
            <div className="mt-12">
              <ArrowLink href="/about">View More</ArrowLink>
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="Our Spaces" className="bg-ivory py-24 md:py-36">
        <Container>
          <div className="reveal text-center">
            <SectionLabel>Our Spaces</SectionLabel>
            <h2 className="mt-5 font-serif text-[40px] font-light leading-[1.02] md:text-[68px]">
              Two Spaces.
              <br />
              One Business Experience.
            </h2>
          </div>

          <HomeHighlightsSlider />
        </Container>
      </section>

      <section className="bg-warm-white py-24 md:py-36">
        <Container>
          <div className="reveal">
            <SectionLabel>Ways to Use PGC</SectionLabel>
            <h2 className="mt-5 max-w-3xl font-serif text-[40px] font-light leading-tight md:text-[60px]">
              Spaces for the way your teams work and stay.
            </h2>
          </div>
          <div className="mt-12 grid gap-x-10 md:mt-16 md:grid-cols-2">
            {roomUseCases.map((useCase, index) => (
              <SiteLink
                key={useCase.title}
                href={useCase.href}
                className="reveal group border-t border-charcoal/20 py-7 md:py-9"
                style={{ "--delay": `${index * 80}ms` } as React.CSSProperties}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <UseCaseIcon title={useCase.title} />
                    <h3 className="font-serif text-[27px] font-light md:text-[32px]">{useCase.title}</h3>
                  </div>
                  <span className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-warm-gray">{useCase.room}</span>
                </div>
                <p className="mt-4 max-w-xl text-[15px] leading-[1.85] text-charcoal/70">{useCase.body}</p>
              </SiteLink>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ivory py-28 md:py-40">
        <Container className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="reveal md:col-span-5">
            <SectionLabel>Location</SectionLabel>
            <h2 className="mt-6 font-serif text-[44px] font-light leading-[0.98] md:text-[64px]">
              Pangyo
              <br />
              Global Campus
            </h2>
            <address className="mt-10 space-y-1 text-[15px] not-italic leading-relaxed">
              <p className="font-medium">{site.address.rooms}</p>
              <p className="text-charcoal/70">
                {site.address.street}
                <br />({site.address.lot}), {site.address.country}
              </p>
            </address>
            <dl className="mt-10 divide-y divide-charcoal/15 border-y border-charcoal/15">
              {directions.map((direction) => (
                <div key={direction.from} className="flex items-baseline justify-between gap-4 py-4 text-[14px]">
                  <dt className="text-charcoal/80">{direction.from}</dt>
                  <dd className="shrink-0 text-right text-warm-gray">
                    {direction.distance} · {direction.time}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[13px] leading-relaxed text-charcoal/65">
              Parking requires pre-registration. Please use the Building 204 side entrance.
            </p>
            <div className="mt-10">
              <ArrowLink href="/information/location">Directions & Parking</ArrowLink>
            </div>
          </div>
          <div className="reveal-img relative aspect-[4/3] self-start overflow-hidden md:col-span-7 md:aspect-auto md:h-full md:min-h-[560px]">
            <Image
              src="/images/campus-aerial.jpg"
              alt="Aerial view of the TH212 Pangyo campus and surrounding forest"
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
