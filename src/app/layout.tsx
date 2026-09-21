import type { Metadata } from "next";
import Link from "next/link";
import { fontBody, fontDisplay, fontHeading } from "./fonts";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aly Gates",
  description:
    "Aly Gates — design-minded frontend engineer building scalable component systems and the interfaces that extend them.",
};

const THEME_INIT_SCRIPT = `(function(){try{
  var stored = localStorage.getItem("theme");
  var theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.dataset.theme = theme;
}catch(e){}})();`;

const navLinks = [
  { href: "/#work", label: "work" },
  { href: "/#experience", label: "experience" },
  { href: "/#about", label: "about" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontHeading.variable} ${fontBody.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <header className="flex items-center justify-between px-10 py-6">
          <Link
            href="/"
            className="font-heading text-body-md fgColor-primary"
          >
            Aly Gates
          </Link>
          <nav className="flex items-center gap-1 text-body-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 fgColor-secondary transition hover:bgColor-secondary hover:fgColor-primary"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
