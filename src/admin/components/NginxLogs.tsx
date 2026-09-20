import { useState, type FormEvent } from "react";
import { buildQuery, type NginxLogsResponse } from "../api";
import { useAdminResource } from "../useAdminResource";
import { EmptyState, ErrorState, LoadingState, Panel } from "./AdminUi";

const DEFAULT_FILTERS = { logType: "error", limit: "100", search: "" };
const inputClass =
  "mt-1.5 w-full rounded-lg border border-charcoal/12 bg-white px-3 py-2.5 text-xs font-normal text-charcoal outline-none focus:border-sage";

function NginxLogResults({ path }: { path: string }) {
  const { data, loading, error, reload } =
    useAdminResource<NginxLogsResponse>(path);

  return (
    <Panel className="mt-5 overflow-hidden">
      <div className="flex items-center justify-between border-b border-charcoal/8 px-5 py-3">
        <p className="text-xs text-charcoal/55" aria-live="polite">
          {data && !loading && !error && data.available
            ? `${data.lines.length} ${data.logType} log lines`
            : "Nginx log output"}
        </p>
        <button
          type="button"
          onClick={() => void reload()}
          disabled={loading}
          className="rounded-lg border border-charcoal/10 px-3 py-2 text-xs text-charcoal/60 hover:bg-charcoal/5 disabled:opacity-30"
        >
          Refresh
        </button>
      </div>
      {loading ? (
        <LoadingState label="Loading nginx logs…" />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : data && !data.available ? (
        <EmptyState
          title="Nginx logs unavailable"
          description={data.detail || "The nginx log file could not be read."}
        />
      ) : data?.lines.length ? (
        <pre
          aria-label="Nginx log lines"
          tabIndex={0}
          className="max-h-[36rem] overflow-auto bg-charcoal/[0.025] p-5 font-mono text-[11px] leading-6 text-charcoal/75"
        >
          {data.lines.join("\n")}
        </pre>
      ) : (
        <EmptyState
          title="No nginx logs match these filters"
          description="Try another log type or clear the search."
        />
      )}
    </Panel>
  );
}

export default function NginxLogs() {
  const [draft, setDraft] = useState(DEFAULT_FILTERS);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const path = `/status/nginx-logs${buildQuery({
    log_type: filters.logType,
    limit: Number(filters.limit),
    search: filters.search,
  })}`;

  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFilters({
      ...draft,
      limit: String(Math.min(1000, Math.max(1, Number(draft.limit) || 100))),
    });
  }

  return (
    <section className="mt-10" aria-labelledby="nginx-logs-title">
      <h2
        id="nginx-logs-title"
        tabIndex={-1}
        className="scroll-mt-6 font-serif text-2xl font-semibold text-charcoal"
      >
        Nginx logs
      </h2>
      <p className="mt-2 text-sm text-charcoal/55">
        Latest error and access log lines. Search matches text regardless of
        case.
      </p>
      <Panel className="mt-5 p-4 sm:p-5">
        <form
          onSubmit={applyFilters}
          className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_0.75fr_2fr_auto]"
        >
          <label className="text-[11px] font-semibold text-charcoal/55">
            Log type
            <select
              value={draft.logType}
              onChange={(event) =>
                setDraft({ ...draft, logType: event.target.value })
              }
              className={inputClass}
            >
              <option value="error">Error</option>
              <option value="access">Access</option>
            </select>
          </label>
          <label className="text-[11px] font-semibold text-charcoal/55">
            Line limit (max 1,000)
            <input
              type="number"
              min={1}
              max={1000}
              step={1}
              required
              value={draft.limit}
              onChange={(event) =>
                setDraft({ ...draft, limit: event.target.value })
              }
              className={inputClass}
            />
          </label>
          <label className="text-[11px] font-semibold text-charcoal/55">
            Search contains
            <input
              value={draft.search}
              onChange={(event) =>
                setDraft({ ...draft, search: event.target.value })
              }
              placeholder="413, request path, upstream…"
              className={inputClass}
            />
          </label>
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="h-[2.375rem] rounded-lg bg-charcoal px-4 text-xs font-semibold text-white hover:bg-charcoal/85"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => {
                setDraft(DEFAULT_FILTERS);
                setFilters(DEFAULT_FILTERS);
              }}
              className="h-[2.375rem] rounded-lg px-2 text-xs text-charcoal/45 hover:text-charcoal"
            >
              Clear
            </button>
          </div>
        </form>
      </Panel>
      <NginxLogResults key={path} path={path} />
    </section>
  );
}
