import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bell,
  GitBranch,
  Layers,
  Lock,
  MessagesSquare,
  Rocket,
  Sparkles,
  Workflow,
} from "lucide-react";

/**
 * All of the landing page's copy. Change the words here; the sections only
 * lay them out.
 */
export const hero = {
  badge: "New: AI release notes",
  title: "Plan, build and ship product updates without the chaos",
  subtitle:
    "Launchpad keeps your roadmap, customer feedback and release notes in one calm workspace, so your team spends less time in meetings and more time shipping.",
  primary: { label: "Start free trial", href: "/signup" },
  secondary: { label: "See pricing", href: "/pricing" },
  note: "14-day free trial. No credit card required.",
};

export const logos = ["Northwind", "Acme", "Globex", "Umbrella", "Initech", "Hooli"];

export type Feature = { icon: LucideIcon; title: string; description: string };

export const features: { title: string; subtitle: string; items: Feature[] } = {
  title: "Everything your team needs to ship with confidence",
  subtitle:
    "Replace the spreadsheet, the feedback inbox and the changelog doc with one tool your whole team actually likes.",
  items: [
    {
      icon: Layers,
      title: "Roadmaps that stay current",
      description: "Drag ideas from now to next to later. Everyone sees the same plan, always up to date.",
    },
    {
      icon: MessagesSquare,
      title: "Feedback in one place",
      description: "Collect requests from email, chat and your app, and see which ones customers ask for most.",
    },
    {
      icon: Sparkles,
      title: "AI release notes",
      description: "Turn merged pull requests into clear, friendly release notes in one click.",
    },
    {
      icon: GitBranch,
      title: "Works with your Git",
      description: "Link issues to branches and pull requests. Status updates itself as work moves.",
    },
    {
      icon: Bell,
      title: "Close the loop",
      description: "Tell every customer who asked for a feature the moment it ships, automatically.",
    },
    {
      icon: Lock,
      title: "Secure by default",
      description: "Single sign-on, roles and audit logs on every plan, with data encrypted at rest.",
    },
  ],
};

export const highlights: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
}[] = [
  {
    icon: Workflow,
    eyebrow: "Plan",
    title: "A roadmap your customers can follow",
    description:
      "Share a public roadmap in seconds. Customers vote on what matters, and you decide what ships next with real data.",
    points: ["Public and private roadmaps", "Voting with duplicate merging", "Custom statuses and labels"],
  },
  {
    icon: BarChart3,
    eyebrow: "Measure",
    title: "Know what each release changed",
    description:
      "See adoption for every feature you ship, and which customer segments use it most, without setting up analytics.",
    points: ["Feature adoption over time", "Segments by plan and company size", "Exports to CSV and your warehouse"],
  },
];

export const stats = [
  { value: "4,200+", label: "teams shipping with Launchpad" },
  { value: "38%", label: "fewer status meetings" },
  { value: "2.5×", label: "faster release notes" },
  { value: "99.99%", label: "uptime over the last year" },
];

export const steps = {
  title: "Up and running in three steps",
  items: [
    { title: "Connect your tools", description: "Link GitHub, Slack and your help desk in a couple of clicks." },
    { title: "Invite your team", description: "Bring in product, engineering and support. Roles keep everyone in their lane." },
    { title: "Ship and share", description: "Plan, build and publish release notes your customers will actually read." },
  ],
};

export const testimonials = [
  {
    quote:
      "We replaced three tools with Launchpad. Our release notes went from a chore nobody wanted to something customers reply to.",
    name: "Priya Sharma",
    role: "Head of Product, Northwind",
  },
  {
    quote:
      "The public roadmap cut our support tickets asking 'when will X ship?' almost to zero. Setup took one afternoon.",
    name: "Marcus Lee",
    role: "Founder, Globex",
  },
  {
    quote:
      "Finally a tool engineers don't complain about. Linking pull requests means the roadmap updates itself.",
    name: "Sofia Martins",
    role: "Engineering Manager, Initech",
  },
];

export type Plan = {
  name: string;
  description: string;
  monthly: number | null;
  yearly: number | null;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
};

export const pricing: { title: string; subtitle: string; yearlyNote: string; plans: Plan[] } = {
  title: "Simple pricing that grows with you",
  subtitle: "Start free for 14 days on any plan. Change or cancel whenever you like.",
  yearlyNote: "2 months free",
  plans: [
    {
      name: "Starter",
      description: "For small teams getting organised.",
      monthly: 19,
      yearly: 190,
      features: ["Up to 5 teammates", "1 public roadmap", "Feedback inbox", "Email support"],
      cta: { label: "Start free trial", href: "/signup" },
    },
    {
      name: "Growth",
      description: "For teams shipping every week.",
      monthly: 49,
      yearly: 490,
      features: ["Up to 25 teammates", "Unlimited roadmaps", "AI release notes", "GitHub and Slack integrations", "Priority support"],
      cta: { label: "Start free trial", href: "/signup" },
      highlighted: true,
    },
    {
      name: "Enterprise",
      description: "For larger organisations with extra needs.",
      monthly: null,
      yearly: null,
      features: ["Unlimited teammates", "Single sign-on (SAML)", "Audit logs", "Dedicated success manager"],
      cta: { label: "Contact sales", href: "/contact" },
    },
  ],
};

export const faqs = [
  {
    question: "Is there a free trial?",
    answer: "Yes. Every plan starts with a 14-day free trial, and you don't need a credit card to start.",
  },
  {
    question: "Can I change plans later?",
    answer: "Any time. Upgrades take effect straight away, and downgrades apply from your next billing date.",
  },
  {
    question: "Do you offer discounts for startups and non-profits?",
    answer: "Yes, 50% off the Growth plan for the first year. Contact us with a little about your team.",
  },
  {
    question: "Where is my data stored?",
    answer: "In encrypted databases in the EU or US, your choice. We never sell or share your data.",
  },
  {
    question: "Can I import from other tools?",
    answer: "Yes. Import from CSV, Trello, Jira and Linear in a few clicks, with labels and statuses kept.",
  },
];

export const cta = {
  title: "Ready to ship with less chaos?",
  subtitle: "Join thousands of teams planning and shipping with Launchpad.",
  primary: { label: "Start free trial", href: "/signup" },
  secondary: { label: "Talk to sales", href: "/contact" },
  icon: Rocket,
};
