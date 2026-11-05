"use client";

import SiteLink from "@/components/SiteLink";
import { useState, useSyncExternalStore } from "react";
import { privacyConsent } from "@/content/contact";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "message" | "attachment" | "consent", string>>;

// Submissions are emailed to the inquiry inbox through FormSubmit (GitHub Pages has no server to send mail).
// The first submission sends FormSubmit's one-time activation email to that inbox; once it is activated,
// every inquiry arrives there directly.
const endpoint = `https://formsubmit.co/ajax/${site.inquiryEmail}`;
// FormSubmit takes file attachments only through a normal form post (multipart), not its AJAX endpoint. When a
// file is attached the form is posted there and FormSubmit sends the visitor back here with ?sent=1.
const postEndpoint = `https://formsubmit.co/${site.inquiryEmail}`;
const maxAttachmentBytes = 10 * 1024 * 1024;
const acceptedFiles = ".doc,.docx,.pdf,.hwp,.hwpx,.jpg,.jpeg,.png";
const reservationForm = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/files/PGC_Reservation_Form.docx`;

const noop = () => () => {};
const returnedAfterPost = () => new URLSearchParams(window.location.search).get("sent") === "1";

const field =
  "w-full border-0 border-b border-charcoal/25 bg-transparent px-0 py-3 text-[16px] outline-none transition-colors placeholder:text-charcoal/35 focus:border-charcoal";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const posted = useSyncExternalStore(noop, returnedAfterPost, () => false);

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
    const file = formData.get("attachment");
    const hasFile = file instanceof File && file.size > 0;
    if (hasFile && file.size > maxAttachmentBytes) nextErrors.attachment = "Please attach a file of 10 MB or less.";
    if (formData.get("consent") !== "yes") nextErrors.consent = "Please agree to the collection and use of personal information.";
    setErrors(nextErrors);
    const firstInvalid = (["name", "email", "message", "attachment", "consent"] as const).find((key) => nextErrors[key]);
    if (firstInvalid) {
      setStatus("error");
      setMessage("Please check the highlighted fields.");
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }
    formData.set("name", name);
    formData.set("email", email);
    formData.set("message", inquiry);

    if (hasFile) {
      // Normal form post so the file goes along; FormSubmit redirects back to this page afterwards.
      setStatus("sending");
      setMessage("");
      (form.elements.namedItem("name") as HTMLInputElement).value = name;
      (form.elements.namedItem("email") as HTMLInputElement).value = email;
      (form.elements.namedItem("message") as HTMLTextAreaElement).value = inquiry;
      const hidden = { _subject: `[PGC Inquiry] ${name}`, _replyto: email, _template: "table", _captcha: "false", _next: `${window.location.origin}${window.location.pathname}?sent=1` };
      for (const [key, value] of Object.entries(hidden)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }
      form.action = postEndpoint;
      form.method = "POST";
      form.enctype = "multipart/form-data";
      HTMLFormElement.prototype.submit.call(form);
      return;
    }
    formData.delete("attachment");

    setStatus("sending");
    setMessage("");
    try {
      formData.set("_subject", `[PGC Inquiry] ${name}`);
      formData.set("_replyto", email);
      formData.set("_template", "table");
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
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

  if (status === "sent" || posted) {
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
        <textarea name="message" required rows={5} maxLength={3000} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} className={`${field} resize-y`} />
        {errors.message && <span id="message-error" className="mt-2 block text-[13px] text-red-700">{errors.message}</span>}
      </label>

      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.24em] text-warm-gray">Attachment</span>
        <input
          name="attachment"
          type="file"
          accept={acceptedFiles}
          aria-invalid={Boolean(errors.attachment)}
          aria-describedby={errors.attachment ? "attachment-error" : "attachment-hint"}
          className="mt-3 block w-full text-[14px] text-charcoal/75 file:mr-4 file:cursor-pointer file:border file:border-charcoal/30 file:bg-transparent file:px-4 file:py-2 file:text-[0.75rem] file:uppercase file:tracking-[0.16em] file:text-charcoal hover:file:border-charcoal"
        />
        <span id="attachment-hint" className="mt-2 block text-[0.8125rem] text-charcoal/55">
          Optional · Word, PDF, HWP or image · up to 10 MB
        </span>
        {errors.attachment && <span id="attachment-error" className="mt-2 block text-[13px] text-red-700">{errors.attachment}</span>}
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

      <div className="border-t border-line pt-6">
        <a
          href={reservationForm}
          download="PGC_Reservation_Form.docx"
          className="inline-flex items-center gap-3 border border-charcoal/30 px-5 py-3 text-[0.8125rem] uppercase tracking-[0.16em] text-charcoal transition-colors hover:border-charcoal"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden>
            <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14" />
          </svg>
          Reservation Form <span className="text-charcoal/50">(Word)</span>
        </a>
        <p className="mt-3 text-[0.875rem] leading-relaxed text-charcoal/65">
          ※ We would appreciate it if you could refer to this form when writing your message. You can also fill it
          in and attach it above.
        </p>
      </div>
    </form>
  );
}
