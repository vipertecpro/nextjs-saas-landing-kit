import type { IconName } from "@/lib/icons";

/**
 * The shape of every API response. The dummy data in src/data and your own
 * backend (see API_URL in .env.example) both follow these types, so the
 * pages work the same with either.
 */

export type LinkItem = { label: string; href: string };

/** `highlight` is an optional second line of the title, shown in the theme's gradient. */
export type SectionIntro = { eyebrow?: string; title: string; highlight?: string; subtitle?: string };

export type HeroContent = {
  /** The 3D scene behind the headline. */
  background: "wave" | "globe";
  /** Small vertical text down the right edge on wide screens. */
  sideNote: string;
  badge: { label: string; text: string; href: string };
  title: string;
  highlight: string;
  subtitle: string;
  primary: LinkItem;
  secondary: LinkItem;
  note: string;
  demo: {
    question: string;
    steps: string[];
    answer: string;
    chartTitle: string;
    chart: { label: string; value: number }[];
  };
};

export type LogosContent = { caption: string; names: string[] };

export type Feature = { icon: IconName; title: string; description: string };

export type FeaturesContent = SectionIntro & {
  ask: Feature & { question: string; answer: string };
  sources: Feature & { names: string[] };
  speed: Feature & { value: number; decimals: number; suffix: string };
  secure: Feature & { points: string[] };
  more: Feature[];
};

export type StatsContent = { label: string; items: { value: number; suffix: string; decimals: number; label: string }[] };

export type StepsContent = SectionIntro & { items: { title: string; description: string }[] };

export type Testimonial = { quote: string; name: string; role: string };

export type TestimonialsContent = SectionIntro & { items: Testimonial[] };

export type Plan = {
  name: string;
  description: string;
  monthly: number | null;
  yearly: number | null;
  features: string[];
  cta: LinkItem;
  highlighted: boolean;
};

export type PricingContent = SectionIntro & {
  yearlyNote: string;
  plans: Plan[];
  calculator: {
    title: string;
    min: number;
    max: number;
    step: number;
    default: number;
    tiers: { plan: string; included: number; base: number; overage: number }[];
  };
};

export type FaqContent = SectionIntro & { items: { question: string; answer: string }[] };

export type CtaContent = { icon: IconName; title: string; subtitle: string; primary: LinkItem; secondary: LinkItem };

export type NewsletterContent = { title: string; subtitle: string };

export type AnnouncementContent = { enabled: boolean; id: string; label: string; text: string; link: LinkItem };

export type PlaygroundContent = SectionIntro & {
  prompts: { label: string; question: string; answer: string; metrics: { label: string; value: string; change: string }[] }[];
};

export type BeforeAfterContent = SectionIntro & {
  before: { label: string; notes: string[] };
  after: { label: string; question: string; answer: string; points: string[] };
};

export type RoiInput = { label: string; min: number; max: number; step: number; default: number };

export type RoiContent = SectionIntro & {
  currency: string;
  timeSaved: number;
  inputs: { people: RoiInput; hours: RoiInput; rate: RoiInput };
  results: { hours: string; money: string; people: string };
  cta: LinkItem;
};

export type ActivityEvent = { id: number; icon: IconName; team: string; text: string };

export type LiveFeedContent = SectionIntro & { label: string; interval: number; events: ActivityEvent[] };

export type BenchmarkContent = SectionIntro & { rows: { name: string; seconds: number; display: string; highlight: boolean }[] };

export type ScrollStoryContent = SectionIntro & {
  steps: { icon: IconName; title: string; description: string; points: string[] }[];
};

export type CommandPaletteContent = SectionIntro & {
  placeholder: string;
  groups: { heading: string; items: { icon: IconName; label: string; hint: string }[] }[];
};

export type IntegrationHubContent = SectionIntro & { hub: string; sources: string[]; destinations: string[] };

export type StatusContent = SectionIntro & {
  overall: string;
  days: number;
  services: { name: string; uptime: number; incidents: number[] }[];
  link: LinkItem;
};

export type CodeTabsContent = SectionIntro & { tabs: { label: string; code: string }[]; response: string };

export type WallOfLoveContent = SectionIntro & {
  initial: number;
  filters: string[];
  items: (Testimonial & { group: string })[];
};

export type RoadmapItem = { id: string; title: string; description: string; votes: number };

export type RoadmapContent = SectionIntro & { columns: { title: string; items: RoadmapItem[] }[] };

export type VideoContent = SectionIntro & {
  youtubeId: string;
  duration: string;
  chapters: { seconds: number; label: string }[];
};

export type TabbedShowcaseContent = SectionIntro & {
  interval: number;
  tabs: { icon: IconName; label: string; title: string; description: string; preview: { label: string; value: string }[] }[];
};

export type UseCasesContent = SectionIntro & {
  roles: { icon: IconName; label: string; headline: string; questions: string[]; metric: { value: string; label: string } }[];
};

export type GlobeContent = SectionIntro & { stats: { value: string; label: string }[] };

export type Chart3DContent = SectionIntro & {
  caption: string;
  unit: string;
  rows: string[];
  columns: string[];
  /** One list per row, one number per column. */
  values: number[][];
};

export type LayersContent = SectionIntro & {
  cta: LinkItem;
  items: { kicker: string; title: string; description: string; tags: string[] }[];
};

export type DiveContent = SectionIntro & {
  /** Huge outlined words drifting in the background. */
  words: string[];
  /** Terms the visitor flies past, with what they mean. */
  terms: { term: string; meaning: string }[];
  scrollHint: string;
  endHint: string;
};

export type Job = { team: string; title: string; meta: string[]; description: string; href: string };

export type CareersContent = SectionIntro & {
  culture: { title: string; text: string; stats: { value: string; label: string }[] };
  jobs: Job[];
};

export type InquiryContent = SectionIntro & {
  email: string;
  teamSizes: string[];
  goals: string[];
  submitLabel: string;
  note: string;
};

/** Every section's content, by section id (GET /api/sections/{id}). */
export type SectionData = {
  announcement: AnnouncementContent;
  hero: HeroContent;
  logos: LogosContent;
  tabbedShowcase: TabbedShowcaseContent;
  globe: GlobeContent;
  chart3d: Chart3DContent;
  features: FeaturesContent;
  playground: PlaygroundContent;
  beforeAfter: BeforeAfterContent;
  stats: StatsContent;
  scrollStory: ScrollStoryContent;
  integrationHub: IntegrationHubContent;
  benchmark: BenchmarkContent;
  useCases: UseCasesContent;
  liveFeed: LiveFeedContent;
  commandPalette: CommandPaletteContent;
  codeTabs: CodeTabsContent;
  video: VideoContent;
  status: StatusContent;
  steps: StepsContent;
  layers: LayersContent;
  dive: DiveContent;
  careers: CareersContent;
  inquiry: InquiryContent;
  testimonials: TestimonialsContent;
  wallOfLove: WallOfLoveContent;
  roi: RoiContent;
  pricing: PricingContent;
  roadmap: RoadmapContent;
  faq: FaqContent;
  cta: CtaContent;
  newsletter: NewsletterContent;
};

export type SectionId = keyof SectionData;

/** A block of a blog post's body. Text may use **bold**. */
export type PostBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; code: string };

export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readingMinutes: number;
};

export type Post = PostSummary & { body: PostBlock[] };

export type Release = { version: string; date: string; title: string; items: string[] };

export type Comparison = SectionIntro & {
  columns: string[];
  rows: { feature: string; values: (boolean | string)[] }[];
};
