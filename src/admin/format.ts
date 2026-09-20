export const formatNumber = (value: number | undefined) =>
  new Intl.NumberFormat().format(value || 0);

export const formatDateTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export const formatDuration = (value: number | null) =>
  value == null ? "—" : `${(value / 1000).toFixed(2)}s`;

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 4,
});

export const formatUsd = (value: number | null | undefined) =>
  value == null
    ? "—"
    : value > 0 && value < 0.0001
      ? "<$0.0001"
      : usdFormatter.format(value);
