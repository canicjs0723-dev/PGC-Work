import type { Metadata } from "next";
import LocationView from "@/components/LocationView";

// Legacy URL kept working; canonical is /information/location.
export const metadata: Metadata = {
  title: "Information · Location",
  alternates: { canonical: "/information/location/" },
};

export default function LocationPage() {
  return <LocationView />;
}
