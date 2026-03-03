import {
  cleanText,
  json,
  readJson,
  sendEmailViaConfiguredProvider,
  toParagraphHtml
} from "./_shared.js";

function subjectByContext(context = "") {
  return String(context || "").trim().toLowerCase() === "sunrise"
    ? "Sunrise confirmation code"
    : "VVS confirmation code";
}

function introByContext(context = "") {
  return String(context || "").trim().toLowerCase() === "sunrise"
    ? "Use this code to continue your Sunrise verification."
    : "Use this code to continue your VVS verification.";
}

export async function onRequestPost(context) {
  const payload = await readJson(context.request);
  if (!payload) return json({ ok: false, message: "Invalid JSON body." }, 400);

  const email = String(payload.email || "").trim().toLowerCase();
  const code = String(payload.code || "").trim();
  const targetContext = String(payload.context || "vvs").trim().toLowerCase();
  const recipientName = cleanText(payload.name || "");

  if (!/.+@.+\..+/.test(email) || !/^\d{6}$/.test(code)) {
    return json({ ok: false, message: "Valid email and 6-digit code are required." }, 400);
  }

  const subject = subjectByContext(targetContext);
  const intro = introByContext(targetContext);
  const salutation = recipientName ? `Dear ${toParagraphHtml(recipientName)},` : "Dear VVS client,";
  const html = `
    <div style="font-family:'Avenir Next','Segoe UI',Arial,sans-serif;background:#050608;color:#f2efe7;padding:32px;">
      <div style="max-width:620px;margin:0 auto;border:1px solid rgba(201,168,114,.28);border-radius:24px;padding:28px;background:linear-gradient(180deg, rgba(18,16,12,.96), rgba(8,8,10,.98));">
        <p style="margin:0 0 18px;letter-spacing:.18em;text-transform:uppercase;color:#c9a872;font-size:12px;">Venture Voyager Services</p>
        <p style="margin:0 0 12px;">${salutation}</p>
        <p style="margin:0 0 20px;">${toParagraphHtml(intro)}</p>
        <div style="margin:0 0 20px;padding:18px 20px;border-radius:18px;border:1px solid rgba(201,168,114,.28);background:rgba(255,255,255,.03);font-size:30px;letter-spacing:.22em;font-weight:700;text-align:center;">${toParagraphHtml(code)}</div>
        <p style="margin:0 0 10px;">This code is required to complete the current secure access step.</p>
        <p style="margin:0;color:rgba(242,239,231,.72);">If you did not request this code, ignore this email.</p>
      </div>
    </div>
  `;

  const emailResult = await sendEmailViaConfiguredProvider(context.env, {
    to: [email],
    subject,
    html,
    text: `${intro}\n\n${code}\n\nIf you did not request this code, ignore this email.`,
    from: "Venture Voyager Services <concierge@venture-voyagers.com>"
  });

  return json({
    ok: !!emailResult.ok,
    skipped: !!emailResult.skipped,
    message: emailResult.ok
      ? "Confirmation code accepted for delivery."
      : (emailResult.message || "Confirmation code delivery failed."),
    email: emailResult
  }, emailResult.ok || emailResult.skipped ? 200 : 502);
}
