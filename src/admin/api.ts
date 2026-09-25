const configuredBaseUrl = (
  import.meta.env.VITE_ADMIN_API_BASE_URL as string | undefined
)?.trim();

export const ADMIN_API_BASE_URL = (configuredBaseUrl || "/v1/admin").replace(
  /\/+$/,
  ""
);

export class AdminApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
  }
}

type ErrorPayload = {
  detail?: string | Array<{ loc?: Array<string | number>; msg?: string }>;
};

async function readResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json().catch(() => null)) as
    T | ErrorPayload | null;

  if (!response.ok) {
    const detail = (payload as ErrorPayload | null)?.detail;
    const message = Array.isArray(detail)
      ? detail.map((item) => item.msg || "Invalid request").join(" · ")
      : detail || `Request failed with status ${response.status}`;
    throw new AdminApiError(message, response.status);
  }

  return payload as T;
}

export type LoginResponse = {
  success: boolean;
  token: string;
  expiresAt: string;
};

export async function loginAdmin(
  username: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`${ADMIN_API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return readResponse<LoginResponse>(response);
}

export async function adminRequest<T>(
  token: string,
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${ADMIN_API_BASE_URL}${path}`, {
    ...init,
    headers,
  });
  return readResponse<T>(response);
}

export type ServiceHealth = {
  ok: boolean;
  detail?: string | null;
  status?: string | null;
  usedMemoryHuman?: string;
  connectedClients?: number;
  keyCount?: number;
};

export type HealthResponse = {
  postgres: ServiceHealth;
  pgvector: ServiceHealth;
  redis: ServiceHealth;
  services?: Record<string, ServiceHealth>;
  disk?: {
    totalGb: number;
    usedGb: number;
    freeGb: number;
    usedPercent: number;
  };
};

export type StatsResponse = {
  total_accounts?: number;
  linked_accounts?: number;
  total_pages_history?: number;
  total_pages_bookmark?: number;
  totalAccounts?: number;
  linkedAccounts?: number;
  totalPagesHistory?: number;
  totalPagesBookmark?: number;
};

export type LogRecord = {
  id: number;
  level: string;
  loggerName: string;
  message: string;
  extra: Record<string, unknown> | null;
  createdAt: string;
};

export type LogsResponse = {
  logs: LogRecord[];
  limit: number;
  offset: number;
};

export type NginxLogsResponse = {
  logType: "error" | "access";
  lines: string[];
  available: boolean;
  detail: string | null;
};

export type LlmUsageRecord = {
  useCase: string;
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  calls: number;
  costUsd: number | null;
};

export type LlmUsageResponse = {
  usage: LlmUsageRecord[];
  totalCostUsd: number;
  unpricedRows: number;
};

export type SearchMetric = {
  flag: "history" | "bookmark" | "combined" | string;
  totalSearches: number;
  avgDurationMs: number | null;
  maxDurationMs: number | null;
};

export type SearchMetricsResponse = { metrics: SearchMetric[] };

export type AccountDetails = {
  syncAccountId: number;
  tier: string;
  browserCount: number;
  browsers: string[];
  isLinked: boolean;
  pagesHistory: number;
  pagesBookmark: number;
  llmInputTokens: number;
  llmOutputTokens: number;
  searchCount: number;
};

export type AccountSummary = {
  syncAccountId: number;
  tier: string;
  browserCount: number;
  isLinked: boolean;
  pagesTotal: number;
  searchCount: number;
  llmTokensTotal: number;
  activityScore: number;
  createdAt: string;
};

export type AccountsResponse = {
  accounts: AccountSummary[];
  total: number;
  limit: number;
  offset: number;
};

export function buildQuery(
  values: Record<string, string | number | undefined>
): string {
  const params = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== "") params.set(key, String(value));
  });
  const query = params.toString();
  return query ? `?${query}` : "";
}

export type AccountSearchesResponse = {
  syncAccountId: number;
  total: number;
  limit: number;
  offset: number;
  searches: Array<{
    id: number;
    query: string;
    flag: string;
    answer: string | null;
    sources: unknown[] | null;
    durationMs: number | null;
    createdAt: string;
  }>;
};
