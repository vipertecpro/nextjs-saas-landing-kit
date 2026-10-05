import type { ComponentType } from "react";
import type { SectionData, SectionId } from "@/data/types";
import { BeforeAfter } from "@/components/sections/before-after";
import { Careers } from "@/components/sections/careers";
import { Chart3D } from "@/components/sections/chart-3d";
import { GlobeSection } from "@/components/sections/globe-section";
import { BenchmarkRace } from "@/components/sections/benchmark-race";
import { CodeTabs } from "@/components/sections/code-tabs";
import { CommandPalette } from "@/components/sections/command-palette";
import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Dive } from "@/components/sections/dive";
import { Hero } from "@/components/sections/hero";
import { Inquiry } from "@/components/sections/inquiry";
import { IntegrationHub } from "@/components/sections/integration-hub";
import { Layers } from "@/components/sections/layers";
import { LiveFeed } from "@/components/sections/live-feed";
import { LogoCloud } from "@/components/sections/logo-cloud";
import { Newsletter } from "@/components/sections/newsletter";
import { Pricing } from "@/components/sections/pricing";
import { PromptPlayground } from "@/components/sections/prompt-playground";
import { Roadmap } from "@/components/sections/roadmap";
import { RoiCalculator } from "@/components/sections/roi-calculator";
import { ScrollStory } from "@/components/sections/scroll-story";
import { Stats } from "@/components/sections/stats";
import { StatusBoard } from "@/components/sections/status-board";
import { Steps } from "@/components/sections/steps";
import { TabbedShowcase } from "@/components/sections/tabbed-showcase";
import { Testimonials } from "@/components/sections/testimonials";
import { UseCases } from "@/components/sections/use-cases";
import { VideoShowcase } from "@/components/sections/video-showcase";
import { WallOfLove } from "@/components/sections/wall-of-love";

type Section<Id extends SectionId> = {
  name: string;
  description: string;
  /** The file in src/components/sections. */
  file: string;
  component: ComponentType<{ content: SectionData[Id] }>;
};

/**
 * Every section in the kit, by id. Use the ids in src/config/home.ts to
 * build the landing page, and see them all at /components. A section's
 * content comes from GET /api/sections/{id}.
 */
export const sections: { [Id in Exclude<SectionId, "announcement">]: Section<Id> } = {
  hero: { name: "Hero with a 3D globe and live AI demo", description: "A 3D globe behind the headline; the demo tilts in 3D as you scroll.", file: "hero.tsx", component: Hero },
  logos: { name: "Logo marquee", description: "Customer logos scrolling endlessly.", file: "logo-cloud.tsx", component: LogoCloud },
  tabbedShowcase: { name: "Auto-playing product tour", description: "Tabs that advance with a progress bar and pause on hover.", file: "tabbed-showcase.tsx", component: TabbedShowcase },
  globe: { name: "Interactive 3D globe", description: "A globe of arcs and data that visitors drag to spin, beside key numbers.", file: "globe-section.tsx", component: GlobeSection },
  chart3d: { name: "3D bar chart", description: "Bars that grow in 3D; drag to turn, hover for values. Screen readers get a table.", file: "chart-3d.tsx", component: Chart3D },
  features: { name: "Bento features", description: "Large tiles with live mini demos and an orbit of integrations.", file: "features.tsx", component: Features },
  playground: { name: "Prompt playground", description: "Pick a question and the answer streams in with its numbers.", file: "prompt-playground.tsx", component: PromptPlayground },
  beforeAfter: { name: "Before / after slider", description: "Drag to wipe between the old way and the new way.", file: "before-after.tsx", component: BeforeAfter },
  stats: { name: "Counting stats", description: "Numbers that count up as they scroll into view.", file: "stats.tsx", component: Stats },
  scrollStory: { name: "Sticky scroll story", description: "A panel that changes as the visitor scrolls through steps.", file: "scroll-story.tsx", component: ScrollStory },
  integrationHub: { name: "Integration hub", description: "Data flowing from sources, through the product, to your team.", file: "integration-hub.tsx", component: IntegrationHub },
  benchmark: { name: "Benchmark race", description: "Bars that race to show how much faster you are.", file: "benchmark-race.tsx", component: BenchmarkRace },
  useCases: { name: "Use cases by role", description: "Pick a role to see its questions and results.", file: "use-cases.tsx", component: UseCases },
  liveFeed: { name: "Live activity feed", description: "New activity slides in every few seconds.", file: "live-feed.tsx", component: LiveFeed },
  commandPalette: { name: "Command palette", description: "A working ⌘K menu with search and keyboard control.", file: "command-palette.tsx", component: CommandPalette },
  codeTabs: { name: "API code tabs", description: "Code in several languages with copy and a response.", file: "code-tabs.tsx", component: CodeTabs },
  video: { name: "Video with chapters", description: "A poster and chapters that open the video at the right moment.", file: "video-showcase.tsx", component: VideoShowcase },
  status: { name: "Status board", description: "90 days of uptime per service, like a status page.", file: "status-board.tsx", component: StatusBoard },
  layers: { name: "Stacking layers", description: "Cards that stack as you scroll, with a sticky heading and progress counter.", file: "layers.tsx", component: Layers },
  dive: { name: "3D dive through your metrics", description: "Scroll flies the camera through a 3D tunnel of terms around a glowing core.", file: "dive.tsx", component: Dive },
  careers: { name: "Careers", description: "Open roles with hover arrows, beside a card about the team.", file: "careers.tsx", component: Careers },
  inquiry: { name: "Inquiry form", description: "A closing form with underlined fields and choices, sent to your webhook.", file: "inquiry.tsx", component: Inquiry },
  steps: { name: "Steps", description: "Three numbered steps.", file: "steps.tsx", component: Steps },
  testimonials: { name: "Testimonial marquee", description: "Two rows of quotes scrolling in opposite directions.", file: "testimonials.tsx", component: Testimonials },
  wallOfLove: { name: "Wall of love", description: "Masonry testimonials with filters and show more.", file: "wall-of-love.tsx", component: WallOfLove },
  roi: { name: "ROI calculator", description: "Sliders that estimate the time and money saved.", file: "roi-calculator.tsx", component: RoiCalculator },
  pricing: { name: "Pricing with usage calculator", description: "Plans with a monthly/yearly switch and a usage estimate.", file: "pricing.tsx", component: Pricing },
  roadmap: { name: "Votable roadmap", description: "Now, next and later, with vote buttons.", file: "roadmap.tsx", component: Roadmap },
  faq: { name: "FAQ", description: "Questions in an accordion, with search-engine markup.", file: "faq.tsx", component: Faq },
  cta: { name: "Call to action", description: "A closing banner with two buttons.", file: "cta.tsx", component: Cta },
  newsletter: { name: "Newsletter", description: "An email signup.", file: "newsletter.tsx", component: Newsletter },
};

export type PageSectionId = keyof typeof sections;
