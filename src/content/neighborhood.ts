// Neighborhood tab (Information → Neighborhood). DRAFT CONTENT: names, distances, times and hours below were
// read from the design mock-up and must be checked against Naver Map before publishing. Edit here only.
// `query` is the Naver Map search used by the Map button (Korean name where known).
// To add a photo, put the file in public/images/neighborhood/ and set `photo` on that place.

export type CategoryKey = "dining" | "visit" | "essentials";

export type Icon = "dining" | "coffee" | "bakery" | "store" | "cart" | "pharmacy" | "clinic" | "laundry" | "park" | "shopping" | "culture" | "nature";

export type Place = {
  name: string;
  kind: string;
  icon: Icon;
  /** e.g. "2 min walk" or "~8 min by car". Leave out to hide the time line. */
  time?: string;
  distance?: string;
  hours?: string;
  note?: string;
  /** Labelled rows shown as a small table on the card, e.g. { label: "Hours", lines: ["Mon 11:00–20:00"] }. */
  details?: { label: string; lines: string[] }[];
  query: string;
  /** Card photo in public/images/neighborhood/, e.g. "/images/neighborhood/visit-01.jpg". Leave out to show the icon tile. */
  photo?: string;
  /** Exact Naver Map place page; when set, the Map button opens it instead of a search for `query`. */
  mapUrl?: string;
};

export type Category = {
  key: CategoryKey;
  label: string;
  /** Cover photo on the category card; leave out to show the icon tile. */
  cover?: string;
  /** object-position for the cover crop, e.g. "70% 50%". */
  coverPosition?: string;
  sub: string;
  icon: Icon;
  eyebrow: string;
  title: string;
  intro: string;
  footnote: string;
  places: Place[];
};

const near = (q: string) => `${q} 판교 대장동`;

export const categories: Category[] = [
  {
    key: "essentials",
    label: "Everyday Essentials",
    sub: "Store, pharmacy, mart & more · on foot",
    cover: "/images/neighborhood/cover-essentials-v2.webp",
    icon: "store",
    eyebrow: "Everyday Essentials",
    title: "On Foot",
    intro: "Eight everyday places within a twenty-minute walk of Building 205 — from morning coffee to a late pharmacy run.",
    footnote: "Illustrative map, not to scale. Walking times and distances are approximate; hours may change.",
    places: [
      { name: "CU Daejang", kind: "Convenience store", icon: "store", time: "3 min walk", distance: "180 m", hours: "Open 24 hours", query: near("CU"), photo: "/images/neighborhood/ess-01-cu.webp", mapUrl: "https://map.naver.com/p/search/CU%20%ED%8C%90%EA%B5%90SK%EB%B7%B0%ED%85%8C%EB%9D%BC%EC%8A%A4%EC%A0%90?c=20.00,0,0,0,dh" },
      { name: "Pascucci Pangyo Daejang", kind: "Café", icon: "coffee", time: "8 min walk", distance: "450 m", hours: "Daily 07:00–22:00", query: near("파스쿠찌"), photo: "/images/neighborhood/ess-02-pascucci.webp", mapUrl: "https://map.naver.com/p/search/%ED%8C%8C%EC%8A%A4%EC%BF%A0%EC%B0%8C%20%ED%8C%90%EA%B5%90%EB%8C%80%EC%9E%A5%EC%A0%90/place/1205108662?c=15.00,0,0,0,dh" },
      { name: "Tous les Jours Pangyo Daejang", kind: "Bakery", icon: "bakery", time: "5 min walk", distance: "500 m", hours: "Daily 07:00–22:00", query: near("뚜레쥬르"), photo: "/images/neighborhood/ess-03-tous-les-jours.webp", mapUrl: "https://map.naver.com/p/search/%EB%9A%9C%EB%A0%88%EC%A5%AC%EB%A5%B4%20%ED%8C%90%EA%B5%90%EB%8C%80%EC%9E%A5%EC%A0%90/place/1538874465?c=15.00,0,0,0,dh" },
      { name: "GS THE FRESH Pangyo Daejang", kind: "Supermarket", icon: "cart", time: "15 min walk", distance: "950 m", hours: "Daily 09:00–22:00", query: near("GS더프레시"), photo: "/images/neighborhood/ess-04-gs-the-fresh.webp", mapUrl: "https://map.naver.com/p/search/GS%EB%8D%94%ED%94%84%EB%A0%88%EC%8B%9C%20%ED%8C%90%EA%B5%90%EB%8C%80%EC%9E%A5%EC%A0%90/place/1768996245?c=15.00,0,0,0,dh" },
      { name: "Chamyaksa Daejang Pharmacy", kind: "Pharmacy · 참약사 대장약국", icon: "pharmacy", time: "15 min walk", distance: "900 m", hours: "Mon–Fri 09:00–21:00 · Sat 09:00–18:00 · Sun closed", query: "참약사 대장약국", photo: "/images/neighborhood/ess-05-pharmacy.webp", mapUrl: "https://map.naver.com/p/search/%EC%B0%B8%EC%95%BD%EC%82%AC%EB%8C%80%EC%9E%A5%EC%95%BD%EA%B5%AD/place/1153781860?c=15.00,0,0,0,dh" },
      { name: "Pangyo Barun Internal Medicine", kind: "Clinic · Internal medicine · 판교바른내과", icon: "clinic", time: "14 min walk", distance: "910 m", hours: "Mon–Fri 08:30–18:30 · Sat 08:30–13:00 · Sun & holidays closed", note: "Lunch 13:00–14:00", query: "판교바른내과", photo: "/images/neighborhood/ess-06-pangyo-barun.webp", mapUrl: "https://map.naver.com/p/search/%ED%8C%90%EA%B5%90%EB%B0%94%EB%A5%B8%EB%82%B4%EA%B3%BC%EC%9D%98%EC%9B%90/place/1046278098?c=15.00,0,0,0,dh" },
      { name: "CleanTopia", kind: "Laundry", icon: "laundry", time: "6 min walk", distance: "420 m", hours: "Mon–Fri 08:00–21:00 · Sat–Sun 09:00–20:00", query: near("크린토피아"), photo: "/images/neighborhood/ess-07-cleantopia.webp", mapUrl: "https://map.naver.com/p/search/%ED%81%AC%EB%A6%B0%ED%86%A0%ED%94%BC%EC%95%84%20%EC%BD%94%EC%9D%B8%EC%9B%8C%EC%8B%9C%20%ED%8C%90%EA%B5%90%EB%8C%80%EC%9E%A5%ED%9E%90%EC%8A%A4%EC%A0%90/place/1669719513?c=15.00,0,0,0,dh" },
      { name: "Daejang Neighborhood Park", kind: "Park · 대장근린공원", icon: "park", time: "20 min walk", distance: "1.4 km", hours: "Open all day", query: "대장근린공원", photo: "/images/neighborhood/ess-08-park.webp", mapUrl: "https://map.naver.com/p/search/%EB%8C%80%EC%9E%A5%EA%B7%BC%EB%A6%B0%EA%B3%B5%EC%9B%90/place/2140000890?c=15.00,0,0,0,dh" },
    ],
  },
  {
    key: "dining",
    label: "Local Dining",
    cover: "/images/neighborhood/cover-dining.webp",
    sub: "Restaurants & cafés · by car",
    icon: "dining",
    eyebrow: "Local Dining",
    title: "Nearby Favorites",
    intro: "Twelve local favourites around Daejang-dong — from gimbap and ramen to Korean barbecue and teppanyaki.",
    footnote: "Hours may change; please check before visiting.",
    places: [
      { name: "Barda Kim Seonsaeng", kind: "Gimbap · 바르다김선생", icon: "dining", details: [
        { label: "Hours", lines: ["Mon · Wed · Thu 11:00–20:00", "Fri – Sun 10:00–20:00"] },
        { label: "Break", lines: ["15:00–17:00"] },
        { label: "Closed", lines: ["Every Tuesday"] },
      ], query: near("바르다김선생"), photo: "/images/neighborhood/dining-01-barda-kim.webp", mapUrl: "https://map.naver.com/p/search/%EB%B0%94%EB%A5%B4%EB%8B%A4%EA%B9%80%EC%84%A0%EC%83%9D%20%ED%8C%90%EA%B5%90%EB%8C%80%EC%9E%A5%EC%A0%90/place/1828654732?c=15.00,0,0,0,dh" },
      { name: "Seolle Jokbal", kind: "Braised pork trotters · 설레족발", icon: "dining", details: [
        { label: "Hours", lines: ["Tue – Sun 17:00–24:00"] },
        { label: "Closed", lines: ["Every Monday"] },
      ], query: near("설레족발"), photo: "/images/neighborhood/dining-02-seolle-jokbal.webp", mapUrl: "https://map.naver.com/p/search/%EC%84%A4%EB%A0%88%EC%A1%B1%EB%B0%9C%20%EB%8C%80%EC%9E%A5%EB%8F%99%EC%A0%90?c=15.00,0,0,0,dh" },
      { name: "Mom's Touch", kind: "Burgers · 맘스터치", icon: "dining", details: [
        { label: "Hours", lines: ["Mon – Fri 10:50–21:30", "Sat · Sun 10:30–21:30"] },
      ], query: near("맘스터치"), photo: "/images/neighborhood/dining-03-moms-touch.webp", mapUrl: "https://map.naver.com/p/search/%EB%A7%98%EC%8A%A4%ED%84%B0%EC%B9%98%20%ED%8C%90%EA%B5%90%EB%8C%80%EC%9E%A5%EC%A0%90/place/1806014800?c=15.00,0,0,0,dh" },
      { name: "BBQ Chicken", kind: "Fried chicken · BBQ", icon: "dining", details: [
        { label: "Hours", lines: ["Daily 11:00–23:00"] },
      ], query: near("BBQ"), photo: "/images/neighborhood/dining-04-bbq.webp", mapUrl: "https://map.naver.com/p/search/BBQ%EC%B9%98%ED%82%A8%20%ED%8C%90%EA%B5%90%EB%8C%80%EC%9E%A5%EC%A7%80%EA%B5%AC%EC%A0%90/place/1975696630?c=15.00,0,0,0,dh" },
      { name: "Daejang Dakbal", kind: "Spicy braised chicken · 대장닭발 닭도리탕", icon: "dining", details: [
        { label: "Hours", lines: ["Wed – Sun 17:00–22:00"] },
        { label: "Closed", lines: ["Every Monday & Tuesday"] },
      ], query: near("대장닭발 닭도리탕"), photo: "/images/neighborhood/dining-05-daejang-dakbal.webp", mapUrl: "https://map.naver.com/p/search/%EB%8C%80%EC%9E%A5%EB%8B%AD%EB%B0%9C%26%EB%8B%AD%EB%8F%84%EB%A6%AC%ED%83%95%20%EB%B3%B8%EC%A0%90?c=15.00,0,0,0,dh" },
      { name: "Teppan House", kind: "Teppanyaki & seafood · 테판하우스", icon: "dining", details: [
        { label: "Hours", lines: ["Daily 10:00–22:00"] },
        { label: "Break", lines: ["15:00–16:30"] },
      ], query: near("테판하우스"), photo: "/images/neighborhood/dining-06-teppan-house.webp", mapUrl: "https://map.naver.com/p/search/%ED%85%8C%ED%8C%90%ED%95%98%EC%9A%B0%EC%8A%A4?c=15.00,0,0,0,dh" },
      { name: "Uri Hanwoo Gomtang", kind: "Beef bone soup · 우리한우 곰탕", icon: "dining", details: [
        { label: "Hours", lines: ["Mon – Sat 11:00–21:00"] },
        { label: "Break", lines: ["15:00–17:00"] },
        { label: "Closed", lines: ["Every Sunday"] },
      ], query: near("우리한우 곰탕"), photo: "/images/neighborhood/dining-07-uri-hanwoo-gomtang.webp", mapUrl: "https://map.naver.com/p/search/%EC%9A%B0%EB%A6%AC%ED%95%9C%EC%9A%B0%EA%B3%B0%ED%83%95?c=15.00,0,0,0,dh" },
      { name: "Plantimore", kind: "Pasta · 플랜티모어", icon: "dining", details: [
        { label: "Hours", lines: ["Mon – Fri 09:00–20:00", "Sat 09:00–16:00"] },
        { label: "Closed", lines: ["Every Sunday"] },
      ], query: near("플랜티모어"), photo: "/images/neighborhood/dining-08-prantimore.webp", mapUrl: "https://map.naver.com/p/search/%ED%94%8C%EB%9E%9C%ED%8B%B0%EB%AA%A8%EC%96%B4/place/1522423823?c=15.00,0,0,0,dh" },
      { name: "Sikkeop", kind: "Grilled pork belly · 식껍", icon: "dining", details: [
        { label: "Hours", lines: ["Mon · Tue 17:00–22:30", "Thu – Sat 17:00–22:30", "Sun 17:00–21:30"] },
        { label: "Closed", lines: ["Every Wednesday"] },
      ], query: near("식껍"), photo: "/images/neighborhood/dining-09-sikkeop.webp", mapUrl: "https://map.naver.com/p/search/%EC%8B%9D%EA%BB%8D%20%EB%8C%80%EC%9E%A5%EC%A0%90/place/1749624502?c=15.00,0,0,0,dh" },
      { name: "Oroji Ramen", kind: "Ramen · 오로지라멘", icon: "dining", details: [
        { label: "Hours", lines: ["Tue – Fri 11:00–20:30", "Sat 12:00–20:00", "Mon hours vary"] },
        { label: "Break", lines: ["Tue – Fri 15:00–17:00"] },
        { label: "Closed", lines: ["Every Sunday"] },
      ], query: near("오로지라멘"), photo: "/images/neighborhood/dining-10-oroji-ramen.webp", mapUrl: "https://map.naver.com/p/search/%EC%98%A4%EB%A1%9C%EC%A7%80%EB%9D%BC%EB%A9%98%20%ED%8C%90%EA%B5%90%EB%8C%80%EC%9E%A5%EC%A0%90/place/1851346244?c=15.00,0,0,0,dh" },
      { name: "Pizza School", kind: "Pizza · 피자스쿨", icon: "dining", details: [
        { label: "Hours", lines: ["Mon – Sat 11:00–21:00", "Sun 16:30–20:00"] },
      ], query: near("피자스쿨"), photo: "/images/neighborhood/dining-12-pizza-school.webp", mapUrl: "https://map.naver.com/p/search/%ED%94%BC%EC%9E%90%EC%8A%A4%EC%BF%A8%20%ED%8C%90%EA%B5%90%EB%8C%80%EC%9E%A5%EC%A0%90/place/1381590885?c=15.00,0,0,0,dh" },
      { name: "Hansot Dosirak", kind: "Lunch boxes · 한솥도시락", icon: "dining", details: [
        { label: "Hours", lines: ["Mon – Fri 10:00–20:00", "Sat · Sun 09:00–14:00"] },
      ], query: near("한솥도시락"), photo: "/images/neighborhood/dining-13-hansot.webp", mapUrl: "https://map.naver.com/p/search/%ED%95%9C%EC%86%A5%EB%8F%84%EC%8B%9C%EB%9D%BD%20%ED%8C%90%EA%B5%90%EB%8C%80%EC%9E%A5%EC%A0%90/place/1045030790?c=15.00,0,0,0,dh" },
    ],
  },
  {
    key: "visit",
    label: "Places to Visit",
    sub: "Culture, shopping & nature · by car",
    cover: "/images/neighborhood/visit-05-gyeongbokgung.webp",
    coverPosition: "30% 50%",
    icon: "culture",
    eyebrow: "Places to Visit",
    title: "Further Afield",
    intro: "For a free afternoon between meetings, or a weekend in and around Seoul — seven places within about forty-five minutes by car.",
    footnote: "Travel times are approximate and vary with traffic. Hours may change; please check before visiting.",
    places: [
      { name: "Pangyo Station Area", kind: "Shopping", icon: "shopping", time: "~15 min by car", distance: "7.2 km", note: "Cafés, dining and shopping around Pangyo's business district.", query: "판교역", photo: "/images/neighborhood/visit-01-pangyo-station.webp", mapUrl: "https://map.naver.com/p/search/%ED%8C%90%EA%B5%90%EC%97%AD/subway-station/1914?c=15.00,0,0,0,dh" },
      { name: "The Hyundai Pangyo", kind: "Shopping", icon: "shopping", time: "~12 min by car", distance: "7.4 km", note: "Shopping, dining and culture under one roof.", query: "현대백화점 판교점", photo: "/images/neighborhood/visit-02-the-hyundai-pangyo.webp", mapUrl: "https://map.naver.com/p/search/%ED%98%84%EB%8C%80%EB%B0%B1%ED%99%94%EC%A0%90%20%ED%8C%90%EA%B5%90%EC%A0%90/place/31564929?c=15.00,0,0,0,dh" },
      { name: "Gogi Valley, Yongin", kind: "Nature", icon: "nature", time: "~10 min by car", distance: "4.1 km", note: "Relaxed meals and cafés along a wooded valley stream.", query: "용인 고기리계곡", photo: "/images/neighborhood/visit-03-gogi-valley.webp", mapUrl: "https://map.naver.com/p/search/%EC%9A%A9%EC%9D%B8%20%EA%B3%A0%EA%B8%B0%EB%A6%AC%EA%B3%84%EA%B3%A1/place/13491741?c=15.00,0,0,0,dh" },
      { name: "Starfield Suwon", kind: "Shopping", icon: "shopping", time: "~25 min by car", distance: "17 km", note: "Shopping, dining and a cinema in one large complex.", query: "스타필드 수원", photo: "/images/neighborhood/visit-04-starfield-suwon.webp", mapUrl: "https://map.naver.com/p/search/%EC%8A%A4%ED%83%80%ED%95%84%EB%93%9C%20%EC%88%98%EC%9B%90/place/1045275610?c=15.00,0,0,0,dh" },
      { name: "Gwanghwamun & Gyeongbokgung", kind: "Culture", icon: "culture", time: "~45 min by car", distance: "29 km", note: "Seoul's principal royal palace, at the historic heart of the city.", query: "경복궁", photo: "/images/neighborhood/visit-05-gyeongbokgung.webp", mapUrl: "https://map.naver.com/p/search/%EA%B2%BD%EB%B3%B5%EA%B6%81/place/11571707?c=15.00,0,0,0,dh" },
      { name: "Korean Folk Village, Yongin", kind: "Culture", icon: "culture", time: "~30 min by car", distance: "19 km", note: "Traditional houses, hands-on experiences and seasonal festivals.", query: "한국민속촌", photo: "/images/neighborhood/visit-06-korean-folk-village.webp", mapUrl: "https://map.naver.com/p/search/%ED%95%9C%EA%B5%AD%EB%AF%BC%EC%86%8D%EC%B4%8C/place/11620801?c=15.00,0,0,0,dh" },
      { name: "Myeongdong", kind: "Shopping", icon: "shopping", time: "~40 min by car", distance: "26 km", note: "Seoul's best-known shopping street, with beauty brands and street food.", query: "명동", photo: "/images/neighborhood/visit-07-myeongdong.webp", mapUrl: "https://map.naver.com/p/search/%EB%AA%85%EB%8F%99%208%EB%B2%88%EC%B6%9C%EA%B5%AC/place/21405078?c=15.00,0,0,0,dh" },
    ],
  },
];

export const naverMap = (query: string) => `https://map.naver.com/p/search/${encodeURIComponent(query)}`;
