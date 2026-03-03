import {
  buildRawMimeMessage,
  cleanText,
  envValue,
  escapeHtml,
  gmailRequest,
  hasConfiguredGmailProvider,
  json,
  readJson,
  splitEmails
} from "./_shared.js";

const MAX_RESULTS = 24;
const SYSTEM_LABEL_NAMES = new Set([
  "inbox",
  "sent",
  "drafts",
  "spam",
  "trash",
  "archive",
  "folders",
  "sending"
]);
const FOLDER_LABELS = {
  inbox: "INBOX",
  sent: "SENT",
  drafts: "DRAFT",
  spam: "SPAM",
  trash: "TRASH"
};
const SCHEDULED_LABEL_NAME = "VVS/Scheduled";
const METADATA_HEADERS = [
  "From",
  "To",
  "Cc",
  "Bcc",
  "Subject",
  "Date",
  "Reply-To",
  "X-VVS-Scheduled-At",
  "X-Priority",
  "Importance"
];

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

function textToHtml(value = "") {
  return String(value || "")
    .split(/\r?\n/)
    .map((line) => escapeHtml(line))
    .join("<br>");
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
  return `${year}-${month}-${day} ${hours}:${minutes} UTC`;
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

function extractMessageContent(payload = {}) {
  let html = "";
  let text = "";
  const attachments = [];

  const visit = (part) => {
    if (!part || typeof part !== "object") return;
    const mimeType = String(part.mimeType || "").toLowerCase();
    const filename = String(part.filename || "").trim();
    const bodyData = String(part?.body?.data || "");

    if (filename) {
      attachments.push(filename);
    }

    if (bodyData) {
      if (mimeType === "text/html" && !html) html = decodeBase64Url(bodyData);
      if (mimeType === "text/plain" && !text) text = decodeBase64Url(bodyData);
    }

    if (Array.isArray(part.parts)) {
      part.parts.forEach(visit);
    }
  };

  visit(payload);
  return {
    html: html || (text ? `<p>${textToHtml(text)}</p>` : ""),
    text,
    attachments
  };
}

function detectPriority(headers = {}) {
  const priority = String(headers["x-priority"] || headers.importance || "").toLowerCase();
  if (priority.includes("high") || priority.includes("1")) return "High";
  if (priority.includes("low") || priority.includes("5")) return "Low";
  return "Normal";
}

function normalizeLabelCatalog(labels = []) {
  const byId = new Map();
  const byName = new Map();
  labels.forEach((label) => {
    if (!label || typeof label !== "object") return;
    const id = String(label.id || "").trim();
    const name = String(label.name || "").trim();
    if (!id || !name) return;
    byId.set(id, label);
    byName.set(name.toLowerCase(), label);
  });
  return { labels, byId, byName };
}

function customFolderNames(catalog = { labels: [] }) {
  return (catalog.labels || [])
    .filter((label) => String(label.type || "").toLowerCase() === "user")
    .map((label) => String(label.name || "").trim())
    .filter((name) => name && name !== SCHEDULED_LABEL_NAME)
    .sort((a, b) => a.localeCompare(b));
}

function parseMessageSummary(message = {}, catalog = { byId: new Map() }, includeBody = false) {
  const payload = message.payload || {};
  const headers = messageHeaderMap(payload);
  const content = includeBody ? extractMessageContent(payload) : { html: "", text: "", attachments: [] };
  const labelIds = Array.isArray(message.labelIds) ? message.labelIds.map((id) => String(id)) : [];
  const labelEntries = labelIds
    .map((id) => catalog.byId.get(id))
    .filter(Boolean);
  const labelNames = labelEntries.map((label) => String(label.name || "").trim());
  const customFoldersForMessage = labelEntries
    .filter((label) => String(label.type || "").toLowerCase() === "user")
    .map((label) => String(label.name || "").trim())
    .filter((name) => name && name !== SCHEDULED_LABEL_NAME);
  return {
    id: String(message.id || ""),
    threadId: String(message.threadId || ""),
    from: headers.from || "",
    to: headers.to || "",
    cc: headers.cc || "",
    bcc: headers.bcc || "",
    replyTo: headers["reply-to"] || "",
    subject: headers.subject || "(No subject)",
    priority: detectPriority(headers),
    createdAt: formatUtcTimestamp(message.internalDate || Date.now()),
    scheduledAt: headers["x-vvs-scheduled-at"] || "",
    bodyHtml: includeBody ? (content.html || `<p>${textToHtml(content.text || "")}</p>`) : "",
    bodyText: content.text || "",
    snippet: String(message.snippet || ""),
    attachments: content.attachments || [],
    labelIds,
    labelNames,
    customFolders: customFoldersForMessage
  };
}

async function fetchLabels(env) {
  const user = gmailUserId(env);
  const response = await gmailRequest(env, `/users/${user}/labels`, { method: "GET" });
  if (!response.ok) return response;
  return {
    ...response,
    catalog: normalizeLabelCatalog(Array.isArray(response.body?.labels) ? response.body.labels : [])
  };
}

async function fetchAliases(env) {
  const user = gmailUserId(env);
  const response = await gmailRequest(env, `/users/${user}/settings/sendAs`, { method: "GET" });
  if (!response.ok) return response;
  const aliases = Array.isArray(response.body?.sendAs)
    ? response.body.sendAs.map((entry) => ({
        email: String(entry.sendAsEmail || "").trim(),
        displayName: String(entry.displayName || "").trim(),
        isPrimary: !!entry.isPrimary,
        isDefault: !!entry.isDefault
      })).filter((entry) => entry.email)
    : [];
  return { ...response, aliases };
}

async function fetchVacation(env) {
  const user = gmailUserId(env);
  const response = await gmailRequest(env, `/users/${user}/settings/vacation`, { method: "GET" });
  if (!response.ok) return response;
  return {
    ...response,
    vacation: {
      enableAutoReply: !!response.body?.enableAutoReply,
      responseSubject: String(response.body?.responseSubject || ""),
      responseBodyHtml: String(response.body?.responseBodyHtml || ""),
      responseBodyPlainText: String(response.body?.responseBodyPlainText || ""),
      restrictToContacts: !!response.body?.restrictToContacts,
      restrictToDomain: !!response.body?.restrictToDomain,
      startTime: Number(response.body?.startTime || 0),
      endTime: Number(response.body?.endTime || 0)
    }
  };
}

async function ensureLabel(env, name, catalog = null) {
  const trimmed = String(name || "").trim();
  if (!trimmed) {
    return { ok: false, skipped: false, provider: "gmail", message: "Label name is required." };
  }
  const labelCatalog = catalog || (await fetchLabels(env)).catalog;
  const existing = labelCatalog?.byName?.get(trimmed.toLowerCase());
  if (existing) {
    return { ok: true, skipped: false, provider: "gmail", label: existing, created: false };
  }
  const user = gmailUserId(env);
  const response = await gmailRequest(env, `/users/${user}/labels`, {
    method: "POST",
    body: JSON.stringify({
      name: trimmed,
      labelListVisibility: "labelShow",
      messageListVisibility: "show"
    })
  });
  if (!response.ok) return response;
  return { ...response, label: response.body, created: true };
}

async function fetchMessage(env, id, catalog, format = "full") {
  const user = gmailUserId(env);
  const params = new URLSearchParams();
  params.set("format", format);
  if (format === "metadata") {
    METADATA_HEADERS.forEach((header) => params.append("metadataHeaders", header));
  }
  const response = await gmailRequest(env, `/users/${user}/messages/${encodeURIComponent(id)}?${params.toString()}`, {
    method: "GET"
  });
  if (!response.ok) return response;
  return {
    ...response,
    message: parseMessageSummary(response.body, catalog, format === "full")
  };
}

async function fetchArchiveCount(env) {
  const user = gmailUserId(env);
  const params = new URLSearchParams();
  params.set("maxResults", "1");
  params.set("q", "-in:inbox -in:sent -in:drafts -in:spam -in:trash");
  const response = await gmailRequest(env, `/users/${user}/messages?${params.toString()}`, { method: "GET" });
  if (!response.ok) return 0;
  return Number(response.body?.resultSizeEstimate || 0);
}

async function estimateFolderCount(env, folder = "", catalog = { byName: new Map() }) {
  const normalizedFolder = String(folder || "").trim();
  if (!normalizedFolder) return 0;
  if (normalizedFolder === "archive") return fetchArchiveCount(env);
  const response = await listFolderMessages(env, normalizedFolder, catalog);
  if (!response.ok) return 0;
  return Number(response.resultSizeEstimate || response.messages?.length || 0);
}

async function listFolderMessages(env, folder = "inbox", catalog = { byName: new Map() }, pageToken = "") {
  const normalizedFolder = String(folder || "inbox").trim();
  const user = gmailUserId(env);
  const params = new URLSearchParams();
  params.set("maxResults", String(MAX_RESULTS));
  if (pageToken) params.set("pageToken", pageToken);

  if (normalizedFolder === "archive") {
    params.set("q", "-in:inbox -in:sent -in:drafts -in:spam -in:trash");
  } else if (normalizedFolder === "sending") {
    const scheduledLabel = catalog.byName.get(SCHEDULED_LABEL_NAME.toLowerCase());
    if (!scheduledLabel) {
      return { ok: true, skipped: false, provider: "gmail", messages: [], nextPageToken: "", resultSizeEstimate: 0 };
    }
    params.append("labelIds", String(scheduledLabel.id));
  } else if (FOLDER_LABELS[normalizedFolder]) {
    params.append("labelIds", FOLDER_LABELS[normalizedFolder]);
  } else if (normalizedFolder !== "folders") {
    const customLabel = catalog.byName.get(normalizedFolder.toLowerCase());
    if (!customLabel) {
      return { ok: true, skipped: false, provider: "gmail", messages: [], nextPageToken: "", resultSizeEstimate: 0 };
    }
    params.append("labelIds", String(customLabel.id));
  }

  if (normalizedFolder === "spam" || normalizedFolder === "trash") {
    params.set("includeSpamTrash", "true");
  }

  const listResponse = await gmailRequest(env, `/users/${user}/messages?${params.toString()}`, { method: "GET" });
  if (!listResponse.ok) return listResponse;
  const rawMessages = Array.isArray(listResponse.body?.messages) ? listResponse.body.messages : [];
  const detailResponses = await Promise.all(rawMessages.map((entry) => fetchMessage(env, entry.id, catalog, "metadata")));
  const messages = detailResponses.filter((entry) => entry.ok).map((entry) => entry.message);
  return {
    ok: true,
    skipped: false,
    provider: "gmail",
    messages,
    nextPageToken: String(listResponse.body?.nextPageToken || ""),
    resultSizeEstimate: Number(listResponse.body?.resultSizeEstimate || messages.length)
  };
}

async function fetchBootstrap(env, folder = "inbox", selectedMessageId = "") {
  const [labelsResponse, aliasesResponse, vacationResponse] = await Promise.all([
    fetchLabels(env),
    fetchAliases(env),
    fetchVacation(env)
  ]);

  if (!labelsResponse.ok) return labelsResponse;
  const catalog = labelsResponse.catalog;
  const folderResponse = await listFolderMessages(env, folder, catalog);
  if (!folderResponse.ok) return folderResponse;

  let selectedMessage = null;
  const effectiveSelectedId = String(selectedMessageId || folderResponse.messages?.[0]?.id || "").trim();
  if (effectiveSelectedId) {
    const messageResponse = await fetchMessage(env, effectiveSelectedId, catalog, "full");
    if (messageResponse.ok) selectedMessage = messageResponse.message;
  }

  const systemCounts = {
    inbox: await estimateFolderCount(env, "inbox", catalog),
    sent: await estimateFolderCount(env, "sent", catalog),
    drafts: await estimateFolderCount(env, "drafts", catalog),
    spam: await estimateFolderCount(env, "spam", catalog),
    trash: await estimateFolderCount(env, "trash", catalog),
    sending: await estimateFolderCount(env, "sending", catalog),
    archive: await estimateFolderCount(env, "archive", catalog)
  };
  const customCounts = {};
  for (const name of customFolderNames(catalog)) {
    customCounts[name] = await estimateFolderCount(env, name, catalog);
  }

  return {
    ok: true,
    skipped: false,
    provider: "gmail",
    mailbox: envValue(env, "GMAIL_ACCOUNT_EMAIL") || "concierge@venture-voyagers.com",
    aliases: aliasesResponse.ok ? aliasesResponse.aliases : [],
    vacation: vacationResponse.ok ? vacationResponse.vacation : null,
    folder: folder,
    messages: folderResponse.messages,
    nextPageToken: folderResponse.nextPageToken,
    selectedMessage,
    customFolders: customFolderNames(catalog),
    folderCounts: {
      ...systemCounts,
      ...customCounts
    },
    lastSyncedAt: formatUtcTimestamp(Date.now())
  };
}

async function modifyMessageLabels(env, messageId, { addLabelIds = [], removeLabelIds = [] } = {}) {
  const user = gmailUserId(env);
  return gmailRequest(env, `/users/${user}/messages/${encodeURIComponent(messageId)}/modify`, {
    method: "POST",
    body: JSON.stringify({
      addLabelIds: addLabelIds.filter(Boolean),
      removeLabelIds: removeLabelIds.filter(Boolean)
    })
  });
}

async function moveMessage(env, payload = {}) {
  const messageId = String(payload.id || "").trim();
  const targetFolder = String(payload.targetFolder || "").trim();
  if (!messageId || !targetFolder) {
    return { ok: false, skipped: false, provider: "gmail", message: "Message id and target folder are required." };
  }

  if (targetFolder === "trash") {
    const user = gmailUserId(env);
    return gmailRequest(env, `/users/${user}/messages/${encodeURIComponent(messageId)}/trash`, { method: "POST" });
  }

  const labelsResponse = await fetchLabels(env);
  if (!labelsResponse.ok) return labelsResponse;
  const catalog = labelsResponse.catalog;
  const currentMessage = await fetchMessage(env, messageId, catalog, "metadata");
  if (!currentMessage.ok) return currentMessage;
  const currentLabelIds = new Set(currentMessage.message.labelIds || []);
  const addLabelIds = [];
  const removeLabelIds = [];

  if (currentLabelIds.has("TRASH") && targetFolder !== "trash") {
    const user = gmailUserId(env);
    await gmailRequest(env, `/users/${user}/messages/${encodeURIComponent(messageId)}/untrash`, { method: "POST" });
    currentLabelIds.delete("TRASH");
  }

  if (targetFolder === "archive") {
    removeLabelIds.push("INBOX");
  } else if (targetFolder === "inbox") {
    addLabelIds.push("INBOX");
    removeLabelIds.push("SPAM");
  } else if (targetFolder === "spam") {
    addLabelIds.push("SPAM");
    removeLabelIds.push("INBOX");
  } else if (targetFolder === "sending") {
    const scheduledLabel = await ensureLabel(env, SCHEDULED_LABEL_NAME, catalog);
    if (!scheduledLabel.ok) return scheduledLabel;
    addLabelIds.push(String(scheduledLabel.label?.id || ""));
  } else if (!FOLDER_LABELS[targetFolder]) {
    const customLabel = await ensureLabel(env, targetFolder, catalog);
    if (!customLabel.ok) return customLabel;
    addLabelIds.push(String(customLabel.label?.id || ""));
    removeLabelIds.push("INBOX");
  }

  if (targetFolder !== "sending") {
    const scheduledLabel = catalog.byName.get(SCHEDULED_LABEL_NAME.toLowerCase());
    if (scheduledLabel) removeLabelIds.push(String(scheduledLabel.id));
  }

  return modifyMessageLabels(env, messageId, { addLabelIds, removeLabelIds });
}

async function clearTrash(env) {
  const user = gmailUserId(env);
  const trashMessages = [];
  let pageToken = "";
  do {
    const params = new URLSearchParams();
    params.set("labelIds", "TRASH");
    params.set("includeSpamTrash", "true");
    params.set("maxResults", "100");
    if (pageToken) params.set("pageToken", pageToken);
    const listResponse = await gmailRequest(env, `/users/${user}/messages?${params.toString()}`, { method: "GET" });
    if (!listResponse.ok) return listResponse;
    const batch = Array.isArray(listResponse.body?.messages) ? listResponse.body.messages : [];
    batch.forEach((item) => {
      if (item?.id) trashMessages.push(String(item.id));
    });
    pageToken = String(listResponse.body?.nextPageToken || "");
  } while (pageToken);

  if (!trashMessages.length) {
    return { ok: true, skipped: false, provider: "gmail", deletedCount: 0 };
  }

  return gmailRequest(env, `/users/${user}/messages/batchDelete`, {
    method: "POST",
    body: JSON.stringify({ ids: trashMessages })
  });
}

function senderAddressForOwner(raw = "") {
  const requested = String(raw || "").trim();
  return requested || "Venture Voyager Services <concierge@venture-voyagers.com>";
}

async function saveDraft(env, payload = {}) {
  const user = gmailUserId(env);
  const to = splitEmails(payload.to);
  const cc = splitEmails(payload.cc);
  const bcc = splitEmails(payload.bcc);
  const subject = cleanText(payload.subject || "Draft");
  const html = String(payload.html || "").trim();
  const text = String(payload.text || "").trim();
  const attachments = Array.isArray(payload.attachments) ? payload.attachments : [];
  const scheduledAt = String(payload.scheduledAt || "").trim();
  const raw = buildRawMimeMessage({
    to,
    cc,
    bcc,
    subject,
    html,
    text,
    replyTo: splitEmails(payload.replyTo),
    from: senderAddressForOwner(payload.from),
    attachments,
    headers: scheduledAt ? { "X-VVS-Scheduled-At": scheduledAt } : {}
  });

  const draftId = String(payload.draftId || "").trim();
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

  const messageId = String(response.body?.message?.id || "");
  if (messageId) {
    const labelsResponse = await fetchLabels(env);
    if (!labelsResponse.ok) return labelsResponse;
    const catalog = labelsResponse.catalog;
    const scheduledLabel = catalog.byName.get(SCHEDULED_LABEL_NAME.toLowerCase()) || (scheduledAt ? (await ensureLabel(env, SCHEDULED_LABEL_NAME, catalog)).label : null);
    if (scheduledAt && scheduledLabel?.id) {
      await modifyMessageLabels(env, messageId, { addLabelIds: [String(scheduledLabel.id)], removeLabelIds: [] });
    } else if (scheduledLabel?.id) {
      await modifyMessageLabels(env, messageId, { addLabelIds: [], removeLabelIds: [String(scheduledLabel.id)] });
    }
  }

  return {
    ok: true,
    skipped: false,
    provider: "gmail",
    draftId: String(response.body?.id || ""),
    messageId,
    scheduledAt
  };
}

async function sendMessage(env, payload = {}) {
  const to = splitEmails(payload.to);
  const cc = splitEmails(payload.cc);
  const bcc = splitEmails(payload.bcc);
  const subject = cleanText(payload.subject);
  const html = String(payload.html || "").trim();
  const text = String(payload.text || "").trim();
  const attachments = Array.isArray(payload.attachments) ? payload.attachments : [];
  const scheduledAt = String(payload.scheduledAt || "").trim();

  if (scheduledAt) {
    return saveDraft(env, payload);
  }

  if (!to.length || !subject || (!html && !text)) {
    return { ok: false, skipped: false, provider: "gmail", message: "Missing required send fields." };
  }

  const raw = buildRawMimeMessage({
    to,
    cc,
    bcc,
    subject,
    html,
    text,
    replyTo: splitEmails(payload.replyTo),
    from: senderAddressForOwner(payload.from),
    attachments
  });
  const user = gmailUserId(env);
  const response = await gmailRequest(env, `/users/${user}/messages/send`, {
    method: "POST",
    body: JSON.stringify({ raw })
  });
  if (!response.ok) return response;
  return {
    ok: true,
    skipped: false,
    provider: "gmail",
    id: String(response.body?.id || ""),
    threadId: String(response.body?.threadId || "")
  };
}

async function updateVacation(env, payload = {}) {
  const user = gmailUserId(env);
  return gmailRequest(env, `/users/${user}/settings/vacation`, {
    method: "PUT",
    body: JSON.stringify({
      enableAutoReply: !!payload.enableAutoReply,
      responseSubject: String(payload.responseSubject || ""),
      responseBodyHtml: String(payload.responseBodyHtml || ""),
      responseBodyPlainText: String(payload.responseBodyPlainText || ""),
      restrictToContacts: !!payload.restrictToContacts,
      restrictToDomain: !!payload.restrictToDomain,
      startTime: Number(payload.startTime || 0),
      endTime: Number(payload.endTime || 0)
    })
  });
}

export async function onRequestGet(context) {
  if (!hasConfiguredGmailProvider(context.env)) {
    return json({ ok: false, message: "Gmail inbox integration is not configured." }, 503);
  }

  const url = new URL(context.request.url);
  const mode = String(url.searchParams.get("mode") || "bootstrap").trim().toLowerCase();
  const folder = String(url.searchParams.get("folder") || "inbox").trim();
  const id = String(url.searchParams.get("id") || "").trim();

  if (mode === "message") {
    if (!id) return json({ ok: false, message: "Message id is required." }, 400);
    const labelsResponse = await fetchLabels(context.env);
    if (!labelsResponse.ok) return json(labelsResponse, 502);
    const response = await fetchMessage(context.env, id, labelsResponse.catalog, "full");
    return json(response, response.ok ? 200 : 502);
  }

  const bootstrap = await fetchBootstrap(context.env, folder, id);
  return json(bootstrap, bootstrap.ok ? 200 : 502);
}

export async function onRequestPost(context) {
  if (!hasConfiguredGmailProvider(context.env)) {
    return json({ ok: false, message: "Gmail inbox integration is not configured." }, 503);
  }

  const payload = await readJson(context.request);
  if (!payload) return json({ ok: false, message: "Invalid JSON body." }, 400);
  const action = String(payload.action || "").trim().toLowerCase();

  if (action === "create-folder") {
    const response = await ensureLabel(context.env, payload.name);
    return json(response, response.ok ? 200 : 502);
  }

  if (action === "archive") {
    const response = await moveMessage(context.env, { id: payload.id, targetFolder: "archive" });
    return json(response, response.ok ? 200 : 502);
  }

  if (action === "move") {
    const response = await moveMessage(context.env, { id: payload.id, targetFolder: payload.targetFolder });
    return json(response, response.ok ? 200 : 502);
  }

  if (action === "trash") {
    const response = await moveMessage(context.env, { id: payload.id, targetFolder: "trash" });
    return json(response, response.ok ? 200 : 502);
  }

  if (action === "clear-trash") {
    const response = await clearTrash(context.env);
    return json(response, response.ok ? 200 : 502);
  }

  if (action === "draft-save") {
    const response = await saveDraft(context.env, payload);
    return json(response, response.ok ? 200 : 502);
  }

  if (action === "send") {
    const response = await sendMessage(context.env, payload);
    return json(response, response.ok ? 200 : 502);
  }

  if (action === "vacation-update") {
    const response = await updateVacation(context.env, payload);
    return json(response, response.ok ? 200 : 502);
  }

  return json({ ok: false, message: "Unsupported Gmail inbox action." }, 400);
}
