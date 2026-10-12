"use client";

import SiteLink from "@/components/SiteLink";
import { useState } from "react";
import { privacyConsent } from "@/content/contact";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full border-0 border-b border-charcoal/25 bg-transparent px-0 py-3 text-[16px] outline-none transition-colors placeholder:text-charcoal/35 focus:border-charcoal";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const inquiry = String(formData.get("message") ?? "").trim();

    if (!name || !email || !inquiry || formData.get("consent") !== "yes") {
      setStatus("error");
      setMessage("Please complete all required fields and agree to the privacy notice.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    formData.set("name", name);
    formData.set("email", email);
    formData.set("message", inquiry);

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (!endpoint || !/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint)) {
      setStatus("error");
      setMessage("Online inquiries are not configured yet. Please email rondakorea@rondakorea.com or call us.");
      return;
    }

    setStatus("sending");
    setMessage("");
    try {
      formData.set("_subject", `[PGC Inquiry] ${name}`);
      formData.set("_replyto", email);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; message?: string };
      if (!res.ok) {
        throw new Error(data.error || data.message || "We could not send your inquiry. Please try again later.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "We could not send your inquiry. Please try again later.");
    }
  }

  if (status === "sent") {
    return (
      <div className="border-t border-charcoal/20 pt-10" role="status">
        <p className="font-serif text-[36px] font-light">Thank you.</p>
        <p className="mt-4 text-[15px] leading-relaxed text-charcoal/70">
          Your inquiry has been received. We will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.24em] text-warm-gray">Name *</span>
          <input name="name" required maxLength={80} autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.24em] text-warm-gray">Company</span>
          <input name="company" maxLength={120} autoComplete="organization" className={field} />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.24em] text-warm-gray">Email *</span>
          <input name="email" type="email" required maxLength={120} autoComplete="email" className={field} />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.24em] text-warm-gray">Phone</span>
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" className={field} />
        </label>
      </div>

      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.24em] text-warm-gray">Message *</span>
        <textarea name="message" required rows={5} maxLength={3000} className={`${field} resize-y`} />
      </label>

      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="space-y-3 text-[13px] leading-relaxed text-charcoal/75">
        <p className="font-medium text-charcoal">Consent to collection and use of personal information</p>
        <ul className="space-y-1">
          <li>Items: {privacyConsent.items}</li>
          <li>Purpose: {privacyConsent.purpose}</li>
          <li>Retention: {privacyConsent.retention}</li>
        </ul>
        <p>
          You may decline, but we will be unable to respond to your inquiry.{" "}
          <SiteLink href="/privacy" className="underline underline-offset-2">
            Privacy Notice
          </SiteLink>
        </p>
        <label className="flex cursor-pointer items-center gap-3 text-charcoal">
          <input type="checkbox" name="consent" value="yes" required className="size-4 accent-charcoal" />I agree
        </label>
      </div>

      {status === "error" && (
        <p className="text-[14px] text-red-700" role="alert">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex items-center gap-4 bg-charcoal px-8 py-4 text-[13px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-navy disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}
