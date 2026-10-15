"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { TextLink } from "@/components/TextLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { collapsedHeaderOffset, desktopMediaQuery } from "@/lib/layout";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#work", label: "projects" },
  { href: "/#experience", label: "experience" },
  { href: "/#about", label: "about" },
];

const headerScrollThreshold = 24;
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const menuId = useId();
  const menuIcon = isMenuOpen ? "close" : "menu";
  const menuLabel = isMenuOpen ? "Close menu" : "Open menu";
  const menuRows = isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]";
  const isHeaderHidden = isHidden && !isMenuOpen;

  useEffect(() => {
    if (!isMenuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    function onPointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (headerRef.current?.contains(target)) return;
      setIsMenuOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(desktopMediaQuery);

    function onChange(event: MediaQueryListEvent) {
      if (event.matches) setIsMenuOpen(false);
    }

    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function onScroll() {
      if (isMenuOpen) return;

      const y = window.scrollY;

      if (y <= 0) {
        setIsHidden(false);
        lastScrollY.current = y;
        return;
      }

      const delta = y - lastScrollY.current;
      if (Math.abs(delta) < headerScrollThreshold) return;

      setIsHidden(delta > 0);
      lastScrollY.current = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isMenuOpen]);

  return (
    <>
      <div aria-hidden style={{ height: collapsedHeaderOffset }} />
      <header
        ref={headerRef}
        className="site-header bg-chrome fixed top-4 right-4 left-4 z-40 rounded-2xl px-5 py-5 backdrop-blur-xs"
        data-hidden={isHeaderHidden}
        aria-hidden={isHeaderHidden}
        inert={isHeaderHidden}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex"
            aria-label="Aly Gates"
            onClick={() => setIsMenuOpen(false)}
          >
            <Logo className="h-8 w-auto" />
          </Link>
          <nav className="hidden sm:block" aria-label="Primary">
            <ul className="font-label flex items-center gap-6 text-xs font-medium tracking-widest">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <TextLink tone="chrome" href={link.href}>
                    {link.label}
                  </TextLink>
                </li>
              ))}
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>
          <button
            type="button"
            className="hover:text-accent-one -m-2 p-2 motion-safe:transition-colors motion-safe:duration-300 sm:hidden"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            aria-label={menuLabel}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <Icon name={menuIcon} size="md" aria-hidden />
          </button>
        </div>
        <nav
          id={menuId}
          className={cn(
            "grid motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-out sm:hidden",
            menuRows,
          )}
          aria-label="Primary"
          aria-hidden={!isMenuOpen}
          inert={!isMenuOpen}
        >
          <div className="overflow-hidden">
            <ul className="font-label flex flex-col gap-6 pt-8 text-lg font-medium tracking-widest">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <TextLink
                    tone="chrome"
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </TextLink>
                </li>
              ))}
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
