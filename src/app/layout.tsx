import type { Metadata } from "next";
import localFont from "next/font/local";
import { Google_Sans_Code, Nunito } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/Footer";
import { LinkList } from "@/components/LinkList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { socialLinks } from "@/data/social";
import "./globals.css";

const fontDisplay = localFont({
  src: "./fonts/display-font/display-font",
  weight: "400",
  style: "normal",
  variable: "--font-family-display",
});

const fontHeading = Google_Sans_Code({
  variable: "--font-family-heading",
  weight: ["400", "500"],
  subsets: ["latin"],
});

const fontBody = Nunito({
  variable: "--font-family-body",
  subsets: ["latin"],
});

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
const logoClasses =
  "fontFamily-heading fontSize-heading-sm lineHeight-heading-sm letterSpacing-heading fgColor-primary";
const navClasses =
  "flex items-center gap-8 fontFamily-heading fontSize-heading-sm lineHeight-heading-sm letterSpacing-heading";
const navLinkClasses =
  "fgColor-primary underline decoration-dotted underline-offset-4 decoration-transparent transition-colors hover:decoration-current";
const footerClasses = "flex items-center justify-between gap-6 px-12 py-8";

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
          <footer className={footerClasses}>
            <Footer />
            <LinkList links={socialLinks} />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
