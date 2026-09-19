import { useState } from "react";
import {
  Bookmark,
  ChevronDown,
  History,
  Layers3,
  RefreshCw,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { SearchMetricsResponse } from "../api";
import { buildQuery } from "../api";
import { formatDuration, formatNumber } from "../format";
import { useAdminResource } from "../useAdminResource";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
  Panel,
} from "../components/AdminUi";

const FLAG_ICONS: Record<string, LucideIcon> = {
  history: History,
  bookmark: Bookmark,
  combined: Layers3,
};

export default function AdminSearchMetrics() {
  const [days, setDays] = useState(7);
  const path = `/status/search-metrics${buildQuery({ since_days: days, limit: 200 })}`;
  const { data, loading, error, reload } =
    useAdminResource<SearchMetricsResponse>(path);
  const totalSearches = (data?.metrics || []).reduce(
    (total, metric) => total + metric.totalSearches,
    0
  );

  return (
    <div>
      <PageHeader
        eyebrow="Retrieval quality"
        title="Search metrics"
        description="Search volume and response latency across History, Bookmarks, and Combined modes."
        action={
          <div className="flex items-center gap-2">
            <label className="text-[11px] font-semibold text-charcoal/50">
              Window
              <span className="relative ml-2 inline-block">
                <select
                  value={days}
                  onChange={(event) => setDays(Number(event.target.value))}
                  className="appearance-none rounded-lg border border-charcoal/12 bg-white/70 py-2 pl-3 pr-12 text-xs text-charcoal outline-none focus:border-sage"
                >
                  <option value={7}>7 days</option>
                  <option value={30}>30 days</option>
                  <option value={90}>90 days</option>
                  <option value={365}>365 days</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-charcoal/55"
                  aria-hidden="true"
                />
              </span>
            </label>
            <button
              type="button"
              onClick={() => void reload()}
              disabled={loading}
              aria-label="Refresh search metrics"
              className="rounded-lg border border-charcoal/12 bg-white/70 p-2 text-charcoal/60 hover:bg-white disabled:opacity-40"
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        }
      />

      {data?.metrics.length ? (
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {data.metrics.map((metric) => {
            const Icon = FLAG_ICONS[metric.flag] || Layers3;
            return (
              <Panel key={metric.flag} className="p-5">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage/12 text-sage">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-charcoal/35">
                    {metric.flag}
                  </span>
                </div>
                <p className="mt-5 text-3xl font-semibold tracking-tight">
                  {formatNumber(metric.totalSearches)}
                </p>
                <p className="text-[11px] text-charcoal/40">searches</p>
                <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-charcoal/8 pt-4">
                  <div>
                    <dt className="text-[10px] text-charcoal/35">Average</dt>
                    <dd className="mt-1 text-xs font-semibold">
                      {formatDuration(metric.avgDurationMs)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] text-charcoal/35">Slowest</dt>
                    <dd className="mt-1 text-xs font-semibold">
                      {formatDuration(metric.maxDurationMs)}
                    </dd>
                  </div>
                </dl>
              </Panel>
            );
          })}
        </div>
      ) : null}

      <Panel className="mt-5 overflow-hidden">
        {loading ? <LoadingState label="Loading search metrics…" /> : null}
        {!loading && error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : null}
        {!loading && !error && !data?.metrics.length ? (
          <EmptyState
            title="No searches in this window"
            description="Metrics will appear here after users search their saved history or bookmarks."
          />
        ) : null}
        {!loading && !error && data?.metrics.length ? (
          <div className="flex flex-col gap-2 px-5 py-4 text-xs text-charcoal/45 sm:flex-row sm:items-center sm:justify-between">
            <span>{formatNumber(totalSearches)} searches across all modes</span>
            <span>Missing legacy latency values are shown as —</span>
          </div>
        ) : null}
      </Panel>
    </div>
  );
}
