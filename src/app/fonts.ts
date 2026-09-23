import { Fraunces, Google_Sans_Code, Nunito } from "next/font/google";

// Display is a placeholder for display-font Regular — a licensed
// font, not on Google Fonts. Swap this import for `next/font/local` once
// the real font files arrive; every consumer reads `--font-display`, so
// this is the only file to touch.

export const fontDisplay = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const fontSubheading = Google_Sans_Code({
  variable: "--font-subheading",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const fontBody = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
});
