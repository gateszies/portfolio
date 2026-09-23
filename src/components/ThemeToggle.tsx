"use client";

import { useTheme } from "next-themes";
import { Icon } from "@/components/ui/Icon";

const toggleClasses = "fgColor-primary transition-colors hover:fgColor-brand";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  function toggle() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className={toggleClasses}
    >
      <Icon name={isDark ? "sun" : "moon"} size="sm" />
    </button>
  );
}
