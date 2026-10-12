// Public visitor guide. Access codes, Wi-Fi credentials and host contacts stay in the private guest guide.

export const reservation = [
  {
    title: "Room Assignment",
    lines: [
      "Rooms are assigned based on purpose and schedule.",
      "Details will be shared before arrival.",
      "Spaces may vary by operation.",
    ],
  },
  {
    title: "Check-in",
    lines: [
      "Please follow the pre-arrival guide.",
      "Refer to the in-room guide for details.",
      "For inquiries, contact the person in charge.",
    ],
  },
  {
    title: "Check-out",
    lines: [
      "Please check your belongings before departure.",
      "Help keep the room tidy.",
      "Please notify the host after check-out.",
    ],
  },
];

export const stayFlow = [
  {
    no: "01",
    title: "Arrival",
    body: "Head to Pangyo Global Campus (TH212) in Daejang-dong. Enter through the secondary entrance and proceed to Building 205.",
  },
  {
    no: "02",
    title: "Parking",
    body: "Parking is available only after pre-registration. Share your visitor count, stay period and vehicle details before your visit.",
  },
  {
    no: "03",
    title: "Check-in",
    body: "Building access details and the pre-arrival guide are shared privately with confirmed guests before arrival.",
  },
  {
    no: "04",
    title: "Stay",
    body: "Refer to the in-room guide for lighting and facilities. Please follow the guest guidelines for a quiet, premium stay.",
  },
  {
    no: "05",
    title: "Check-out",
    body: "Check your belongings, turn off lights and appliances, and let the host know your departure time to coordinate cleaning.",
  },
];

export const guidelines = [
  {
    icon: "quiet",
    title: "Keep It Quiet",
    body: "To ensure a focused and relaxing environment for everyone, please maintain a quiet atmosphere, especially during late-night and early-morning hours.",
  },
  {
    icon: "power",
    title: "Turn Off Before Leaving",
    body: "For energy conservation and safety, please turn off all lights and electronic appliances, including air conditioning and heating, before you leave.",
  },
  {
    icon: "care",
    title: "Handle With Care",
    body: "Please handle all room amenities and facilities with care. If any damage or contamination occurs, notify the person in charge immediately.",
  },
  {
    icon: "waste",
    title: "Waste Separation",
    body: "Please separate your waste properly and dispose of it in the designated recycling bins.",
  },
  {
    icon: "smoke",
    title: "Smoking Areas Only",
    body: "The property, including all rooms and terraces, is strictly non-smoking. Please use only the designated outdoor smoking areas.",
  },
  {
    icon: "lock",
    title: "Lock the Door",
    body: "For your security and privacy, please make sure the door is fully locked whenever you leave your room or meeting spaces.",
  },
] as const;

export type GuidelineIcon = (typeof guidelines)[number]["icon"];

export const checkout = [
  "Please contact the host after check-out and share your expected departure time to help coordinate the cleaning schedule.",
  "After your stay, a brief follow-up call will be made to gather feedback on your experience and improve our service. We appreciate your cooperation.",
];

export const faq = [
  {
    q: "How do I register parking?",
    a: [
      "Please inform the host before your visit with the details below. Parking registration will be arranged in advance once the information is received.",
    ],
    list: [
      "Number of visitors & period of stay",
      "Vehicle license plate number & registration status",
      "Applicant's name & contact information",
    ],
  },
  {
    q: "Is food delivery or bringing outside food allowed?",
    a: [
      "Yes, food delivery and outside food are allowed. Deliveries will be made to your door. However, please avoid cooking or foods with strong odors.",
    ],
  },
  {
    q: "Are there attractions to visit near Pangyo Global Campus?",
    a: [
      "Yes, several major attractions are accessible within a 20 to 50-minute drive from the campus.",
    ],
    list: [
      "Seoul Grand Park — approx. 17 km, around 25 min by car",
      "Lotte Premium Outlet Uiwang — approx. 20 km, around 20 min by car",
      "Lotte World — approx. 22 km, around 35 min by car",
      "Gangnam COEX — approx. 25 km, around 35 min by car",
      "Myeong-dong Street — approx. 27 km, around 50 min by car",
    ],
  },
  {
    q: "How do I get building access and Wi-Fi details?",
    a: [
      "For guest security, access information and Wi-Fi details are not published on this website. They are shared privately with confirmed guests before arrival.",
    ],
  },
];

// One continuous guide: room assignment -> arrival -> parking -> check-in -> stay -> check-out.
// Built only from the existing reservation / stayFlow / checkout copy (no new wording).
const flow = (title: string) => stayFlow.find((s) => s.title === title)!;
const lines = (title: string) => reservation.find((r) => r.title === title)!.lines;

export const stayGuide: { title: string; lead: string; details?: string[]; parking?: boolean }[] = [
  { title: "Room Assignment", lead: lines("Room Assignment")[0], details: lines("Room Assignment").slice(1) },
  { title: "Arrival", lead: flow("Arrival").body },
  { title: "Parking", lead: flow("Parking").body, parking: true },
  { title: "Check-in", lead: flow("Check-in").body, details: lines("Check-in") },
  { title: "Stay", lead: flow("Stay").body },
  { title: "Check-out", lead: flow("Check-out").body, details: [...lines("Check-out"), ...checkout] },
];
