"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import PageHero from "@/components/PageHero";
import PageTabs from "@/components/PageTabs";
import { Container, SectionLabel } from "@/components/ui";
import { categories, naverMap, type Category, type CategoryKey, type Icon, type Place } from "@/content/neighborhood";

// Line icons, drawn on a 24-unit grid.
const iconPaths: Record<Icon, string> = {
  dining: "M7 3v8m-2-8v5a2 2 0 0 0 4 0V3m-2 8v10M17 3c-2 1.5-3 4-3 7h3v11",
  coffee: "M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 3c0 1.5 1 1.5 1 3M12 3c0 1.5 1 1.5 1 3",
  bakery: "M4 14c0-5 3.5-8 8-8s8 3 8 8v2H4zM8 10l1 4M12 9v5M16 10l-1 4M4 19h16",
  store: "M4 9l1.5-5h13L20 9M4 9h16v11H4zM4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0M10 20v-5h4v5",
  cart: "M3 4h2.5l2 11h10.5l2-8H7M9 20a1 1 0 1 0 0-.01M17 20a1 1 0 1 0 0-.01",
  pharmacy: "M6 4h12v16H6zM12 8v8M8 12h8",
  clinic: "M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10zM12 10v5M9.5 12.5h5",
  laundry: "M5 3h14v18H5zM5 7h14M8 5h.01M12 14a3 3 0 1 0 0 .01",
  park: "M12 3l5 7h-3l4 6H6l4-6H7zM12 16v5",
  shopping: "M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2",
  culture: "M3 9l9-5 9 5M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 21h18",
  nature: "M3 20l6-10 4 6 3-4 5 8zM16 7a2 2 0 1 0 0-.01",
};

function PlaceIcon({ icon, className = "size-7" }: { icon: Icon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={iconPaths[icon]} />
    </svg>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

function PlaceCard({ place, index, showMap }: { place: Place; index: number; showMap: boolean }) {
  return (
    <li className="flex flex-col border border-line bg-white">
      {/* Photo slot: the place's photo when one is set, otherwise an icon tile. */}
      <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-beige/70 text-accent">
        {place.photo ? (
          <Image src={place.photo} alt={place.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        ) : (
          <PlaceIcon icon={place.icon} className="size-10" />
        )}
        <span className="absolute left-3 top-3 z-10 bg-charcoal px-2 py-1 text-[0.6875rem] font-medium text-white">{pad(index + 1)}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-[1.375rem] leading-tight">{place.name}</h3>
        <p className="mt-1.5 text-[0.6875rem] uppercase tracking-[0.18em] text-accent">{place.kind}</p>
        <p className="mt-4 text-[0.875rem] text-charcoal">
          <span className="font-semibold">{place.time}</span>
          {place.distance && <span className="text-charcoal/60"> · {place.distance}</span>}
        </p>
        {(place.hours || place.note) && (
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-charcoal/60">{[place.hours, place.note].filter(Boolean).join(" · ")}</p>
        )}
        <a
          href={place.mapUrl ?? naverMap(place.query)}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-5 inline-flex items-center justify-center gap-2 text-[0.8125rem] uppercase tracking-[0.14em] transition-colors ${
            showMap ? "bg-charcoal py-3 text-white hover:bg-navy" : "self-start border-b border-charcoal/40 pb-0.5 hover:border-charcoal"
          }`}
        >
          Map <span aria-hidden>↗</span>
        </a>
      </div>
    </li>
  );
}

// Illustrative walking map: Building 205 in the middle, each place on a dashed path with its walk time.
// Positions are percent of the box and only suggest direction — the footnote says it is not to scale.
const spots: [number, number][] = [
  [17, 40], [50, 11], [83, 24], [85, 54], [80, 84], [50, 89], [19, 72], [20, 13],
];

function WalkingMap({ places }: { places: Place[] }) {
  return (
    <div className="relative mt-12 hidden aspect-[16/8] overflow-hidden border border-line bg-[radial-gradient(circle_at_50%_50%,#efe9de_0%,#e6dccb_55%,#ddd1bd_100%)] md:block">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
        {[16, 30, 44].map((r) => (
          <ellipse key={r} cx="50" cy="50" rx={r} ry={r * 1.6} fill="none" stroke="#b39264" strokeOpacity="0.25" strokeWidth="0.15" vectorEffect="non-scaling-stroke" />
        ))}
        {places.slice(0, spots.length).map((_, i) => (
          <line key={i} x1="50" y1="50" x2={spots[i][0]} y2={spots[i][1]} stroke="#b39264" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-charcoal text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
        <span className="text-center">
          <span className="block font-serif text-[2rem] leading-none">205</span>
          <span className="mt-1 block text-[0.625rem] uppercase tracking-[0.2em] text-white/70">PGC</span>
        </span>
      </div>
      {places.slice(0, spots.length).map((p, i) => (
        <div
          key={p.name}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 bg-white/95 px-3.5 py-2.5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]"
          style={{ left: `${spots[i][0]}%`, top: `${spots[i][1]}%` }}
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-charcoal text-[0.75rem] font-semibold text-white">{i + 1}</span>
          <span className="leading-tight">
            <span className="block text-[0.6875rem] uppercase tracking-[0.14em] text-accent">{p.kind.split(" · ")[0]}</span>
            <span className="block text-[0.875rem] font-semibold">{p.name.replace(/ Pangyo Daejang$/, "")}</span>
            <span className="mt-0.5 block text-[0.75rem] text-charcoal/60">
              {p.distance} · {p.time.replace(" walk", "")}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function Panel({ category, number }: { category: Category; number: number }) {
  const onFoot = category.key === "essentials";
  return (
    <section id={category.key} aria-labelledby={`${category.key}-title`} className="scroll-mt-24 bg-ivory py-20 md:py-28">
      <Container>
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <SectionLabel>{`${pad(number)} · ${category.eyebrow}`}</SectionLabel>
            <h2 id={`${category.key}-title`} className="mt-5 font-serif text-[40px] font-light leading-none md:text-[56px]">
              {category.title}
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-charcoal/70 md:col-span-5 md:col-start-8">{category.intro}</p>
        </div>
        {onFoot && <WalkingMap places={category.places} />}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {category.places.map((p, i) => (
            <PlaceCard key={p.name} place={p} index={i} showMap={category.key === "dining"} />
          ))}
        </ul>
        <p className="mt-8 text-[0.8125rem] text-charcoal/55">※ {category.footnote}</p>
      </Container>
    </section>
  );
}

// The open category lives in the URL hash (#dining, #visit, #essentials) so a section can be shared.
const HASH_EVENT = "neighborhood:hash";
function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener(HASH_EVENT, onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener(HASH_EVENT, onChange);
  };
}

export default function NeighborhoodView() {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash.slice(1), () => "");
  const active: CategoryKey = categories.some((c) => c.key === hash) ? (hash as CategoryKey) : categories[0].key;

  const choose = (key: CategoryKey) => {
    window.history.replaceState(null, "", `#${key}`);
    window.dispatchEvent(new Event(HASH_EVENT));
    document.getElementById("neighborhood-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const index = categories.findIndex((c) => c.key === active);

  return (
    <>
      <PageHero
        tall
        label="Information"
        title="Neighborhood"
        subtitle="Everyday essentials, local dining and places worth visiting — all close to Building 205."
        image="/images/building-205-street.jpg"
        alt="Street outside Building 205 at TH212 Pangyo"
        position="50% 55%"
      />

      <PageTabs
        label="Information"
        items={[
          { label: "Location", href: "/information/location", active: false },
          { label: "Neighborhood", href: "/information/neighborhood", active: true },
        ]}
      />

      <section className="bg-warm-white py-20 md:py-28">
        <Container>
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-6">
              <SectionLabel>Around PGC</SectionLabel>
              <h2 className="mt-5 font-serif text-[40px] font-light leading-none md:text-[56px]">Life Around PGC</h2>
            </div>
            <p className="text-[15px] leading-relaxed text-charcoal/70 md:col-span-5 md:col-start-8">
              Everyday essentials within a short walk, favorite restaurants and cafés a few minutes away by car, and places worth a visit around Seoul — all within easy reach of Building 205.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3" role="tablist" aria-label="Neighborhood categories">
            {categories.map((c, i) => {
              const selected = c.key === active;
              return (
                <button
                  key={c.key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={c.key}
                  onClick={() => choose(c.key)}
                  className={`group flex flex-col border bg-white text-left transition-[border-color,box-shadow] ${
                    selected ? "border-charcoal shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)]" : "border-line hover:border-charcoal/40"
                  }`}
                >
                  <span className="relative block aspect-[16/10] overflow-hidden bg-beige/70">
                    {c.cover ? (
                      <Image
                        src={c.cover}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        style={{ objectPosition: c.coverPosition }}
                      />
                    ) : (
                      <span className="grid size-full place-items-center text-accent">
                        <PlaceIcon icon={c.icon} className="size-12" />
                      </span>
                    )}
                    <span className="absolute left-3 top-3 bg-charcoal px-2.5 py-1 text-[0.75rem] font-medium text-white">{pad(i + 1)}</span>
                  </span>
                  <span className="flex items-end justify-between gap-4 px-5 py-5">
                    <span>
                      <span className="block font-serif text-[1.5rem] leading-tight">{c.label}</span>
                      <span className="mt-1.5 block text-[0.8125rem] text-charcoal/60">{c.sub}</span>
                    </span>
                    <span
                      aria-hidden
                      className={`grid size-9 shrink-0 place-items-center rounded-full border transition-colors ${
                        selected ? "border-charcoal bg-charcoal text-white" : "border-charcoal/25 text-charcoal group-hover:border-charcoal"
                      }`}
                    >
                      {selected ? "↓" : "→"}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      <div id="neighborhood-panel" role="tabpanel" className="scroll-mt-20">
        <Panel category={categories[index]} number={index + 1} />
      </div>
    </>
  );
}
