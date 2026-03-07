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

function firstEnvValue(env, keys = []) {
  for (const key of keys) {
    const value = envValue(env, key);
    if (value) return value;
  }
  return "";
}

function resolveGmailConfig(env) {
  return {
    clientId: firstEnvValue(env, ["GMAIL_CLIENT_ID", "GOOGLE_CLIENT_ID", "GMAIL_OAUTH_CLIENT_ID"]),
    clientSecret: firstEnvValue(env, ["GMAIL_CLIENT_SECRET", "GOOGLE_CLIENT_SECRET", "GMAIL_OAUTH_CLIENT_SECRET"]),
    refreshToken: firstEnvValue(env, ["GMAIL_REFRESH_TOKEN", "GOOGLE_REFRESH_TOKEN", "GMAIL_OAUTH_REFRESH_TOKEN"]),
    accountEmail: firstEnvValue(env, ["GMAIL_ACCOUNT_EMAIL", "GMAIL_FROM_EMAIL", "VVS_GMAIL_ACCOUNT_EMAIL"])
  };
}

function resolveZohoConfig(env) {
  return {
    clientId: firstEnvValue(env, [
      "ZOHO_CLIENT_ID",
      "ZOHO_CRM_CLIENT_ID",
      "ZOHO_OAUTH_CLIENT_ID",
      "ZOHO_CLIENTID"
    ]),
    clientSecret: firstEnvValue(env, [
      "ZOHO_CLIENT_SECRET",
      "ZOHO_CRM_CLIENT_SECRET",
      "ZOHO_OAUTH_CLIENT_SECRET",
      "ZOHO_CLIENTSECRET"
    ]),
    refreshToken: firstEnvValue(env, [
      "ZOHO_REFRESH_TOKEN",
      "ZOHO_CRM_REFRESH_TOKEN",
      "ZOHO_OAUTH_REFRESH_TOKEN",
      "ZOHO_REFRESHTOKEN"
    ]),
    accountsDomain: firstEnvValue(env, [
      "ZOHO_ACCOUNTS_DOMAIN",
      "ZOHO_OAUTH_DOMAIN",
      "ZOHO_AUTH_DOMAIN"
    ]),
    crmApiDomain: firstEnvValue(env, [
      "ZOHO_CRM_API_DOMAIN",
      "ZOHO_API_DOMAIN",
      "ZOHO_DOMAIN"
    ])
  };
}

let gmailTokenCache = {
  cacheKey: "",
  accessToken: "",
  expiresAt: 0
};

let zohoTokenCache = {
  cacheKey: "",
  accessToken: "",
  apiDomain: "",
  expiresAt: 0
};

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
  const config = resolveGmailConfig(env);
  return !!(
    config.clientId
    && config.clientSecret
    && config.refreshToken
  );
}

function hasConfiguredZohoProvider(env) {
  const config = resolveZohoConfig(env);
  return !!(
    config.clientId
    && config.clientSecret
    && config.refreshToken
  );
}

function normalizeZohoDomain(value = "", fallback = "") {
  const raw = String(value || fallback || "").trim();
  if (!raw) return "";
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, "");
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
  const config = resolveGmailConfig(env);

  const now = Date.now();
  const cacheKey = [
    config.clientId,
    config.accountEmail
  ].join("::");
  if (
    gmailTokenCache.cacheKey === cacheKey
    && gmailTokenCache.accessToken
    && gmailTokenCache.expiresAt - now > 60_000
  ) {
    return {
      ok: true,
      skipped: false,
      provider: "gmail",
      accessToken: gmailTokenCache.accessToken,
      expiresIn: Math.max(0, Math.floor((gmailTokenCache.expiresAt - now) / 1000))
    };
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
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

  gmailTokenCache = {
    cacheKey,
    accessToken: String(body.access_token),
    expiresAt: now + (Number(body.expires_in || 0) * 1000)
  };

  return {
    ok: true,
    skipped: false,
    provider: "gmail",
    accessToken: gmailTokenCache.accessToken,
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
  const config = resolveGmailConfig(env);
  const user = encodeURIComponent(config.accountEmail || "me");
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
    let gmailResult;
    try {
      gmailResult = await sendEmailViaGmail(env, payload);
    } catch (error) {
      gmailResult = {
        ok: false,
        skipped: false,
        provider: "gmail",
        message: String(error?.message || "Gmail provider is temporarily unavailable.")
      };
    }
    if (gmailResult.ok) return gmailResult;
    let resendResult;
    try {
      resendResult = await sendEmailViaResend(env, payload);
    } catch (error) {
      resendResult = {
        ok: false,
        skipped: false,
        provider: "resend",
        message: String(error?.message || "Resend provider is temporarily unavailable.")
      };
    }
    if (resendResult.ok) {
      return {
        ...resendResult,
        attemptedProviders: ["gmail", "resend"],
        gmailError: gmailResult.message || ""
      };
    }
    return gmailResult.skipped ? resendResult : gmailResult;
  }

  try {
    return await sendEmailViaResend(env, payload);
  } catch (error) {
    return {
      ok: false,
      skipped: false,
      provider: "resend",
      message: String(error?.message || "Email provider is temporarily unavailable.")
    };
  }
}

async function getZohoAccessToken(env) {
  if (!hasConfiguredZohoProvider(env)) {
    return { ok: false, skipped: true, provider: "zoho", message: "ZOHO provider secrets are not configured." };
  }
  const config = resolveZohoConfig(env);

  const now = Date.now();
  const cacheKey = [
    config.clientId,
    config.refreshToken,
    config.crmApiDomain
  ].join("::");
  if (
    zohoTokenCache.cacheKey === cacheKey
    && zohoTokenCache.accessToken
    && zohoTokenCache.apiDomain
    && zohoTokenCache.expiresAt - now > 60_000
  ) {
    return {
      ok: true,
      skipped: false,
      provider: "zoho",
      accessToken: zohoTokenCache.accessToken,
      apiDomain: zohoTokenCache.apiDomain,
      expiresIn: Math.max(0, Math.floor((zohoTokenCache.expiresAt - now) / 1000))
    };
  }

  const accountsDomain = normalizeZohoDomain(
    config.accountsDomain,
    "https://accounts.zoho.com"
  );
  const response = await fetch(`${accountsDomain}/oauth/v2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: new URLSearchParams({
      refresh_token: config.refreshToken,
      client_id: config.clientId,
      client_secret: config.clientSecret,
      grant_type: "refresh_token"
    })
  });

  const body = await response.json().catch(() => ({}));
  const accessToken = String(body?.access_token || "").trim();
  const apiDomain = normalizeZohoDomain(
    config.crmApiDomain,
    body?.api_domain || "https://www.zohoapis.com"
  );
  if (!response.ok || !accessToken || !apiDomain) {
    const message = body?.error_description || body?.error || "Unable to refresh Zoho access token.";
    return {
      ok: false,
      skipped: false,
      provider: "zoho",
      status: response.status,
      message,
      body
    };
  }

  zohoTokenCache = {
    cacheKey,
    accessToken,
    apiDomain,
    expiresAt: now + (Math.max(120, Number(body?.expires_in || 3600)) * 1000)
  };

  return {
    ok: true,
    skipped: false,
    provider: "zoho",
    accessToken,
    apiDomain,
    expiresIn: Number(body?.expires_in || 3600)
  };
}

async function zohoRequest(env, path, init = {}) {
  const token = await getZohoAccessToken(env);
  if (!token.ok) return token;

  const method = String(init?.method || "GET").toUpperCase();
  const query = init?.query && typeof init.query === "object" ? init.query : null;
  const params = query
    ? new URLSearchParams(
      Object.entries(query).reduce((acc, [key, value]) => {
        if (value === null || value === undefined || value === "") return acc;
        acc[key] = String(value);
        return acc;
      }, {})
    )
    : null;

  const endpoint = `${token.apiDomain}${String(path || "")}${params && params.toString() ? `?${params.toString()}` : ""}`;
  const sourceBody = init?.body;
  const payload = sourceBody == null || typeof sourceBody === "string"
    ? sourceBody
    : JSON.stringify(sourceBody);

  const response = await fetch(endpoint, {
    method,
    headers: {
      Authorization: `Zoho-oauthtoken ${token.accessToken}`,
      "Content-Type": "application/json",
      ...(init?.headers || {})
    },
    body: payload
  });

  const rawText = await response.text().catch(() => "");
  let body = {};
  if (rawText) {
    try {
      body = JSON.parse(rawText);
    } catch (_) {
      body = { rawText };
    }
  }

  const message = body?.message
    || body?.details?.message
    || body?.data?.[0]?.message
    || body?.errors?.[0]?.message
    || "";

  return {
    ok: response.ok,
    skipped: false,
    provider: "zoho",
    status: response.status,
    message,
    body
  };
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
  getZohoAccessToken,
  gmailRequest,
  hasConfiguredGmailProvider,
  hasConfiguredZohoProvider,
  json,
  normalizeEmail,
  readJson,
  sendEmailViaConfiguredProvider,
  sendEmailViaGmail,
  sendEmailViaResend,
  splitEmails,
  toParagraphHtml,
  zohoRequest
};
