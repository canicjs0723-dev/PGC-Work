import type { Metadata } from "next";
import GuideView from "@/components/GuideView";

export const metadata: Metadata = {
  title: "Information · Visitor Guide",
  description: "Reservation information, parking registration, check-in, guest guidelines and FAQ for Pangyo Global Campus.",
};

export default function InformationPage() {
  return <GuideView />;
}
