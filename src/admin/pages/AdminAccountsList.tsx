import { useCallback, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Link2,
  Search,
  Users,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import type { AccountsResponse } from "../api";
import { buildQuery } from "../api";
import { formatDateTime, formatNumber } from "../format";
import { useAdminResource } from "../useAdminResource";
import {
  AdminToast,
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
  Panel,
  StatusPill,
} from "../components/AdminUi";

const LIMIT = 25;
type SortField = "activity_score" | "created_at" | "browser_count";
type SortOrder = "asc" | "desc";

function SortableHeader({
  field,
  label,
  sortField,
  sortOrder,
  onSort,
}: {
  field: SortField;
  label: string;
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}) {
  const active = field === sortField;
  const SortIcon = active
    ? sortOrder === "asc"
      ? ArrowUp
      : ArrowDown
    : ArrowUpDown;

  return (
    <th
      className="px-5 py-3 font-semibold"
      aria-sort={
        active ? (sortOrder === "asc" ? "ascending" : "descending") : "none"
      }
    >
      <button
        type="button"
        onClick={() => onSort(field)}
        className={`inline-flex items-center gap-1.5 transition-colors hover:text-charcoal ${
          active ? "text-charcoal/70" : "text-charcoal/40"
        }`}
      >
        {label}
        <SortIcon className="h-3 w-3" aria-hidden="true" />
      </button>
    </th>
  );
}

export default function AdminAccountsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const notice = (location.state as { notice?: string } | null)?.notice;
  const dismissNotice = useCallback(() => {
    navigate(`${location.pathname}${location.search}`, {
      replace: true,
      state: null,
    });
  }, [location.pathname, location.search, navigate]);
  const [draftBrowserUuid, setDraftBrowserUuid] = useState("");
  const [browserUuid, setBrowserUuid] = useState("");
  const [offset, setOffset] = useState(0);
  const [sort, setSort] = useState<{
    field: SortField;
    order: SortOrder;
  }>({ field: "created_at", order: "desc" });
  const path = `/accounts${buildQuery({
    browser_uuid: browserUuid,
    sort_by: sort.field,
    sort_order: sort.order,
    limit: LIMIT,
    offset,
  })}`;
  const { data, loading, error, reload } =
    useAdminResource<AccountsResponse>(path);
  const firstResult = data && data.total > 0 ? data.offset + 1 : 0;
  const lastResult = data ? data.offset + data.accounts.length : 0;

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOffset(0);
    setBrowserUuid(draftBrowserUuid.trim());
  }

  function clearSearch() {
    setDraftBrowserUuid("");
    setBrowserUuid("");
    setOffset(0);
  }

  function handleSort(field: SortField) {
    setOffset(0);
    setSort((current) => ({
      field,
      order:
        current.field === field && current.order === "desc" ? "asc" : "desc",
    }));
  }

  return (
    <div>
      <PageHeader
        eyebrow="Support operations"
        title="Accounts"
        description="Browse sync accounts newest first, or find the account connected to a known browser UUID."
      />

      {notice ? (
        <AdminToast message={notice} onDismiss={dismissNotice} />
      ) : null}

      <Panel className="mt-7 p-4 sm:p-5">
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <label className="flex-1 text-[11px] font-semibold text-charcoal/55">
            Browser UUID
            <div className="relative mt-1.5">
              <Search
                className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/30"
                aria-hidden="true"
              />
              <input
                value={draftBrowserUuid}
                onChange={(event) => setDraftBrowserUuid(event.target.value)}
                placeholder="Search by all or part of a browser UUID"
                className="w-full rounded-xl border border-charcoal/12 bg-white py-3 pl-10 pr-4 text-sm font-normal text-charcoal outline-none focus:border-sage focus:ring-4 focus:ring-sage/10"
              />
            </div>
          </label>
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="h-11 rounded-xl bg-charcoal px-5 text-xs font-semibold text-white hover:bg-charcoal/85"
            >
              Search
            </button>
            {browserUuid || draftBrowserUuid ? (
              <button
                type="button"
                onClick={clearSearch}
                className="h-11 px-2 text-xs text-charcoal/45 hover:text-charcoal"
              >
                Clear
              </button>
            ) : null}
          </div>
        </form>
      </Panel>

      <Panel className="mt-5 overflow-hidden">
        {loading ? <LoadingState label="Loading accounts…" /> : null}
        {!loading && error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : null}
        {!loading && !error && !data?.accounts.length ? (
          <EmptyState
            title={browserUuid ? "No matching account" : "No accounts yet"}
            description={
              browserUuid
                ? "Try a shorter portion of the browser UUID or clear the search."
                : "Accounts will appear after a browser first syncs with SurfMind."
            }
          />
        ) : null}
        {!loading && !error && data?.accounts.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="border-b border-charcoal/8 bg-charcoal/[0.025] text-[10px] uppercase tracking-wider text-charcoal/40">
                <tr>
                  <th className="px-5 py-3 font-semibold">Account</th>
                  <SortableHeader
                    field="browser_count"
                    label="Browsers"
                    sortField={sort.field}
                    sortOrder={sort.order}
                    onSort={handleSort}
                  />
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <SortableHeader
                    field="activity_score"
                    label="Activity"
                    sortField={sort.field}
                    sortOrder={sort.order}
                    onSort={handleSort}
                  />
                  <SortableHeader
                    field="created_at"
                    label="Created"
                    sortField={sort.field}
                    sortOrder={sort.order}
                    onSort={handleSort}
                  />
                  <th className="w-12 px-5 py-3" aria-label="Open account" />
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/7">
                {data.accounts.map((account) => {
                  const activityScore = Math.min(
                    100,
                    Math.max(0, Number(account.activityScore) || 0)
                  );
                  const displayedActivityScore = activityScore.toFixed(2);

                  return (
                    <tr
                      key={account.syncAccountId}
                      role="link"
                      tabIndex={0}
                      aria-label={`Open account ${account.syncAccountId}`}
                      onClick={() =>
                        navigate(`/admin/accounts/${account.syncAccountId}`)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          navigate(`/admin/accounts/${account.syncAccountId}`);
                        }
                      }}
                      className="cursor-pointer transition-colors hover:bg-charcoal/[0.025] focus:bg-charcoal/[0.035] focus:outline-none"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage/12 text-sage">
                            <Users className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                          <span className="text-sm font-semibold text-charcoal">
                            #{account.syncAccountId}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs text-charcoal/60">
                        <span className="inline-flex items-center gap-1.5">
                          <Link2 className="h-3.5 w-3.5 text-charcoal/30" />
                          {formatNumber(account.browserCount)}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <StatusPill ok={account.isLinked}>
                          {account.isLinked ? "Linked" : "Solo"}
                        </StatusPill>
                      </td>
                      <td className="px-5 py-4">
                        <div
                          className="flex items-center gap-2"
                          title={`${formatNumber(account.pagesTotal)} pages · ${formatNumber(account.searchCount)} searches · ${formatNumber(account.llmTokensTotal)} LLM tokens`}
                        >
                          <span className="w-9 text-right text-xs font-semibold tabular-nums text-charcoal/70">
                            {displayedActivityScore}
                          </span>
                          <span
                            className="h-1.5 w-14 overflow-hidden rounded-full bg-charcoal/8"
                            role="meter"
                            aria-label={`Activity score ${displayedActivityScore} out of 100`}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={activityScore}
                          >
                            <span
                              className="block h-full rounded-full bg-sage"
                              style={{ width: `${activityScore}%` }}
                            />
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[11px] text-charcoal/45">
                        {formatDateTime(account.createdAt)}
                      </td>
                      <td className="px-5 py-4 text-charcoal/30">
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}

        {!loading && !error && data ? (
          <div className="flex items-center justify-between border-t border-charcoal/8 px-5 py-3">
            <p className="text-[11px] text-charcoal/40">
              Showing {formatNumber(firstResult)}–{formatNumber(lastResult)} of{" "}
              {formatNumber(data.total)}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  setOffset((current) => Math.max(0, current - LIMIT))
                }
                disabled={offset === 0}
                aria-label="Previous accounts page"
                className="rounded-lg border border-charcoal/10 p-2 text-charcoal/60 hover:bg-charcoal/5 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setOffset((current) => current + LIMIT)}
                disabled={offset + data.accounts.length >= data.total}
                aria-label="Next accounts page"
                className="rounded-lg border border-charcoal/10 p-2 text-charcoal/60 hover:bg-charcoal/5 disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : null}
      </Panel>
    </div>
  );
}
