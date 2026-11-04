import type { Place } from "@/content/neighborhood";

// Illustrated walking map for Everyday Essentials. North is up. It is drawn from Naver Map and follows the
// rough layout: Building 205 in Pangyo TH212, CU just north-east at the corner, the shops past the
// crossroads, the pharmacy and GS THE FRESH further south along Pangyo Daejang-ro, and the park at the far
// south by the stream. The footnote says it is not to scale; the shapes are simplified on purpose.
// Coordinates are in the SVG's 1600 × 1000 view box. Each place has a pin (where it is) and a card (where
// its label sits), in the same order as the places in neighborhood.ts.
const W = 1600;
const H = 1000;
const HOME: [number, number] = [300, 268];
const spots: { pin: [number, number]; card: [number, number] }[] = [
  { pin: [628, 196], card: [440, 92] }, // CU
  { pin: [952, 384], card: [960, 222] }, // Pascucci
  { pin: [1034, 392], card: [1330, 372] }, // Tous les Jours
  { pin: [926, 760], card: [600, 830] }, // GS THE FRESH
  { pin: [926, 712], card: [1250, 628] }, // Pharmacy
  { pin: [848, 724], card: [570, 640] }, // Clinic
  { pin: [814, 404], card: [580, 420] }, // CleanTopia
  { pin: [1010, 900], card: [1300, 935] }, // Park
];

const pct = ([x, y]: [number, number]) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

// Roads as [path, kind]. "main" is Pangyo Daejang-ro and the curved road past TH212.
const roads: [string, "main" | "minor"][] = [
  ["M 0 168 C 220 160 450 168 668 172", "minor"],
  ["M 0 548 C 220 540 400 530 520 500 C 640 470 760 390 860 340", "minor"],
  ["M 860 340 C 1000 300 1250 250 1600 196", "minor"],
  ["M 882 432 C 1050 452 1300 520 1600 604", "minor"],
  ["M 895 548 C 800 552 720 566 620 604", "minor"],
  ["M 893 690 C 1000 680 1100 640 1600 528", "minor"],
  ["M 730 0 C 700 80 660 150 662 220 C 665 280 770 300 860 340", "main"],
  ["M 860 340 C 880 430 900 500 895 600 C 890 700 860 780 860 860 C 860 920 830 960 780 1000", "main"],
];

const route = "M 300 268 C 450 264 560 262 645 258 C 700 290 780 308 866 336 C 888 430 908 500 904 600 C 899 700 869 780 869 900";

// Simplified building footprints: [x, y, width, height, rotation].
const buildings: [number, number, number, number, number][] = [
  // Pangyo TH212 (Building 205 and its neighbours)
  [150, 214, 96, 30, 0], [270, 214, 96, 30, 0], [400, 214, 96, 30, 0], [520, 214, 90, 30, 0],
  [150, 300, 96, 30, 0], [400, 300, 96, 30, 0], [520, 296, 90, 30, 0],
  [160, 370, 96, 30, 0], [290, 370, 96, 30, 0], [420, 366, 96, 30, 0],
  [180, 436, 96, 28, 0], [310, 434, 96, 28, 0],
  // Hillstate Pangyo Elpore (north-east)
  [820, 70, 80, 26, -18], [950, 50, 80, 26, -12], [1080, 70, 80, 26, -12], [1210, 46, 80, 26, -8], [1350, 64, 80, 26, -8], [1480, 40, 80, 26, -6],
  [780, 186, 80, 26, -20], [930, 170, 80, 26, -14], [1060, 196, 80, 26, -12], [1350, 150, 80, 26, -8], [1470, 130, 80, 26, -6],
  // Shops past the crossroads
  [930, 404, 40, 26, 8], [985, 412, 40, 26, 8], [1070, 360, 46, 28, -8], [1130, 380, 46, 28, -8], [1200, 330, 46, 28, -8], [1260, 380, 46, 28, -8], [1330, 320, 46, 28, -8], [1400, 380, 46, 28, -8],
  [720, 440, 44, 26, -20], [780, 450, 40, 24, -20], [690, 500, 44, 26, -20],
  // Apartments west of Pangyo Daejang-ro
  [640, 620, 80, 26, -6], [760, 612, 70, 26, -6], [620, 690, 80, 26, -4], [740, 700, 80, 26, -4], [640, 780, 80, 26, -2], [760, 790, 70, 26, -2], [650, 870, 80, 26, 0],
  // Shops beside the pharmacy
  [940, 730, 36, 22, 0], [940, 776, 36, 22, 0],
];

export function WalkingMap({ places }: { places: Place[] }) {
  return (
    <div className="relative mt-12 hidden aspect-[16/10] overflow-hidden border border-line bg-[#f2ede3] lg:block">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
        {/* Blocks */}
        <path d="M 120 200 L 640 200 C 650 260 640 300 600 360 C 570 410 560 440 540 480 L 120 490 Z" fill="#e9e2d5" />
        <path d="M 760 0 L 1600 0 L 1600 176 L 880 312 C 790 284 722 252 706 200 C 700 120 734 50 760 0 Z" fill="#e9e2d5" />
        <path d="M 905 362 C 1100 320 1350 270 1600 222 L 1600 578 C 1350 510 1100 455 905 442 Z" fill="#ece3d3" />
        <path d="M 660 470 C 740 430 800 400 850 372 C 870 420 880 480 880 530 L 660 560 Z" fill="#ece3d3" />
        <path d="M 600 610 L 870 580 C 880 700 850 800 850 900 L 600 930 Z" fill="#e9e2d5" />
        <rect x="1140" y="720" width="280" height="140" rx="16" fill="#e3e4dc" />
        {/* Green */}
        <path d="M 0 590 C 200 575 420 560 540 540 C 580 620 560 780 500 1000 L 0 1000 Z" fill="#dbe6c9" />
        <path d="M 1120 450 C 1060 520 1010 600 1005 680 C 1000 760 1030 820 1010 880 C 995 930 1000 970 1010 1000" fill="none" stroke="#dbe6c9" strokeWidth="110" strokeLinecap="round" />
        <ellipse cx="1012" cy="898" rx="96" ry="58" fill="#c8dbad" />
        {[[960, 880], [990, 860], [1040, 872], [1070, 905], [985, 925], [1035, 930], [950, 912]].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="9" fill="#b2cc93" />
        ))}
        {/* Stream */}
        <path d="M 1120 450 C 1060 520 1010 600 1005 680 C 1000 760 1030 820 1010 880 C 995 930 1000 970 1010 1000" fill="none" stroke="#a9cbe0" strokeWidth="9" strokeLinecap="round" />
        {/* Buildings */}
        {buildings.map(([x, y, w, h, r]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="4" fill="#ddd3c1" transform={r ? `rotate(${r} ${x + w / 2} ${y + h / 2})` : undefined} />
        ))}
        {/* Roads: casing first, then fill */}
        {roads.map(([d, kind]) => (
          <path key={`c-${d}`} d={d} fill="none" stroke="#dacfbb" strokeWidth={kind === "main" ? 38 : 22} strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {roads.map(([d, kind]) => (
          <path key={`f-${d}`} d={d} fill="none" stroke="#ffffff" strokeWidth={kind === "main" ? 32 : 17} strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {/* Walking route */}
        <path d={route} fill="none" stroke="#b08350" strokeWidth="4.5" strokeDasharray="3 11" strokeLinecap="round" />
        <path d="M 648 258 L 636 204" fill="none" stroke="#b08350" strokeWidth="4.5" strokeDasharray="3 11" strokeLinecap="round" />
        {/* Area and road names */}
        <g className="font-sans" fill="#a6977c" fontSize="15" letterSpacing="3">
          <text x="330" y="478" textAnchor="middle">PANGYO TH212</text>
          <text x="1180" y="128" textAnchor="middle">HILLSTATE PANGYO ELPORE</text>
          <text x="1280" y="784" textAnchor="middle">DAEJANG MIDDLE &amp;</text>
          <text x="1280" y="806" textAnchor="middle">ELEMENTARY SCHOOLS</text>
          <text transform="translate(887 650) rotate(-86)" textAnchor="middle" fill="#b9ab92">PANGYO DAEJANG-RO</text>
        </g>
        {/* Leader lines from each label to its pin */}
        {places.slice(0, spots.length).map((p, i) => (
          <line key={p.name} x1={spots[i].card[0]} y1={spots[i].card[1]} x2={spots[i].pin[0]} y2={spots[i].pin[1]} stroke="#1f1f1f" strokeOpacity="0.35" strokeWidth="1.5" />
        ))}
        {/* Compass */}
        <g transform="translate(70 920)">
          <circle r="34" fill="#ffffff" fillOpacity="0.85" stroke="#dacfbb" />
          <path d="M 0 -24 L 9 6 L 0 0 L -9 6 Z" fill="#1f1f1f" />
          <text y="24" textAnchor="middle" fontSize="15" fontWeight="600" fill="#1f1f1f" className="font-sans">N</text>
        </g>
      </svg>

      {/* Pins */}
      {places.slice(0, spots.length).map((p, i) => (
        <span
          key={p.name}
          className="absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-accent shadow-[0_2px_6px_rgba(0,0,0,0.3)]"
          style={pct(spots[i].pin)}
        />
      ))}

      {/* Building 205 */}
      <div
        className="absolute grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-charcoal text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] xl:size-24"
        style={pct(HOME)}
      >
        <span className="text-center">
          <span className="block font-serif text-[1.75rem] leading-none xl:text-[2rem]">205</span>
          <span className="mt-1 block text-[0.625rem] uppercase tracking-[0.2em] text-white/70">PGC</span>
        </span>
      </div>

      {/* Labels */}
      {places.slice(0, spots.length).map((p, i) => (
        <div
          key={p.name}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 bg-white/95 px-3 py-2 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] xl:gap-3 xl:px-3.5 xl:py-2.5"
          style={pct(spots[i].card)}
        >
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-charcoal text-[0.75rem] font-semibold text-white xl:size-8">{i + 1}</span>
          <span className="leading-tight">
            <span className="block text-[0.625rem] uppercase tracking-[0.14em] text-accent xl:text-[0.6875rem]">{p.kind.split(" · ")[0]}</span>
            <span className="block whitespace-nowrap text-[0.8125rem] font-semibold xl:text-[0.875rem]">{p.name.replace(/ Pangyo Daejang$/, "")}</span>
            <span className="mt-0.5 block text-[0.75rem] text-charcoal/60">
              {p.distance} · {p.time?.replace(" walk", "")}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
