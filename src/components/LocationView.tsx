import Image from "next/image";
import ArrivalSteps from "@/components/ArrivalSteps";
import CopyAddressButton from "@/components/CopyAddressButton";
import PageHero from "@/components/PageHero";
import PageTabs from "@/components/PageTabs";
import { Container, SectionLabel } from "@/components/ui";
import { directions, parking, site } from "@/content/site";

const fullAddress = `${site.address.street} (${site.address.lot})`;
const mapSearch = encodeURIComponent(site.mapSearchKo);
// Each link opens that service's place search for the complex name.
const mapLinks = [
  { label: "Naver Map", href: `https://map.naver.com/p/search/${mapSearch}` },
  { label: "Kakao Map", href: `https://map.kakao.com/link/search/${mapSearch}` },
  { label: "Google Maps", href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapGoogleKo)}` },
];

// Parking route steps, in order. `route` draws the direction arrow on each photo (percent coordinates).
const arrival = [
  { src: "/images/parking-204-entrance.jpg", width: 657, height: 438, route: "M 30 95 Q 50 93 51 62", alt: "Building 204 parking entrance", caption: "01 · Building 204 side entrance & parking" },
  { src: "/images/parking-02-turn-right-204-207.jpg", width: 2000, height: 1500, route: "M 40 99 L 40 93 Q 40 87 47 87 L 79 87", alt: "Underground parking sign pointing right to Buildings 204–207", caption: "02 · Turn right toward Buildings 204–207" },
  { src: "/images/parking-03-straight-205-207.jpg", width: 1500, height: 2000, route: "M 62 87 L 62 55", alt: "Parking sign pointing straight ahead to Buildings 205–207", caption: "03 · Continue straight toward Buildings 205–207" },
  { src: "/images/parking-04-right-205-entrances-3-6.jpg", width: 1500, height: 2000, route: "M 38 87 L 38 77 Q 38 71 45 71 L 74 71", alt: "Parking sign pointing right to Building 205, entrances 3–6", caption: "04 · Turn right toward Building 205, entrances 3–6" },
  { src: "/images/parking-05-205-entrances-3-4.jpg", width: 2000, height: 1500, focus: [70, 50] as [number, number], route: "M 38 93 Q 41 60 51 46", alt: "Building 205 entrances 3 and 4 in the underground parking", caption: "05 · Building 205 — entrances 3 & 4" },
];

// Street-level photos from the Building 204 side entrance to the Building 205 lobby.
const toBuilding = [
  { src: "/images/parking-204-entrance.jpg", alt: "Building 204 parking entrance", caption: "01 · Building 204 side entrance & parking" },
  { src: "/images/th212-sign.jpg", alt: "TH212 Pangyo sign near Building 205", caption: "02 · TH212 Pangyo, toward Building 205" },
  { src: "/images/building-205-entrance.webp", alt: "Building 205 lobby entrance", caption: "03 · Building 205 entrance" },
];

export default function LocationView() {
  return (
    <>
      <PageHero
        tall
        label="Information"
        title="Location"
        subtitle={`Location & Directions · Pangyo Global Campus · ${site.address.rooms} · Daejang-dong, Pangyo`}
        image="/images/campus-aerial.jpg"
        alt="Aerial view of the TH212 Pangyo campus"
        position="50% 60%"
      />

      <PageTabs
        label="Information"
        items={[
          { label: "Location", href: "/information/location", active: true },
          { label: "Guide", href: "/information", active: false },
        ]}
      />

      {/* Address first (mobile priority), then map */}
      <section className="bg-warm-white py-24 md:py-32">
        <Container className="grid gap-14 md:grid-cols-12">
          <div className="reveal md:col-span-5">
            <SectionLabel>Address</SectionLabel>
            <address className="mt-6 not-italic">
              <p className="font-serif text-[30px] font-light leading-tight md:text-[36px]">Pangyo Global Campus (TH212)</p>
              <p className="mt-4 text-[16px] font-medium">{site.address.rooms}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-charcoal/70">
                {fullAddress}
                <br />
                {site.address.country}
              </p>
            </address>
            <CopyAddressButton address={`Pangyo Global Campus (TH212), ${fullAddress}`} />
            <div className="mt-8 flex flex-wrap gap-2">
              {mapLinks.map((m) => (
                <a
                  key={m.label}
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-charcoal/25 px-4 py-2.5 text-[13px] transition-colors hover:bg-charcoal hover:text-white"
                >
                  {m.label} ↗
                </a>
              ))}
            </div>

            <h3 className="mt-14 text-[12px] font-semibold uppercase tracking-[0.24em]">Directions</h3>
            <dl className="mt-4 divide-y divide-charcoal/15 border-y border-charcoal/15">
              {directions.map((d) => (
                <div key={d.from} className="flex items-baseline justify-between gap-4 py-4 text-[14px]">
                  <dt>{d.from}</dt>
                  <dd className="shrink-0 text-right text-warm-gray">
                    {d.distance} · {d.time}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[12px] leading-relaxed text-warm-gray">※ Travel times may vary depending on traffic conditions.</p>
          </div>
          <div className="reveal relative aspect-square overflow-hidden bg-beige md:col-span-7 md:aspect-auto md:min-h-[560px]">
            {/* An empty iwloc keeps the place card closed: the map shows the red pin and Google's
                compact "open in Maps" button only. */}
            <iframe
              title="Map of Pangyo Global Campus (TH212)"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapGoogleKo)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              className="absolute inset-0 size-full grayscale-[35%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>

      {/* Parking */}
      <section className="bg-ivory py-24 md:py-32">
        <Container className="grid gap-14 md:grid-cols-12">
          <div className="reveal md:col-span-5">
            <SectionLabel>Parking Guide</SectionLabel>
            <h2 className="mt-5 font-serif text-[40px] font-light leading-none md:text-[56px]">{parking.title}</h2>
            <p className="mt-8 text-[16px] font-medium">{parking.note}</p>
            <p className="mt-3 text-[15px] leading-relaxed text-charcoal/70">
              Please share the following with the host before your visit:
            </p>
            <ul className="mt-5 space-y-2 border-l border-charcoal/20 pl-5 text-[15px]">
              {parking.required.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="mt-8 text-[15px] leading-relaxed text-charcoal/70">{parking.entrance}</p>
          </div>
          <figure className="reveal md:col-span-7">
            <div className="relative aspect-[928/652] overflow-hidden border border-line bg-white">
              <Image
                src="/images/site-map.png"
                alt="TH212 site plan showing the secondary entrance near Building 204 and Building 205"
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-4 text-[13px] text-warm-gray">
              Site plan — ② secondary entrance beside Building 204 · Building 205 at the top left.
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* Arrival route photos */}
      <section className="bg-warm-white py-24 md:py-32">
        <Container>
          <div className="reveal">
            <SectionLabel>Arrival</SectionLabel>
            <h2 className="mt-5 font-serif text-[40px] font-light md:text-[56px]">Finding Building 205</h2>
          </div>
          <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0">
            {toBuilding.map((a, i) => (
              <figure key={a.src} className="w-[80%] shrink-0 snap-start md:w-auto">
                <div className="reveal-img relative aspect-[4/3] overflow-hidden bg-beige" style={{ "--delay": `${i * 120}ms` } as React.CSSProperties}>
                  <Image src={a.src} alt={a.alt} fill sizes="(min-width: 768px) 33vw, 80vw" className="object-cover" />
                </div>
                <figcaption className="mt-4 text-[13px] uppercase tracking-[0.16em] text-warm-gray">{a.caption}</figcaption>
              </figure>
            ))}
          </div>

          <div className="reveal mt-24 md:mt-32">
            <SectionLabel>Arrival</SectionLabel>
            <h2 className="mt-5 font-serif text-[40px] font-light md:text-[56px]">From Parking to Building 205</h2>
          </div>
          <ArrivalSteps steps={arrival} />
        </Container>
      </section>

    </>
  );
}
