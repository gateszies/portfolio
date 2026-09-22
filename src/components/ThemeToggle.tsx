"use client";

import { useTheme } from "next-themes";

const toggleClasses =
  "rounded-full px-3 py-1.5 text-body-sm fgColor-primary transition hover:bgColor-secondary";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  function toggle() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className={toggleClasses}
    >
      theme
    </button>
  );
}
