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
  /** e.g. "2 min walk" or "~8 min by car" */
  time: string;
  distance?: string;
  hours?: string;
  note?: string;
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
    intro: "Eight everyday places within a ten-minute walk of Building 205 — from morning coffee to a late pharmacy run.",
    footnote: "Illustrative map, not to scale. Walking times at about 80 m per minute; hours may change.",
    places: [
      { name: "CU Daejang", kind: "Convenience store", icon: "store", time: "2 min walk", distance: "180 m", hours: "Open 24 hours", query: near("CU"), photo: "/images/neighborhood/ess-01-cu.webp" },
      { name: "Pascucci Pangyo Daejang", kind: "Café", icon: "coffee", time: "2 min walk", distance: "170 m", hours: "Daily 07:00–22:00", query: near("파스쿠찌"), photo: "/images/neighborhood/ess-02-pascucci.webp" },
      { name: "Tous les Jours Pangyo Daejang", kind: "Bakery", icon: "bakery", time: "3 min walk", distance: "200 m", hours: "Daily 07:00–22:00", query: near("뚜레쥬르"), photo: "/images/neighborhood/ess-03-tous-les-jours.webp" },
      { name: "GS THE FRESH Pangyo Daejang", kind: "Supermarket", icon: "cart", time: "8 min walk", distance: "610 m", hours: "Daily 09:00–22:00", query: near("GS더프레시"), photo: "/images/neighborhood/ess-04-gs-the-fresh.webp" },
      { name: "Chamyaksa Daejang Pharmacy", kind: "Pharmacy · 참약사 대장약국", icon: "pharmacy", time: "8 min walk", distance: "620 m", hours: "Mon–Fri 09:00–21:00 · Sat 09:00–18:00 · Sun closed", query: "참약사 대장약국", photo: "/images/neighborhood/ess-05-pharmacy.webp" },
      { name: "Yonsei Spring Clinic", kind: "Clinic · Internal medicine", icon: "clinic", time: "8 min walk", distance: "600 m", hours: "Mon–Fri 09:00–19:00 · Sat 09:00–13:00 · Sun closed", query: "연세봄의원 판교" },
      { name: "CleanTopia", kind: "Laundry", icon: "laundry", time: "2 min walk", distance: "150 m", hours: "Mon–Fri 08:00–21:00 · Sat–Sun 09:00–20:00", query: near("크린토피아") },
      { name: "Daejang Riverside Park", kind: "Park", icon: "park", time: "5 min walk", distance: "400 m", hours: "Open all day", query: near("공원") },
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
    footnote: "Drive times and distances are approximate and vary with traffic. Hours may change; please check before visiting.",
    places: [
      { name: "Barda Kim Seonsaeng", kind: "Gimbap · 바르다김선생", icon: "dining", time: "Nearby · Daejang-dong", note: "See Naver Map for hours", query: near("바르다김선생"), photo: "/images/neighborhood/dining-01-barda-kim.webp" },
      { name: "Seolle Jokbal", kind: "Braised pork trotters · 설레족발", icon: "dining", time: "Nearby · Daejang-dong", note: "See Naver Map for hours", query: near("설레족발"), photo: "/images/neighborhood/dining-02-seolle-jokbal.webp" },
      { name: "Mom's Touch", kind: "Burgers · 맘스터치", icon: "dining", time: "Nearby · Daejang-dong", note: "See Naver Map for hours", query: near("맘스터치"), photo: "/images/neighborhood/dining-03-moms-touch.webp" },
      { name: "BBQ Chicken", kind: "Fried chicken · BBQ", icon: "dining", time: "Nearby · Daejang-dong", note: "See Naver Map for hours", query: near("BBQ"), photo: "/images/neighborhood/dining-04-bbq.webp" },
      { name: "Daejang Dakbal", kind: "Spicy braised chicken · 대장닭발 닭도리탕", icon: "dining", time: "Nearby · Daejang-dong", note: "See Naver Map for hours", query: near("대장닭발 닭도리탕"), photo: "/images/neighborhood/dining-05-daejang-dakbal.webp" },
      { name: "Teppan House", kind: "Teppanyaki & seafood · 태판하우스", icon: "dining", time: "Nearby · Daejang-dong", note: "See Naver Map for hours", query: near("태판하우스"), photo: "/images/neighborhood/dining-06-teppan-house.webp" },
      { name: "Uri Hanwoo Gomtang", kind: "Beef bone soup · 우리한우 곰탕", icon: "dining", time: "Nearby · Daejang-dong", note: "See Naver Map for hours", query: near("우리한우 곰탕"), photo: "/images/neighborhood/dining-07-uri-hanwoo-gomtang.webp" },
      { name: "Prantimore", kind: "Pasta · 프랜티모어", icon: "dining", time: "Nearby · Daejang-dong", note: "See Naver Map for hours", query: near("프랜티모어"), photo: "/images/neighborhood/dining-08-prantimore.webp" },
      { name: "Sikkeop", kind: "Grilled pork belly · 식껍", icon: "dining", time: "Nearby · Daejang-dong", note: "See Naver Map for hours", query: near("식껍"), photo: "/images/neighborhood/dining-09-sikkeop.webp" },
      { name: "Oroji Ramen", kind: "Ramen · 오로지라멘", icon: "dining", time: "Nearby · Daejang-dong", note: "See Naver Map for hours", query: near("오로지라멘"), photo: "/images/neighborhood/dining-10-oroji-ramen.webp" },
      { name: "Pizza School", kind: "Pizza · 피자스쿨", icon: "dining", time: "Nearby · Daejang-dong", note: "See Naver Map for hours", query: near("피자스쿨"), photo: "/images/neighborhood/dining-12-pizza-school.webp" },
      { name: "Hansot Dosirak", kind: "Lunch boxes · 한솥도시락", icon: "dining", time: "Nearby · Daejang-dong", note: "See Naver Map for hours", query: near("한솥도시락"), photo: "/images/neighborhood/dining-13-hansot.webp" },
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
