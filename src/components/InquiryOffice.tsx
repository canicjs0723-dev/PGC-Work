import Image from "next/image";
import { Container, SectionLabel } from "./ui";
import { site } from "@/content/site";

// Inquiry & Management Office — three clearly separated contact blocks.
export default function InquiryOffice() {
  return (
    <section id="inquiry-office" aria-labelledby="inquiry-office-title" className="bg-charcoal text-white">
      <Container className="py-20 md:py-28">
        <div className="reveal grid gap-6 border-b border-white/15 pb-12 md:grid-cols-12 md:items-end md:pb-16">
          <div className="md:col-span-7">
            <SectionLabel light>Contact Information</SectionLabel>
            <h2 id="inquiry-office-title" className="mt-5 font-serif text-[40px] font-light leading-[1.02] md:text-[64px]">
              Inquiry &amp;
              <br />
              <span className="italic text-accent">Management Office</span>
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-white/70 md:col-span-4 md:col-start-9">
            For inquiries, contact the person in charge.
          </p>
        </div>

        <div className="reveal grid gap-12 pt-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/15 md:pt-16">
          <div className="md:pr-10">
            <h3 className="text-[12px] font-medium uppercase tracking-[0.28em] text-accent">Inquiry</h3>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={`mailto:${site.inquiryEmail}`}
                  className="break-all font-serif text-[24px] font-light underline-offset-4 hover:underline md:text-[26px]"
                >
                  {site.inquiryEmail}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.inquiryPhoneTel}`}
                  className="font-serif text-[24px] font-light underline-offset-4 hover:underline md:text-[26px]"
                >
                  T. {site.inquiryPhone}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:px-10">
            <h3 className="text-[12px] font-medium uppercase tracking-[0.28em] text-accent">
              Inquiry (WeChat · QR Code)
            </h3>
            <div className="mt-6 flex items-center gap-6">
              <Image
                src="/images/wechat-qr.png"
                alt="WeChat QR code for PGC inquiries"
                width={160}
                height={160}
                className="size-[140px] shrink-0 bg-white md:size-[160px]"
              />
              <p className="text-[14px] leading-relaxed text-white/70">Scan with WeChat to send an inquiry.</p>
            </div>
          </div>

          <div className="md:pl-10">
            <h3 className="text-[12px] font-medium uppercase tracking-[0.28em] text-accent">Management Office</h3>
            <p className="mt-6">
              <a
                href={`tel:${site.managementPhoneTel}`}
                className="font-serif text-[24px] font-light underline-offset-4 hover:underline md:text-[26px]"
              >
                T. {site.managementPhone}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
