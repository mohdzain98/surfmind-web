import { useEffect, type ReactNode } from "react";
import { AlertCircle, CircleCheck, Inbox, LoaderCircle, X } from "lucide-react";

export function AdminToast({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 4500);
    return () => window.clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <div
      className="fixed right-4 top-4 z-[120] flex w-[min(22rem,calc(100vw-2rem))] items-start gap-3 rounded-xl border border-emerald-200 bg-white p-4 text-emerald-800 shadow-[0_18px_55px_rgba(45,42,42,0.2)] animate-[fadeUp_180ms_ease-out] sm:right-6 sm:top-6"
      role="status"
      aria-live="polite"
    >
      <CircleCheck
        className="mt-0.5 h-4.5 w-4.5 shrink-0 text-emerald-600"
        aria-hidden="true"
      />
      <p className="min-w-0 flex-1 text-xs font-medium leading-5">{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="rounded-full p-1 text-emerald-700/55 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
      >
        <X className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-charcoal/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-sage">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-charcoal/55">
          {description}
        </p>
      </div>
      {action}
    </header>
  );
}

export function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-charcoal/10 bg-white/75 shadow-[0_18px_50px_rgba(45,42,42,0.05)] ${className}`}
    >
      {children}
    </section>
  );
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      className="flex min-h-48 items-center justify-center gap-2 text-sm text-charcoal/50"
      role="status"
    >
      <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
      {label}
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center px-6 text-center">
      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
        <AlertCircle className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="max-w-md text-sm text-charcoal/65">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-full border border-charcoal/15 px-4 py-2 text-xs font-semibold text-charcoal transition-colors hover:bg-charcoal hover:text-white"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center px-6 text-center">
      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-clay/20 text-charcoal/45">
        <Inbox className="h-5 w-5" aria-hidden="true" />
      </span>
      <h2 className="text-sm font-semibold text-charcoal">{title}</h2>
      <p className="mt-1 max-w-md text-xs leading-5 text-charcoal/50">
        {description}
      </p>
    </div>
  );
}

export function StatusPill({
  ok,
  children,
}: {
  ok: boolean;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-emerald-500" : "bg-red-500"}`}
      />
      {children}
    </span>
  );
}
