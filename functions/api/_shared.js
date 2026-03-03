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

function hasConfiguredGmailProvider(env) {
  return !!(
    envValue(env, "GMAIL_CLIENT_ID")
    && envValue(env, "GMAIL_CLIENT_SECRET")
    && envValue(env, "GMAIL_REFRESH_TOKEN")
  );
}

function toBase64Url(value = "") {
  const bytes = new TextEncoder().encode(String(value || ""));
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function wrapBase64(value = "") {
  return String(value || "").match(/.{1,76}/g)?.join("\r\n") || "";
}

function headerAddresses(value = []) {
  return dedupeStrings(Array.isArray(value) ? value : splitEmails(value)).join(", ");
}

function buildMimeBody({
  text = "",
  html = "",
  attachments = []
} = {}) {
  const safeText = String(text || "").trim();
  const safeHtml = String(html || "").trim();
  const safeAttachments = Array.isArray(attachments) ? attachments.filter((item) => item && item.filename && item.content) : [];
  const outerBoundary = `vvs-mixed-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const altBoundary = `vvs-alt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  if (safeAttachments.length) {
    const parts = [
      `Content-Type: multipart/mixed; boundary="${outerBoundary}"`,
      "",
      `--${outerBoundary}`,
      `Content-Type: multipart/alternative; boundary="${altBoundary}"`,
      ""
    ];

    if (safeText) {
      parts.push(
        `--${altBoundary}`,
        'Content-Type: text/plain; charset="UTF-8"',
        "Content-Transfer-Encoding: 8bit",
        "",
        safeText,
        ""
      );
    }

    if (safeHtml) {
      parts.push(
        `--${altBoundary}`,
        'Content-Type: text/html; charset="UTF-8"',
        "Content-Transfer-Encoding: 8bit",
        "",
        safeHtml,
        ""
      );
    }

    parts.push(`--${altBoundary}--`, "");

    safeAttachments.forEach((item) => {
      const filename = String(item.filename);
      const contentType = String(item.contentType || "application/octet-stream");
      parts.push(
        `--${outerBoundary}`,
        `Content-Type: ${contentType}; name="${filename}"`,
        `Content-Disposition: attachment; filename="${filename}"`,
        "Content-Transfer-Encoding: base64",
        "",
        wrapBase64(String(item.content || "")),
        ""
      );
    });

    parts.push(`--${outerBoundary}--`);
    return parts.join("\r\n");
  }

  if (safeText && safeHtml) {
    return [
      `Content-Type: multipart/alternative; boundary="${altBoundary}"`,
      "",
      `--${altBoundary}`,
      'Content-Type: text/plain; charset="UTF-8"',
      "Content-Transfer-Encoding: 8bit",
      "",
      safeText,
      "",
      `--${altBoundary}`,
      'Content-Type: text/html; charset="UTF-8"',
      "Content-Transfer-Encoding: 8bit",
      "",
      safeHtml,
      "",
      `--${altBoundary}--`
    ].join("\r\n");
  }

  if (safeHtml) {
    return [
      'Content-Type: text/html; charset="UTF-8"',
      "Content-Transfer-Encoding: 8bit",
      "",
      safeHtml
    ].join("\r\n");
  }

  return [
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    safeText
  ].join("\r\n");
}

function buildRawMimeMessage({
  to = [],
  cc = [],
  bcc = [],
  subject = "",
  html = "",
  text = "",
  replyTo = [],
  from = "",
  attachments = [],
  headers = {}
} = {}) {
  const sender = from || "Venture Voyager Services <concierge@venture-voyagers.com>";
  const headerLines = [
    `From: ${sender}`,
    `To: ${headerAddresses(to)}`,
    `Subject: ${cleanText(subject)}`,
    "MIME-Version: 1.0"
  ];
  const ccLine = headerAddresses(cc);
  const bccLine = headerAddresses(bcc);
  const replyLine = headerAddresses(replyTo);
  if (ccLine) headerLines.splice(2, 0, `Cc: ${ccLine}`);
  if (bccLine) headerLines.splice(2 + (ccLine ? 1 : 0), 0, `Bcc: ${bccLine}`);
  if (replyLine) headerLines.splice(2 + (ccLine ? 1 : 0) + (bccLine ? 1 : 0), 0, `Reply-To: ${replyLine}`);
  Object.entries(headers || {}).forEach(([key, value]) => {
    const headerKey = cleanText(key);
    const headerValue = String(value || "").replace(/\r?\n/g, " ").trim();
    if (!headerKey || !headerValue) return;
    headerLines.splice(headerLines.length - 1, 0, `${headerKey}: ${headerValue}`);
  });

  const mimeBody = buildMimeBody({ text, html, attachments });
  return toBase64Url(`${headerLines.join("\r\n")}\r\n${mimeBody}`);
}

async function getGoogleAccessToken(env) {
  if (!hasConfiguredGmailProvider(env)) {
    return { ok: false, skipped: true, provider: "gmail", message: "GMAIL provider secrets are not configured." };
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: new URLSearchParams({
      client_id: envValue(env, "GMAIL_CLIENT_ID"),
      client_secret: envValue(env, "GMAIL_CLIENT_SECRET"),
      refresh_token: envValue(env, "GMAIL_REFRESH_TOKEN"),
      grant_type: "refresh_token"
    })
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body?.access_token) {
    return {
      ok: false,
      skipped: false,
      provider: "gmail",
      status: response.status,
      message: body?.error_description || body?.error || "Unable to refresh Gmail access token.",
      body
    };
  }

  return {
    ok: true,
    skipped: false,
    provider: "gmail",
    accessToken: String(body.access_token),
    expiresIn: Number(body.expires_in || 0)
  };
}

async function gmailRequest(env, path, init = {}) {
  const token = await getGoogleAccessToken(env);
  if (!token.ok) return token;

  const response = await fetch(`https://gmail.googleapis.com/gmail/v1${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
      ...(init.headers || {})
    }
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    return {
      ok: false,
      skipped: false,
      provider: "gmail",
      status: response.status,
      message: body?.error?.message || "Gmail API request failed.",
      body
    };
  }

  return {
    ok: true,
    skipped: false,
    provider: "gmail",
    status: response.status,
    body
  };
}

async function sendEmailViaGmail(env, {
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
  if (!hasConfiguredGmailProvider(env)) {
    return { ok: false, skipped: true, provider: "gmail", message: "GMAIL provider secrets are not configured." };
  }

  const toList = dedupeStrings(Array.isArray(to) ? to : splitEmails(to));
  if (!toList.length || !cleanText(subject) || (!cleanText(text) && !String(html || "").trim())) {
    return { ok: false, skipped: false, provider: "gmail", message: "Missing required Gmail email fields." };
  }

  const raw = buildRawMimeMessage({
    to: toList,
    cc,
    bcc,
    subject,
    html,
    text,
    replyTo,
    from,
    attachments
  });
  const user = encodeURIComponent(envValue(env, "GMAIL_ACCOUNT_EMAIL") || "me");
  const response = await gmailRequest(env, `/users/${user}/messages/send`, {
    method: "POST",
    body: JSON.stringify({ raw })
  });

  if (!response.ok) return response;

  return {
    ok: true,
    skipped: false,
    provider: "gmail",
    id: response.body?.id || "",
    threadId: response.body?.threadId || "",
    body: response.body
  };
}

async function sendEmailViaConfiguredProvider(env, payload = {}) {
  if (hasConfiguredGmailProvider(env)) {
    const gmailResult = await sendEmailViaGmail(env, payload);
    if (gmailResult.ok) return gmailResult;
    const resendResult = await sendEmailViaResend(env, payload);
    if (resendResult.ok) {
      return {
        ...resendResult,
        attemptedProviders: ["gmail", "resend"],
        gmailError: gmailResult.message || ""
      };
    }
    return gmailResult.skipped ? resendResult : gmailResult;
  }

  return sendEmailViaResend(env, payload);
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
  buildRawMimeMessage,
  cleanText,
  createHubSpotTicket,
  ensureHubSpotContact,
  envValue,
  escapeHtml,
  getGoogleAccessToken,
  gmailRequest,
  hasConfiguredGmailProvider,
  json,
  normalizeEmail,
  readJson,
  sendEmailViaConfiguredProvider,
  sendEmailViaGmail,
  sendEmailViaResend,
  splitEmails,
  toParagraphHtml
};
