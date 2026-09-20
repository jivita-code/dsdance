import nodemailer from "nodemailer";

export type InquiryEmail = {
  type: "CONTACT" | "JOIN_US";
  name: string;
  email: string;
  message: string;
  submissionId: string;
  areaOfInterest?: string;
};

const sentOrSending = new Map<string, Promise<void>>();
const duplicateGuardDuration = 24 * 60 * 60 * 1000;

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

function textBlock(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

function emailShell({ preheader, title, body }: { preheader: string; title: string; body: string }) {
  return `<!doctype html><html lang="en"><head><meta charSet="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head><body style="margin:0;background:#f5f4f0;color:#191b1f;font-family:Arial,sans-serif;"><span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${escapeHtml(preheader)}</span><table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="background:#f5f4f0;padding:32px 16px;"><tr><td align="center"><table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="max-width:640px;background:#ffffff;border:1px solid #ddd5c7;"><tr><td style="background:#101113;padding:28px 36px 24px;"><p style="margin:0;color:#d5be91;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">DS Dance Research Lab</p><p style="margin:10px 0 0;color:#f5f4f0;font-family:Georgia,serif;font-size:24px;line-height:1.1;">Where Dance Meets Discovery</p></td></tr><tr><td style="padding:40px 36px 32px;"><h1 style="margin:0 0 20px;color:#101113;font-family:Georgia,serif;font-size:38px;font-weight:400;line-height:1.05;">${escapeHtml(title)}</h1><div style="color:#34373b;font-size:16px;line-height:1.7;">${body}</div></td></tr><tr><td style="border-top:1px solid #ddd5c7;padding:20px 36px;color:#6a6e74;font-size:12px;line-height:1.6;">DS Dance Research Lab · London, United Kingdom<br /><a href="mailto:info@dsdanceresearchlab.com" style="color:#806236;">info@dsdanceresearchlab.com</a></td></tr></table></td></tr></table></body></html>`;
}

function getSettings() {
  const host = process.env.ZOHO_SMTP_HOST;
  const user = process.env.ZOHO_SMTP_USER;
  const password = process.env.ZOHO_SMTP_APP_PASSWORD;
  const fromAddress = process.env.EMAIL_FROM_ADDRESS || user;
  const notificationTo = process.env.INQUIRY_NOTIFICATION_TO || fromAddress;
  const port = Number(process.env.ZOHO_SMTP_PORT || "465");
  if (!host || !user || !password || !fromAddress || !notificationTo || !Number.isFinite(port)) return null;
  return { host, user, password, port, secure: process.env.ZOHO_SMTP_SECURE !== "false", from: `${process.env.EMAIL_FROM_NAME || "DS Dance Research Lab"} <${fromAddress}>`, fromAddress, notificationTo };
}

function acknowledgement(email: InquiryEmail) {
  const join = email.type === "JOIN_US";
  const subject = join ? "Thank you for your interest — DS Dance Research Lab" : "We received your message — DS Dance Research Lab";
  const interest = email.areaOfInterest ? `<p style="margin:0 0 20px;">Your selected area of interest: <strong>${escapeHtml(email.areaOfInterest)}</strong>.</p>` : "";
  const body = join
    ? `<p style="margin:0 0 18px;">Hello ${escapeHtml(firstName(email.name))},</p><p style="margin:0 0 18px;">Thank you for your interest in joining the DS Dance Research Lab community. We have received your enquiry and will review it with care.</p>${interest}<p style="margin:0;">We will be in touch if there is a suitable next step or opportunity to share.</p>`
    : `<p style="margin:0 0 18px;">Hello ${escapeHtml(firstName(email.name))},</p><p style="margin:0 0 18px;">Thank you for contacting DS Dance Research Lab. We have received your message and a member of our team will respond as soon as possible.</p><p style="margin:0;">Warm regards,<br />DS Dance Research Lab</p>`;
  return {
    subject,
    html: emailShell({ preheader: join ? "Your Join Us enquiry has been received." : "Your message has been received.", title: join ? "Thank you for joining our journey." : "Your message is with us.", body }),
    text: join ? `Hello ${firstName(email.name)},\n\nThank you for your interest in DS Dance Research Lab. We have received your enquiry${email.areaOfInterest ? ` about ${email.areaOfInterest}` : ""} and will review it with care.\n\nWe will be in touch if there is a suitable next step or opportunity to share.\n\nDS Dance Research Lab\ninfo@dsdanceresearchlab.com` : `Hello ${firstName(email.name)},\n\nThank you for contacting DS Dance Research Lab. We have received your message and a member of our team will respond as soon as possible.\n\nWarm regards,\nDS Dance Research Lab\ninfo@dsdanceresearchlab.com`,
  };
}

function notification(email: InquiryEmail) {
  const join = email.type === "JOIN_US";
  const subject = join ? `[Join Us] ${email.areaOfInterest || "New enquiry"} — ${email.name}` : `[Website Contact] New message from ${email.name}`;
  const details = join && email.areaOfInterest ? `<p style="margin:0 0 12px;"><strong>Area of interest</strong><br />${escapeHtml(email.areaOfInterest)}</p>` : "";
  const body = `<p style="margin:0 0 22px;">A new ${join ? "Join Us" : "Contact"} enquiry has been saved in JPanel.</p><p style="margin:0 0 12px;"><strong>Name</strong><br />${escapeHtml(email.name)}</p><p style="margin:0 0 12px;"><strong>Email</strong><br /><a href="mailto:${encodeURIComponent(email.email)}" style="color:#806236;">${escapeHtml(email.email)}</a></p>${details}<p style="margin:0 0 12px;"><strong>Message</strong><br />${textBlock(email.message)}</p><p style="margin:24px 0 0;color:#6a6e74;font-size:12px;">Reference: ${escapeHtml(email.submissionId)}</p>`;
  return { subject, html: emailShell({ preheader: `New ${join ? "Join Us" : "Contact"} enquiry from ${email.name}.`, title: join ? "A new collaborator is interested." : "A new message has arrived.", body }), text: `${join ? "Join Us" : "Contact"} enquiry\n\nName: ${email.name}\nEmail: ${email.email}${email.areaOfInterest ? `\nArea of interest: ${email.areaOfInterest}` : ""}\n\nMessage:\n${email.message}\n\nReference: ${email.submissionId}` };
}

async function sendInquiryEmails(email: InquiryEmail) {
  if (process.env.EMAIL_ENABLED !== "true") return;
  const settings = getSettings();
  if (!settings) {
    console.warn("Inquiry email delivery is enabled but Zoho SMTP is not fully configured.");
    return;
  }
  const transporter = nodemailer.createTransport({ host: settings.host, port: settings.port, secure: settings.secure, auth: { user: settings.user, pass: settings.password }, connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 15_000 });
  const internal = notification(email);
  const visitor = acknowledgement(email);
  const [notificationResult, acknowledgementResult] = await Promise.allSettled([
    transporter.sendMail({ from: settings.from, to: settings.notificationTo, replyTo: email.email, subject: internal.subject, html: internal.html, text: internal.text }),
    transporter.sendMail({ from: settings.from, to: email.email, replyTo: settings.fromAddress, subject: visitor.subject, html: visitor.html, text: visitor.text }),
  ]);
  if (notificationResult.status === "rejected") console.error("Inquiry notification email failed.", { submissionId: email.submissionId, type: email.type });
  if (acknowledgementResult.status === "rejected") console.error("Inquiry acknowledgement email failed.", { submissionId: email.submissionId, type: email.type });
}

/** Sends no more than one notification/acknowledgement pair per submission ID in this server process. */
export function dispatchInquiryEmails(email: InquiryEmail) {
  const previous = sentOrSending.get(email.submissionId);
  if (previous) return previous;
  const task = sendInquiryEmails(email).finally(() => {
    const cleanupTimer = setTimeout(() => sentOrSending.delete(email.submissionId), duplicateGuardDuration);
    cleanupTimer.unref?.();
  });
  sentOrSending.set(email.submissionId, task);
  return task;
}
