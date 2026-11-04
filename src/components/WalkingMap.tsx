import { PlaceIcon } from "@/components/PlaceIcon";
import type { Icon, Place } from "@/content/neighborhood";

// Illustrated "neighborhood guide" map for Everyday Essentials, in an aerial style. North is up. The layout is
// traced from a Naver Map overview of Daejang-dong: a long valley of housing between wooded hills, the
// Yongin–Seoul Expressway along the west, Pangyo TH212 (Building 205) at the north-west corner with CU beside
// it, the shops at the first crossroads, the stream and middle school to the east, and the pharmacy, clinic,
// GS THE FRESH and the park further south. The footnote says it is not to scale.
//
// Shapes are written in the overview's pixel coordinates and mapped into the 1600 × 1000 view box by `at`,
// which stretches west–east a little so the labels have room.
const W = 1600;
const H = 1000;
type Pt = [number, number];
const at = ([ox, oy]: Pt): Pt => [800 + 2.5 * (ox - 250), 30 + 2.3 * (oy - 150)];

// Smooth open path through points (Catmull–Rom as cubic Béziers).
function smooth(points: Pt[]): string {
  const p = points.map(at);
  let d = `M ${p[0][0]} ${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p3 = p[i + 2] ?? p[i + 1];
    const c1: Pt = [p[i][0] + (p[i + 1][0] - p0[0]) / 6, p[i][1] + (p[i + 1][1] - p0[1]) / 6];
    const c2: Pt = [p[i + 1][0] - (p3[0] - p[i][0]) / 6, p[i + 1][1] - (p3[1] - p[i][1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p[i + 1][0].toFixed(1)} ${p[i + 1][1].toFixed(1)}`;
  }
  return d;
}
const polygon = (points: Pt[]) => `M ${points.map((q) => at(q).map((n) => n.toFixed(1)).join(" ")).join(" L ")} Z`;

const HOME = at([178, 186]);

// Each place: its pin (overview coordinates) and where its label card sits (view-box coordinates), in the
// same order as the places in neighborhood.ts.
const spots: { pin: Pt; card: Pt }[] = [
  { pin: [226, 162], card: [1010, 66] }, // CU
  { pin: [275, 243], card: [1190, 168] }, // Pascucci
  { pin: [289, 244], card: [1330, 290] }, // Tous les Jours
  { pin: [263, 426], card: [600, 740] }, // GS THE FRESH
  { pin: [263, 411], card: [1170, 680] }, // Pharmacy
  { pin: [245, 418], card: [560, 590] }, // Clinic (not on the overview; placed beside the pharmacy)
  { pin: [264, 250], card: [540, 455] }, // CleanTopia
  { pin: [289, 550], card: [1190, 940] }, // Park
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

const pct = ([x, y]: Pt) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

// The built-up valley floor, and the blocks on it ("apt" towers, "town" townhouses, "shop" low buildings).
const valley = polygon([
  [135, 148], [232, 140], [236, 60], [300, 28], [372, 68], [388, 150], [420, 190], [372, 225], [335, 250], [325, 290],
  [395, 295], [470, 325], [472, 425], [415, 440], [465, 465], [465, 535], [395, 545], [395, 590], [300, 598], [250, 612],
  [198, 590], [192, 520], [200, 460], [212, 350], [225, 300], [205, 252], [135, 222],
]);
const blocks: [Pt[], "apt" | "town" | "shop"][] = [
  [[[140, 152], [232, 150], [236, 215], [205, 236], [140, 218]], "town"], // Pangyo TH212
  [[[246, 172], [300, 160], [362, 192], [340, 214], [282, 240], [252, 228]], "apt"], // Hillstate Pangyo Elpore
  [[[238, 140], [240, 62], [300, 32], [368, 72], [380, 140], [350, 132], [325, 118], [268, 118]], "apt"], // north
  [[[236, 244], [298, 228], [330, 252], [305, 282], [258, 300], [232, 280]], "shop"], // shops at the crossroads
  [[[208, 300], [248, 300], [248, 462], [206, 462], [198, 390]], "apt"], // west of Pangyo Daejang-ro
  [[[322, 300], [400, 300], [468, 330], [468, 420], [405, 432], [350, 420], [338, 370]], "apt"], // Harrington Place
  [[[355, 478], [460, 478], [460, 530], [398, 540], [356, 520]], "apt"], // The Sharp Pangyo Forest
  [[[298, 482], [348, 482], [392, 540], [392, 585], [312, 590], [298, 540]], "apt"], // south-east
  [[[202, 480], [248, 480], [248, 598], [206, 588], [196, 520]], "shop"], // south, by GS THE FRESH
];
const school = { a: at([296, 300]), b: at([330, 360]) };

// Roads as [points, kind].
const roads: [Pt[], "highway" | "main" | "minor"][] = [
  [[[165, 40], [150, 120], [130, 200], [115, 300], [104, 400], [98, 480], [95, 560], [97, 640]], "highway"],
  [[[138, 160], [190, 158], [232, 163]], "minor"],
  [[[232, 163], [238, 128], [268, 112], [322, 116], [352, 150], [368, 205]], "minor"],
  [[[368, 205], [395, 180], [420, 120], [440, 40]], "minor"],
  [[[252, 262], [300, 240], [340, 222], [368, 205]], "minor"],
  [[[268, 268], [305, 300], [330, 345], [345, 410], [350, 472]], "minor"],
  [[[200, 472], [253, 470], [300, 470], [350, 472], [410, 490], [470, 505]], "minor"],
  [[[232, 163], [236, 205], [252, 245], [258, 290], [256, 380], [253, 460], [252, 540], [255, 600]], "main"],
];
const roadStyle = {
  highway: { casing: "#c98a2e", fill: "#f2b552", width: 40 },
  main: { casing: "#a9a293", fill: "#dedbd3", width: 34 },
  minor: { casing: "#b3ac9d", fill: "#ebe8e1", width: 18 },
};

const routePts: Pt[] = [[178, 186], [210, 184], [234, 182], [240, 215], [254, 250], [258, 290], [256, 380], [254, 460], [253, 540]];
const stream: Pt[] = [[334, 226], [300, 268], [283, 320], [280, 380], [282, 440], [285, 500], [287, 560], [290, 620]];

// Nearest point on the walking route, where each place's dotted spur leaves it.
const routeView = routePts.map(at);
const spurFrom = (pin: Pt): Pt => {
  const q = at(pin);
  return routeView.reduce((best, r) => (Math.hypot(r[0] - q[0], r[1] - q[1]) < Math.hypot(best[0] - q[0], best[1] - q[1]) ? r : best));
};

// Wooded hills: a fixed pseudo-random scatter of tree crowns so every render (and the static export) matches.
const treeGreens = ["#4f7a3f", "#5d8a49", "#6b9655", "#46703a", "#7aa262"];
const trees: [number, number, number, string][] = (() => {
  let seed = 205;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: 1500 }, (): [number, number, number, string] => [
    Math.round(rand() * W),
    Math.round(rand() * H),
    Math.round(10 + rand() * 12),
    treeGreens[Math.floor(rand() * treeGreens.length)],
  ]);
})();

export function WalkingMap({ places }: { places: Place[] }) {
  const shown = places.slice(0, spots.length);
  return (
    <div className="relative mt-12 hidden aspect-[16/10] overflow-hidden rounded-sm border border-line bg-[#55804a] lg:block">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <filter id="wm-shadow" x="-20%" y="-20%" width="160%" height="160%">
            <feDropShadow dx="3" dy="4" stdDeviation="1.5" floodColor="#3b3426" floodOpacity="0.4" />
          </filter>
          <pattern id="wm-apt" width="78" height="54" patternUnits="userSpaceOnUse" patternTransform="rotate(-12)">
            <rect width="78" height="54" fill="#e2dbc9" />
            <rect x="12" y="16" width="50" height="20" rx="2" fill="#f8f5ee" filter="url(#wm-shadow)" />
          </pattern>
          <pattern id="wm-town" width="54" height="34" patternUnits="userSpaceOnUse">
            <rect width="54" height="34" fill="#e6dfcf" />
            <rect x="6" y="9" width="40" height="15" rx="2" fill="#f8f5ee" filter="url(#wm-shadow)" />
          </pattern>
          <pattern id="wm-shop" width="34" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)">
            <rect width="34" height="30" fill="#e8e0cf" />
            <rect x="5" y="6" width="22" height="16" rx="2" fill="#f4eee2" filter="url(#wm-shadow)" />
          </pattern>
          <radialGradient id="wm-vignette" cx="55%" cy="45%" r="75%">
            <stop offset="55%" stopColor="#000" stopOpacity="0" />
            <stop offset="100%" stopColor="#14210e" stopOpacity="0.35" />
          </radialGradient>
        </defs>

        {/* Wooded hills */}
        {trees.map(([cx, cy, r, fill], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={fill} />
        ))}

        {/* Valley floor, the green belt along the stream, and the park */}
        <path d={valley} fill="#d9d2bf" stroke="#d9d2bf" strokeWidth="40" strokeLinejoin="round" />
        <path d={smooth(stream)} fill="none" stroke="#93ba76" strokeWidth="64" strokeLinecap="round" />
        <ellipse cx={at([289, 550])[0]} cy={at([289, 550])[1]} rx="78" ry="48" fill="#a5c985" stroke="#eee7d6" strokeWidth="5" />

        {/* Blocks */}
        {blocks.map(([pts, kind]) => (
          <path key={pts.join()} d={polygon(pts)} fill={`url(#wm-${kind})`} stroke="#cdc4af" strokeWidth="2" strokeLinejoin="round" />
        ))}
        <rect x={school.a[0]} y={school.a[1]} width={school.b[0] - school.a[0]} height={school.b[1] - school.a[1]} rx="12" fill="#ddd7c6" stroke="#c9c1ac" strokeWidth="2" />
        <rect x={school.a[0] + 14} y={school.a[1] + 18} width="52" height="96" rx="26" fill="#c4734f" />
        <rect x={school.a[0] + 26} y={school.a[1] + 36} width="28" height="60" rx="14" fill="#8fb36a" />

        {/* Stream and pond */}
        <path d={smooth(stream)} fill="none" stroke="#4f8fbf" strokeWidth="14" strokeLinecap="round" />
        <path d={smooth(stream)} fill="none" stroke="#9cc8e6" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.8" />
        <ellipse cx={at([293, 324])[0]} cy={at([293, 324])[1]} rx="22" ry="34" fill="#4f8fbf" />

        {/* Roads: casing, surface, centre line */}
        {roads.map(([pts, kind]) => (
          <path key={`c-${pts.join()}`} d={smooth(pts)} fill="none" stroke={roadStyle[kind].casing} strokeWidth={roadStyle[kind].width + 6} strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {roads.map(([pts, kind]) => (
          <path key={`f-${pts.join()}`} d={smooth(pts)} fill="none" stroke={roadStyle[kind].fill} strokeWidth={roadStyle[kind].width} strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {roads
          .filter(([, kind]) => kind !== "minor")
          .map(([pts]) => (
            <path key={`l-${pts.join()}`} d={smooth(pts)} fill="none" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="2.5" strokeDasharray="18 16" />
          ))}

        {/* Walking route and spurs to each place */}
        <g fill="none" strokeLinecap="round">
          <path d={smooth(routePts)} stroke="#7a5a12" strokeOpacity="0.35" strokeWidth="11" strokeDasharray="0.1 16" />
          <path d={smooth(routePts)} stroke="#f4c542" strokeWidth="8" strokeDasharray="0.1 16" />
          {shown.map((p, i) => {
            const [x1, y1] = spurFrom(spots[i].pin);
            const [x2, y2] = at(spots[i].pin);
            return <path key={p.name} d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke="#f4c542" strokeWidth="6" strokeDasharray="0.1 13" />;
          })}
        </g>

        {/* Area, road and hill names (all real, from the map) */}
        <g fontSize="15" letterSpacing="3" fontWeight="600" fill="#3f3a2d" stroke="#f7f3eb" strokeWidth="4" paintOrder="stroke" className="font-sans">
          <text x={at([196, 230])[0]} y={at([196, 230])[1]} textAnchor="middle">PANGYO TH212</text>
          <text x={at([313, 374])[0]} y={at([313, 374])[1]} textAnchor="middle">PANGYO DAEJANG</text>
          <text x={at([313, 374])[0]} y={at([313, 374])[1] + 22} textAnchor="middle">MIDDLE SCHOOL</text>
          <text x={at([410, 340])[0]} y={at([410, 340])[1]} textAnchor="middle">PANGYO HARRINGTON PLACE</text>
          <text x={at([410, 512])[0]} y={at([410, 512])[1]} textAnchor="middle">THE SHARP PANGYO FOREST</text>
          <text transform={`translate(${at([135, 230])[0]} ${at([135, 230])[1]}) rotate(-80)`} textAnchor="middle" fill="#6b4410" stroke="#f9d79b">
            YONGIN–SEOUL EXPRESSWAY
          </text>
          <text transform={`translate(${at([251, 340])[0] - 14} ${at([251, 340])[1]}) rotate(-90)`} textAnchor="middle" fill="#5b5446">
            PANGYO DAEJANG-RO
          </text>
        </g>
        <g transform={`translate(${at([390, 278])[0]} ${at([390, 278])[1]})`} className="font-sans">
          <path d="M -14 10 L 0 -14 L 14 10 Z" fill="#2f4a26" stroke="#f7f3eb" strokeWidth="3" />
          <text y="34" textAnchor="middle" fontSize="15" letterSpacing="2" fontWeight="600" fill="#f7f3eb">DAEJANG-DONG TAEBONG</text>
        </g>

        {/* Leader lines from each label to its pin */}
        {shown.map((p, i) => {
          const [x2, y2] = at(spots[i].pin);
          return <line key={p.name} x1={spots[i].card[0]} y1={spots[i].card[1]} x2={x2} y2={y2} stroke="#ffffff" strokeOpacity="0.9" strokeWidth="2" />;
        })}

        <rect width={W} height={H} fill="url(#wm-vignette)" />

        {/* Compass */}
        <g transform="translate(1540 62)">
          <circle r="36" fill="#ffffff" fillOpacity="0.92" />
          <path d="M 0 -26 L 10 6 L 0 0 L -10 6 Z" fill="#1f1f1f" />
          <text y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="#1f1f1f" className="font-sans">N</text>
        </g>
      </svg>

      {/* Title */}
      <div className="absolute left-[1.75%] top-[3%] w-[23%] rounded-md bg-[#fbf8f1]/95 px-4 py-3.5 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.45)] xl:px-5 xl:py-4">
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
          style={{ ...pct(at(spots[i].pin)), backgroundColor: tint[p.icon] }}
        />
      ))}

      {/* Building 205 */}
      <div className="absolute -translate-x-1/2 -translate-y-1/2" style={pct(HOME)}>
        <div className="absolute inset-[-12px] rounded-full bg-white/35" />
        <div className="relative grid size-[4.5rem] place-items-center rounded-full border-4 border-white bg-[#1f3a2a] text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] xl:size-[5.5rem]">
          <span className="text-center">
            <span className="block font-serif text-[1.5rem] leading-none xl:text-[1.875rem]">205</span>
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
