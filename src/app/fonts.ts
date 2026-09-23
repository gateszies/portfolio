import localFont from "next/font/local";
import { Google_Sans_Code, Nunito } from "next/font/google";

export const fontDisplay = localFont({
  src: "./fonts/display-font/display-font",
  weight: "400",
  style: "normal",
  variable: "--font-display",
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
