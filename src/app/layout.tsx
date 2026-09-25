import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://about-gateszies.vercel.app"),
  title: "Aly Gates",
  description:
    "Aly Gates — design-minded frontend engineer building scalable component systems and the interfaces that extend them.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontVariables} h-full`}
    >
      <body className="bg-background font-body text-foreground flex min-h-full flex-col transition-colors duration-200">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
