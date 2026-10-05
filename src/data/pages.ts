import type { Comparison, Release } from "@/data/types";

/** The changelog, newest first. Served at /api/changelog. */
export const changelog: Release[] = [
  {
    version: "2.0",
    date: "2026-09-24",
    title: "Agents that build dashboards",
    items: ["Ask for a dashboard and Aurora builds it", "Scheduled agents now post to Slack and email", "40% faster answers on large tables"],
  },
  {
    version: "1.8",
    date: "2026-08-28",
    title: "Snowflake and BigQuery",
    items: ["New Snowflake and BigQuery connectors", "Follow-up questions remember the conversation", "Export any chart as PNG or CSV"],
  },
  {
    version: "1.6",
    date: "2026-07-30",
    title: "Explain this number",
    items: ["Click any number to see how it was calculated", "Confidence notes on every answer", "Dark mode"],
  },
  {
    version: "1.4",
    date: "2026-06-18",
    title: "Shared answers",
    items: ["Share an answer with a link", "Team workspaces", "Stripe and HubSpot connectors"],
  },
];

/** The comparison page. true and false show a tick or a cross; text is shown as written. Served at /api/comparison. */
export const comparison: Comparison = {
  eyebrow: "Compare",
  title: "Aurora vs the usual way",
  subtitle: "How Aurora compares with traditional BI tools and asking your data team.",
  columns: ["Aurora", "Traditional BI", "Ask the data team"],
  rows: [
    { feature: "Ask questions in plain English", values: [true, false, true] },
    { feature: "Answer in seconds", values: [true, false, false] },
    { feature: "No dashboards to build first", values: [true, false, true] },
    { feature: "Shows the query behind every answer", values: [true, "Sometimes", "On request"] },
    { feature: "Scheduled answers in Slack", values: [true, "Add-on", false] },
    { feature: "Read-only by design", values: [true, true, "Varies"] },
    { feature: "Setup time", values: ["10 minutes", "Weeks", "n/a"] },
    { feature: "Starting price", values: ["$29/month", "$70/user/month", "A full-time salary"] },
  ],
};
