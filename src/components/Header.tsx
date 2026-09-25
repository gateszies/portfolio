import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { href: "/#work", label: "projects" },
  { href: "/#experience", label: "experience" },
  { href: "/#about", label: "about" },
];

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-40 flex items-center justify-between px-12 py-6">
      <Link
        href="/"
        className="font-label text-foreground text-sm font-medium tracking-widest"
      >
        Aly Gates
      </Link>
      <nav>
        <ul className="font-label flex items-center gap-8 text-sm font-medium tracking-widest">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-foreground underline decoration-transparent decoration-dotted underline-offset-4 transition-colors hover:decoration-current"
              >
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
  );
}
