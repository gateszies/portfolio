import { Archivo, Fraunces, Inter } from "next/font/google";

// Placeholders for the licensed brand fonts (GT Super / Acumin Pro Wide / Acumin Pro).
// Swap the imports above for `next/font/local` once the real font files are available —
// every consumer references the `--font-*` variables below, so that's the only file to touch.

export const fontDisplay = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const fontHeading = Archivo({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});
