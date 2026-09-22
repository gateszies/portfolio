import type { Metadata } from "next";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import { fontBody, fontDisplay, fontHeading } from "./fonts";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://about-gateszies.vercel.app"),
  title: "Aly Gates",
  description:
    "Aly Gates — design-minded frontend engineer building scalable component systems and the interfaces that extend them.",
};

const navLinks = [
  { href: "/#work", label: "work" },
  { href: "/#experience", label: "experience" },
  { href: "/#about", label: "about" },
];

const headerClasses = "flex items-center justify-between px-10 py-6";
const logoClasses = "font-heading text-body-md fgColor-primary";
const navClasses = "flex items-center gap-1 text-body-sm";
const navLinkClasses =
  "rounded-full px-3 py-1.5 fgColor-secondary transition hover:bgColor-secondary hover:fgColor-primary";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontHeading.variable} ${fontBody.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          <header className={headerClasses}>
            <Link href="/" className={logoClasses}>
              Aly Gates
            </Link>
            <nav className={navClasses}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={navLinkClasses}
                >
                  {link.label}
                </Link>
              ))}
              <ThemeToggle />
            </nav>
          </header>
          <main className="flex flex-1 flex-col">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
