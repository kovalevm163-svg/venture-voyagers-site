import {
  associateHubSpotContactToTicket,
  cleanText,
  createHubSpotTicket,
  ensureHubSpotContact,
  envValue,
  json,
  readJson,
  sendEmailViaResend,
  toParagraphHtml
} from "./_shared.js";

function htmlPage({ title = "VVS Request", body = "", status = 200 } = {}) {
  return new Response(`<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${toParagraphHtml(title)}</title>
  <style>
    body { margin: 0; font-family: Georgia, serif; background: #050608; color: #f2efe7; }
    .shell { min-height: 100vh; display: grid; place-items: center; padding: 32px; }
    .card { width: min(680px, 100%); background: linear-gradient(180deg, rgba(18,16,12,.96), rgba(8,8,10,.98)); border: 1px solid rgba(201,168,114,.28); border-radius: 28px; padding: 32px; box-shadow: 0 24px 80px rgba(0,0,0,.45); }
    .kicker { letter-spacing: .18em; text-transform: uppercase; color: #c9a872; font-size: 12px; margin-bottom: 18px; }
    h1 { margin: 0 0 12px; font-size: clamp(28px, 5vw, 42px); font-weight: 500; }
    p { margin: 0 0 12px; line-height: 1.6; color: rgba(242,239,231,.86); }
    a { color: #f2efe7; }
    .actions { margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap; }
    .btn { display: inline-block; padding: 12px 18px; border-radius: 999px; border: 1px solid rgba(201,168,114,.35); text-decoration: none; }
  </style>
</head>
<body>
  <div class="shell">
    <section class="card">
      <div class="kicker">Venture Voyager Services</div>
      ${body}
      <div class="actions">
        <a class="btn" href="/">Return to VVS</a>
      </div>
    </section>
  </div>
</body>
</html>`, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

async function readContactPayload(request) {
  const contentType = String(request.headers.get("content-type") || "").toLowerCase();
  if (contentType.includes("application/json")) {
    return {
      payload: await readJson(request),
      wantsHtml: false
    };
  }

  if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    try {
      const form = await request.formData();
      return {
        payload: {
          firstName: String(form.get("firstName") || "").trim(),
          lastName: String(form.get("lastName") || "").trim(),
          title: String(form.get("title") || "").trim(),
          countryIssued: String(form.get("countryIssued") || "").trim(),
          phone: String(form.get("phone") || "").trim(),
          email: String(form.get("email") || "").trim(),
          serviceType: String(form.get("serviceType") || "").trim(),
          executionTime: String(form.get("executionTime") || "").trim(),
          requestDetails: String(form.get("requestDetails") || "").trim(),
          contactMethod: String(form.get("contactMethod") || "").trim(),
          assignedConcierge: String(form.get("assignedConcierge") || "").trim(),
          clientTier: String(form.get("clientTier") || "").trim()
        },
        wantsHtml: true
      };
    } catch (_) {
      return { payload: null, wantsHtml: true };
    }
  }

  return { payload: null, wantsHtml: false };
}

function validatePayload(payload = {}) {
  const required = [
    "firstName",
    "lastName",
    "title",
    "countryIssued",
    "phone",
    "email",
    "serviceType",
    "executionTime",
    "requestDetails",
    "contactMethod"
  ];
  const missing = required.filter((key) => !cleanText(payload[key]));
  if (missing.length) {
    return `Missing required fields: ${missing.join(", ")}.`;
  }
  if (!/.+@.+\..+/.test(String(payload.email || "").trim())) {
    return "Invalid email address.";
  }
  return "";
}

export async function onRequestPost(context) {
  const { payload, wantsHtml } = await readContactPayload(context.request);
  if (!payload) {
    if (wantsHtml) {
      return htmlPage({
        title: "Invalid Request",
        body: "<h1>We could not process your request.</h1><p>The submitted form payload was invalid. Please return to the website and try again.</p>",
        status: 400
      });
    }
    return json({ ok: false, message: "Invalid request body." }, 400);
  }

  const validationError = validatePayload(payload);
  if (validationError) {
    if (wantsHtml) {
      return htmlPage({
        title: "Missing Information",
        body: `<h1>Request incomplete.</h1><p>${toParagraphHtml(validationError)}</p>`,
        status: 400
      });
    }
    return json({ ok: false, message: validationError }, 400);
  }

  const normalizedEmail = String(payload.email || "").trim().toLowerCase();
  const subject = `VVS Service Request - ${payload.serviceType}`;
  const conciergeName = cleanText(payload.assignedConcierge || "VVS Concierge Desk");
  const contactMethodLabel = String(payload.contactMethod || "").trim().toLowerCase() === "phone" ? "phone number" : "email address";
  const internalRecipient = envValue(context.env, "VVS_INTERNAL_ALERT_EMAIL") || "concierge@venture-voyagers.com";

  const internalHtml = `
    <h2>New VVS service request</h2>
    <p><b>Client:</b> ${toParagraphHtml(`${payload.title} ${payload.firstName} ${payload.lastName}`)}</p>
    <p><b>Email:</b> ${toParagraphHtml(normalizedEmail)}</p>
    <p><b>Phone:</b> ${toParagraphHtml(payload.phone)}</p>
    <p><b>Country of issued service:</b> ${toParagraphHtml(payload.countryIssued)}</p>
    <p><b>Service type:</b> ${toParagraphHtml(payload.serviceType)}</p>
    <p><b>Desired execution:</b> ${toParagraphHtml(payload.executionTime)}</p>
    <p><b>Preferred contact method:</b> ${toParagraphHtml(contactMethodLabel)}</p>
    <p><b>Assigned concierge:</b> ${toParagraphHtml(conciergeName)}</p>
    <p><b>Membership / status:</b> ${toParagraphHtml(payload.clientTier || "Non-Member")}</p>
    <p><b>Request details:</b><br>${toParagraphHtml(payload.requestDetails)}</p>
  `;

  const customerHtml = `
    <p>Dear ${toParagraphHtml(`${payload.title} ${payload.lastName}`)},</p>
    <p>Concierge ${toParagraphHtml(conciergeName)} has been assigned to your request.</p>
    <p>You will be contacted for service details via your ${toParagraphHtml(contactMethodLabel)}, based on your selected preference.</p>
    <p>Thank you for choosing VVS.</p>
  `;

  const [internalEmailResult, customerEmailResult, contactResult] = await Promise.all([
    sendEmailViaResend(context.env, {
      to: [internalRecipient],
      replyTo: [normalizedEmail],
      subject,
      html: internalHtml,
      text: cleanText(payload.requestDetails)
    }),
    sendEmailViaResend(context.env, {
      to: [normalizedEmail],
      subject: `VVS Request Received - ${payload.serviceType}`,
      html: customerHtml,
      text: `Dear ${payload.title} ${payload.lastName}, Concierge ${conciergeName} has been assigned to your request.`
    }),
    ensureHubSpotContact(context.env, {
      email: normalizedEmail,
      firstName: payload.firstName,
      lastName: payload.lastName,
      phone: payload.phone,
      title: payload.title,
      country: payload.countryIssued
    })
  ]);

  let ticketResult = {
    ok: false,
    skipped: true,
    provider: "hubspot",
    message: "Ticket creation not attempted."
  };
  let associationResult = {
    ok: false,
    skipped: true,
    provider: "hubspot",
    message: "Association not attempted."
  };

  if (contactResult?.ok) {
    ticketResult = await createHubSpotTicket(context.env, {
      subject,
      priority: payload.executionTime === "Instant" ? "HIGH" : "MEDIUM",
      content: [
        `${payload.title} ${payload.firstName} ${payload.lastName}`,
        `Service: ${payload.serviceType}`,
        `Execution: ${payload.executionTime}`,
        `Preferred contact: ${contactMethodLabel}`,
        `Assigned concierge: ${conciergeName}`,
        `Details: ${payload.requestDetails}`
      ].join("\n")
    });
  }

  if (contactResult?.ok && ticketResult?.ok) {
    associationResult = await associateHubSpotContactToTicket(context.env, contactResult.contactId, ticketResult.ticketId);
  }

  const responseBody = {
    ok: true,
    message: "Contact submission accepted.",
    integrations: {
      email: {
        internal: internalEmailResult,
        customer: customerEmailResult
      },
      crm: {
        contact: contactResult,
        ticket: ticketResult,
        association: associationResult
      }
    }
  };

  if (wantsHtml) {
    return htmlPage({
      title: "Request Received",
      body: `
        <h1>Thank you.</h1>
        <p>Dear ${toParagraphHtml(`${payload.title} ${payload.lastName}`)}, Concierge ${toParagraphHtml(conciergeName)} has been assigned to your request.</p>
        <p>You will be contacted for service details via your ${toParagraphHtml(contactMethodLabel)}, based on your selected preference.</p>
        <p>Your request has been recorded by VVS.</p>
      `
    });
  }

  return json(responseBody);
}
