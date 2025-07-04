export function formatLargeNumber(value: number): string {
  if (value >= 1_000_000_000_000)
    return (value / 1_000_000_000_000).toFixed(2) + "T";
  if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(2) + "B";
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(2) + "M";
  if (value >= 1_000) return (value / 1_000).toFixed(2) + "K";
  return value.toString();
}
