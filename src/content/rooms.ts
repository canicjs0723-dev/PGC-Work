// Room facts: guests / beds / bathrooms / amenities come from the Notion room sheets (403_.jpg, 404_.jpg).
// Facility details are checked against the PGC overview and room guides; use copy emphasizes verified room uses.

export type Room = {
  slug: "business-room" | "guest-room";
  number: "403" | "404";
  name: string;
  tagline: string;
  // Overview column: either a list of uses, or a two-line headline with a supporting line.
  purpose?: string[];
  overview?: { headline: string[]; sub: string };
  description: string[];
  experience: string;
  keywords: { title: string; body: string }[];
  facts: { label: string; value: string }[];
  amenities: string[];
  signature: string[];
  hero: { src: string; alt: string; position?: string };
  // "Inside the Room" gallery, in display order (living first, then spaces). To use a higher-resolution
  // photo, add it under public/images/ and point src here; position adjusts the 4:3 crop (e.g. "50% 60%").
  living: { src: string; alt: string; position?: string };
  spaces: { name: string; src: string; alt: string; position?: string }[];
};

export const businessRoom: Room = {
  slug: "business-room",
  number: "403",
  name: "Business Room",
  tagline: "Meet, gather, and stay—with five beds for overnight visits.",
  overview: {
    headline: ["Your Space to", "Meet & Stay."],
    sub: "Corporate Workshops · Meetings · Accommodation",
  },
  description: [
    "The Business Room is an event and business space for workshops, private partner meetings, and team offsites. Five beds are available for overnight stays, so it can support both meetings and lodging.",
    "The dining lounge, projector, and audio equipment make it easy to bring focused work, shared meals, and a comfortable stay together.",
  ],
  experience: "With five beds as well as meeting space, the Business Room brings meetings, meals, and overnight stays together in one private space.",
  keywords: [
    { title: "Corporate Workshop", body: "A projector, audio equipment, dining lounge, and five beds support small workshops with an overnight stay." },
    { title: "Partner Meeting", body: "A private setting for client and global partner meetings, with presentation equipment close at hand." },
    { title: "Team Offsite", body: "Bring focused sessions, meals, networking, and accommodation together in one space." },
  ],
  facts: [
    { label: "Guests", value: "5" },
  ],
  amenities: [
    "TV",
    "Projector",
    "Audio Equipment",
    "Wine Cooler",
    "Clothing Care System",
    "Washing Machine",
    "Climate Control",
    "Robot Vacuum Cleaner",
    "Dishwasher",
    "Induction Cooktop",
    "Multi Cooker",
    "Air Purifier",
    "Hair Dryer",
  ],
  signature: ["Projector", "Audio Equipment", "Wine Cooler"],
  hero: { src: "/images/403-hero.png", alt: "Business Room living lounge with chandelier and open kitchen", position: "50% 55%" },
  living: { src: "/images/403-living.png", alt: "Business Room lounge sofa facing the terrace windows" },
  spaces: [
    { name: "Dining Lounge", src: "/images/403-dining-lounge.png", alt: "Business Room kitchen island dining lounge" },
    { name: "Pamplona", src: "/images/403-pamplona.png", alt: "Pamplona bedroom in the Business Room" },
    { name: "Attic", src: "/images/403-attic-study.png", alt: "Business Room attic with low desks" },
    { name: "Attic", src: "/images/403-attic-rest.png", alt: "Business Room attic rest area with two beds" },
  ],
};

export const guestRoom: Room = {
  slug: "guest-room",
  number: "404",
  name: "Guest Room",
  tagline: "Comfort for your stay. Privacy for your rest.",
  purpose: ["A Place to Stay", "A Space to Unwind"],
  description: [
    "The Guest Room is designed for visiting executives, employees, and guests, with nine beds, two bathrooms, and capacity for nine guests.",
    "Created for both short- and long-term visits, the space offers a comfortable place to rest and recharge between schedules.",
  ],
  experience: "A calm guest residence for executive and team stays, with sleeping capacity for nine guests and amenities designed for a comfortable visit.",
  keywords: [
    { title: "Executive Stay", body: "A comfortable base for domestic and international executives visiting Pangyo." },
    { title: "Guest Accommodation", body: "Nine beds and two bathrooms serve a group of up to nine guests." },
    { title: "Extended Visit", body: "A quiet place to rest and recharge during short- or long-term visits." },
  ],
  facts: [
    { label: "Guests", value: "9" },
    { label: "Beds", value: "9" },
    { label: "Bathrooms", value: "2" },
  ],
  amenities: [
    "TV",
    "Massage Chair",
    "Clothing Care System",
    "Washing Machine",
    "Dryer",
    "Climate Control",
    "Robot Vacuum Cleaner",
    "Dishwasher",
    "Induction Cooktop",
    "Microwave",
    "Multi Cooker",
    "Air Purifier",
    "Hair Dryer",
  ],
  signature: ["Massage Chair", "Dryer", "Microwave"],
  hero: { src: "/images/404-hero.png", alt: "Guest Room living room with leather sofas and wood slat wall", position: "50% 60%" },
  living: { src: "/images/404-living.png", alt: "Guest Room living room with two sofa sets" },
  spaces: [
    { name: "Dining Lounge", src: "/images/404-dining-lounge.png", alt: "Guest Room dining table and kitchen island" },
    { name: "Santiago", src: "/images/404-santiago.png", alt: "Santiago bedroom in the Guest Room", position: "50% 60%" },
    { name: "Burgos / León", src: "/images/404-burgos-leon.png", alt: "Burgos / León bedroom in the Guest Room" },
    { name: "Attic", src: "/images/404-attic.png", alt: "Guest Room attic with desks and beds" },
  ],
};

export const rooms = [businessRoom, guestRoom];
