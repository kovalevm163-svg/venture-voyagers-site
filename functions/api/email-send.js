import {
  cleanText,
  json,
  readJson,
  sendEmailViaConfiguredProvider,
  splitEmails
} from "./_shared.js";

export async function onRequestPost(context) {
  const payload = await readJson(context.request);
  if (!payload) return json({ ok: false, message: "Invalid JSON body." }, 400);

  const to = splitEmails(payload.to);
  const cc = splitEmails(payload.cc);
  const bcc = splitEmails(payload.bcc);
  const subject = cleanText(payload.subject);
  const html = String(payload.html || "").trim();
  const text = cleanText(payload.text || "");
  const replyTo = splitEmails(payload.replyTo);
  const from = cleanText(payload.from || "");
  const attachments = Array.isArray(payload.attachments) ? payload.attachments : [];

  if (!to.length || !subject || (!html && !text)) {
    return json({ ok: false, message: "Missing required email fields." }, 400);
  }

  const emailResult = await sendEmailViaConfiguredProvider(context.env, {
    to,
    cc,
    bcc,
    subject,
    html: html || `<p>${text}</p>`,
    text,
    replyTo,
    from,
    attachments
  });

  return json({
    ok: !!emailResult.ok,
    message: emailResult.ok ? "Email accepted." : (emailResult.message || "Email provider request failed."),
    email: emailResult
  }, emailResult.ok || emailResult.skipped ? 200 : 502);
}
