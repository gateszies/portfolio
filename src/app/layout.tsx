import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://about-gateszies.vercel.app"),
  title: "Aly Gates",
  description:
    "Aly Gates, designer and engineer who enjoys building interfaces and design systems",
  icons: {
    icon: [{ url: "/aly-gates-logo.svg", type: "image/svg+xml" }],
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontVariables} h-full scroll-pt-20 motion-safe:scroll-smooth`}
    >
      <body className="bg-background font-body text-foreground flex min-h-full flex-col text-pretty">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
