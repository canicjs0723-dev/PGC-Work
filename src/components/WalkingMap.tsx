import { PlaceIcon } from "@/components/PlaceIcon";
import type { Icon, Place } from "@/content/neighborhood";

// Illustrated "neighborhood guide" map for Everyday Essentials, in an aerial style. North is up. It is
// drawn from Naver Map and keeps the real layout: Building 205 in Pangyo TH212, CU just north-east at the
// corner, the shops past the crossroads, the pharmacy, clinic and GS THE FRESH further south along Pangyo
// Daejang-ro, and the park at the far south by the stream. The footnote says it is not to scale.
// Coordinates are in the SVG's 1600 × 1000 view box. Each place has a pin (where it is), a card (where its
// label sits) and the point on the walking route its dotted spur leaves from, in the same order as the
// places in neighborhood.ts.
const W = 1600;
const H = 1000;
const HOME: [number, number] = [300, 268];
const spots: { pin: [number, number]; card: [number, number]; from: [number, number] }[] = [
  { pin: [628, 196], card: [440, 92], from: [648, 258] }, // CU
  { pin: [952, 384], card: [960, 222], from: [872, 352] }, // Pascucci
  { pin: [1034, 392], card: [1330, 372], from: [952, 384] }, // Tous les Jours
  { pin: [926, 760], card: [650, 850], from: [890, 760] }, // GS THE FRESH
  { pin: [926, 712], card: [1250, 606], from: [900, 712] }, // Pharmacy
  { pin: [848, 724], card: [570, 610], from: [898, 724] }, // Clinic
  { pin: [814, 404], card: [580, 420], from: [872, 380] }, // CleanTopia
  { pin: [1010, 900], card: [1300, 935], from: [870, 880] }, // Park
];

const tint: Record<Icon, string> = {
  store: "#2f6fd6",
  coffee: "#c1652a",
  bakery: "#9a6a3a",
  cart: "#6b46c1",
  pharmacy: "#d6336c",
  clinic: "#138a8a",
  laundry: "#3b5bdb",
  park: "#2f9e44",
  dining: "#b39264",
  shopping: "#b39264",
  culture: "#b39264",
  nature: "#2f9e44",
};

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
const stream = "M 1120 450 C 1060 520 1010 600 1005 680 C 1000 760 1030 820 1010 880 C 995 930 1000 970 1010 1000";

// Blocks (built-up land) drawn over the greenery.
const blocks = [
  "M 120 200 L 640 200 C 650 260 640 300 600 360 C 570 410 560 440 540 480 L 120 490 Z", // Pangyo TH212
  "M 760 0 L 1600 0 L 1600 176 L 880 312 C 790 284 722 252 706 200 C 700 120 734 50 760 0 Z", // Hillstate Pangyo Elpore
  "M 905 362 C 1100 320 1350 270 1600 222 L 1600 578 C 1350 510 1100 455 905 442 Z", // shops past the crossroads
  "M 660 470 C 740 430 800 400 850 372 C 870 420 880 480 880 530 L 660 560 Z", // shops by CleanTopia
  "M 600 610 L 870 580 C 880 700 850 800 850 900 L 600 930 Z", // apartments west of Pangyo Daejang-ro
];

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

// Tree canopy texture: a fixed pseudo-random scatter so every render (and the static export) matches.
const treeGreens = ["#6f9656", "#7da463", "#8bb070", "#5f874a"];
const trees: [number, number, number, string][] = (() => {
  let seed = 205;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: 900 }, (): [number, number, number, string] => [
    Math.round(rand() * W),
    Math.round(rand() * H),
    Math.round(9 + rand() * 11),
    treeGreens[Math.floor(rand() * treeGreens.length)],
  ]);
})();

export function WalkingMap({ places }: { places: Place[] }) {
  const shown = places.slice(0, spots.length);
  return (
    <div className="relative mt-12 hidden aspect-[16/10] overflow-hidden rounded-sm border border-line bg-[#a9bf8b] lg:block">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <filter id="wm-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="5" dy="7" stdDeviation="3" floodColor="#3b3426" floodOpacity="0.35" />
          </filter>
          <radialGradient id="wm-vignette" cx="50%" cy="45%" r="75%">
            <stop offset="60%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#1d2a14" stopOpacity="0.28" />
          </radialGradient>
        </defs>

        {/* Greenery */}
        {trees.map(([cx, cy, r, fill], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={fill} />
        ))}

        {/* Built-up blocks, school and park */}
        {blocks.map((d) => (
          <path key={d} d={d} fill="#e4ddcc" stroke="#cfc6b2" strokeWidth="2" />
        ))}
        <rect x="1140" y="720" width="280" height="140" rx="16" fill="#ddd8c8" stroke="#c9c1ac" strokeWidth="2" />
        <rect x="1170" y="745" width="120" height="90" rx="40" fill="#c4734f" />
        <rect x="1190" y="765" width="80" height="50" rx="24" fill="#8fb36a" />
        <rect x="1310" y="750" width="90" height="34" rx="4" fill="#f6f2ea" filter="url(#wm-shadow)" />
        <rect x="1310" y="800" width="90" height="34" rx="4" fill="#f6f2ea" filter="url(#wm-shadow)" />
        <path d={stream} fill="none" stroke="#87ab69" strokeWidth="70" strokeLinecap="round" />
        <ellipse cx="1012" cy="898" rx="100" ry="62" fill="#9cc37a" stroke="#e9e2cf" strokeWidth="6" />

        {/* Stream */}
        <path d={stream} fill="none" stroke="#4f8fbf" strokeWidth="18" strokeLinecap="round" />
        <path d={stream} fill="none" stroke="#9cc8e6" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.8" />

        {/* Buildings with soft shadows */}
        {buildings.map(([x, y, w, h, r]) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={w}
            height={h}
            rx="3"
            fill="#f7f3eb"
            stroke="#d8cfbd"
            filter="url(#wm-shadow)"
            transform={r ? `rotate(${r} ${x + w / 2} ${y + h / 2})` : undefined}
          />
        ))}

        {/* Roads: casing, surface, centre line */}
        {roads.map(([d, kind]) => (
          <path key={`c-${d}`} d={d} fill="none" stroke="#a9a293" strokeWidth={kind === "main" ? 42 : 24} strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {roads.map(([d, kind]) => (
          <path key={`f-${d}`} d={d} fill="none" stroke={kind === "main" ? "#d9d6cf" : "#e9e6df"} strokeWidth={kind === "main" ? 36 : 19} strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {roads
          .filter(([, kind]) => kind === "main")
          .map(([d]) => (
            <path key={`l-${d}`} d={d} fill="none" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="18 16" />
          ))}

        {/* Walking route and spurs to each place */}
        <g fill="none" strokeLinecap="round">
          <path d={route} stroke="#7a5a12" strokeOpacity="0.35" strokeWidth="11" strokeDasharray="0.1 16" />
          <path d={route} stroke="#f4c542" strokeWidth="8" strokeDasharray="0.1 16" />
          {shown.map((p, i) => (
            <path key={p.name} d={`M ${spots[i].from[0]} ${spots[i].from[1]} L ${spots[i].pin[0]} ${spots[i].pin[1]}`} stroke="#f4c542" strokeWidth="6" strokeDasharray="0.1 13" />
          ))}
        </g>

        {/* Area and road names */}
        <g fontSize="15" letterSpacing="3" fontWeight="600" fill="#4b4636" stroke="#f7f3eb" strokeWidth="4" paintOrder="stroke" className="font-sans">
          <text x="330" y="478" textAnchor="middle">PANGYO TH212</text>
          <text x="1180" y="128" textAnchor="middle">HILLSTATE PANGYO ELPORE</text>
          <text x="1280" y="704" textAnchor="middle">DAEJANG MIDDLE &amp; ELEMENTARY</text>
          <text transform="translate(887 650) rotate(-86)" textAnchor="middle" fill="#6d6655">PANGYO DAEJANG-RO</text>
        </g>

        {/* Leader lines from each label to its pin */}
        {shown.map((p, i) => (
          <line key={p.name} x1={spots[i].card[0]} y1={spots[i].card[1]} x2={spots[i].pin[0]} y2={spots[i].pin[1]} stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2" />
        ))}

        <rect width={W} height={H} fill="url(#wm-vignette)" />

        {/* Compass */}
        <g transform="translate(1540 62)">
          <circle r="36" fill="#ffffff" fillOpacity="0.92" />
          <path d="M 0 -26 L 10 6 L 0 0 L -10 6 Z" fill="#1f1f1f" />
          <text y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1f1f1f" className="font-sans">N</text>
        </g>
      </svg>

      {/* Title */}
      <div className="absolute bottom-[3%] left-[1.75%] w-[23%] rounded-md bg-[#fbf8f1]/95 px-4 py-3.5 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.45)] xl:px-5 xl:py-4">
        <p className="font-serif text-[1.375rem] leading-[1.05] text-[#1f3a2a] xl:text-[1.75rem]">
          Pangyo TH212
          <br />
          Building <span className="text-accent">205</span>
        </p>
        <p className="mt-1.5 text-[0.8125rem] font-medium text-[#1f3a2a]/80 xl:text-[0.9375rem]">Neighborhood Guide</p>
        <p className="mt-2 border-t border-[#1f3a2a]/15 pt-2 text-[0.6875rem] leading-snug text-charcoal/70 xl:text-[0.75rem]">
          Eight everyday places within a twenty-minute walk of Building 205.
        </p>
      </div>

      {/* Pins */}
      {shown.map((p, i) => (
        <span
          key={p.name}
          className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
          style={{ ...pct(spots[i].pin), backgroundColor: tint[p.icon] }}
        />
      ))}

      {/* Building 205 */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={pct(HOME)}>
        <div className="absolute inset-[-14px] rounded-full bg-white/35" />
        <div className="relative grid size-20 place-items-center rounded-full border-4 border-white bg-[#1f3a2a] text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] xl:size-24">
          <span className="text-center">
            <span className="block font-serif text-[1.75rem] leading-none xl:text-[2rem]">205</span>
            <span className="mt-1 block text-[0.625rem] uppercase tracking-[0.2em] text-white/75">PGC</span>
          </span>
        </div>
      </div>

      {/* Labels */}
      {shown.map((p, i) => (
        <div
          key={p.name}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-lg bg-white/95 py-2 pl-2 pr-3 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.5)] xl:gap-3 xl:pr-3.5"
          style={pct(spots[i].card)}
        >
          <span className="relative shrink-0">
            <span className="grid size-9 place-items-center rounded-full text-white xl:size-10" style={{ backgroundColor: tint[p.icon] }}>
              <PlaceIcon icon={p.icon} className="size-5 xl:size-6" strokeWidth={1.8} />
            </span>
            <span
              className="absolute -bottom-1.5 left-1/2 grid size-5 -translate-x-1/2 place-items-center rounded-full border-2 border-white text-[0.625rem] font-bold text-white"
              style={{ backgroundColor: tint[p.icon] }}
            >
              {i + 1}
            </span>
          </span>
          <span className="leading-tight">
            <span className="block text-[0.625rem] font-semibold uppercase tracking-[0.12em] xl:text-[0.6875rem]" style={{ color: tint[p.icon] }}>
              {p.kind.split(" · ")[0]}
            </span>
            <span className="block whitespace-nowrap text-[0.8125rem] font-semibold xl:text-[0.875rem]">{p.name.replace(/ Pangyo Daejang$/, "")}</span>
            <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[#1f3a2a] px-2 py-0.5 text-[0.6875rem] font-medium text-white">
              {p.distance}
              <span className="text-white/40">|</span>
              {p.time?.replace(" walk", "")}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}
