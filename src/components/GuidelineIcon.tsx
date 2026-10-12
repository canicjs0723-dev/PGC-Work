import type { GuidelineIcon as IconName } from "@/content/guide";

// Simple 1.2px line icons for the six guest guidelines.
export default function GuidelineIcon({ name, className = "size-8" }: { name: IconName; className?: string }) {
  const common = {
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };
  switch (name) {
    case "quiet":
      return (
        <svg {...common}>
          <path d="M5 13h4l6-5v16l-6-5H5z" />
          <path d="M21 12l6 8M27 12l-6 8" />
        </svg>
      );
    case "power":
      return (
        <svg {...common}>
          <path d="M16 5v10" />
          <path d="M10 8.5a9 9 0 1 0 12 0" />
        </svg>
      );
    case "care":
      return (
        <svg {...common}>
          <path d="M5 15L16 6l11 9" />
          <path d="M8 13v13h16V13" />
          <path d="M16 23s-4-2.4-4-5a2 2 0 0 1 4-.6 2 2 0 0 1 4 .6c0 2.6-4 5-4 5z" />
        </svg>
      );
    case "waste":
      return (
        <svg {...common}>
          <path d="M11 8l2-3h6l2 3" />
          <path d="M6 8h20" />
          <path d="M8 8l1.5 19h13L24 8" />
          <path d="M13 13v9M19 13v9" />
        </svg>
      );
    case "smoke":
      return (
        <svg {...common}>
          <rect x="4" y="18" width="19" height="4" />
          <path d="M26 18v4M29 18v4" />
          <path d="M5 6l22 20" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="7" y="14" width="18" height="13" rx="1" />
          <path d="M11 14V10a5 5 0 0 1 10 0v4" />
          <path d="M16 19v3" />
        </svg>
      );
  }
}
