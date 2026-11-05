/**
 * PGC website — contact form mailer (Google Apps Script).
 *
 * The site is static (GitHub Pages) and cannot send mail itself. This script, deployed as a web app from the
 * operator's Google account, receives each inquiry from the contact form and emails it to the inquiry inbox.
 * It only ever sends to TO below, so the public web-app URL cannot be used to mail anyone else.
 *
 * Setup (one time, about 10 minutes): see docs/OPERATOR-GUIDE-KO.md → "문의 메일 자동 전송".
 *   1. script.google.com → New project → paste this file → Save.
 *   2. Deploy → New deployment → type "Web app"; Execute as "Me"; Who has access "Anyone" → Deploy,
 *      allow the permissions it asks for (send email as you).
 *   3. Copy the Web app URL (https://script.google.com/macros/s/…/exec) into
 *      src/content/site.ts → contactFormUrl.
 */
const TO = "evan.kim@rondakorea.com";

function doPost(e) {
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    // Honeypot: real visitors never fill this hidden field.
    if (d.botcheck) return reply({ success: true });

    const clip = (v, n) => String(v || "").trim().slice(0, n);
    const name = clip(d.name, 80);
    const email = clip(d.email, 120);
    const message = clip(d.message, 3000);
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
      return reply({ success: false, message: "Please fill in your name, a valid email and a message." });
    }

    const body = [
      "Name: " + name,
      "Company: " + clip(d.company, 120),
      "Email: " + email,
      "Phone: " + clip(d.phone, 40),
      "Consent to collection and use of personal information: " + (d.consent === "yes" ? "Agreed" : "Not given"),
      "",
      message,
      "",
      "— Sent from the PGC website inquiry form",
    ].join("\n");

    MailApp.sendEmail({ to: TO, subject: "[PGC Inquiry] " + name, body: body, replyTo: email, name: "PGC Website" });
    return reply({ success: true });
  } catch (err) {
    return reply({ success: false, message: "We could not send your inquiry." });
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
