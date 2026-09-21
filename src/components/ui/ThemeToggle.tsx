"use client";

const toggleClasses =
  "rounded-full px-3 py-1.5 text-body-sm fgColor-primary transition hover:bgColor-secondary";

export function ThemeToggle() {
  function toggle() {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
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
