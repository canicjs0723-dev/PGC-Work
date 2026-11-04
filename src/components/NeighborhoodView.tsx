"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import PageHero from "@/components/PageHero";
import PageTabs from "@/components/PageTabs";
import { Container, SectionLabel } from "@/components/ui";
import { PlaceIcon } from "@/components/PlaceIcon";
import { WalkingMap } from "@/components/WalkingMap";
import { categories, naverMap, type Category, type CategoryKey, type Place } from "@/content/neighborhood";

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
        {place.time && (
          <p className="mt-4 text-[0.875rem] text-charcoal">
            <span className="font-semibold">{place.time}</span>
            {place.distance && <span className="text-charcoal/60"> · {place.distance}</span>}
          </p>
        )}
        {(place.hours || place.note) && (
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-charcoal/60">{[place.hours, place.note].filter(Boolean).join(" · ")}</p>
        )}
        {place.details && (
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-charcoal/10 pt-4 text-[0.8125rem] leading-snug">
            {place.details.map((d) => (
              <div key={d.label} className="contents">
                <dt className="text-[0.6875rem] uppercase leading-[1.6] tracking-[0.14em] text-charcoal/50">{d.label}</dt>
                <dd className="text-charcoal">
                  {d.lines.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        )}
        <div className="min-h-5 flex-1" />
        <a
          href={place.mapUrl ?? naverMap(place.query)}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center gap-2 text-[0.8125rem] uppercase tracking-[0.14em] transition-colors ${
            showMap ? "bg-charcoal py-3 text-white hover:bg-navy" : "self-start border-b border-charcoal/40 pb-0.5 hover:border-charcoal"
          }`}
        >
          Map <span aria-hidden>↗</span>
        </a>
      </div>
    </li>
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
