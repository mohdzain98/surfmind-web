import { useState } from "react";
import {
  Bot,
  ChevronDown,
  Cpu,
  MessageSquareText,
  RefreshCw,
} from "lucide-react";
import type { LlmUsageResponse } from "../api";
import { buildQuery } from "../api";
import { formatNumber } from "../format";
import { useAdminResource } from "../useAdminResource";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
  Panel,
} from "../components/AdminUi";

export default function AdminLlmUsage() {
  const [days, setDays] = useState(7);
  const path = `/status/llm-usage${buildQuery({ since_days: days, limit: 200 })}`;
  const { data, loading, error, reload } =
    useAdminResource<LlmUsageResponse>(path);
  const totals = (data?.usage || []).reduce(
    (result, item) => ({
      input: result.input + item.inputTokens,
      output: result.output + item.outputTokens,
      calls: result.calls + item.calls,
    }),
    { input: 0, output: 0, calls: 0 }
  );

  return (
    <div>
      <PageHeader
        eyebrow="AI operations"
        title="LLM usage"
        description="Token consumption grouped by use case, provider, and model for the selected reporting window."
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
              aria-label="Refresh LLM usage"
              className="rounded-lg border border-charcoal/12 bg-white/70 p-2 text-charcoal/60 hover:bg-white disabled:opacity-40"
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        }
      />

      {data ? (
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {[
            {
              label: "Input tokens",
              value: totals.input,
              Icon: MessageSquareText,
            },
            { label: "Output tokens", value: totals.output, Icon: Bot },
            { label: "Model calls", value: totals.calls, Icon: Cpu },
          ].map(({ label, value, Icon }) => (
            <Panel key={label} className="flex items-center gap-4 p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage/12 text-sage">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-[11px] text-charcoal/40">{label}</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatNumber(value)}
                </p>
              </div>
            </Panel>
          ))}
        </div>
      ) : null}

      <Panel className="mt-5 overflow-hidden">
        {loading ? <LoadingState label="Loading usage…" /> : null}
        {!loading && error ? (
          <ErrorState message={error} onRetry={reload} />
        ) : null}
        {!loading && !error && !data?.usage.length ? (
          <EmptyState
            title="No model usage in this window"
            description="Usage will appear after RAG or post-processing calls are recorded."
          />
        ) : null}
        {!loading && !error && data?.usage.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead className="border-b border-charcoal/8 bg-charcoal/[0.025] text-[10px] uppercase tracking-wider text-charcoal/40">
                <tr>
                  <th className="px-5 py-3 font-semibold">Use case</th>
                  <th className="px-5 py-3 font-semibold">Provider</th>
                  <th className="px-5 py-3 font-semibold">Model</th>
                  <th className="px-5 py-3 text-right font-semibold">Input</th>
                  <th className="px-5 py-3 text-right font-semibold">Output</th>
                  <th className="px-5 py-3 text-right font-semibold">Calls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/7 text-xs">
                {data.usage.map((item) => (
                  <tr
                    key={`${item.useCase}-${item.provider}-${item.model}`}
                    className="hover:bg-charcoal/[0.02]"
                  >
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-sage/12 px-2.5 py-1 text-[10px] font-semibold text-sage">
                        {item.useCase.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-charcoal/70">
                      {item.provider}
                    </td>
                    <td className="px-5 py-4 font-mono text-[11px] text-charcoal/55">
                      {item.model}
                    </td>
                    <td className="px-5 py-4 text-right text-charcoal/60">
                      {formatNumber(item.inputTokens)}
                    </td>
                    <td className="px-5 py-4 text-right text-charcoal/60">
                      {formatNumber(item.outputTokens)}
                    </td>
                    <td className="px-5 py-4 text-right font-semibold">
                      {formatNumber(item.calls)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </Panel>
    </div>
  );
}
