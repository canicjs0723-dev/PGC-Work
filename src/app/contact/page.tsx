import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import InquiryOffice from "@/components/InquiryOffice";
import { Container, SectionLabel } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Inquiries for business stays, guest arrangements and visits to Pangyo Global Campus.",
};

export default function ContactPage() {
  return (
    <>
    <section className="bg-warm-white">
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="relative hidden bg-charcoal lg:block">
          <div className="sticky top-0 h-svh">
            <div className="relative h-full">
              <Image
                src="/images/404-hero.jpg"
                alt="Guest Room living room"
                fill
                priority
                sizes="50vw"
                className="object-cover object-[40%_60%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
            </div>
          </div>
        </div>

        <div className="relative h-[48svh] min-h-[340px] bg-charcoal text-white lg:hidden">
          <Image
            src="/images/404-hero.jpg"
            alt="Guest Room living room"
            fill
            priority
            sizes="(min-width: 1024px) 0px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-black/25" />
        </div>

        <Container className="py-16 lg:px-16 lg:py-40">
          <SectionLabel>Contact Us</SectionLabel>
          <h1 className="mt-5 font-serif text-[40px] font-light leading-none md:text-[56px]">Inquiry</h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-charcoal/70">
            For business stays, guest arrangements and visit inquiries. Parking registration can also be requested
            here.
          </p>
          <div className="mt-14">
            <ContactForm />
          </div>
          <address className="mt-16 border-t border-line pt-8 text-[13px] not-italic leading-relaxed text-charcoal/65">
            Pangyo Global Campus (TH212) · {site.address.rooms}
            <br />
            {site.address.street} ({site.address.lot})
            <br />
            <a href={`tel:${site.inquiryPhone}`} className="mt-2 inline-block underline underline-offset-4">
              {site.inquiryPhone}
            </a>
          </address>
        </Container>
      </div>
    </section>
    <InquiryOffice />
    </>
  );
}
