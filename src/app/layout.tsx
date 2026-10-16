import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import "./globals.css";

// Public site address, used for absolute link-preview URLs (messengers need the full https:// address).
const repository = process.env.GITHUB_REPOSITORY?.split("/");
const siteUrl = repository ? `https://${repository[0]}.github.io${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}` : "http://localhost:3000";
const description =
  "A premium business residence in Daejang-dong, Pangyo, where work, rest and meaningful connections come together. Business Room and Guest Room.";

export const metadata: Metadata = {
  title: {
    default: "Pangyo Global Campus",
    template: "%s | Pangyo Global Campus",
  },
  description,
  // Link preview shown when the site address is shared in a messenger or social app.
  openGraph: {
    type: "website",
    url: `${siteUrl}/`,
    siteName: "Pangyo Global Campus",
    title: "Pangyo Global Campus",
    description,
    images: [{ url: `${siteUrl}/images/og-pgc-2026.jpg`, width: 1200, height: 630, alt: "Building 205 at Pangyo Global Campus" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pangyo Global Campus",
    description,
    images: [`${siteUrl}/images/og-pgc-2026.jpg`],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
