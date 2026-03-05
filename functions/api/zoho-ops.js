import {
  cleanText,
  hasConfiguredZohoProvider,
  json,
  readJson,
  zohoRequest
} from "./_shared.js";

const DEFAULT_PAGE_SIZE = 35;
const MAX_PAGE_SIZE = 100;
const DEFAULT_MODULE_ORDER = ["Contacts", "Deals", "Tasks", "Leads", "Accounts"];

function utcNowLabel() {
  const date = new Date();
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hour = String(date.getUTCHours()).padStart(2, "0");
  const minute = String(date.getUTCMinutes()).padStart(2, "0");
  const second = String(date.getUTCSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}:${second} UTC`;
}

function safePageSize(value, fallback = DEFAULT_PAGE_SIZE) {
  const parsed = Number(value || fallback);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return Math.min(MAX_PAGE_SIZE, Math.max(1, Math.round(parsed)));
}

function safePage(value, fallback = 1) {
  const parsed = Number(value || fallback);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return Math.max(1, Math.round(parsed));
}

function normalizeModuleName(value = "") {
  const raw = String(value || "").trim();
  if (!raw) return "";
  const replacements = {
    contacts: "Contacts",
    deals: "Deals",
    potentials: "Deals",
    leads: "Leads",
    tasks: "Tasks",
    accounts: "Accounts"
  };
  const key = raw.toLowerCase();
  return replacements[key] || raw;
}

function defaultFieldsByModule(module = "") {
  const key = String(module || "").trim().toLowerCase();
  if (key === "contacts") {
    return ["First_Name", "Last_Name", "Email", "Phone", "Mobile", "Company", "Owner", "Modified_Time", "Created_Time"];
  }
  if (key === "deals") {
    return ["Deal_Name", "Stage", "Amount", "Closing_Date", "Account_Name", "Owner", "Modified_Time", "Created_Time"];
  }
  if (key === "tasks") {
    return ["Subject", "Status", "Priority", "Due_Date", "What_Id", "Who_Id", "Owner", "Modified_Time", "Created_Time"];
  }
  if (key === "leads") {
    return ["First_Name", "Last_Name", "Email", "Phone", "Company", "Lead_Status", "Owner", "Modified_Time", "Created_Time"];
  }
  if (key === "accounts") {
    return ["Account_Name", "Website", "Phone", "Account_Type", "Owner", "Modified_Time", "Created_Time"];
  }
  return [];
}

function pickName(record = {}) {
  const first = String(record?.First_Name || "").trim();
  const last = String(record?.Last_Name || "").trim();
  const full = [first, last].filter(Boolean).join(" ").trim();
  if (full) return full;
  return String(
    record?.Deal_Name
    || record?.Subject
    || record?.Account_Name
    || record?.Name
    || record?.Full_Name
    || record?.Email
    || record?.id
    || "Record"
  ).trim();
}

function ownerName(owner = null) {
  if (!owner || typeof owner !== "object") return "";
  return String(owner.name || owner.full_name || owner.email || "").trim();
}

function normalizeRecordSummary(module = "", record = {}) {
  return {
    id: String(record?.id || "").trim(),
    module: normalizeModuleName(module),
    name: pickName(record),
    email: String(record?.Email || "").trim(),
    phone: String(record?.Phone || record?.Mobile || "").trim(),
    company: String(record?.Company || record?.Account_Name?.name || record?.Account_Name || "").trim(),
    stage: String(record?.Stage || record?.Lead_Status || record?.Status || "").trim(),
    amount: Number(record?.Amount || 0),
    owner: ownerName(record?.Owner),
    createdAt: String(record?.Created_Time || "").trim(),
    updatedAt: String(record?.Modified_Time || "").trim(),
    raw: record
  };
}

function sanitizePrimitive(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "number" || typeof value === "boolean") return value;
  if (typeof value === "string") return value.trim();
  if (typeof value === "object") return value;
  return String(value);
}

function sanitizeRecordPayload(input = {}) {
  const source = input && typeof input === "object" ? input : {};
  const next = {};
  Object.entries(source).forEach(([key, value]) => {
    const cleanKey = String(key || "").trim();
    if (!cleanKey) return;
    const cleanValue = sanitizePrimitive(value);
    if (cleanValue === "" || cleanValue === null) return;
    next[cleanKey] = cleanValue;
  });
  return next;
}

async function fetchZohoModules(env) {
  const response = await zohoRequest(env, "/crm/v2/settings/modules", { method: "GET" });
  if (!response.ok) return response;
  const modules = Array.isArray(response.body?.modules)
    ? response.body.modules
      .filter((item) => item && typeof item === "object")
      .map((item) => ({
        apiName: String(item.api_name || "").trim(),
        singular: String(item.singular_label || "").trim(),
        plural: String(item.plural_label || "").trim(),
        generatedType: String(item.generated_type || "").trim(),
        editable: item.editable !== false,
        creatable: item.creatable !== false,
        deletable: item.deletable !== false,
        layoutable: item.layoutable !== false,
        modifiedTime: String(item.modified_time || "").trim(),
        profiles: Array.isArray(item.profiles) ? item.profiles.length : 0
      }))
      .filter((item) => item.apiName)
    : [];
  return {
    ok: true,
    skipped: false,
    provider: "zoho",
    modules,
    body: response.body
  };
}

async function fetchZohoRecords(env, module, {
  perPage = DEFAULT_PAGE_SIZE,
  page = 1
} = {}) {
  const apiModule = normalizeModuleName(module);
  if (!apiModule) {
    return { ok: false, skipped: false, provider: "zoho", status: 400, message: "Module is required." };
  }
  const fields = defaultFieldsByModule(apiModule);
  const response = await zohoRequest(env, `/crm/v2/${encodeURIComponent(apiModule)}`, {
    method: "GET",
    query: {
      per_page: safePageSize(perPage),
      page: safePage(page),
      ...(fields.length ? { fields: fields.join(",") } : {})
    }
  });
  if (!response.ok) return response;
  const rows = Array.isArray(response.body?.data) ? response.body.data : [];
  return {
    ok: true,
    skipped: false,
    provider: "zoho",
    module: apiModule,
    records: rows.map((row) => normalizeRecordSummary(apiModule, row)),
    info: response.body?.info || {},
    body: response.body
  };
}

async function fetchZohoRecord(env, module, recordId) {
  const apiModule = normalizeModuleName(module);
  const id = String(recordId || "").trim();
  if (!apiModule || !id) {
    return { ok: false, skipped: false, provider: "zoho", status: 400, message: "Module and record ID are required." };
  }
  const fields = defaultFieldsByModule(apiModule);
  const response = await zohoRequest(env, `/crm/v2/${encodeURIComponent(apiModule)}/${encodeURIComponent(id)}`, {
    method: "GET",
    query: fields.length ? { fields: fields.join(",") } : {}
  });
  if (!response.ok) return response;
  const row = Array.isArray(response.body?.data) ? response.body.data[0] : null;
  return {
    ok: true,
    skipped: false,
    provider: "zoho",
    module: apiModule,
    record: row ? normalizeRecordSummary(apiModule, row) : null,
    body: response.body
  };
}

async function fetchBootstrapSnapshot(env, {
  perPage = DEFAULT_PAGE_SIZE
} = {}) {
  const [modulesResult, ...recordResults] = await Promise.all([
    fetchZohoModules(env),
    ...DEFAULT_MODULE_ORDER.map((module) => fetchZohoRecords(env, module, { perPage, page: 1 }))
  ]);

  const moduleData = modulesResult.ok ? modulesResult.modules : [];
  const recordsByModule = {};
  const moduleCounts = {};
  recordResults.forEach((result, index) => {
    const module = DEFAULT_MODULE_ORDER[index];
    const key = normalizeModuleName(module);
    recordsByModule[key] = result.ok ? result.records : [];
    moduleCounts[key] = result.ok ? result.records.length : 0;
  });

  const ok = recordResults.every((result) => result.ok || result.skipped) && (modulesResult.ok || modulesResult.skipped);
  const warnings = [
    ...(modulesResult.ok ? [] : [modulesResult.message || "Unable to load Zoho modules."]),
    ...recordResults
      .filter((result) => !result.ok && !result.skipped)
      .map((result) => result.message || "Module sync failed.")
  ].filter(Boolean);

  return {
    ok,
    skipped: modulesResult.skipped,
    provider: "zoho",
    syncedAt: utcNowLabel(),
    modules: moduleData,
    records: recordsByModule,
    counts: moduleCounts,
    warnings
  };
}

async function upsertZohoRecord(env, module, record = {}) {
  const apiModule = normalizeModuleName(module);
  const payload = sanitizeRecordPayload(record);
  if (!apiModule) {
    return { ok: false, skipped: false, provider: "zoho", status: 400, message: "Module is required." };
  }
  if (!Object.keys(payload).length) {
    return { ok: false, skipped: false, provider: "zoho", status: 400, message: "Record payload is empty." };
  }
  if (apiModule === "Contacts" && !payload.Last_Name) {
    payload.Last_Name = String(payload.First_Name || payload.Email || "VVS Contact").trim();
  }

  const id = String(payload.id || "").trim();
  if (id) delete payload.id;
  const response = await zohoRequest(env, `/crm/v2/${encodeURIComponent(apiModule)}`, {
    method: id ? "PUT" : "POST",
    body: {
      data: [id ? { id, ...payload } : payload],
      trigger: ["workflow", "approval", "blueprint"]
    }
  });
  if (!response.ok) return response;
  const resultRow = Array.isArray(response.body?.data) ? response.body.data[0] : null;
  const resultId = String(resultRow?.details?.id || id || "").trim();
  const fetched = resultId ? await fetchZohoRecord(env, apiModule, resultId) : null;
  return {
    ok: true,
    skipped: false,
    provider: "zoho",
    module: apiModule,
    id: resultId,
    action: id ? "updated" : "created",
    record: fetched?.ok ? fetched.record : null,
    body: response.body
  };
}

async function deleteZohoRecord(env, module, recordId) {
  const apiModule = normalizeModuleName(module);
  const id = String(recordId || "").trim();
  if (!apiModule || !id) {
    return { ok: false, skipped: false, provider: "zoho", status: 400, message: "Module and record ID are required." };
  }
  const response = await zohoRequest(
    env,
    `/crm/v2/${encodeURIComponent(apiModule)}/${encodeURIComponent(id)}`,
    { method: "DELETE" }
  );
  if (!response.ok) return response;
  return {
    ok: true,
    skipped: false,
    provider: "zoho",
    module: apiModule,
    id,
    action: "deleted",
    body: response.body
  };
}

function missingZohoConfigResponse() {
  return json({
    ok: false,
    skipped: true,
    provider: "zoho",
    message: "Zoho CRM is not configured yet. Set ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, and ZOHO_REFRESH_TOKEN in Cloudflare Pages secrets."
  });
}

export async function onRequestGet(context) {
  if (!hasConfiguredZohoProvider(context.env)) return missingZohoConfigResponse();

  const { searchParams } = new URL(context.request.url);
  const mode = cleanText(searchParams.get("mode") || "bootstrap").toLowerCase();

  if (mode === "record") {
    const response = await fetchZohoRecord(
      context.env,
      searchParams.get("module"),
      searchParams.get("id")
    );
    return json(response, response.ok || response.skipped ? 200 : (response.status || 502));
  }

  if (mode === "records") {
    const response = await fetchZohoRecords(context.env, searchParams.get("module"), {
      perPage: searchParams.get("perPage"),
      page: searchParams.get("page")
    });
    return json(response, response.ok || response.skipped ? 200 : (response.status || 502));
  }

  const snapshot = await fetchBootstrapSnapshot(context.env, {
    perPage: searchParams.get("perPage")
  });
  return json(snapshot, snapshot.ok || snapshot.skipped ? 200 : 502);
}

export async function onRequestPost(context) {
  if (!hasConfiguredZohoProvider(context.env)) return missingZohoConfigResponse();
  const payload = await readJson(context.request);
  if (!payload || typeof payload !== "object") return json({ ok: false, message: "Invalid JSON body." }, 400);

  const action = cleanText(payload.action || "").toLowerCase();
  if (action === "upsert-record") {
    const response = await upsertZohoRecord(context.env, payload.module, payload.record);
    return json(response, response.ok || response.skipped ? 200 : (response.status || 502));
  }

  if (action === "delete-record") {
    const response = await deleteZohoRecord(context.env, payload.module, payload.id);
    return json(response, response.ok || response.skipped ? 200 : (response.status || 502));
  }

  if (action === "fetch-record") {
    const response = await fetchZohoRecord(context.env, payload.module, payload.id);
    return json(response, response.ok || response.skipped ? 200 : (response.status || 502));
  }

  if (action === "sync-bootstrap" || action === "bootstrap") {
    const snapshot = await fetchBootstrapSnapshot(context.env, {
      perPage: payload.perPage
    });
    return json(snapshot, snapshot.ok || snapshot.skipped ? 200 : 502);
  }

  if (action === "mirror-event") {
    return json({
      ok: true,
      provider: "zoho",
      storedAt: utcNowLabel(),
      event: {
        type: cleanText(payload.type || "event"),
        details: cleanText(payload.details || ""),
        actor: cleanText(payload.actor || ""),
        module: normalizeModuleName(payload.module || "")
      }
    });
  }

  return json({ ok: false, message: "Unsupported action." }, 400);
}
