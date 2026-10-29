import type { Metadata } from "next";
import LocationView from "@/components/LocationView";

// Information now opens on Location (the Guide moved under Rooms at /guide); this URL keeps working.
export const metadata: Metadata = {
  title: "Information · Location",
  alternates: { canonical: "/information/location/" },
};

export default function InformationPage() {
  return <LocationView />;
}
