import type { Metadata } from "next";
import LocationView from "@/components/LocationView";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Information · Location",
  description: `${site.address.rooms}, ${site.address.street}. Directions and parking registration for Pangyo Global Campus.`,
};

export default function InformationLocationPage() {
  return <LocationView />;
}
