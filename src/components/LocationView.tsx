import Image from "next/image";
import { Fragment } from "react";
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

// Walking route from the main road, in order, laid out like the PGC arrival guide: a place tag on each photo,
// boxes on the landmarks to look for, and the route arrow. Coordinates are percent of each photo.
const walking = [
  {
    src: "/images/walk-01-main-road.webp", width: 1561, height: 1008,
    tag: "MAIN ROAD", route: "M 46 99 Q 50 82 58 66", boxes: [{ x: 24, y: 27, w: 31, h: 42, label: "TH212" }],
    alt: "Main road with the TH212 complex on the left",
    caption: "01 · Follow the main road until the TH212 complex appears on your left",
  },
  {
    src: "/images/walk-02-building-201-gate.webp", width: 1549, height: 1015,
    tag: "MAIN GATE", route: "M 30 99 Q 41 56 60 -6", boxes: [{ x: 1, y: 36, w: 33, h: 26, label: "201" }],
    alt: "Building 201 main gate of TH212",
    caption: "02 · Pass the Building 201 main gate and keep going straight",
  },
  {
    src: "/images/walk-03-building-204-left.webp", width: 1524, height: 1032,
    tag: "BACK GATE", route: "M 26 99 Q 40 64 58 30", marker: { x: 60, y: 55, label: "PGC" }, boxes: [{ x: 78, y: 45, w: 19, h: 17, label: "CU" }],
    alt: "Building 204 back gate with the CU convenience store on the right",
    caption: "03 · At the Building 204 back gate, opposite the CU store, continue to PGC (Building 205)",
  },
  {
    src: "/images/walk-04-building-205-entrance.webp", width: 1524, height: 1032,
    tag: "PGC ENTRANCE", route: "M 62 97 Q 46 94 40 66", boxes: [{ x: 34, y: 61, w: 8, h: 23 }],
    alt: "Building 205 entrance at TH212 Pangyo",
    caption: "04 · Building 205 entrance: enter 403, then the code, and take the stairs",
  },
  {
    src: "/images/walk-05-entrance-panel.webp", width: 1559, height: 1009,
    tag: "ENTRY", route: "M 79 99 Q 76 80 72 57", boxes: [{ x: 66, y: 50, w: 10, h: 21, label: "Lines 3–4" }],
    alt: "Walkway to the Building 205 lines 3–4 entrance with its entry panel",
    caption: "05 · At the lines 3–4 entrance panel, enter unit 403 and the code",
  },
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
          { label: "Neighborhood", href: "/information/neighborhood", active: false },
        ]}
      />

      {/* Address first (mobile priority), then map */}
      <section className="bg-warm-white py-24 md:py-32">
        <Container className="grid gap-14 md:grid-cols-12">
          <div className="reveal md:col-span-5">
            <SectionLabel>Address</SectionLabel>
            <address className="mt-6 not-italic">
              <p className="font-serif text-[30px] font-light leading-tight md:text-[36px]">Pangyo Global Campus (TH<span className="font-bold">212</span>)</p>
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
                compact "open in Maps" button only. www.google.com is the current host; maps.google.com only redirects there. */}
            <iframe
              title="Map of Pangyo Global Campus (TH212)"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapGoogleKo)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
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
            <h2 className="mt-5 font-serif text-[40px] font-light md:text-[56px]">From Parking to Building <span className="font-bold">205</span></h2>
          </div>
          <ArrivalSteps steps={arrival} />

          <div className="reveal mt-24 md:mt-32">
            <SectionLabel>Arrival</SectionLabel>
            <h2 className="mt-5 font-serif text-[40px] font-light md:text-[56px]">On Foot to Building <span className="font-bold">205</span></h2>
          </div>
          <ArrivalSteps
            steps={walking}
            frame="landscape"
            layout="grid"
            extra={
              <div className="flex w-full flex-col items-center justify-center gap-4 bg-[#5b8fd6] px-6 py-10 text-center text-white">
                <svg viewBox="0 0 48 48" className="size-14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M10 30 L13 19 Q14 16 17 16 L31 16 Q34 16 35 19 L38 30" />
                  <rect x="7" y="30" width="34" height="9" rx="2" />
                  <path d="M12 39 v3 M36 39 v3 M19 12 h10 v4 h-10z M13 34.5 h3 M32 34.5 h3" />
                </svg>
                <p className="text-[0.9rem] uppercase tracking-[0.18em] text-white/85">By Taxi</p>
                <p className="font-serif text-[30px] leading-tight">Incheon Airport → PGC</p>
                {/* Address to show the taxi driver, in English and Korean. */}
                <div className="max-w-[21rem] space-y-1.5 border-y border-white/30 py-3 text-[0.8125rem] leading-snug text-balance text-white/90">
                  {/* Lines break only between address parts, never inside names like "Pangyodaejang-ro". */}
                  <p>
                    {["Building 205,", "TH212,", "25, Pangyodaejang-ro 7-gil,", "Bundang-gu,", "Seongnam-si,", "Gyeonggi-do,", "Republic of Korea"].map((part, i) => (
                      <Fragment key={part}>
                        {i > 0 && " "}
                        <span className="whitespace-nowrap">{part}</span>
                      </Fragment>
                    ))}
                  </p>
                  <p lang="ko">경기도 성남시 분당구 판교대장로7길 25 TH212 205동</p>
                </div>
                <p className="text-[1rem] font-medium">About 80 km · 1 h 30 min</p>
              </div>
            }
          />
        </Container>
      </section>

    </>
  );
}
