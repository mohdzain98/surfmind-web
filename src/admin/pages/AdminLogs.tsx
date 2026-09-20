import { useState } from "react";
import { ChevronLeft, ChevronRight, Filter, Search } from "lucide-react";
import type { LogsResponse } from "../api";
import { buildQuery } from "../api";
import { formatDateTime } from "../format";
import { useAdminResource } from "../useAdminResource";
import NginxLogs from "../components/NginxLogs";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
  Panel,
} from "../components/AdminUi";

const LIMIT = 50;

type LogFilters = {
  level: string;
  loggerName: string;
  since: string;
  until: string;
};

const EMPTY_FILTERS: LogFilters = {
  level: "",
  loggerName: "",
  since: "",
  until: "",
};

function dateBoundary(value: string, endOfDay = false) {
  if (!value) return undefined;
  return new Date(
    `${value}T${endOfDay ? "23:59:59.999" : "00:00:00"}`
  ).toISOString();
}

function levelClass(level: string) {
  return level.toUpperCase() === "ERROR"
    ? "bg-red-50 text-red-700"
    : "bg-amber-50 text-amber-700";
}

export default function AdminLogs() {
  const [draft, setDraft] = useState<LogFilters>(EMPTY_FILTERS);
  const [filters, setFilters] = useState<LogFilters>(EMPTY_FILTERS);
  const [offset, setOffset] = useState(0);
  const path = `/status/logs${buildQuery({
    level: filters.level,
    logger_name: filters.loggerName,
    since: dateBoundary(filters.since),
    until: dateBoundary(filters.until, true),
    limit: LIMIT,
    offset,
  })}`;
  const { data, loading, error, reload } = useAdminResource<LogsResponse>(path);

  function applyFilters(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOffset(0);
    setFilters(draft);
  }

  function clearFilters() {
    setDraft(EMPTY_FILTERS);
    setFilters(EMPTY_FILTERS);
    setOffset(0);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Observability"
        title="System logs"
        description="Warnings, failures, provider fallbacks, sync events, and administrator actions from the last 30 days."
        action={
          <button
            type="button"
            onClick={() => {
              const heading = document.getElementById("nginx-logs-title");
              heading?.focus({ preventScroll: true });
              heading?.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
                block: "start",
              });
            }}
            className="shrink-0 self-end rounded-lg border border-charcoal/12 bg-white px-4 py-2.5 text-xs font-semibold text-charcoal hover:bg-charcoal/5 sm:self-center"
          >
            Nginx logs ↓
          </button>
        }
      />

      <Panel className="mt-7 p-4 sm:p-5">
        <form
          onSubmit={applyFilters}
          className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[0.75fr_1.2fr_1fr_1fr_auto]"
        >
          <label className="text-[11px] font-semibold text-charcoal/55">
            Level
            <select
              value={draft.level}
              onChange={(event) =>
                setDraft({ ...draft, level: event.target.value })
              }
              className="mt-1.5 w-full rounded-lg border border-charcoal/12 bg-white px-3 py-2.5 text-xs font-normal text-charcoal outline-none focus:border-sage"
            >
              <option value="">All levels</option>
              <option value="WARNING">Warning</option>
              <option value="ERROR">Error</option>
            </select>
          </label>
          <label className="text-[11px] font-semibold text-charcoal/55">
            Logger contains
            <div className="relative mt-1.5">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-charcoal/30" />
              <input
                value={draft.loggerName}
                onChange={(event) =>
                  setDraft({ ...draft, loggerName: event.target.value })
                }
                placeholder="rag, provider, sync…"
                className="w-full rounded-lg border border-charcoal/12 bg-white py-2.5 pl-9 pr-3 text-xs font-normal text-charcoal outline-none focus:border-sage"
              />
            </div>
          </label>
          <label className="text-[11px] font-semibold text-charcoal/55">
            From
            <input
              type="date"
              value={draft.since}
              onChange={(event) =>
                setDraft({ ...draft, since: event.target.value })
              }
              className="mt-1.5 w-full rounded-lg border border-charcoal/12 bg-white px-3 py-2.5 text-xs font-normal text-charcoal outline-none focus:border-sage"
            />
          </label>
          <label className="text-[11px] font-semibold text-charcoal/55">
            Until
            <input
              type="date"
              value={draft.until}
              onChange={(event) =>
                setDraft({ ...draft, until: event.target.value })
              }
              className="mt-1.5 w-full rounded-lg border border-charcoal/12 bg-white px-3 py-2.5 text-xs font-normal text-charcoal outline-none focus:border-sage"
            />
          </label>
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="inline-flex h-[2.375rem] items-center gap-2 rounded-lg bg-charcoal px-4 text-xs font-semibold text-white hover:bg-charcoal/85"
            >
              <Filter className="h-3.5 w-3.5" /> Apply
            </button>
            <button
              type="button"
              onClick={clearFilters}
              className="h-[2.375rem] rounded-lg px-2 text-xs text-charcoal/45 hover:text-charcoal"
            >
              Clear
            </button>
          </div>
        </form>
      </Panel>

      <Panel className="mt-5 overflow-hidden">
        {loading ? <LoadingState label="Loading logs…" /> : null}
        {!loading && error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : null}
        {!loading && !error && !data?.logs.length ? (
          <EmptyState
            title="No logs match these filters"
            description="Try a wider date range or remove one of the filters."
          />
        ) : null}
        {!loading && !error && data?.logs.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead className="border-b border-charcoal/8 bg-charcoal/[0.025] text-[10px] uppercase tracking-wider text-charcoal/40">
                <tr>
                  <th className="px-5 py-3 font-semibold">Level</th>
                  <th className="px-5 py-3 font-semibold">Logger</th>
                  <th className="px-5 py-3 font-semibold">Message</th>
                  <th className="px-5 py-3 font-semibold">Details</th>
                  <th className="px-5 py-3 font-semibold">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/7">
                {data.logs.map((log) => (
                  <tr
                    key={log.id}
                    className="align-top hover:bg-charcoal/[0.02]"
                  >
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-semibold ${levelClass(log.level)}`}
                      >
                        {log.level}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-[11px] text-charcoal/60">
                      {log.loggerName}
                    </td>
                    <td className="max-w-sm px-5 py-4 text-xs leading-5 text-charcoal/75">
                      {log.message}
                    </td>
                    <td className="max-w-xs px-5 py-4">
                      {log.extra ? (
                        <pre className="whitespace-pre-wrap break-words rounded-lg bg-charcoal/[0.035] p-2 text-[10px] leading-4 text-charcoal/55">
                          {JSON.stringify(log.extra, null, 2)}
                        </pre>
                      ) : (
                        <span className="text-xs text-charcoal/25">—</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-[11px] text-charcoal/45">
                      {formatDateTime(log.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {!loading && !error && data ? (
          <div className="flex items-center justify-between border-t border-charcoal/8 px-5 py-3">
            <p className="text-[11px] text-charcoal/40">
              Showing {data.offset + 1}–{data.offset + data.logs.length}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setOffset((current) => Math.max(0, current - LIMIT))
                }
                disabled={offset === 0}
                aria-label="Previous log page"
                className="rounded-lg border border-charcoal/10 p-2 text-charcoal/60 hover:bg-charcoal/5 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setOffset((current) => current + LIMIT)}
                disabled={data.logs.length < LIMIT}
                aria-label="Next log page"
                className="rounded-lg border border-charcoal/10 p-2 text-charcoal/60 hover:bg-charcoal/5 disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : null}
      </Panel>
      <NginxLogs />
    </div>
  );
}
