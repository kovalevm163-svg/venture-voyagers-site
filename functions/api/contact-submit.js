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
  const payload = await readJson(context.request);
  if (!payload) return json({ ok: false, message: "Invalid JSON body." }, 400);

  const validationError = validatePayload(payload);
  if (validationError) return json({ ok: false, message: validationError }, 400);

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

  return json({
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
  });
}
