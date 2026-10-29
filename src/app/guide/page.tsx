import type { Metadata } from "next";
import GuideView from "@/components/GuideView";

// The stay guide, shown as the last tab under Rooms.
export const metadata: Metadata = {
  title: "Guide",
  description: "Arrival, check-in, guest guidelines and FAQ for your stay at Pangyo Global Campus.",
};

export default function GuidePage() {
  return <GuideView />;
}
