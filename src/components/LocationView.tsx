import Image from "next/image";
import CopyAddressButton from "@/components/CopyAddressButton";
import PageHero from "@/components/PageHero";
import PageTabs from "@/components/PageTabs";
import { Container, SectionLabel } from "@/components/ui";
import { directions, parking, site } from "@/content/site";

const fullAddress = `${site.address.street} (${site.address.lot})`;
const mapAddress = encodeURIComponent(site.mapAddressKo);
// Google Maps URLs accept an address as the directions origin. Naver and Kakao only take an origin as
// coordinates, which are not verified here, so they open a search for the exact address instead.
const mapLinks = [
  { label: "Naver Map", href: `https://map.naver.com/p/search/${mapAddress}` },
  { label: "Kakao Map", href: `https://map.kakao.com/link/search/${mapAddress}` },
  { label: "Google Maps", href: `https://www.google.com/maps/dir/?api=1&origin=${mapAddress}` },
];

const arrival = [
  { src: "/images/parking-204-entrance.jpg", alt: "Building 204 parking entrance", caption: "01 · Building 204 side entrance & parking" },
  { src: "/images/th212-sign.jpg", alt: "TH212 Pangyo sign near Building 205", caption: "02 · TH212 Pangyo, toward Building 205" },
  { src: "/images/building-205-entrance.jpg", alt: "Building 205 lobby entrance", caption: "03 · Building 205 entrance" },
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
          { label: "Guide", href: "/information", active: false },
          { label: "Location", href: "/information/location", active: true },
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
          </div>
          <div className="reveal relative aspect-square overflow-hidden bg-beige md:col-span-7 md:aspect-auto md:min-h-[560px]">
            <iframe
              title="Map of Pangyo Global Campus (TH212)"
              src={`https://maps.google.com/maps?q=${mapAddress}&z=15&output=embed`}
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
            {arrival.map((a, i) => (
              <figure key={a.src} className="w-[80%] shrink-0 snap-start md:w-auto">
                <div className="reveal-img relative aspect-[4/3] overflow-hidden bg-beige" style={{ "--delay": `${i * 120}ms` } as React.CSSProperties}>
                  <Image src={a.src} alt={a.alt} fill sizes="(min-width: 768px) 33vw, 80vw" className="object-cover" />
                </div>
                <figcaption className="mt-4 text-[13px] uppercase tracking-[0.16em] text-warm-gray">{a.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

    </>
  );
}
