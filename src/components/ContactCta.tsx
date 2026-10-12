import Image from "next/image";
import { ArrowLink, SectionLabel } from "./ui";

export default function ContactCta() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <Image
        src="/images/building-205-dusk.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[50%_40%] opacity-40"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/20" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-40">
        <div className="reveal">
          <SectionLabel light>Contact Us</SectionLabel>
          <h2 className="mt-6 font-serif text-[44px] font-light leading-[1] md:text-[80px]">
            Welcome to
            <br />
            Pangyo Global Campus
          </h2>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-white/80 md:text-[17px]">
            For business stays, guest arrangements and visit inquiries.
          </p>
          <div className="mt-12">
            <ArrowLink href="/contact" light>
              Contact Us
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
