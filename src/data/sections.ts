import type { ActivityEvent, SectionData } from "@/data/types";

/**
 * Dummy content for every section, served at /api/sections/{id}. Edit the
 * words here, or set API_URL to load them from your own backend instead.
 */
export const sections: SectionData = {
  announcement: {
    enabled: true,
    // Change the id to show a new announcement to visitors who closed the last one.
    id: "aurora-2-launch",
    label: "Launch week",
    text: "Aurora 2.0 is live: agents that build dashboards for you.",
    link: { label: "See what's new", href: "/changelog" },
  },

  hero: {
    background: "wave",
    sideNote: "Question → Query → Answer",
    badge: { label: "New", text: "Aurora 2.0 is out: agents that build dashboards", href: "/changelog" },
    title: "Ask your data anything.",
    highlight: "Get answers in seconds.",
    subtitle:
      "Aurora is an AI analyst that connects to your database, warehouse and spreadsheets, and answers questions in plain English, with the chart to prove it.",
    primary: { label: "Join the waitlist", href: "/waitlist" },
    secondary: { label: "See how it works", href: "/#features" },
    note: "Free during the beta. No credit card.",
    demo: {
      question: "Why did churn rise in Q3, and which customers are at risk?",
      steps: ["Reading 4 tables in your warehouse", "Comparing Q2 and Q3 cohorts", "Ranking accounts by risk"],
      answer:
        "Churn rose from 3.1% to 4.6%, almost all of it in accounts that never connected an integration. 38 of those are at risk this month, worth $41k in revenue.",
      chartTitle: "Monthly churn, %",
      chart: [
        { label: "Apr", value: 3.0 },
        { label: "May", value: 3.2 },
        { label: "Jun", value: 3.1 },
        { label: "Jul", value: 3.8 },
        { label: "Aug", value: 4.3 },
        { label: "Sep", value: 4.6 },
      ],
    },
  },

  logos: {
    caption: "Trusted by data-driven teams at",
    names: ["Northwind", "Acme", "Globex", "Umbrella", "Initech", "Hooli", "Stark", "Wayne"],
  },

  tabbedShowcase: {
    eyebrow: "Product tour",
    title: "One workspace",
    highlight: "for every question",
    interval: 6000,
    tabs: [
      {
        icon: "MessageSquareText",
        label: "Ask",
        title: "Questions in, answers out",
        description: "Type a question and get a sentence, a chart and the query behind it.",
        preview: [
          { label: "Revenue this month", value: "$164k" },
          { label: "Versus last month", value: "+8.2%" },
          { label: "Best region", value: "Europe" },
        ],
      },
      {
        icon: "LayoutDashboard",
        label: "Dashboards",
        title: "Dashboards that build themselves",
        description: "Pin any answer. Aurora keeps it fresh and explains what changed.",
        preview: [
          { label: "Active users", value: "12,480" },
          { label: "Trial to paid", value: "18.4%" },
          { label: "Net revenue retention", value: "112%" },
        ],
      },
      {
        icon: "Bell",
        label: "Digests",
        title: "Answers that come to you",
        description: "Schedule any question for Slack or email, daily or weekly.",
        preview: [
          { label: "Monday churn digest", value: "Slack" },
          { label: "Daily sales summary", value: "Email" },
          { label: "Weekly board numbers", value: "Slack" },
        ],
      },
      {
        icon: "LineChart",
        label: "Explain",
        title: "Click a number to see why",
        description: "Every number can be traced back to the rows and the query that made it.",
        preview: [
          { label: "Rows read", value: "48,211" },
          { label: "Tables joined", value: "3" },
          { label: "Confidence", value: "High" },
        ],
      },
    ],
  },

  globe: {
    eyebrow: "Worldwide",
    title: "Answering questions",
    highlight: "in 41 countries",
    subtitle: "Drag the globe. Every arc is a team somewhere asking their data a question.",
    stats: [
      { value: "41", label: "countries" },
      { value: "2,300+", label: "teams" },
      { value: "12k", label: "questions a day" },
      { value: "6", label: "data regions" },
    ],
  },

  chart3d: {
    eyebrow: "Your data, in 3D",
    title: "See the shape",
    highlight: "of your week",
    subtitle: "Questions asked by hour and weekday across all teams. Drag to turn it, hover a bar for the number.",
    caption: "Questions asked by weekday and time of day",
    unit: "questions",
    rows: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    columns: ["6am", "8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm"],
    values: [
      [120, 640, 980, 760, 820, 700, 380, 150],
      [110, 590, 920, 720, 800, 680, 360, 140],
      [100, 560, 880, 700, 760, 650, 330, 130],
      [105, 570, 900, 690, 780, 640, 320, 120],
      [90, 480, 760, 600, 560, 420, 210, 90],
      [30, 80, 160, 190, 170, 120, 90, 60],
      [25, 60, 120, 150, 160, 140, 110, 80],
    ],
  },

  features: {
    eyebrow: "Features",
    title: "An analyst on your team",
    highlight: "who never sleeps",
    subtitle: "Aurora does the querying, the charting and the explaining, so your team can get on with the decisions.",
    ask: {
      icon: "MessageSquareText",
      title: "Ask in plain English",
      description: "No SQL, no dashboards to build. Ask a question the way you'd ask a colleague.",
      question: "Which plan do our biggest customers use?",
      answer: "78% of accounts over $10k a year are on Team. 3 of them are close to their limit.",
    },
    sources: {
      icon: "Plug",
      title: "Connects to everything",
      description: "Postgres, MySQL, BigQuery, Snowflake, Stripe, HubSpot and spreadsheets, in two clicks.",
      names: ["Postgres", "MySQL", "BigQuery", "Snowflake", "Stripe", "HubSpot", "Sheets", "Slack"],
    },
    speed: { icon: "Gauge", title: "Answers in seconds", description: "Median answer time across our customers.", value: 2.4, decimals: 1, suffix: "s" },
    secure: {
      icon: "Lock",
      title: "Read-only and private",
      description: "Aurora only ever reads. Your data is never used to train models.",
      points: ["Read-only connections", "Encrypted in transit and at rest", "Never used for model training"],
    },
    more: [
      { icon: "LineChart", title: "Charts that explain themselves", description: "Every answer comes with the chart and the reasoning behind it." },
      { icon: "Workflow", title: "Agents that do the routine", description: "Schedule a question and get the answer in Slack every Monday." },
      { icon: "Database", title: "Your schema, understood", description: "Aurora learns your tables and metrics, and asks when it isn't sure." },
      { icon: "Sparkles", title: "Shareable answers", description: "Turn any answer into a live dashboard your whole team can open." },
    ],
  },

  playground: {
    eyebrow: "Try it",
    title: "Pick a question.",
    highlight: "Watch Aurora answer.",
    subtitle: "Real questions our customers ask every day, answered from their own data in seconds.",
    prompts: [
      {
        label: "Revenue",
        question: "What drove revenue growth last quarter?",
        answer: "Revenue grew 18%, and two thirds of that came from existing customers upgrading to Team after hitting their question limit.",
        metrics: [
          { label: "Revenue", value: "$412k", change: "+18%" },
          { label: "From upgrades", value: "$49k", change: "+64%" },
          { label: "New customers", value: "126", change: "+9%" },
        ],
      },
      {
        label: "Churn",
        question: "Which customers are most likely to cancel this month?",
        answer: "38 accounts look at risk. They stopped asking questions two weeks ago and none of them connected a second data source.",
        metrics: [
          { label: "At risk", value: "38", change: "+5" },
          { label: "Revenue at risk", value: "$41k", change: "-3%" },
          { label: "Saved last month", value: "21", change: "+7" },
        ],
      },
      {
        label: "Marketing",
        question: "Which channel brings our best customers?",
        answer: "Customers from webinars stay 2.3 times longer than those from paid ads, and cost 40% less to win.",
        metrics: [
          { label: "Webinar LTV", value: "$3.8k", change: "+2.3x" },
          { label: "Cost per customer", value: "$210", change: "-40%" },
          { label: "Share of signups", value: "22%", change: "+6 pts" },
        ],
      },
      {
        label: "Product",
        question: "Which feature do our happiest users use most?",
        answer: "Scheduled Slack digests. Teams that set one up rate us 4.8 out of 5 and ask twice as many questions.",
        metrics: [
          { label: "Rating with digests", value: "4.8", change: "+0.6" },
          { label: "Questions per team", value: "2.1x", change: "+110%" },
          { label: "Teams using it", value: "61%", change: "+12 pts" },
        ],
      },
    ],
  },

  beforeAfter: {
    eyebrow: "The difference",
    title: "From spreadsheet chaos",
    highlight: "to one clear answer",
    subtitle: "Drag the handle to see the same Monday morning, before and after Aurora.",
    before: {
      label: "Before",
      notes: ["Which tab is the latest?", "Waiting on the data team since Tuesday", "Formula broken in column F"],
    },
    after: {
      label: "With Aurora",
      question: "How did last week compare with the week before?",
      answer: "Signups rose 12% and revenue 8%. The jump came from the new pricing page.",
      points: ["Answer in 2 seconds", "Chart included", "Query shown for checking"],
    },
  },

  stats: {
    label: "Aurora in numbers",
    items: [
      { value: 12000, suffix: "+", decimals: 0, label: "questions answered every day" },
      { value: 2.4, suffix: "s", decimals: 1, label: "median time to an answer" },
      { value: 87, suffix: "%", decimals: 0, label: "fewer ad-hoc data requests" },
      { value: 4.9, suffix: "/5", decimals: 1, label: "average customer rating" },
    ],
  },

  scrollStory: {
    eyebrow: "How it works",
    title: "Everything that happens",
    highlight: "in those two seconds",
    steps: [
      {
        icon: "Plug",
        title: "It reads your schema",
        description: "Aurora learns your tables, columns and the metrics your team already uses, without copying your data.",
        points: ["Read-only connection", "Learns your metric names", "Asks when something is unclear"],
      },
      {
        icon: "Sparkles",
        title: "It plans the query",
        description: "Your question becomes a plan: which tables to join, which filters apply and how to check the result.",
        points: ["Shows its plan", "Checks for empty results", "Uses your definitions"],
      },
      {
        icon: "BarChart3",
        title: "It draws the answer",
        description: "The result comes back as a sentence a person would write, with the chart that proves it.",
        points: ["Plain-English summary", "The right chart for the data", "Confidence note"],
      },
      {
        icon: "Share2",
        title: "It keeps you posted",
        description: "Pin the answer to a dashboard, or schedule it, and Aurora brings it to Slack or email when it changes.",
        points: ["Live dashboards", "Slack and email digests", "Alerts on big changes"],
      },
    ],
  },

  integrationHub: {
    eyebrow: "Integrations",
    title: "Plug in your data.",
    highlight: "Get answers where you work.",
    subtitle: "Two-click connectors for your data, and answers delivered where your team already works.",
    hub: "Aurora",
    sources: ["Postgres", "Snowflake", "BigQuery", "Stripe", "HubSpot"],
    destinations: ["Slack", "Email", "Dashboards", "Notion"],
  },

  benchmark: {
    eyebrow: "Benchmark",
    title: "Time to answer “Why did churn rise in Q3?”",
    subtitle: "Measured with five analysts and the same data, July 2026. Shorter is better.",
    rows: [
      { name: "Aurora", seconds: 2.4, display: "2.4 seconds", highlight: true },
      { name: "A general AI chatbot", seconds: 95, display: "1.5 minutes, after exporting the data", highlight: false },
      { name: "Building a BI dashboard", seconds: 1500, display: "25 minutes", highlight: false },
      { name: "Asking the data team", seconds: 172800, display: "2 days", highlight: false },
    ],
  },

  useCases: {
    eyebrow: "Use cases",
    title: "Built for everyone",
    highlight: "who asks questions",
    roles: [
      {
        icon: "Rocket",
        label: "Founders",
        headline: "Know your numbers without a data team",
        questions: ["What's our runway at this burn rate?", "Which plan makes us the most money?", "How did this month compare to last?"],
        metric: { value: "6 hrs", label: "saved every week on board prep" },
      },
      {
        icon: "ShoppingCart",
        label: "Sales",
        headline: "Walk into every call knowing the account",
        questions: ["Which deals stalled this week?", "Who are our biggest accounts in Germany?", "What's our win rate by source?"],
        metric: { value: "23%", label: "more deals reviewed each week" },
      },
      {
        icon: "Briefcase",
        label: "Product",
        headline: "See what users actually do",
        questions: ["Which features do paying users use?", "Where do new users drop off?", "Did the new onboarding help?"],
        metric: { value: "3x", label: "faster answers to product questions" },
      },
      {
        icon: "Wallet",
        label: "Finance",
        headline: "Close the month without the spreadsheets",
        questions: ["What's our MRR by plan?", "Which invoices are overdue?", "How much did we spend on tools?"],
        metric: { value: "2 days", label: "faster month-end close" },
      },
    ],
  },

  liveFeed: {
    eyebrow: "Live",
    title: "Teams are asking right now",
    subtitle: "A glimpse of the questions flowing through Aurora today.",
    label: "Live activity",
    // Milliseconds between checks of /api/activity for something new.
    interval: 2400,
    events: [
      { id: 1, icon: "MessageSquareText", team: "Northwind", text: "asked which region grew fastest in September" },
      { id: 2, icon: "LayoutDashboard", team: "Globex", text: "turned an answer into a live dashboard" },
      { id: 3, icon: "Bell", team: "Initech", text: "scheduled a churn digest for Mondays in Slack" },
      { id: 4, icon: "Plug", team: "Hooli", text: "connected Snowflake in 90 seconds" },
      { id: 5, icon: "TrendingUp", team: "Umbrella", text: "found $12k in failed payments to retry" },
    ],
  },

  commandPalette: {
    eyebrow: "Keyboard first",
    title: "Everything is",
    highlight: "one shortcut away",
    subtitle: "Type to filter, use the arrow keys, press Enter. Just like the real app.",
    placeholder: "Ask a question or search…",
    groups: [
      {
        heading: "Ask",
        items: [
          { icon: "MessageSquareText", label: "What were sales yesterday?", hint: "Question" },
          { icon: "TrendingUp", label: "Show revenue by month", hint: "Question" },
          { icon: "Users", label: "Who are our top 10 customers?", hint: "Question" },
        ],
      },
      {
        heading: "Go to",
        items: [
          { icon: "LayoutDashboard", label: "Dashboards", hint: "G D" },
          { icon: "Database", label: "Data sources", hint: "G S" },
          { icon: "Bell", label: "Scheduled digests", hint: "G A" },
        ],
      },
      {
        heading: "Create",
        items: [
          { icon: "FileText", label: "New report", hint: "N R" },
          { icon: "Mail", label: "Invite a teammate", hint: "N I" },
        ],
      },
    ],
  },

  codeTabs: {
    eyebrow: "API",
    title: "Ask from",
    highlight: "your own code",
    subtitle: "Every answer is also an API call, so you can put Aurora inside your product.",
    tabs: [
      {
        label: "cURL",
        code: `curl https://api.aurora.dev/v1/ask \\
  -H "Authorization: Bearer $AURORA_KEY" \\
  -d '{"question": "Revenue by month this year"}'`,
      },
      {
        label: "JavaScript",
        code: `// npm install @aurora/sdk
import { Aurora } from "@aurora/sdk";

const aurora = new Aurora(process.env.AURORA_KEY);
const answer = await aurora.ask("Revenue by month this year");

console.log(answer.summary);`,
      },
      {
        label: "Python",
        code: `# pip install aurora-sdk
from aurora import Aurora

aurora = Aurora(api_key=os.environ["AURORA_KEY"])
answer = aurora.ask("Revenue by month this year")

print(answer.summary)`,
      },
    ],
    response: `{
  "summary": "Revenue grew every month, from $98k in January to $164k in September.",
  "chart": { "type": "bar", "points": 9 },
  "query": "select date_trunc('month', paid_at) ...",
  "confidence": "high"
}`,
  },

  video: {
    eyebrow: "Watch",
    title: "See Aurora in two minutes",
    subtitle: "From connecting a database to sharing a dashboard, with no cuts.",
    // Your video's YouTube id (the part after watch?v=). Until it's set, the player shows a placeholder.
    youtubeId: "",
    duration: "2:14",
    chapters: [
      { seconds: 0, label: "Connect a database" },
      { seconds: 34, label: "Ask the first question" },
      { seconds: 71, label: "Check the query" },
      { seconds: 102, label: "Build a dashboard" },
    ],
  },

  status: {
    eyebrow: "Reliability",
    title: "Up when your team",
    highlight: "needs answers",
    subtitle: "The last 90 days, straight from our status page.",
    overall: "All systems operational",
    days: 90,
    // Incidents are days ago: 0 is today.
    services: [
      { name: "Question answering", uptime: 99.99, incidents: [41] },
      { name: "Data connectors", uptime: 99.97, incidents: [12, 63] },
      { name: "Dashboards", uptime: 100, incidents: [] },
      { name: "Slack and email digests", uptime: 99.95, incidents: [28, 29, 77] },
    ],
    link: { label: "View the status page", href: "/contact" },
  },

  layers: {
    eyebrow: "Under the surface",
    title: "Depth is",
    highlight: "the difference.",
    subtitle: "Anyone can put a chatbot on a database. The answers your team can trust come from the layers underneath.",
    cta: { label: "See it on your data", href: "/waitlist" },
    items: [
      {
        kicker: "Layer 01 / Understand",
        title: "Learn the business first.",
        description: "Before the first question, Aurora maps your tables, your metric definitions and the words your team uses for them.",
        tags: ["Schema", "Metrics", "Glossary"],
      },
      {
        kicker: "Layer 02 / Verify",
        title: "Check every number twice.",
        description: "Each query is planned, run read-only, and checked for empty joins, double counting and outliers before you see it.",
        tags: ["Plan", "Run", "Check"],
      },
      {
        kicker: "Layer 03 / Improve",
        title: "Get sharper every week.",
        description: "Corrections become definitions. Popular questions become dashboards. Your workspace learns how your team thinks.",
        tags: ["Learn", "Refine", "Share"],
      },
    ],
  },

  dive: {
    eyebrow: "Go deeper",
    title: "Below the dashboard.",
    highlight: "Beyond the numbers.",
    subtitle: "Every metric your team asks about, understood in context.",
    words: ["Revenue", "Retention", "Pipeline"],
    terms: [
      { term: "MRR", meaning: "Monthly recurring revenue" },
      { term: "Churn", meaning: "Customers who cancelled" },
      { term: "LTV", meaning: "Lifetime value" },
      { term: "CAC", meaning: "Cost to acquire a customer" },
      { term: "NRR", meaning: "Net revenue retention" },
      { term: "ARPU", meaning: "Average revenue per user" },
      { term: "DAU", meaning: "Daily active users" },
      { term: "Activation", meaning: "Users who reached the aha moment" },
      { term: "Payback", meaning: "Months to earn back CAC" },
      { term: "ARR", meaning: "Annual recurring revenue" },
      { term: "Cohorts", meaning: "Users grouped by start month" },
      { term: "Funnel", meaning: "Where people drop off" },
    ],
    scrollHint: "Scroll to go deeper",
    endHint: "From question to answer",
  },

  careers: {
    eyebrow: "Careers",
    title: "Curious minds.",
    highlight: "Real ownership.",
    subtitle: "We are a small team that ships every day. Remote in Europe and India, with a week together every quarter.",
    culture: {
      title: "How we work",
      text: "Small teams, written decisions, and time to think. Everyone talks to customers.",
      stats: [
        { value: "14", label: "people" },
        { value: "6", label: "countries" },
        { value: "4 days", label: "a week, every week" },
      ],
    },
    jobs: [
      {
        team: "Engineering",
        title: "Senior Data Engineer",
        meta: ["Remote, Europe or India", "Full-time", "5+ years"],
        description: "Own the connectors and query engine that turn a question into a correct, fast and safe SQL query.",
        href: "/contact",
      },
      {
        team: "Engineering",
        title: "Product Engineer, Frontend",
        meta: ["Remote, Europe or India", "Full-time", "3+ years"],
        description: "Build the answer view, charts and dashboards that thousands of people read every morning.",
        href: "/contact",
      },
      {
        team: "Customer",
        title: "Solutions Engineer",
        meta: ["Remote, Europe", "Full-time", "3+ years"],
        description: "Help new teams connect their data and get to their first trusted answer in a day.",
        href: "/contact",
      },
    ],
  },

  inquiry: {
    eyebrow: "Your next move",
    title: "Bring us",
    highlight: "your hardest question.",
    subtitle:
      "Tell us what you want to know and where your data lives. We'll reply within one working day with how Aurora would answer it, or tell you honestly if it can't.",
    email: "hello@example.com",
    teamSizes: ["Just me", "2 to 10", "11 to 50", "51 to 200", "More than 200"],
    goals: ["Answer questions faster", "Replace a BI tool", "Reports in Slack", "Embed answers in our product", "Something else"],
    submitLabel: "Send my question",
    note: "We only use your details to reply. No newsletter unless you ask for one.",
  },

  steps: {
    eyebrow: "How it works",
    title: "From question to answer in three steps",
    items: [
      { title: "Connect your data", description: "Add a read-only connection to your database, warehouse or tools. Two minutes, no engineers." },
      { title: "Ask a question", description: "Type it the way you'd ask a colleague. Aurora writes the query and checks it." },
      { title: "Share the answer", description: "Get the chart and the explanation, then share it or turn it into a dashboard." },
    ],
  },

  testimonials: {
    eyebrow: "Loved by teams",
    title: "The fastest analyst they've ever hired",
    items: [
      { quote: "Our team stopped waiting three days for the data team. Aurora answers in seconds, and shows its working.", name: "Priya Sharma", role: "Head of Growth, Northwind" },
      { quote: "I asked why revenue dipped in March and got the answer, the chart and the three accounts responsible.", name: "Marcus Lee", role: "Founder, Globex" },
      { quote: "Read-only access and no training on our data made it an easy yes for our security team.", name: "Sofia Martins", role: "CTO, Initech" },
      { quote: "The Monday Slack digest replaced a dashboard nobody opened. Now everyone reads it.", name: "Daniel Okafor", role: "COO, Umbrella" },
      { quote: "Setup took ten minutes. By lunch, sales was asking it questions on their own.", name: "Hannah Weber", role: "RevOps Lead, Hooli" },
      { quote: "It's the first AI tool our analysts actually trust, because every answer links to the query.", name: "Arjun Mehta", role: "Data Lead, Stark" },
    ],
  },

  wallOfLove: {
    eyebrow: "Wall of love",
    title: "Loved by teams",
    highlight: "who hate waiting",
    subtitle: "What people say after their first week.",
    initial: 6,
    filters: ["All", "Founders", "Data", "Sales", "Product"],
    items: [
      { quote: "We cancelled two BI seats in the first month. Aurora just answers.", name: "Leah Cohen", role: "Founder, Pinewood", group: "Founders" },
      { quote: "Every answer shows the SQL. That's why our analysts trust it.", name: "Arjun Mehta", role: "Data Lead, Stark", group: "Data" },
      { quote: "I check pipeline health from my phone in Slack every morning now.", name: "Tom Becker", role: "VP Sales, Hooli", group: "Sales" },
      { quote: "Our PMs stopped filing data tickets. They just ask.", name: "Mei Tanaka", role: "Head of Product, Globex", group: "Product" },
      { quote: "Setup was ten minutes. By lunch, the whole team was using it.", name: "Hannah Weber", role: "RevOps, Hooli", group: "Sales" },
      { quote: "It asked me what we mean by an active user before answering. Impressive.", name: "Sofia Martins", role: "CTO, Initech", group: "Data" },
      { quote: "The board deck used to take two days. Now it takes an hour.", name: "Daniel Okafor", role: "COO, Umbrella", group: "Founders" },
      { quote: "The churn digest found three accounts we saved the same week.", name: "Priya Sharma", role: "Head of Growth, Northwind", group: "Product" },
      { quote: "Read-only and no training on our data made it an easy yes.", name: "Lukas Novak", role: "Security Lead, Acme", group: "Data" },
      { quote: "Our reps know which accounts to call before standup.", name: "Grace Kim", role: "Sales Manager, Wayne", group: "Sales" },
    ],
  },

  roi: {
    eyebrow: "Calculator",
    title: "See what your team",
    highlight: "gets back",
    subtitle: "Move the sliders to match your team. The estimate updates as you go.",
    currency: "$",
    // The share of reporting time Aurora saves, from our customer survey.
    timeSaved: 0.7,
    inputs: {
      people: { label: "People who need data", min: 1, max: 200, step: 1, default: 25 },
      hours: { label: "Hours each spends on reports per week", min: 1, max: 20, step: 1, default: 4 },
      rate: { label: "Average hourly cost", min: 20, max: 200, step: 5, default: 60 },
    },
    results: { hours: "hours back every year", money: "saved every year", people: "full-time people's worth of time" },
    cta: { label: "Join the waitlist", href: "/waitlist" },
  },

  pricing: {
    eyebrow: "Pricing",
    title: "Simple pricing,",
    highlight: "fair usage",
    subtitle: "Start free during the beta. Pay for what you use when you grow.",
    yearlyNote: "2 months free",
    plans: [
      {
        name: "Starter",
        description: "For founders and small teams.",
        monthly: 29,
        yearly: 290,
        features: ["1,000 questions a month", "2 data sources", "Charts and explanations", "Email support"],
        cta: { label: "Join the waitlist", href: "/waitlist" },
        highlighted: false,
      },
      {
        name: "Team",
        description: "For teams who live in their data.",
        monthly: 99,
        yearly: 990,
        features: ["10,000 questions a month", "Unlimited data sources", "Scheduled agents in Slack", "Shared dashboards", "Priority support"],
        cta: { label: "Join the waitlist", href: "/waitlist" },
        highlighted: true,
      },
      {
        name: "Enterprise",
        description: "For larger organisations.",
        monthly: null,
        yearly: null,
        features: ["Unlimited questions", "Single sign-on (SAML)", "Private deployment", "Dedicated success manager"],
        cta: { label: "Talk to sales", href: "/contact" },
        highlighted: false,
      },
    ],
    // Prices are per question above the plan's allowance.
    calculator: {
      title: "Estimate your bill",
      min: 500,
      max: 50000,
      step: 500,
      default: 6000,
      tiers: [
        { plan: "Starter", included: 1000, base: 29, overage: 0.02 },
        { plan: "Team", included: 10000, base: 99, overage: 0.01 },
      ],
    },
  },

  roadmap: {
    eyebrow: "Roadmap",
    title: "Help decide",
    highlight: "what we build next",
    subtitle: "Vote for what matters to you. We read every vote.",
    columns: [
      {
        title: "In progress",
        items: [
          { id: "forecasts", title: "Forecasts", description: "Ask what next quarter will look like, with a range.", votes: 214 },
          { id: "excel", title: "Excel add-in", description: "Ask questions without leaving your spreadsheet.", votes: 187 },
        ],
      },
      {
        title: "Next",
        items: [
          { id: "voice", title: "Voice questions", description: "Ask out loud from the mobile app.", votes: 96 },
          { id: "alerts", title: "Smart alerts", description: "Get told when a number moves more than usual.", votes: 158 },
        ],
      },
      {
        title: "Later",
        items: [
          { id: "on-prem", title: "On-premise", description: "Run Aurora entirely inside your own cloud.", votes: 73 },
          { id: "teams", title: "Microsoft Teams", description: "Digests and questions inside Teams.", votes: 121 },
        ],
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions,",
    highlight: "answered",
    items: [
      {
        question: "Which data sources does Aurora support?",
        answer: "Postgres, MySQL, BigQuery, Snowflake, Redshift, Stripe, HubSpot, Google Sheets and CSV files, with more every month.",
      },
      {
        question: "Can Aurora change my data?",
        answer: "No. Aurora connects with read-only credentials and only ever runs SELECT queries, which you can inspect for every answer.",
      },
      {
        question: "Is my data used to train AI models?",
        answer: "Never. Your data is processed to answer your questions and is not used to train any model, ours or anyone else's.",
      },
      {
        question: "How accurate are the answers?",
        answer: "Every answer shows the query behind it and a confidence note. When a question is ambiguous, Aurora asks before it answers.",
      },
      { question: "How much does it cost after the beta?", answer: "Plans start at $29 a month. Beta users keep 50% off for their first year." },
    ],
  },

  cta: {
    icon: "Rocket",
    title: "Stop waiting for answers.",
    subtitle: "Join the waitlist and get early access, plus 50% off your first year.",
    primary: { label: "Join the waitlist", href: "/waitlist" },
    secondary: { label: "Talk to sales", href: "/contact" },
  },

  newsletter: {
    title: "Product updates, once a month",
    subtitle: "New features, tips and the occasional behind-the-scenes post. No spam.",
  },
};

/** Extra activity for the live feed; /api/activity hands these out in turn. */
export const activity: Omit<ActivityEvent, "id">[] = [
  { icon: "Share2", team: "Stark", text: "shared a forecast with the board" },
  { icon: "Search", team: "Acme", text: "asked why trial signups dropped on Friday" },
  { icon: "Database", team: "Wayne", text: "added a second warehouse to their workspace" },
  { icon: "MessageSquareText", team: "Pinewood", text: "asked for revenue by country this quarter" },
  { icon: "LayoutDashboard", team: "Northwind", text: "pinned a churn chart to the team dashboard" },
  { icon: "Bell", team: "Globex", text: "set an alert for refunds over $500" },
  { icon: "TrendingUp", team: "Initech", text: "found their fastest growing plan" },
  { icon: "Plug", team: "Umbrella", text: "connected HubSpot in two clicks" },
];
