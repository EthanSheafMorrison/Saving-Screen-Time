// Helpers shared by the /talks listing, the talk pages and search. Sanity
// stores talk dates as date-only strings, e.g. "2026-10-12".

// Today's date in New Zealand as YYYY-MM-DD, so talks move from Upcoming to
// Past at NZ midnight rather than at UTC midnight (the server clock on Vercel).
export function todayInNZ(): string {
  const parts = new Intl.DateTimeFormat("en-NZ", {
    timeZone: "Pacific/Auckland",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const part = (type: string) => parts.find((p) => p.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

// A talk stays upcoming for the whole of its day.
export function isUpcoming(date?: string): boolean {
  return !!date && date >= todayInNZ();
}

// "2026-10-12" → "12 Oct 2026". Formatted in UTC so the day can't shift.
export function formatTalkDate(date?: string): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-NZ", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

// Shown on download buttons so people on patchy wifi know what they're getting.
export function formatFileSize(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
