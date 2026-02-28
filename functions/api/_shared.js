function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

async function readJson(request) {
  try {
    return await request.json();
  } catch (_) {
    return null;
  }
}

function normalizeEmail(value = "") {
  return String(value || "").trim().toLowerCase();
}

function splitEmails(value = "") {
  return String(value || "")
    .split(",")
    .map((entry) => normalizeEmail(entry))
    .filter(Boolean);
}

function dedupeStrings(values = []) {
  return Array.from(new Set(values.map((value) => String(value || "").trim()).filter(Boolean)));
}

function cleanText(value = "") {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function escapeHtml(value = "") {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toParagraphHtml(value = "") {
  return escapeHtml(value).replace(/\n/g, "<br>");
}

function envValue(env, key) {
  return String(env?.[key] || "").trim();
}

async function resendRequest(env, payload) {
  const apiKey = envValue(env, "RESEND_API_KEY");
  if (!apiKey) {
    return { ok: false, skipped: true, provider: "resend", message: "RESEND_API_KEY is not configured." };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    return {
      ok: false,
      skipped: false,
      provider: "resend",
      status: response.status,
      message: body?.message || "Resend request failed.",
      body
    };
  }

  return { ok: true, skipped: false, provider: "resend", id: body?.id || "", body };
}

async function sendEmailViaResend(env, {
  to = [],
  cc = [],
  bcc = [],
  subject = "",
  html = "",
  text = "",
  replyTo = [],
  from = "",
  attachments = []
} = {}) {
  const sender = from || envValue(env, "RESEND_FROM_EMAIL") || "Venture Voyager Services <concierge@venture-voyagers.com>";
  const payload = {
    from: sender,
    to: dedupeStrings(Array.isArray(to) ? to : splitEmails(to)),
    subject: cleanText(subject),
    html
  };
  const ccList = dedupeStrings(Array.isArray(cc) ? cc : splitEmails(cc));
  const bccList = dedupeStrings(Array.isArray(bcc) ? bcc : splitEmails(bcc));
  const replyList = dedupeStrings(Array.isArray(replyTo) ? replyTo : splitEmails(replyTo));
  if (ccList.length) payload.cc = ccList;
  if (bccList.length) payload.bcc = bccList;
  if (replyList.length) payload.reply_to = replyList;
  if (cleanText(text)) payload.text = text;
  if (Array.isArray(attachments) && attachments.length) {
    payload.attachments = attachments
      .filter((item) => item && item.filename && item.content)
      .map((item) => ({
        filename: String(item.filename),
        content: String(item.content),
        content_type: item.contentType ? String(item.contentType) : undefined
      }));
  }
  return resendRequest(env, payload);
}

async function hubspotRequest(env, path, init = {}) {
  const token = envValue(env, "HUBSPOT_ACCESS_TOKEN");
  if (!token) {
    return { ok: false, skipped: true, provider: "hubspot", message: "HUBSPOT_ACCESS_TOKEN is not configured." };
  }

  const response = await fetch(`https://api.hubapi.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers || {})
    }
  });

  const body = await response.json().catch(() => ({}));
  return {
    ok: response.ok,
    skipped: false,
    provider: "hubspot",
    status: response.status,
    body
  };
}

async function ensureHubSpotContact(env, contact = {}) {
  const properties = {
    email: normalizeEmail(contact.email),
    firstname: cleanText(contact.firstName),
    lastname: cleanText(contact.lastName),
    phone: cleanText(contact.phone),
    jobtitle: cleanText(contact.title),
    country: cleanText(contact.country)
  };

  const createResponse = await hubspotRequest(env, "/crm/v3/objects/contacts", {
    method: "POST",
    body: JSON.stringify({ properties })
  });

  if (createResponse.skipped) return createResponse;
  if (createResponse.ok) {
    return {
      ok: true,
      skipped: false,
      provider: "hubspot",
      contactId: createResponse.body?.id || "",
      body: createResponse.body
    };
  }

  const lookupResponse = await hubspotRequest(
    env,
    `/crm/v3/objects/contacts/${encodeURIComponent(properties.email)}?idProperty=email`,
    { method: "GET" }
  );

  if (lookupResponse.ok) {
    return {
      ok: true,
      skipped: false,
      provider: "hubspot",
      contactId: lookupResponse.body?.id || "",
      body: lookupResponse.body
    };
  }

  return {
    ok: false,
    skipped: false,
    provider: "hubspot",
    message: createResponse.body?.message || lookupResponse.body?.message || "HubSpot contact sync failed.",
    createResponse,
    lookupResponse
  };
}

async function createHubSpotTicket(env, ticket = {}) {
  const pipeline = envValue(env, "HUBSPOT_TICKET_PIPELINE");
  const stage = envValue(env, "HUBSPOT_TICKET_STAGE");
  if (!pipeline || !stage) {
    return {
      ok: false,
      skipped: true,
      provider: "hubspot",
      message: "HUBSPOT_TICKET_PIPELINE or HUBSPOT_TICKET_STAGE is not configured."
    };
  }

  const properties = {
    subject: cleanText(ticket.subject),
    content: cleanText(ticket.content),
    hs_pipeline: pipeline,
    hs_pipeline_stage: stage,
    hs_ticket_priority: cleanText(ticket.priority || "HIGH")
  };

  const response = await hubspotRequest(env, "/crm/v3/objects/tickets", {
    method: "POST",
    body: JSON.stringify({ properties })
  });

  if (!response.ok) {
    return {
      ok: false,
      skipped: false,
      provider: "hubspot",
      message: response.body?.message || "HubSpot ticket creation failed.",
      body: response.body
    };
  }

  return {
    ok: true,
    skipped: false,
    provider: "hubspot",
    ticketId: response.body?.id || "",
    body: response.body
  };
}

async function associateHubSpotContactToTicket(env, contactId, ticketId) {
  if (!contactId || !ticketId) {
    return {
      ok: false,
      skipped: true,
      provider: "hubspot",
      message: "Missing contactId or ticketId for association."
    };
  }

  const response = await hubspotRequest(
    env,
    `/crm/v3/objects/tickets/${encodeURIComponent(ticketId)}/associations/default/contacts/${encodeURIComponent(contactId)}`,
    { method: "PUT" }
  );

  if (!response.ok) {
    return {
      ok: false,
      skipped: false,
      provider: "hubspot",
      message: response.body?.message || "HubSpot association failed.",
      body: response.body
    };
  }

  return {
    ok: true,
    skipped: false,
    provider: "hubspot",
    body: response.body
  };
}

export {
  associateHubSpotContactToTicket,
  cleanText,
  createHubSpotTicket,
  ensureHubSpotContact,
  envValue,
  escapeHtml,
  json,
  normalizeEmail,
  readJson,
  sendEmailViaResend,
  splitEmails,
  toParagraphHtml
};
