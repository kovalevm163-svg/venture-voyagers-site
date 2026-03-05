import {
  buildRawMimeMessage,
  cleanText,
  envValue,
  escapeHtml,
  gmailRequest,
  hasConfiguredGmailProvider,
  json,
  normalizeEmail,
  readJson
} from "./_shared.js";

const REGISTRY_SUBJECT = "VVS AMP Registry Snapshot";
const REGISTRY_VERSION = 1;
const MAX_DRAFT_SCAN = 80;
const MAX_ACTIVITY_ROWS = 500;

function gmailUserId(env) {
  return encodeURIComponent(envValue(env, "GMAIL_ACCOUNT_EMAIL") || "me");
}

function decodeBase64Url(value = "") {
  const normalized = String(value || "").replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4 || 4)) % 4);
  try {
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch (_) {
    return "";
  }
}

function formatUtcTimestamp(dateValue = Date.now()) {
  const numeric = Number(dateValue || 0);
  const date = numeric > 0 ? new Date(numeric) : new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`;
}

function messageHeaderMap(payload = {}) {
  const headers = Array.isArray(payload?.headers) ? payload.headers : [];
  return headers.reduce((map, entry) => {
    const key = String(entry?.name || "").trim().toLowerCase();
    if (!key) return map;
    map[key] = String(entry?.value || "").trim();
    return map;
  }, {});
}

function extractTextContent(payload = {}) {
  let text = "";
  let html = "";

  const visit = (part) => {
    if (!part || typeof part !== "object") return;
    const mimeType = String(part.mimeType || "").toLowerCase();
    const bodyData = String(part?.body?.data || "");
    if (bodyData) {
      if (mimeType === "text/plain" && !text) text = decodeBase64Url(bodyData);
      if (mimeType === "text/html" && !html) html = decodeBase64Url(bodyData);
    }
    if (Array.isArray(part.parts)) part.parts.forEach(visit);
  };

  visit(payload);
  if (text) return text;
  if (html) {
    const preMatch = html.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
    if (preMatch?.[1]) {
      return preMatch[1]
        .replace(/&quot;/g, "\"")
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");
    }
    return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  }
  return "";
}

function emptyRegistry() {
  return {
    version: REGISTRY_VERSION,
    updatedAt: formatUtcTimestamp(),
    accounts: {},
    activities: []
  };
}

function cloneValue(value = null) {
  if (value === null || value === undefined) return null;
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (_) {
    return null;
  }
}

function sanitizeAccountRecord(account = {}) {
  const cloned = cloneValue(account) || {};
  delete cloned.sunriseCredential;
  if (cloned.email) cloned.email = normalizeEmail(cloned.email);
  return cloned;
}

function normalizeRegistry(raw = null) {
  const fallback = emptyRegistry();
  if (!raw || typeof raw !== "object") return fallback;
  const accounts = {};
  Object.entries(raw.accounts || {}).forEach(([rawKey, rawAccount]) => {
    if (!rawAccount || typeof rawAccount !== "object") return;
    const key = normalizeEmail(rawAccount.email || rawKey);
    if (!key) return;
    accounts[key] = sanitizeAccountRecord({ ...rawAccount, email: key });
  });
  const activities = Array.isArray(raw.activities)
    ? raw.activities
      .filter((row) => row && typeof row === "object")
      .map((row) => ({
        id: String(row.id || ""),
        email: normalizeEmail(row.email || ""),
        eventType: String(row.eventType || row.type || "").trim(),
        system: String(row.system || "vvs").trim(),
        route: String(row.route || "").trim(),
        status: String(row.status || "").trim(),
        occurredAt: String(row.occurredAt || row.at || "").trim(),
        ipAddress: String(row.ipAddress || "").trim(),
        country: String(row.country || "").trim(),
        region: String(row.region || "").trim(),
        city: String(row.city || "").trim(),
        colo: String(row.colo || "").trim(),
        continent: String(row.continent || "").trim(),
        timezone: String(row.timezone || "").trim(),
        userAgent: String(row.userAgent || "").trim()
      }))
      .filter((row) => row.email && row.eventType)
      .slice(0, MAX_ACTIVITY_ROWS)
    : [];
  return {
    version: Number(raw.version || REGISTRY_VERSION),
    updatedAt: String(raw.updatedAt || fallback.updatedAt).trim() || fallback.updatedAt,
    accounts,
    activities
  };
}

async function listDrafts(env) {
  const user = gmailUserId(env);
  return gmailRequest(env, `/users/${user}/drafts?maxResults=${MAX_DRAFT_SCAN}`, {
    method: "GET"
  });
}

async function fetchDraft(env, draftId) {
  const user = gmailUserId(env);
  return gmailRequest(env, `/users/${user}/drafts/${encodeURIComponent(draftId)}?format=full`, {
    method: "GET"
  });
}

async function findRegistryDraft(env) {
  const response = await listDrafts(env);
  if (!response.ok) return response;
  const drafts = Array.isArray(response.body?.drafts) ? response.body.drafts : [];
  for (const entry of drafts) {
    const draftId = String(entry?.id || "").trim();
    if (!draftId) continue;
    const draft = await fetchDraft(env, draftId);
    if (!draft.ok) continue;
    const headers = messageHeaderMap(draft.body?.message?.payload || {});
    if (String(headers.subject || "").trim() !== REGISTRY_SUBJECT) continue;
    const text = extractTextContent(draft.body?.message?.payload || {});
    let parsed = emptyRegistry();
    try {
      parsed = normalizeRegistry(JSON.parse(text || "{}"));
    } catch (_) {}
    return {
      ok: true,
      skipped: false,
      provider: "gmail",
      draftId,
      registry: parsed
    };
  }
  return {
    ok: true,
    skipped: false,
    provider: "gmail",
    draftId: "",
    registry: emptyRegistry()
  };
}

async function saveRegistryDraft(env, registry = emptyRegistry(), draftId = "") {
  const normalized = normalizeRegistry(registry);
  normalized.updatedAt = formatUtcTimestamp();
  const mailbox = envValue(env, "GMAIL_ACCOUNT_EMAIL") || "concierge@venture-voyagers.com";
  const jsonText = JSON.stringify(normalized, null, 2);
  const raw = buildRawMimeMessage({
    to: [mailbox],
    from: `Venture Voyager Services <${mailbox}>`,
    subject: REGISTRY_SUBJECT,
    text: jsonText,
    html: `<pre>${escapeHtml(jsonText)}</pre>`
  });
  const user = gmailUserId(env);
  const response = await gmailRequest(
    env,
    draftId
      ? `/users/${user}/drafts/${encodeURIComponent(draftId)}`
      : `/users/${user}/drafts`,
    {
      method: draftId ? "PUT" : "POST",
      body: JSON.stringify({
        id: draftId || undefined,
        message: { raw }
      })
    }
  );
  if (!response.ok) return response;
  return {
    ok: true,
    skipped: false,
    provider: "gmail",
    draftId: String(response.body?.id || draftId || "").trim(),
    registry: normalized
  };
}

function requestLocationMeta(request) {
  const cf = request?.cf && typeof request.cf === "object" ? request.cf : {};
  const headers = request?.headers;
  return {
    ipAddress: String(headers?.get("cf-connecting-ip") || headers?.get("x-forwarded-for") || "").trim(),
    country: String(cf.country || headers?.get("cf-ipcountry") || "").trim(),
    region: String(cf.region || "").trim(),
    city: String(cf.city || "").trim(),
    colo: String(cf.colo || "").trim(),
    continent: String(cf.continent || "").trim(),
    timezone: String(cf.timezone || "").trim(),
    userAgent: String(headers?.get("user-agent") || "").trim()
  };
}

function appendRegistryActivity(registry, request, payload = {}) {
  const email = normalizeEmail(payload.email || payload.account?.email || "");
  const eventType = cleanText(payload.eventType || payload.type || "");
  if (!email || !eventType) return registry;
  const location = requestLocationMeta(request);
  const nextRow = {
    id: `AMP-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    email,
    eventType,
    system: cleanText(payload.system || "vvs") || "vvs",
    route: cleanText(payload.route || ""),
    status: cleanText(payload.status || "Recorded") || "Recorded",
    occurredAt: formatUtcTimestamp(),
    ...location
  };
  registry.activities = [nextRow, ...(Array.isArray(registry.activities) ? registry.activities : [])]
    .slice(0, MAX_ACTIVITY_ROWS);
  return registry;
}

function upsertRegistryAccount(registry, account = {}) {
  const normalized = sanitizeAccountRecord(account);
  const key = normalizeEmail(normalized.email || "");
  if (!key) return registry;
  const existing = registry.accounts[key] && typeof registry.accounts[key] === "object"
    ? registry.accounts[key]
    : {};
  const merged = {
    ...existing,
    ...normalized,
    email: key
  };
  // Never let blank sync payloads erase existing credential values.
  ["password", "secretPhrase", "phone"].forEach((field) => {
    const incoming = String(normalized?.[field] || "");
    const current = String(existing?.[field] || "");
    if (!incoming.trim() && current.trim()) {
      merged[field] = current;
    }
  });
  registry.accounts[key] = merged;
  return registry;
}

export async function onRequestGet(context) {
  try {
    if (!hasConfiguredGmailProvider(context.env)) {
      return json({ ok: false, message: "Shared account registry is not configured." }, 503);
    }
    const located = await findRegistryDraft(context.env);
    if (!located.ok) return json(located, 502);
    const url = new URL(context.request.url);
    const email = normalizeEmail(url.searchParams.get("email") || "");
    const registry = located.registry || emptyRegistry();
    if (email) {
      return json({
        ok: true,
        draftId: located.draftId,
        account: registry.accounts[email] || null,
        activities: (registry.activities || []).filter((row) => row.email === email)
      });
    }
    return json({
      ok: true,
      draftId: located.draftId,
      registry
    });
  } catch (error) {
    return json({
      ok: false,
      message: error?.message || "Unhandled account registry error."
    }, 500);
  }
}

export async function onRequestPost(context) {
  try {
    if (!hasConfiguredGmailProvider(context.env)) {
      return json({ ok: false, message: "Shared account registry is not configured." }, 503);
    }
    const payload = await readJson(context.request);
    if (!payload) return json({ ok: false, message: "Invalid JSON body." }, 400);
    const action = String(payload.action || "").trim().toLowerCase();
    const located = await findRegistryDraft(context.env);
    if (!located.ok) return json(located, 502);
    const registry = normalizeRegistry(located.registry);

    if (action === "bulk-upsert") {
      const entries = Array.isArray(payload.accounts) ? payload.accounts : [];
      entries.forEach((account) => upsertRegistryAccount(registry, account));
      if (payload.event && typeof payload.event === "object") {
        appendRegistryActivity(registry, context.request, payload.event);
      }
      const saved = await saveRegistryDraft(context.env, registry, located.draftId);
      return json(saved, saved.ok ? 200 : 502);
    }

    if (action === "upsert-account") {
      upsertRegistryAccount(registry, payload.account || {});
      if (payload.event && typeof payload.event === "object") {
        appendRegistryActivity(registry, context.request, {
          ...payload.event,
          email: payload.event.email || payload.account?.email
        });
      }
      const saved = await saveRegistryDraft(context.env, registry, located.draftId);
      return json(saved, saved.ok ? 200 : 502);
    }

    if (action === "log-activity") {
      appendRegistryActivity(registry, context.request, payload);
      if (payload.account && typeof payload.account === "object") {
        upsertRegistryAccount(registry, payload.account);
      }
      const saved = await saveRegistryDraft(context.env, registry, located.draftId);
      return json(saved, saved.ok ? 200 : 502);
    }

    return json({ ok: false, message: "Unsupported account registry action." }, 400);
  } catch (error) {
    return json({
      ok: false,
      message: error?.message || "Unhandled account registry action error."
    }, 500);
  }
}
