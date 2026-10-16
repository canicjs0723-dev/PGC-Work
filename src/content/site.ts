// Source of truth: "PGC Overview_EN.pdf" (RONDA KOREA) + Notion guest guides (403 / 404).
// PRIVATE — never add here: door/access codes, Wi-Fi credentials.
// Inquiry email, phones and WeChat QR below are published with the owner's approval (2026-10-11).

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const nav: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Rooms",
    href: "/business-room",
  },
  // Opens on Location; the Guide tab stays at /information.
  { label: "Information", href: "/information/location" },
  { label: "Contact", href: "/contact" },
];

export const site = {
  name: "Pangyo Global Campus",
  short: "PGC",
  tagline: "A refined stay for work and rest.",
  operator: "RONDA KOREA",
  complex: "TH212 Pangyo",
  address: {
    rooms: "Building 205, Units 403 & 404",
    street: "25, Pangyodaejang-ro 2-gil, Bundang-gu, Seongnam-si",
    lot: "Daejang-dong 596",
    country: "Republic of Korea",
  },
  // Business inquiry line printed in the official brochure (not a personal number).
  inquiryPhone: "031-613-2360",
  inquiryPhoneTel: "+82316132360",
  inquiryEmail: "evan.kim@rondakorea.com",
  managementPhone: "031-711-7691",
  managementPhoneTel: "+82317117691",
  // Search term for the external map links and the embedded map: the complex's registered name.
  mapSearchKo: "판교TH212",
  // Google query (embedded map and Google Maps button): the complex name followed by its registered
  // road address (판교대장로7길 25, 17160), so Google lands on TH212 rather than another "TH212" match.
  mapGoogleKo: "판교TH212 경기도 성남시 분당구 판교대장로7길 25",
};

export const intro = {
  label: "About PGC",
  headline: ["A New Standard", "in Business Stays"],
  lead: "A place where business and comfort connect naturally.",
  body: [
    "Located in Daejang-dong, Pangyo, Pangyo Global Campus is an upscale residence with private terraces, bringing nature and seasonal outdoor living into everyday life.",
    "Designed for employees, global partners, and visitors, it offers a refined, comfortable setting that brings work, relaxation, and meaningful connections together.",
  ],
};

export const identity = [
  {
    key: "WORK",
    line: "A productive environment for focus and efficiency.",
    detail: "A space that enables seamless work and enhances performance.",
    image: "/images/identity-work-2026.jpg",
    alt: "Colleagues reviewing documents together",
  },
  {
    key: "STAY",
    line: "Premium living designed for comfort and privacy.",
    detail: "A space designed for comfortable rest and privacy.",
    image: "/images/identity-stay-2026.jpg",
    alt: "A sunlit bedroom with a made bed and an armchair",
  },
  {
    key: "CONNECT",
    line: "Seamless networking for meaningful connections.",
    detail: "A space that brings employees and global partners together.",
    image: "/images/identity-connect-2026.jpg",
    alt: "Partners meeting in a bright lounge",
  },
];

export const directions = [
  { from: "Head Office", distance: "21 km", time: "30 min by car" },
  { from: "Gimpo International Airport", distance: "50 km", time: "90 min by car" },
  { from: "Incheon International Airport", distance: "75 km", time: "90 min by car" },
];

export const advantages = [
  {
    title: "Connectivity",
    body: "Convenient access via Seopangyo Tunnel, GTX-A Seongnam Station, Seopangyo Station, the Shinbundang and Bundang Lines, and Seopangyo IC.",
  },
  {
    title: "Local Amenities",
    body: "Nearby amenities include Hyundai Department Store in Pangyo New Town, Seoul National University Hospital, Homeplus, and the shops and neighborhood facilities of Pangyo Daejang District.",
  },
  {
    title: "Nearby Attractions",
    body: "Lotte Premium Outlet Uiwang (20 km, 20 min), Lotte World (22 km, 35 min), Seoul Grand Park (17 km, 25 min), Gangnam COEX (25 km, 35 min), and Myeong-dong (27 km, 50 min).",
  },
  {
    title: "Nature & Outdoors",
    body: "Enjoy a nature-rich setting with easy access to Gogiri Valley, Cheonggyesan, Gwanggyosan, and Barasan Recreational Forest.",
  },
];

export const parking = {
  title: "Parking Registration",
  note: "Parking is available only after pre-registration is completed.",
  entrance: "For easier access, please use the Building 204 side entrance, then proceed to Building 205.",
  required: [
    "Number of visitors & duration of stay",
    "Vehicle license plate number & registration status",
    "Applicant's name & contact information",
  ],
};

export const roomUseCases = [
  {
    title: "Executive Stay",
    body: "A comfortable base for visiting domestic and international executives, including extended stays. The Guest Room accommodates up to 9 guests with 9 beds and 2 bathrooms.",
    room: "Guest Room",
    href: "/guest-room",
  },
  {
    title: "Corporate Workshop",
    body: "Bring a small workshop and overnight stay together in the Business Room, with a projector, audio equipment, dining lounge and six beds.",
    room: "Business Room",
    href: "/business-room",
  },
  {
    title: "Partner Meeting",
    body: "Host a private meeting with clients or global partners in the Business Room, with presentation equipment and an adjoining lounge.",
    room: "Business Room",
    href: "/business-room",
  },
  {
    title: "Team Offsite",
    body: "Combine a focused session, shared meals and team conversation in the Business Room, with overnight accommodation available for up to five.",
    room: "Business Room",
    href: "/business-room",
  },
];
