"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Icon } from "@/components/Icon";

const toggleClasses = "text-foreground transition-colors hover:text-primary";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const isDark = mounted && resolvedTheme === "dark";

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
