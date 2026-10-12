import type { Metadata } from "next";
import { Container, SectionLabel } from "@/components/ui";
import { privacyConsent } from "@/content/contact";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  robots: { index: false },
};

// TODO(operator): review with the operator before launch (retention period, contact for privacy requests).
export default function PrivacyPage() {
  return (
    <section className="bg-warm-white pb-28 pt-40 md:pt-48">
      <Container className="max-w-[820px]">
        <SectionLabel>Privacy Notice</SectionLabel>
        <h1 className="mt-5 font-serif text-[44px] font-light leading-none md:text-[60px]">Your Information</h1>
        <div className="mt-12 space-y-10 text-[15px] leading-[1.9] text-charcoal/80">
          <div>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-charcoal">Collected items</h2>
            <p className="mt-2">{privacyConsent.items}, submitted through the contact form.</p>
          </div>
          <div>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-charcoal">Purpose</h2>
            <p className="mt-2">{privacyConsent.purpose}.</p>
          </div>
          <div>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-charcoal">Retention</h2>
            <p className="mt-2">{privacyConsent.retention}.</p>
          </div>
          <div>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-charcoal">Operator</h2>
            <p className="mt-2">{`${site.name} is operated by ${site.operator}. Inquiry details are processed by Formspree to deliver the information to ${site.operator} for the purpose above.`}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
