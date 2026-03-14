import {
  cleanText,
  json,
  readJson,
  sendEmailViaConfiguredProvider,
  toParagraphHtml
} from "./_shared.js";

const ACTIVE_CODE_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;
const verificationDispatchCache = new Map();

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Max-Age": "86400",
      "Vary": "Origin",
      "Cache-Control": "no-store"
    }
  });
}

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

function isTransientDeliveryResult(result = null) {
  const status = Number(result?.status || 0);
  const message = String(
    result?.message
    || result?.gmailError
    || result?.mailchannelsError
    || result?.zohoMailError
    || result?.resendError
    || ""
  ).trim();
  return [0, 409, 425, 429, 500, 502, 503, 504].includes(status)
    || /temporar|timeout|network|unavailable|internal|rate limit|too many/i.test(message);
}

function activeDispatchKey(email = "", context = "vvs") {
  return `${String(context || "vvs").trim().toLowerCase()}::${String(email || "").trim().toLowerCase()}`;
}

function readDispatchCache(email = "", context = "vvs") {
  const key = activeDispatchKey(email, context);
  const entry = verificationDispatchCache.get(key);
  if (!entry || typeof entry !== "object") return null;
  const lastAcceptedAt = Number(entry.lastAcceptedAt || 0);
  if (!Number.isFinite(lastAcceptedAt) || lastAcceptedAt <= 0) {
    verificationDispatchCache.delete(key);
    return null;
  }
  if ((Date.now() - lastAcceptedAt) > ACTIVE_CODE_TTL_MS) {
    verificationDispatchCache.delete(key);
    return null;
  }
  return entry;
}

function writeDispatchCache(email = "", context = "vvs", patch = {}) {
  const key = activeDispatchKey(email, context);
  const current = verificationDispatchCache.get(key) || {};
  const next = {
    ...current,
    ...patch,
    email: String(email || "").trim().toLowerCase(),
    context: String(context || "vvs").trim().toLowerCase()
  };
  verificationDispatchCache.set(key, next);
  return next;
}

export async function onRequestPost(context) {
  try {
    const payload = await readJson(context.request);
    if (!payload) return json({ ok: false, message: "Invalid JSON body." }, 400);

    const email = String(payload.email || "").trim().toLowerCase();
    const code = String(payload.code || "").trim();
    const targetContext = String(payload.context || "vvs").trim().toLowerCase();
    const recipientName = cleanText(payload.name || "");

    if (!/.+@.+\..+/.test(email) || !/^\d{6}$/.test(code)) {
      return json({ ok: false, message: "Valid email and 6-digit code are required." }, 400);
    }

    const cached = readDispatchCache(email, targetContext);
    if (cached && String(cached.code || "").trim() === code) {
      const lastAttemptAt = Number(cached.lastAttemptAt || 0);
      if (Number.isFinite(lastAttemptAt) && (Date.now() - lastAttemptAt) < RESEND_COOLDOWN_MS) {
        return json({
          ok: true,
          skipped: false,
          message: "Confirmation code is already active for this mailbox.",
          email: {
            ok: true,
            skipped: false,
            provider: "dispatch-cache",
            cached: true,
            message: "Recent active code reused to prevent provider throttling."
          }
        }, 200);
      }
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

    const retryDelaysMs = [0, 1200, 2500];
    let emailResult = {
      ok: false,
      skipped: false,
      provider: "delivery",
      message: "Delivery provider is temporarily unavailable."
    };
    for (let attempt = 0; attempt < retryDelaysMs.length; attempt += 1) {
      if (retryDelaysMs[attempt] > 0) {
        await new Promise((resolve) => setTimeout(resolve, retryDelaysMs[attempt]));
      }
      writeDispatchCache(email, targetContext, {
        code,
        lastAttemptAt: Date.now()
      });
      try {
        emailResult = await sendEmailViaConfiguredProvider(context.env, {
          to: [email],
          subject,
          html,
          text: `${intro}\n\n${code}\n\nIf you did not request this code, ignore this email.`
        });
      } catch (deliveryError) {
        emailResult = {
          ok: false,
          skipped: false,
          provider: "delivery",
          status: 0,
          message: "Delivery provider is temporarily unavailable.",
          error: String(deliveryError?.message || "Unknown delivery error.")
        };
      }
      if (emailResult.ok) break;
      if (emailResult.skipped || !isTransientDeliveryResult(emailResult)) break;
    }

    if (emailResult.ok) {
      writeDispatchCache(email, targetContext, {
        code,
        lastAcceptedAt: Date.now(),
        lastAttemptAt: Date.now(),
        lastDeliveryOk: true,
        lastMessage: String(emailResult.message || "Confirmation code accepted for delivery.").trim()
      });
    } else {
      const fallback = readDispatchCache(email, targetContext);
      if (fallback && String(fallback.code || "").trim() === code) {
        return json({
          ok: true,
          skipped: false,
          message: "Confirmation code is already active for this mailbox.",
          email: {
            ok: true,
            skipped: false,
            provider: "dispatch-cache",
            cached: true,
            message: "Active code retained while provider is throttled."
          }
        }, 200);
      }
    }

    return json({
      ok: !!emailResult.ok,
      skipped: !!emailResult.skipped,
      message: emailResult.ok
        ? "Confirmation code accepted for delivery."
        : (emailResult.message || "Confirmation code delivery failed."),
      email: emailResult
    }, emailResult.ok || emailResult.skipped ? 200 : 502);
  } catch (error) {
    return json({
      ok: false,
      skipped: false,
      message: "Confirmation code delivery failed.",
      error: String(error?.message || "Unhandled verification error.")
    }, 502);
  }
}
