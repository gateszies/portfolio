"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({
  children,
  scriptProps,
  ...props
}: ThemeProviderProps) {
  const isClient = typeof window !== "undefined";
  const resolvedScriptProps = isClient
    ? { ...scriptProps, type: "application/json" as const }
    : scriptProps;

  return (
    <NextThemesProvider {...props} scriptProps={resolvedScriptProps}>
      {children}
    </NextThemesProvider>
  );
}
