import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MotionProvider } from "@/components/motion/motion-provider";
import { MotionNotice } from "@/components/motion-notice";
import { ThemePicker } from "@/components/theme-picker";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/config/site";
import { getSection } from "@/lib/api";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.name, url: "/" },
  twitter: { card: "summary_large_image", creator: site.twitter },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const announcement = await getSection("announcement");

  return (
    <html lang="en" data-theme={site.theme} suppressHydrationWarning className={`${sans.variable} ${mono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <ThemeProvider>
          <MotionProvider>
          <a href="#main" className="sr-only z-50 rounded-md bg-background px-3 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
            Skip to content
          </a>
          <AnnouncementBar content={announcement} />
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          {process.env.NEXT_PUBLIC_DEMO_MODE === "true" && (
            <>
              <ThemePicker />
              <MotionNotice />
            </>
          )}
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
