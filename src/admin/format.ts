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
