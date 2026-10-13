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

// Parking route steps, in order.
const arrival = [
  { src: "/images/parking-204-entrance.jpg", alt: "Building 204 parking entrance", caption: "01 · Building 204 side entrance & parking" },
  { src: "/images/parking-02-turn-right-204-207.jpg", alt: "Underground parking sign pointing right to Buildings 204–207", caption: "02 · Turn right toward Buildings 204–207" },
  { src: "/images/parking-03-straight-205-207.jpg", alt: "Parking sign pointing straight ahead to Buildings 205–207", caption: "03 · Continue straight toward Buildings 205–207" },
  { src: "/images/parking-04-right-205-entrances-3-6.jpg", alt: "Parking sign pointing right to Building 205, entrances 3–6", caption: "04 · Turn right toward Building 205, entrances 3–6" },
  { src: "/images/parking-05-205-entrances-3-4.jpg", alt: "Building 205 entrances 3 and 4 in the underground parking", caption: "05 · Building 205 — entrances 3 & 4", position: "70% 50%" },
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
            <p className="mt-4 text-[12px] leading-relaxed text-warm-gray">※ Travel times may vary depending on traffic conditions.</p>
          </div>
          <div className="reveal relative aspect-[4/5] overflow-hidden bg-beige md:col-span-7 md:aspect-auto md:min-h-[560px]">
            {/* The embed always opens a place card in its top-left corner; the frame extends 180px above
                the box so only the red pin shows. Google's logo and attribution stay visible at the bottom. */}
            <iframe
              title="Map of Pangyo Global Campus (TH212)"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapGoogleKo)}&z=16&output=embed`}
              className="absolute inset-x-0 bottom-0 h-[calc(100%+180px)] w-full grayscale-[35%]"
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
            <h2 className="mt-5 font-serif text-[40px] font-light md:text-[56px]">Finding Parking for Building 205</h2>
          </div>
          <ArrivalSteps steps={arrival} />
        </Container>
      </section>

    </>
  );
}
