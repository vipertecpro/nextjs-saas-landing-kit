import type { Post } from "@/data/types";

/**
 * Blog posts, served at /api/posts. A body is a list of simple blocks, so
 * posts can come from any API or CMS. Text may use **bold**.
 */
export const posts: Post[] = [
  {
    slug: "stop-building-dashboards-nobody-opens",
    title: "Stop building dashboards nobody opens",
    description: "Most dashboards answer last quarter’s questions. Here is what we do instead, and why our teams look at the numbers more than ever.",
    date: "2026-09-18",
    author: "Priya Sharma",
    readingMinutes: 5,
    body: [
      { type: "paragraph", text: "We counted: of the 140 dashboards in our BI tool, 9 had been opened in the last month. The rest answered questions nobody was asking any more." },
      { type: "heading", text: "Questions change faster than dashboards" },
      {
        type: "paragraph",
        text: "A dashboard is a frozen question. By the time it is built and agreed, the team has moved on to the next one. That is why most “quick data requests” still land in someone’s inbox.",
      },
      { type: "heading", text: "What we do instead" },
      {
        type: "list",
        items: [
          "**Keep a handful of true north metrics** on one page, and nothing else.",
          "**Ask everything else when you need it**, in plain English, with the query shown.",
          "**Schedule the questions that matter** and get the answer in Slack on Monday morning.",
        ],
      },
      { type: "heading", text: "The result" },
      { type: "paragraph", text: "Ad-hoc requests to our data team fell by 80%, and the dashboards that remain are the ones people actually use." },
    ],
  },
  {
    slug: "how-to-trust-ai-answers-about-your-data",
    title: "How to trust an AI’s answer about your data",
    description: "Show the query, state the assumptions, and ask when unsure. Three rules for AI answers your team can rely on.",
    date: "2026-08-30",
    author: "Arjun Mehta",
    readingMinutes: 4,
    body: [
      { type: "paragraph", text: "An answer you can’t check is an opinion. These are the three rules we hold every AI answer to." },
      { type: "heading", text: "1. Show the query" },
      { type: "paragraph", text: "Every number should link to the exact query that produced it, so anyone can check it or reuse it." },
      {
        type: "code",
        code: `SELECT date_trunc('month', cancelled_at) AS month,
       count(*) * 100.0 / sum(count(*)) OVER () AS churn_rate
FROM subscriptions
WHERE cancelled_at >= now() - interval '6 months'
GROUP BY 1;`,
      },
      { type: "heading", text: "2. State the assumptions" },
      { type: "paragraph", text: "“Churn” means different things to finance and to product. A good answer says which definition it used." },
      { type: "heading", text: "3. Ask when unsure" },
      { type: "paragraph", text: "When a question is ambiguous, the right move is a clarifying question, not a confident guess." },
    ],
  },
  {
    slug: "monday-metrics-in-slack",
    title: "The Monday metrics digest that replaced our weekly meeting",
    description: "Five questions, answered automatically every Monday at 9am. How we set it up in ten minutes.",
    date: "2026-08-12",
    author: "Sofia Martins",
    readingMinutes: 6,
    body: [
      { type: "paragraph", text: "Our Monday meeting was 45 minutes of reading numbers aloud. Now the numbers arrive before anyone has their coffee." },
      { type: "heading", text: "Pick five questions" },
      { type: "paragraph", text: "Revenue this week, new customers, churn risk, top support topics, and one rotating “wildcard” question." },
      { type: "heading", text: "Schedule them" },
      { type: "paragraph", text: "Each one runs every Monday at 9am and posts the answer, the chart and a one-line summary to the team channel." },
      { type: "heading", text: "Use the meeting for decisions" },
      { type: "paragraph", text: "We kept the meeting, cut it to 15 minutes, and spend all of it on what to do about the numbers." },
    ],
  },
];
