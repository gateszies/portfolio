import type { Metadata } from "next";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import { fontBody, fontDisplay, fontSubheading } from "./fonts";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://about-gateszies.vercel.app"),
  title: "Aly Gates",
  description:
    "Aly Gates — design-minded frontend engineer building scalable component systems and the interfaces that extend them.",
};

const navLinks = [
  { href: "/#work", label: "projects" },
  { href: "/#experience", label: "experience" },
  { href: "/#about", label: "about" },
];

const headerClasses =
  "sticky top-0 z-40 flex items-center justify-between bgColor-primary px-12 py-6";
const logoClasses = "font-subheading text-subheading-sm fgColor-primary";
const navClasses = "flex items-center gap-8 text-subheading-sm";
const navLinkClasses =
  "fgColor-primary underline decoration-dotted underline-offset-4 decoration-transparent transition hover:decoration-current";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontSubheading.variable} ${fontBody.variable} h-full`}
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
            <nav>
              <ul className={navClasses}>
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={navLinkClasses}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <ThemeToggle />
                </li>
              </ul>
            </nav>
          </header>
          <main className="flex flex-1 flex-col">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
