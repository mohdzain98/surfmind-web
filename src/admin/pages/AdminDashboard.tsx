import { useCallback, useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Bookmark,
  Database,
  History,
  Link2,
  RefreshCw,
  Server,
  Users,
} from "lucide-react";
import type { HealthResponse, ServiceHealth, StatsResponse } from "../api";
import { AdminApiError } from "../api";
import { useAdminAuth } from "../adminAuth";
import { formatNumber } from "../format";
import {
  ErrorState,
  LoadingState,
  PageHeader,
  Panel,
  StatusPill,
} from "../components/AdminUi";

function StatCard({
  label,
  value,
  detail,
  Icon,
}: {
  label: string;
  value: number | undefined;
  detail: string;
  Icon: LucideIcon;
}) {
  return (
    <Panel className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-charcoal/45">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-charcoal">
            {formatNumber(value)}
          </p>
          <p className="mt-1 text-[11px] text-charcoal/35">{detail}</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage/12 text-sage">
          <Icon className="h-4.5 w-4.5" aria-hidden="true" />
        </span>
      </div>
    </Panel>
  );
}

function HealthCard({
  name,
  health,
  Icon,
}: {
  name: string;
  health: ServiceHealth;
  Icon: LucideIcon;
}) {
  return (
    <div className="rounded-xl border border-charcoal/8 bg-[#fcfbf8] p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5 text-sm font-semibold text-charcoal">
          <Icon className="h-4 w-4 text-charcoal/45" aria-hidden="true" />
          {name}
        </span>
        <StatusPill ok={health.ok}>
          {health.status ||
            (health.ok
              ? "Healthy"
              : health.detail === "systemctl not available"
                ? "Unavailable"
                : "Issue")}
        </StatusPill>
      </div>
      {name === "Redis" && health.ok ? (
        <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div>
            <dt className="text-[10px] text-charcoal/35">Memory</dt>
            <dd className="mt-1 text-xs font-semibold">
              {health.usedMemoryHuman || "—"}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] text-charcoal/35">Clients</dt>
            <dd className="mt-1 text-xs font-semibold">
              {health.connectedClients ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] text-charcoal/35">Keys</dt>
            <dd className="mt-1 text-xs font-semibold">
              {health.keyCount ?? "—"}
            </dd>
          </div>
        </dl>
      ) : null}
      {!health.ok ? (
        <p className="mt-3 break-words text-xs leading-5 text-red-600">
          {health.detail || health.status || "Service check failed."}
        </p>
      ) : null}
    </div>
  );
}

export default function AdminDashboard() {
  const { request } = useAdminAuth();
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [healthData, statsData] = await Promise.all([
        request<HealthResponse>("/status/health"),
        request<StatsResponse>("/status/stats"),
      ]);
      setHealth(healthData);
      setStats(statsData);
    } catch (requestError) {
      setError(
        requestError instanceof AdminApiError
          ? requestError.message
          : "Dashboard data could not be loaded."
      );
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const totalAccounts = stats?.total_accounts ?? stats?.totalAccounts;
  const linkedAccounts = stats?.linked_accounts ?? stats?.linkedAccounts;
  const historyPages = stats?.total_pages_history ?? stats?.totalPagesHistory;
  const bookmarkPages =
    stats?.total_pages_bookmark ?? stats?.totalPagesBookmark;

  const allHealthy = health
    ? [
        health.postgres,
        health.pgvector,
        health.redis,
        ...Object.values(health.services ?? {}),
      ].every((service) => service.ok)
    : false;

  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="A live view of SurfMind's core services, accounts, and saved-page footprint."
        action={
          <button
            type="button"
            onClick={() => void loadDashboard()}
            disabled={loading}
            className="inline-flex items-center gap-2 self-start rounded-full border border-charcoal/15 bg-white/60 px-4 py-2 text-xs font-semibold text-charcoal transition hover:bg-white disabled:opacity-50"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
              aria-hidden="true"
            />
            Refresh
          </button>
        }
      />

      {loading && !health ? <LoadingState label="Loading dashboard…" /> : null}
      {error && !health ? (
        <ErrorState message={error} onRetry={() => void loadDashboard()} />
      ) : null}

      {health && stats ? (
        <>
          {error ? (
            <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
              {error}
            </p>
          ) : null}
          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total accounts"
              value={totalAccounts}
              detail="Solo and paired accounts"
              Icon={Users}
            />
            <StatCard
              label="Linked accounts"
              value={linkedAccounts}
              detail="Accounts with multiple browsers"
              Icon={Link2}
            />
            <StatCard
              label="History pages"
              value={historyPages}
              detail="Saved across all accounts"
              Icon={History}
            />
            <StatCard
              label="Bookmark pages"
              value={bookmarkPages}
              detail="Saved across all accounts"
              Icon={Bookmark}
            />
          </div>

          <Panel className="mt-7 p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-semibold text-charcoal">
                  Service health
                </h2>
                <p className="mt-1 text-xs text-charcoal/45">
                  Each dependency is checked independently.
                </p>
              </div>
              <StatusPill ok={allHealthy}>
                {allHealthy ? "All systems operational" : "Attention required"}
              </StatusPill>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <HealthCard
                name="Postgres"
                health={health.postgres}
                Icon={Database}
              />
              <HealthCard
                name="PGVector"
                health={health.pgvector}
                Icon={Server}
              />
              <HealthCard name="Redis" health={health.redis} Icon={Server} />
              {Object.entries(health.services ?? {}).map(([name, service]) => (
                <HealthCard
                  key={name}
                  name={name}
                  health={service}
                  Icon={Server}
                />
              ))}
            </div>
          </Panel>
          {health.disk ? (
            <Panel className="mt-7 p-5 sm:p-6">
              <h2 className="font-serif text-xl font-semibold text-charcoal">
                Root disk usage
              </h2>
              <p className="mt-2 text-sm text-charcoal/60">
                {health.disk.usedPercent}% used
              </p>
              <progress
                aria-label="Root filesystem usage"
                max={100}
                value={health.disk.usedPercent}
                className="mt-3 h-3 w-full accent-sage"
              />
              <dl className="mt-4 grid grid-cols-3 gap-4 text-sm">
                {[
                  ["Total", health.disk.totalGb],
                  ["Used", health.disk.usedGb],
                  ["Free", health.disk.freeGb],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs text-charcoal/45">{label}</dt>
                    <dd className="mt-1 font-semibold">{value} GB</dd>
                  </div>
                ))}
              </dl>
            </Panel>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
