import SiteLink from "@/components/SiteLink";
import { Container } from "./ui";

export type TabItem = { label: string; href: string; active: boolean };

// Dark tab bar under a page hero — shared by Room (Business / Guest) and Information (Guide / Location).
export default function PageTabs({ label, items }: { label: string; items: TabItem[] }) {
  return (
    <nav aria-label={label} className="border-b border-line bg-charcoal text-white">
      <Container>
        <ul className="flex gap-6 md:gap-12">
          {items.map((t) => (
            <li key={t.href}>
              <SiteLink
                href={t.href}
                aria-current={t.active ? "page" : undefined}
                className={`flex items-baseline gap-2 whitespace-nowrap border-b-2 py-4 font-serif text-[19px] md:gap-3 md:text-[26px] ${
                  t.active ? "border-accent text-white" : "border-transparent text-white/55 hover:text-white"
                }`}
              >
                {t.label}
              </SiteLink>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
