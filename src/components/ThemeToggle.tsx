"use client";

import { useTheme } from "next-themes";

const toggleClasses =
  "fgColor-primary underline decoration-dotted underline-offset-4 decoration-transparent transition-colors hover:decoration-current";

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
