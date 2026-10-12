import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Pangyo Global Campus — Premium Business Stay",
    template: "%s | Pangyo Global Campus",
  },
  description:
    "A premium business residence in Daejang-dong, Pangyo, where work, rest and meaningful connections come together. Business Room and Guest Room.",
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
