"use client";

import SiteLink from "@/components/SiteLink";
import { useState } from "react";
import { privacyConsent } from "@/content/contact";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "mailed" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

// GitHub Pages has no server to send mail, and the free form relays (FormSubmit, then Web3Forms) proved
// unreliable or could not be set up. So by default the inquiry opens in the visitor's own email app,
// addressed to the inquiry inbox and already filled in; they press Send there. If a Web3Forms access key is
// ever set in site.ts, the form posts to Web3Forms instead.
const web3forms = site.web3formsAccessKey ? "https://api.web3forms.com/submit" : "";

const field =
  "w-full border-0 border-b border-charcoal/25 bg-transparent px-0 py-3 text-[16px] outline-none transition-colors placeholder:text-charcoal/35 focus:border-charcoal";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [mailto, setMailto] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const inquiry = String(formData.get("message") ?? "").trim();

    const nextErrors: FieldErrors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) nextErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email address.";
    if (!inquiry) nextErrors.message = "Please enter your message.";
    if (formData.get("consent") !== "yes") nextErrors.consent = "Please agree to the collection and use of personal information.";
    setErrors(nextErrors);
    const firstInvalid = (["name", "email", "message", "consent"] as const).find((key) => nextErrors[key]);
    if (firstInvalid) {
      setStatus("error");
      setMessage("Please check the highlighted fields.");
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }
    formData.set("name", name);
    formData.set("email", email);
    formData.set("message", inquiry);

    const subject = `[PGC Inquiry] ${name}`;
    const company = String(formData.get("company") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();

    if (!web3forms) {
      const body = [
        `Name: ${name}`,
        company ? `Company: ${company}` : null,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        "",
        inquiry,
        "",
        "(I agree to the collection and use of my personal information for this inquiry.)",
      ]
        .filter((line) => line !== null)
        .join("\n");
      const href = `mailto:${site.inquiryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setMailto(href);
      setStatus("mailed");
      setMessage("");
      window.location.href = href;
      return;
    }

    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch(web3forms, {
        method: "POST",
        headers: { Accept: "application/json", "content-type": "application/json" },
        body: JSON.stringify({
          access_key: site.web3formsAccessKey,
          subject,
          from_name: "PGC Website",
          replyto: email,
          botcheck: Boolean(formData.get("_honey")),
          Name: name,
          Company: company,
          Email: email,
          Phone: phone,
          Message: inquiry,
          Consent: "Agreed",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
      if (!res.ok || String(data.success) !== "true") {
        throw new Error(data.message || "We could not send your inquiry.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      const reason = err instanceof Error ? err.message : "We could not send your inquiry.";
      setMessage(`${reason.replace(/[.!?]?\s*$/, ".")} Please try again in a moment.`);
    }
  }

  if (status === "mailed") {
    return (
      <div className="border-t border-charcoal/20 pt-10" role="status">
        <p className="font-serif text-[36px] font-light">Almost done.</p>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-charcoal/70">
          Your email app should now be open with your inquiry filled in. Please press <strong className="font-semibold text-charcoal">Send</strong> there to
          reach us.
        </p>
        <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-charcoal/60">
          Nothing opened?{" "}
          <a href={mailto} className="underline underline-offset-2">
            Try again
          </a>{" "}
          or write to us directly at{" "}
          <a href={`mailto:${site.inquiryEmail}`} className="underline underline-offset-2">
            {site.inquiryEmail}
          </a>
          .
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-8 border-b border-charcoal/40 pb-0.5 text-[0.8125rem] uppercase tracking-[0.14em] hover:border-charcoal">
          Back to the form
        </button>
      </div>
    );
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
          <input name="name" required maxLength={80} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} className={field} />
          {errors.name && <span id="name-error" className="mt-2 block text-[13px] text-red-700">{errors.name}</span>}
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.24em] text-warm-gray">Company</span>
          <input name="company" maxLength={120} autoComplete="organization" className={field} />
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.24em] text-warm-gray">Email *</span>
          <input name="email" type="email" required maxLength={120} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className={field} />
          {errors.email && <span id="email-error" className="mt-2 block text-[13px] text-red-700">{errors.email}</span>}
        </label>
        <label className="block">
          <span className="text-[11px] uppercase tracking-[0.24em] text-warm-gray">Phone</span>
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" className={field} />
        </label>
      </div>

      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.24em] text-warm-gray">Message *</span>
        <textarea name="message" required rows={5} maxLength={1500} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} className={`${field} resize-y`} />
        {errors.message && <span id="message-error" className="mt-2 block text-[13px] text-red-700">{errors.message}</span>}
      </label>

      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

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
          <input type="checkbox" name="consent" value="yes" required aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} className="size-4 accent-charcoal" />I agree
        </label>
        {errors.consent && <p id="consent-error" className="text-[13px] text-red-700">{errors.consent}</p>}
      </div>

      {status === "error" && (
        <p className="text-[14px] text-red-700" role="alert">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
        className="group inline-flex items-center gap-4 bg-charcoal px-8 py-4 text-[13px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-navy disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}
