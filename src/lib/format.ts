/** A date such as "September 18, 2026", the same on the server and in every time zone. */
export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(date));
}
