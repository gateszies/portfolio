import localFont from "next/font/local";
import { Google_Sans_Code, Nunito } from "next/font/google";

const fontDisplay = localFont({
  src: "./fonts/display-font/display-font",
  variable: "--font-family-display",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const fontLabel = Google_Sans_Code({
  variable: "--font-family-label",
  weight: "500",
  subsets: ["latin"],
  adjustFontFallback: false,
  fallback: ["Menlo", "Monaco", "Consolas", "Courier New", "monospace"],
});

const fontBody = Nunito({
  variable: "--font-family-body",
  weight: ["400", "700"],
  subsets: ["latin"],
  fallback: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
});

export const fontVariables = `${fontDisplay.variable} ${fontLabel.variable} ${fontBody.variable}`;
