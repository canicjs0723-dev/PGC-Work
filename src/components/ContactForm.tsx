"use client";

import SiteLink from "@/components/SiteLink";
import { useState } from "react";
import { privacyConsent } from "@/content/contact";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "checkOut" | "message" | "consent", string>>;

// Submissions are emailed to the inquiry inbox through FormSubmit (GitHub Pages has no server to send mail).
// The first submission sends FormSubmit's one-time activation email to that inbox; once it is activated,
// every inquiry arrives there directly.
const endpoint = `https://formsubmit.co/ajax/${site.inquiryEmail}`;

// Reservation details follow the PGC Stay Request Form (Reservation Details table).
const purposes = ["Welfare", "Business Trip", "Accommodation Only"];

const field =
  "w-full border-0 border-b border-charcoal/25 bg-transparent px-0 py-3 text-[16px] outline-none transition-colors placeholder:text-charcoal/35 focus:border-charcoal";
const label = "text-[11px] uppercase tracking-[0.24em] text-warm-gray";
const small = "text-[0.6875rem] uppercase tracking-[0.18em] text-charcoal/55";

// Nights between two yyyy-mm-dd dates, or null when either is missing or check-out is not after check-in.
function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return null;
  const nights = Math.round((Date.parse(checkOut) - Date.parse(checkIn)) / 86400000);
  return nights > 0 ? nights : null;
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [parking, setParking] = useState("");
  const nights = nightsBetween(checkIn, checkOut);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    const text = (key: string) => String(formData.get(key) ?? "").trim();
    const name = text("name");
    const email = text("email");
    const inquiry = text("message");
    const purpose = formData.getAll("purpose").map(String);

    const nextErrors: FieldErrors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) nextErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email address.";
    if (checkIn && checkOut && !nights) nextErrors.checkOut = "Check-out must be after check-in.";
    if (!inquiry && !checkIn && purpose.length === 0) nextErrors.message = "Please fill in the reservation details or a message.";
    if (formData.get("consent") !== "yes") nextErrors.consent = "Please agree to the collection and use of personal information.";
    setErrors(nextErrors);
    const firstInvalid = (["name", "email", "checkOut", "message", "consent"] as const).find((key) => nextErrors[key]);
    if (firstInvalid) {
      setStatus("error");
      setMessage("Please check the highlighted fields.");
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    // The email lists these in order, with readable names, as a table.
    const when = (date: string, time: string) => [date, time && `(estimated ${time})`].filter(Boolean).join(" ");
    const payload: Record<string, string> = {
      Name: name,
      Company: text("company"),
      Email: email,
      Phone: text("phone"),
      "Purpose of stay": purpose.join(", "),
      "Check-in": when(checkIn, text("checkInTime")),
      "Check-out": when(checkOut, text("checkOutTime")),
      "Total stay": nights ? `${nights} night${nights > 1 ? "s" : ""} / ${nights + 1} days` : "",
      "Number of guests": text("guests") && `${text("guests")} (including applicant)`,
      "Relationship to accompanying guest(s)": text("relationship"),
      Parking: parking === "required" ? `Required${text("vehicle") ? ` (vehicle ${text("vehicle")})` : ""}` : parking === "none" ? "Not required" : "",
      Message: inquiry,
      Consent: "yes",
      _honey: text("_honey"),
      _subject: `[PGC Inquiry] ${name}`,
      _replyto: email,
      _template: "table",
    };
    for (const key of Object.keys(payload)) if (payload[key] === "" && key !== "_honey") delete payload[key];

    setStatus("sending");
    setMessage("");
    // Give up after a while rather than leave the button spinning if FormSubmit stalls.
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 30000);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "content-type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const data = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
      if (!res.ok || String(data.success) !== "true") {
        throw new Error(data.message || "We could not send your inquiry.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      const reason = err instanceof Error && err.name !== "AbortError" && !/fetch/i.test(err.message) ? err.message : "We could not send your inquiry.";
      setMessage(`${reason.replace(/[.!?]?\s*$/, ".")} Please try again in a moment.`);
    } finally {
      window.clearTimeout(timer);
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
          <span className={label}>Name *</span>
          <input name="name" required maxLength={80} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} className={field} />
          {errors.name && <span id="name-error" className="mt-2 block text-[13px] text-red-700">{errors.name}</span>}
        </label>
        <label className="block">
          <span className={label}>Company</span>
          <input name="company" maxLength={120} autoComplete="organization" className={field} />
        </label>
        <label className="block">
          <span className={label}>Email *</span>
          <input name="email" type="email" required maxLength={120} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className={field} />
          {errors.email && <span id="email-error" className="mt-2 block text-[13px] text-red-700">{errors.email}</span>}
        </label>
        <label className="block">
          <span className={label}>Phone</span>
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" className={field} />
        </label>
      </div>

      {/* Reservation details, laid out like the table on the PGC Stay Request Form */}
      <fieldset>
        <legend className={label}>Reservation Details</legend>
        <div className="mt-4 divide-y divide-line border-y border-line">
          <div className="grid gap-3 py-5">
            <p className="text-[0.875rem] font-semibold text-charcoal">Purpose of Stay</p>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {purposes.map((p) => (
                <label key={p} className="flex cursor-pointer items-center gap-2.5 text-[0.9375rem] text-charcoal">
                  <input type="checkbox" name="purpose" value={p} className="size-4 accent-charcoal" />
                  {p}
                </label>
              ))}
            </div>
          </div>

          <div className="grid gap-3 py-5">
            <p className="text-[0.875rem] font-semibold text-charcoal">Preferred Schedule</p>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-[1fr_10rem]">
                <label className="block">
                  <span className={small}>Check-in</span>
                  <input name="checkIn" type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={field} />
                </label>
                <label className="block">
                  <span className={small}>Estimated time</span>
                  <input name="checkInTime" type="time" className={field} />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-[1fr_10rem]">
                <label className="block">
                  <span className={small}>Check-out</span>
                  <input
                    name="checkOut"
                    type="date"
                    value={checkOut}
                    min={checkIn || undefined}
                    onChange={(e) => setCheckOut(e.target.value)}
                    aria-invalid={Boolean(errors.checkOut)}
                    aria-describedby={errors.checkOut ? "checkout-error" : undefined}
                    className={field}
                  />
                </label>
                <label className="block">
                  <span className={small}>Estimated time</span>
                  <input name="checkOutTime" type="time" className={field} />
                </label>
              </div>
              {errors.checkOut && <p id="checkout-error" className="text-[13px] text-red-700">{errors.checkOut}</p>}
              <p className="text-[0.875rem] text-charcoal/70">
                Total: <span className="font-semibold text-charcoal">{nights ? `${nights} night${nights > 1 ? "s" : ""} / ${nights + 1} days` : "— nights / — days"}</span>
              </p>
            </div>
          </div>

          <div className="grid gap-3 py-5">
            <p className="text-[0.875rem] font-semibold text-charcoal">Number of Guests</p>
            <div className="grid items-end gap-4 sm:grid-cols-[9rem_1fr]">
              <label className="block">
                <span className={small}>Total (incl. applicant)</span>
                <input name="guests" type="number" min={1} max={20} inputMode="numeric" className={field} />
              </label>
              <label className="block">
                <span className={small}>Relationship to accompanying guest(s)</span>
                <input name="relationship" maxLength={120} className={field} />
              </label>
            </div>
          </div>

          <div className="grid gap-3 py-5">
            <p className="text-[0.875rem] font-semibold text-charcoal">Room &amp; Parking</p>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                <label className="flex cursor-pointer items-center gap-2.5 text-[0.9375rem] text-charcoal">
                  <input type="radio" name="parking" value="required" checked={parking === "required"} onChange={() => setParking("required")} className="size-4 accent-charcoal" />
                  Required
                </label>
                <label className="flex cursor-pointer items-center gap-2.5 text-[0.9375rem] text-charcoal">
                  <input type="radio" name="parking" value="none" checked={parking === "none"} onChange={() => setParking("none")} className="size-4 accent-charcoal" />
                  Not required
                </label>
              </div>
              {parking === "required" && (
                <label className="block max-w-xs">
                  <span className={small}>Vehicle number</span>
                  <input name="vehicle" maxLength={20} className={field} />
                </label>
              )}
            </div>
          </div>
        </div>
      </fieldset>

      <label className="block">
        <span className={label}>Message</span>
        <textarea
          name="message"
          rows={4}
          maxLength={3000}
          placeholder="Anything else we should know"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${field} resize-y`}
        />
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
