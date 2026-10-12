import type { Metadata } from "next";
import GuideView from "@/components/GuideView";

// Legacy URL kept working; canonical is /information.
export const metadata: Metadata = {
  title: "Information · Visitor Guide",
  alternates: { canonical: "/information/" },
};

export default function GuidePage() {
  return <GuideView />;
}
