import { useState } from "react";
import { buildQuery, type AccountSearchesResponse } from "../api";
import { formatDateTime, formatDuration, formatNumber } from "../format";
import { useAdminResource } from "../useAdminResource";
import { EmptyState, ErrorState, LoadingState, Panel } from "./AdminUi";

const LIMIT = 20;
const buttonClass =
  "rounded-lg border border-charcoal/12 px-3 py-2 text-xs font-semibold text-charcoal/65 hover:bg-charcoal/5 disabled:opacity-35";

function SearchPage({
  accountId,
  offset,
  onPage,
}: {
  accountId: number;
  offset: number;
  onPage: (offset: number) => void;
}) {
  const { data, loading, error, reload } =
    useAdminResource<AccountSearchesResponse>(
      `/accounts/${accountId}/searches${buildQuery({ limit: LIMIT, offset })}`
    );

  return (
    <>
      <div className="flex items-center justify-between gap-3 border-b border-charcoal/8 p-5">
        <div>
          <h2 className="font-serif text-xl font-semibold">Search history</h2>
          <p className="mt-1 text-xs text-charcoal/45">
            Recent retained searches, newest first.
          </p>
        </div>
        <button
          type="button"
          disabled={loading}
          onClick={() => void reload()}
          className={buttonClass}
        >
          Refresh
        </button>
      </div>
      {loading ? (
        <LoadingState label="Loading search history…" />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : data ? (
        <>
          {data.searches.length ? (
            <div className="divide-y divide-charcoal/8">
              {data.searches.map((search) => (
                <details key={search.id} className="group p-5">
                  <summary className="cursor-pointer break-words text-sm font-semibold text-charcoal">
                    {search.query}
                    <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-normal text-charcoal/50">
                      <span className="capitalize">{search.flag}</span>
                      <span>{formatDateTime(search.createdAt)}</span>
                      <span>Duration: {formatDuration(search.durationMs)}</span>
                    </span>
                  </summary>
                  <div className="mt-4 space-y-4">
                    <div>
                      <h3 className="text-xs font-semibold text-charcoal/60">
                        Answer
                      </h3>
                      <p className="mt-2 max-h-96 overflow-auto whitespace-pre-wrap break-words text-sm leading-6 text-charcoal/75">
                        {search.answer || "No answer recorded."}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-charcoal/60">
                        Sources ({search.sources?.length ?? 0})
                      </h3>
                      {search.sources?.length ? (
                        <pre className="mt-2 max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-charcoal/[0.035] p-3 text-[11px] leading-5 text-charcoal/65">
                          {JSON.stringify(search.sources, null, 2)}
                        </pre>
                      ) : (
                        <p className="mt-2 text-xs text-charcoal/45">
                          No sources recorded.
                        </p>
                      )}
                    </div>
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No searches to show"
              description="No retained searches were found on this page."
            />
          )}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-charcoal/8 px-5 py-3">
            <p className="text-xs text-charcoal/45" aria-live="polite">
              {data.searches.length
                ? `${data.offset + 1}–${data.offset + data.searches.length} of ${formatNumber(data.total)} searches`
                : `${formatNumber(data.total)} searches`}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                className={buttonClass}
                disabled={offset === 0}
                onClick={() => onPage(Math.max(0, offset - LIMIT))}
              >
                Previous
              </button>
              <button
                type="button"
                className={buttonClass}
                disabled={data.offset + data.limit >= data.total}
                onClick={() => onPage(data.offset + data.limit)}
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default function AccountSearches({ accountId }: { accountId: number }) {
  const [offset, setOffset] = useState(0);
  return (
    <Panel className="overflow-hidden">
      <SearchPage
        key={`${accountId}-${offset}`}
        accountId={accountId}
        offset={offset}
        onPage={setOffset}
      />
    </Panel>
  );
}
