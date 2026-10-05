import type { LucideProps } from "lucide-react";
import {
  BarChart3,
  Bell,
  Briefcase,
  Database,
  FileText,
  Gauge,
  LayoutDashboard,
  LineChart,
  Lock,
  Mail,
  MessageSquareText,
  Plug,
  Rocket,
  Search,
  Share2,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  Workflow,
} from "lucide-react";

/**
 * The icons that content can name. API responses can't carry components,
 * so content says `"icon": "Rocket"` and <Icon> draws it. To use another
 * Lucide icon (lucide.dev/icons), import it and add it here.
 */
export const icons = {
  BarChart3,
  Bell,
  Briefcase,
  Database,
  FileText,
  Gauge,
  LayoutDashboard,
  LineChart,
  Lock,
  Mail,
  MessageSquareText,
  Plug,
  Rocket,
  Search,
  Share2,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  Workflow,
};

export type IconName = keyof typeof icons;

export function Icon({ name, ...props }: LucideProps & { name: IconName }) {
  const Glyph = icons[name] ?? Sparkles;

  return <Glyph aria-hidden {...props} />;
}
