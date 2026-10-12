import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

type SiteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

function staticHref(href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;

  const destination = new URL(href, "https://pgc-renewal.invalid");
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");
  const pathname = destination.pathname === "/" ? "/" : `${destination.pathname.replace(/\/+$/, "")}/`;
  return `${basePath}${pathname}${destination.search}${destination.hash}`;
}

export default function SiteLink({ href, ...props }: SiteLinkProps) {
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT === "1") {
    return <a href={staticHref(href)} {...props} />;
  }

  return <Link href={href} {...props} />;
}
