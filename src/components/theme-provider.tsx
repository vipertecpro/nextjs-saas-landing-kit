"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Light and dark mode. The site opens in dark mode, which suits the
 * artwork; visitors can switch with the toggle. Set defaultTheme to
 * "system" to follow their device instead.
 */
export function ThemeProvider(props: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange {...props} />;
}
