import type { Icon } from "@/content/neighborhood";

// Line icons, drawn on a 24-unit grid.
const iconPaths: Record<Icon, string> = {
  dining: "M7 3v8m-2-8v5a2 2 0 0 0 4 0V3m-2 8v10M17 3c-2 1.5-3 4-3 7h3v11",
  coffee: "M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 3c0 1.5 1 1.5 1 3M12 3c0 1.5 1 1.5 1 3",
  bakery: "M4 14c0-5 3.5-8 8-8s8 3 8 8v2H4zM8 10l1 4M12 9v5M16 10l-1 4M4 19h16",
  store: "M4 9l1.5-5h13L20 9M4 9h16v11H4zM4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0M10 20v-5h4v5",
  cart: "M3 4h2.5l2 11h10.5l2-8H7M9 20a1 1 0 1 0 0-.01M17 20a1 1 0 1 0 0-.01",
  pharmacy: "M6 4h12v16H6zM12 8v8M8 12h8",
  clinic: "M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10zM12 10v5M9.5 12.5h5",
  laundry: "M5 3h14v18H5zM5 7h14M8 5h.01M12 14a3 3 0 1 0 0 .01",
  park: "M12 3l5 7h-3l4 6H6l4-6H7zM12 16v5",
  shopping: "M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2",
  culture: "M3 9l9-5 9 5M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 21h18",
  nature: "M3 20l6-10 4 6 3-4 5 8zM16 7a2 2 0 1 0 0-.01",
};

export function PlaceIcon({ icon, className = "size-7", strokeWidth = 1.4 }: { icon: Icon; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={iconPaths[icon]} />
    </svg>
  );
}
