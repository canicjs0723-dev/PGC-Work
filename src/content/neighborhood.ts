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
};

export type Category = {
  key: CategoryKey;
  label: string;
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
    key: "dining",
    label: "Local Dining",
    sub: "Restaurants & cafés · by car",
    icon: "dining",
    eyebrow: "Local Dining",
    title: "Nearby Favorites",
    intro: "A selection of popular restaurants and local spots within about ten minutes by car — many deliver to Building 205.",
    footnote: "Drive times and distances are approximate and vary with traffic. Hours may change; please check before visiting.",
    places: [
      { name: "Daejang Geumhansang", kind: "Korean", icon: "dining", time: "3 min by car", distance: "1.2 km", hours: "10:30–21:30", note: "Delivery", query: "대장금한상" },
      { name: "Branchin", kind: "Pasta", icon: "dining", time: "3 min by car", distance: "1.4 km", hours: "09:00–22:00", note: "Delivery", query: near("브런친") },
      { name: "Haochuo", kind: "Chinese", icon: "dining", time: "4 min by car", distance: "1.3 km", hours: "11:00–21:30", note: "Delivery", query: near("하오추") },
      { name: "Sushi On", kind: "Sushi", icon: "dining", time: "4 min by car", distance: "1.3 km", hours: "11:30–22:00", note: "Delivery", query: near("스시온") },
      { name: "PhoMein", kind: "Vietnamese", icon: "dining", time: "4 min by car", distance: "1.4 km", hours: "10:00–21:00", note: "Delivery", query: near("포메인") },
      { name: "Mom's Touch", kind: "Burgers", icon: "dining", time: "5 min by car", distance: "1.6 km", hours: "10:30–22:00", note: "Delivery", query: near("맘스터치") },
      { name: "Yogiyo Tteokbokki", kind: "Korean street food", icon: "dining", time: "6 min by car", distance: "1.9 km", hours: "11:00–22:00", note: "Delivery", query: near("떡볶이") },
      { name: "Kkanbu Chicken", kind: "Fried chicken", icon: "dining", time: "6 min by car", distance: "1.8 km", hours: "11:30–22:00", note: "Delivery", query: near("깐부치킨") },
      { name: "Gogiri Makguksu", kind: "Buckwheat noodles", icon: "dining", time: "7 min by car", distance: "2.1 km", hours: "12:00–21:30", query: "고기리막국수" },
      { name: "Pizzeria Gusto", kind: "Pizza", icon: "dining", time: "7 min by car", distance: "2.3 km", hours: "11:30–22:00", note: "Delivery", query: near("피제리아 구스토") },
      { name: "Starbucks Pangyo Daejang", kind: "Coffee", icon: "coffee", time: "10 min by car", distance: "2.9 km", hours: "07:00–22:00", query: "스타벅스 판교대장점" },
      { name: "Jokbal", kind: "Braised pork trotters", icon: "dining", time: "Nearby · Daejang-dong", note: "See Naver Map", query: near("족발") },
      { name: "Samgyeopsal", kind: "Grilled pork belly", icon: "dining", time: "Nearby · Daejang-dong", note: "See Naver Map", query: near("삼겹살") },
      { name: "Gamjatang", kind: "Pork bone stew", icon: "dining", time: "Nearby · Daejang-dong", note: "See Naver Map", query: near("감자탕") },
    ],
  },
  {
    key: "visit",
    label: "Places to Visit",
    sub: "Culture, shopping & nature · by car",
    icon: "culture",
    eyebrow: "Places to Visit",
    title: "Further Afield",
    intro: "For a free afternoon between meetings, or a weekend in and around Seoul — seven places within about forty minutes by car.",
    footnote: "Travel times are approximate and vary with traffic. Hours may change; please check before visiting.",
    places: [
      { name: "Pangyo Station Area", kind: "Shopping", icon: "shopping", time: "~6 min by car", distance: "~3 km", note: "Cafés, dining and shopping around Pangyo's business district.", query: "판교역" },
      { name: "The Hyundai Pangyo", kind: "Shopping", icon: "shopping", time: "~8 min by car", distance: "~3.2 km", note: "Shopping, dining and culture under one roof.", query: "현대백화점 판교점" },
      { name: "Gogi Valley, Yongin", kind: "Nature", icon: "nature", time: "~20 min by car", distance: "~12 km", note: "Relaxed meals and cafés along a wooded valley stream.", query: "용인 고기리계곡" },
      { name: "Starfield Suwon", kind: "Shopping", icon: "shopping", time: "~30 min by car", distance: "~22 km", note: "Shopping, dining and a cinema in one large complex.", query: "스타필드 수원" },
      { name: "Gwanghwamun & Gyeongbokgung", kind: "Culture", icon: "culture", time: "~45 min by car", distance: "~25 km", note: "Seoul's principal royal palace, at the historic heart of the city.", query: "경복궁" },
      { name: "Korean Folk Village, Yongin", kind: "Culture", icon: "culture", time: "~35 min by car", distance: "~27 km", note: "Traditional houses, hands-on experiences and seasonal festivals.", query: "한국민속촌" },
      { name: "Myeongdong", kind: "Shopping", icon: "shopping", time: "~50 min by car", distance: "~27 km", note: "Seoul's best-known shopping street, with beauty brands and street food.", query: "명동" },
    ],
  },
  {
    key: "essentials",
    label: "Everyday Essentials",
    sub: "Convenience, pharmacy, clinic & more · on foot",
    icon: "store",
    eyebrow: "Everyday Essentials",
    title: "On Foot",
    intro: "Eight everyday places within a ten-minute walk of Building 205 — from morning coffee to a late pharmacy run.",
    footnote: "Illustrative map, not to scale. Walking times at about 80 m per minute; hours may change.",
    places: [
      { name: "CU Daejang", kind: "Convenience store", icon: "store", time: "2 min walk", distance: "180 m", hours: "Open 24 hours", query: near("CU") },
      { name: "Pascucci Pangyo Daejang", kind: "Café", icon: "coffee", time: "2 min walk", distance: "170 m", hours: "Daily 07:00–22:00", query: near("파스쿠찌") },
      { name: "Tous les Jours Pangyo Daejang", kind: "Bakery", icon: "bakery", time: "3 min walk", distance: "200 m", hours: "Daily 07:00–22:00", query: near("뚜레쥬르") },
      { name: "GS THE FRESH Pangyo Daejang", kind: "Supermarket", icon: "cart", time: "8 min walk", distance: "610 m", hours: "Daily 09:00–22:00", query: near("GS더프레시") },
      { name: "Daejang Pureun Pharmacy", kind: "Pharmacy", icon: "pharmacy", time: "8 min walk", distance: "620 m", hours: "Mon–Fri 09:00–21:00 · Sat 09:00–18:00 · Sun closed", query: near("약국") },
      { name: "Yonsei Spring Clinic", kind: "Clinic · Internal medicine", icon: "clinic", time: "8 min walk", distance: "600 m", hours: "Mon–Fri 09:00–19:00 · Sat 09:00–13:00 · Sun closed", query: "연세봄의원 판교" },
      { name: "CleanTopia", kind: "Laundry", icon: "laundry", time: "2 min walk", distance: "150 m", hours: "Mon–Fri 08:00–21:00 · Sat–Sun 09:00–20:00", query: near("크린토피아") },
      { name: "Daejang Riverside Park", kind: "Park", icon: "park", time: "5 min walk", distance: "400 m", hours: "Open all day", query: near("공원") },
    ],
  },
];

export const naverMap = (query: string) => `https://map.naver.com/p/search/${encodeURIComponent(query)}`;
