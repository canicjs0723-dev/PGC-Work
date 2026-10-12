"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Adds `.is-in` to every `.reveal` / `.reveal-img` element once it scrolls into view.
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    const els = document.querySelectorAll(".reveal:not(.is-in), .reveal-img:not(.is-in)");
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
