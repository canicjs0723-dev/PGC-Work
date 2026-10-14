// Public visitor guide. Access codes, Wi-Fi credentials and host contacts stay in the private guest guide.

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

// "Your Stay" steps on the Information (Guide) page.
export const stayGuide: { title: string; body: string }[] = [
  {
    title: "Before Arrival",
    body: "Rooms are assigned in advance based on your stay schedule. Room details will be shared before arrival. If parking is needed, please provide your vehicle information for pre-registration.",
  },
  {
    title: "Arrival & Check-in",
    body: "Upon arrival at TH212, please use the secondary entrance and proceed to Building 205. Follow the check-in instructions shared in advance to access your assigned room.",
  },
  {
    title: "During Your Stay",
    body: "Please refer to the in-room guide for Wi-Fi, lighting, appliances, and other facilities. Kindly follow the house guidelines to ensure a comfortable stay for everyone.",
  },
  {
    title: "Check-out",
    body: "Before leaving, please check your belongings, turn off lights and appliances, and leave the room tidy. Kindly notify your host upon departure.",
  },
];
