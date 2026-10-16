import Image from "next/image";
import SiteLink from "@/components/SiteLink";
import PageHero from "./PageHero";
import PageTabs from "./PageTabs";
import RoomGallery from "./RoomGallery";
import SpaceOverview from "./SpaceOverview";
import { ArrowIcon, Container, SectionLabel } from "./ui";
import type { Room } from "@/content/rooms";

function RoomFactIcon({ label }: { label: string }) {
  const common = {
    className: "size-10 shrink-0 text-warm-gray md:size-12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
  };

  if (label.toLowerCase().includes("guest")) {
    return <svg {...common}><circle cx="12" cy="7" r="3" /><path d="M5.5 20v-2a6.5 6.5 0 0 1 13 0v2z" /></svg>;
  }
  if (label.toLowerCase().includes("bed")) {
    return <svg {...common}><path d="M3 19v-9m18 9v-5a3 3 0 0 0-3-3H3m0 4h18M7 11V8h4a3 3 0 0 1 3 3" /></svg>;
  }
  return <svg {...common}><path d="M4 7h16v13H4zM4 11h16M8 7V4m8 3V4m-8 7v2m8-2v2" /></svg>;
}

// Literal class names so Tailwind generates them; one column per fact.
const factColumns: Record<number, string> = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3" };

export default function RoomPage({ room, other }: { room: Room; other: Room }) {
  const warm = room.slug === "guest-room";
  const title = room.name.replace(/^PGC \d+\s*/, "");

  return (
    <>
      <PageHero
        tall
        label="Rooms"
        title={title}
        subtitle={room.tagline}
        image={room.hero.src}
        alt={room.hero.alt}
        position={room.hero.position}
      />

      <PageTabs
        label="Rooms"
        items={[room, other]
          .sort((a, b) => (a.slug < b.slug ? -1 : 1))
          .map((r) => ({ label: r.name.replace(/^PGC \d+\s*/, ""), href: `/${r.slug}`, active: r.slug === room.slug }))}
      />

      {/* Intro + key facts */}
      <section className={`${warm ? "bg-ivory" : "bg-warm-white"} pt-24 pb-[59px] md:pt-36 md:pb-[86px]`}>
        <Container className="grid gap-14 md:grid-cols-12">
          <div className="reveal md:col-span-5">
            <SectionLabel tight>Overview</SectionLabel>
            {room.overview ? (
              <>
                <h2 className="mt-8 font-serif text-[30px] font-light leading-tight md:text-[40px]">
                  {room.overview.headline.map((line, i) => (
                    <span key={line} className="block">
                      {line}
                      {i < room.overview!.headline.length - 1 && " "}
                    </span>
                  ))}
                </h2>
                <p className="mt-6 text-[15px] leading-relaxed text-charcoal/70">{room.overview.sub}</p>
              </>
            ) : (
              <ul className="mt-8 space-y-1">
                {room.purpose?.map((p) => (
                  <li key={p} className="font-serif text-[30px] font-light leading-tight md:text-[40px]">
                    {p}
                  </li>
                ))}
              </ul>
            )}
            <SpaceOverview />
          </div>
          <div className="reveal md:col-span-6 md:col-start-7" style={{ "--delay": "120ms" } as React.CSSProperties}>
            {room.description.map((d) => (
              <p key={d} className="mb-5 text-[16px] leading-[1.9] text-charcoal/75">
                {d}
              </p>
            ))}
            <dl className={`mt-10 grid border-y border-charcoal/15 ${factColumns[room.facts.length] ?? "grid-cols-3"}`}>
              {room.facts.map((f) => (
                <div key={f.label} className="flex flex-col items-center justify-center py-6">
                  <div className="flex items-center justify-center gap-3">
                    <RoomFactIcon label={f.label} />
                    <dd className="font-serif text-[44px] font-light leading-none md:text-[56px]">{f.value}</dd>
                  </div>
                  <dt className="mt-2 text-[11px] uppercase tracking-[0.24em] text-warm-gray">{f.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className={`${warm ? "bg-ivory" : "bg-warm-white"} pt-[58px] pb-20 md:pt-[85px] md:pb-28`}>
        <Container className="grid gap-10 md:grid-cols-12">
          <div className="reveal md:col-span-4">
            <SectionLabel tight>Ways to Use PGC</SectionLabel>
            <h2 className="mt-5 font-serif text-[40px] font-light leading-none md:text-[56px]">
              {room.name}
            </h2>
          </div>
          <p className="reveal text-[16px] leading-[1.9] text-charcoal/75 md:col-span-6 md:col-start-7 md:pt-4">
            {room.experience}
          </p>
        </Container>
      </section>

      {/* Practical room uses */}
      <section className="bg-charcoal py-20 text-white md:py-28">
        <Container className="grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/15">
          {room.keywords.map((k, i) => (
            <div
              key={k.title}
              className="reveal md:px-10 md:first:pl-0"
              style={{ "--delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <p className="font-serif text-[13px] text-white/50">0{i + 1}</p>
              <h3 className="mt-3 text-[15px] font-semibold uppercase tracking-[0.26em]">{k.title}</h3>
              <p className="mt-3 text-[15px] text-white/70">{k.body}</p>
            </div>
          ))}
        </Container>
      </section>

      {/* Room gallery and title remain side by side on larger screens. */}
      <section className={`${warm ? "bg-ivory" : "bg-warm-white"} py-24 md:py-36`}>
        <Container className="grid items-start gap-10 md:grid-cols-12 md:gap-12">
          <div className="reveal md:col-span-3">
            <SectionLabel tight>Spaces</SectionLabel>
            <h2 className="mt-5 font-serif text-[40px] font-light md:text-[56px]">Inside the Room</h2>
            <p className="mt-4 text-[14px] text-charcoal/65">Click an image to view it larger.</p>
          </div>
          <div className="md:col-span-9">
            <RoomGallery room={room} />
          </div>
        </Container>
      </section>

      {/* Amenities */}
      <section className="bg-beige/60 py-24 md:py-32">
        <Container className="grid gap-12 md:grid-cols-12">
          <div className="reveal md:col-span-4">
            <SectionLabel tight>In-Room Amenities</SectionLabel>
            <h2 className="mt-5 font-serif text-[40px] font-light leading-none md:text-[52px]">
              Everything
              <br />
              You Need.
            </h2>
            <p className="mt-6 text-[14px] leading-relaxed text-charcoal/70">
              Wi-Fi is available. Connection details are shared privately with confirmed guests.
            </p>
          </div>
          <ul className="reveal grid grid-cols-2 gap-x-6 gap-y-3 self-start md:col-span-8 md:grid-cols-3">
            {room.amenities.map((amenity) => (
              <li key={amenity} className="py-3 text-[15px] text-charcoal/85">
                {amenity}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Other room — horizontal card */}
      <section aria-label="Other room" className="bg-charcoal py-16 text-white md:py-24">
        <Container>
          <SiteLink
            href={`/${other.slug}`}
            className="group grid overflow-hidden border border-white/15 md:grid-cols-12"
          >
            <div className="relative aspect-[4/3] md:col-span-7 md:aspect-auto md:min-h-[460px]">
              <Image
                src={other.hero.src}
                alt={other.hero.alt}
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.03]"
                style={{ objectPosition: other.hero.position }}
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:col-span-5 md:p-14">
              <p className="text-[12px] uppercase tracking-[0.3em] text-accent">Next Space</p>
              <h2 className="mt-5 font-serif text-[36px] font-light leading-[1.05] md:text-[48px]">
                {other.name.replace(/^PGC \d+\s*/, "")}
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-white/70">{other.tagline}</p>
              <span className="mt-10 inline-flex items-center gap-4 font-serif text-[18px] italic">
                View {other.name.replace(/^PGC \d+\s*/, "")}
                <ArrowIcon className="size-6 transition-transform duration-500 group-hover:translate-x-2" />
              </span>
            </div>
          </SiteLink>
        </Container>
      </section>
    </>
  );
}
