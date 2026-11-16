import { formatDateTime } from "../format";

function record(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function text(value: unknown) {
  return typeof value === "string" ? value : "";
}

function safeUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.href
      : null;
  } catch {
    return null;
  }
}

function sourceDate(value: unknown) {
  if (value == null || value === "") return "";
  const date =
    typeof value === "number" ||
    (typeof value === "string" && /^\d+$/.test(value))
      ? new Date(Number(value))
      : new Date(text(value));
  return Number.isNaN(date.getTime()) ? "" : formatDateTime(date.toISOString());
}

export default function SearchSources({ sources }: { sources: unknown[] }) {
  return (
    <div
      tabIndex={0}
      role="region"
      aria-label="Search sources"
      className="mt-2 h-80 overflow-y-auto rounded-xl border border-charcoal/10 bg-charcoal/[0.025] p-3 sm:h-96"
    >
      <div className="grid gap-3 lg:grid-cols-2">
        {sources.map((value, index) => {
          const source = record(value);
          const metadata = record(source.metadata);
          const rawUrl = text(source.url) || text(metadata.source);
          const url = safeUrl(rawUrl);
          const title =
            text(source.title) ||
            text(metadata.title) ||
            rawUrl ||
            `Source ${index + 1}`;
          const snippet = text(source.snippet) || text(source.content);
          const type = text(source.type) || text(metadata.type);
          const device =
            text(source.source_device_name) || text(metadata.device_name);
          const heading = source.heading_path ?? metadata.heading_path;
          const headingText = Array.isArray(heading)
            ? heading
                .filter((part): part is string => typeof part === "string")
                .join(" › ")
            : text(heading);
          const date = sourceDate(metadata.date);
          const details = [
            ["Folder", text(metadata.folder)],
            ["Device", device],
            ["Section", headingText],
            ["Saved", date],
            [
              "Score",
              typeof source.score === "number" ? String(source.score) : "",
            ],
            [
              "Vector distance",
              typeof metadata.vector_distance === "number"
                ? metadata.vector_distance.toFixed(4)
                : "",
            ],
          ].filter(([, detail]) => detail);

          return (
            <article
              key={index}
              className="min-w-0 rounded-lg border border-charcoal/8 bg-white p-4"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] text-charcoal/50">
                <span>Source {index + 1}</span>
                {type ? (
                  <span className="rounded-full bg-sage/10 px-2 py-0.5 capitalize text-sage">
                    {type}
                  </span>
                ) : null}
                {metadata.found_on_other_browser === true ? (
                  <span>Other browser</span>
                ) : null}
              </div>
              <h4 className="break-words text-sm font-semibold text-charcoal">
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-charcoal/20 underline-offset-2 hover:text-sage"
                  >
                    {title}
                  </a>
                ) : (
                  title
                )}
              </h4>
              {rawUrl ? (
                <p className="mt-1 break-all text-[10px] text-charcoal/45">
                  {rawUrl}
                </p>
              ) : null}
              {snippet ? (
                <p className="mt-3 whitespace-pre-wrap break-words text-xs leading-5 text-charcoal/70">
                  {snippet}
                </p>
              ) : null}
              {details.length ? (
                <dl className="mt-3 space-y-1 border-t border-charcoal/8 pt-3 text-[11px]">
                  {details.map(([label, detail]) => (
                    <div key={label} className="flex gap-2">
                      <dt className="shrink-0 text-charcoal/40">{label}:</dt>
                      <dd className="min-w-0 break-words text-charcoal/65">
                        {detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              <details className="mt-3 text-[11px] text-charcoal/45">
                <summary className="cursor-pointer hover:text-charcoal">
                  Raw details
                </summary>
                <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded bg-charcoal/[0.035] p-2">
                  {JSON.stringify(value, null, 2)}
                </pre>
              </details>
            </article>
          );
        })}
      </div>
    </div>
  );
}
