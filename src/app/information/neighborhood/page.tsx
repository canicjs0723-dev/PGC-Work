import type { Metadata } from "next";
import NeighborhoodView from "@/components/NeighborhoodView";

export const metadata: Metadata = {
  title: "Information · Neighborhood",
  description: "Local dining, places to visit and everyday essentials near Pangyo Global Campus (TH212, Building 205).",
};

export default function NeighborhoodPage() {
  return <NeighborhoodView />;
}
