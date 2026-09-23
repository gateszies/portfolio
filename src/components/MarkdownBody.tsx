"use client";

import type { MouseEvent } from "react";

const CHECK_ICON =
  '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

const RESET_DELAY_MS = 1500;

type MarkdownBodyProps = {
  html: string;
  className: string;
};

export function MarkdownBody({ html, className }: MarkdownBodyProps) {
  async function handleClick(event: MouseEvent<HTMLDivElement>) {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
      ".js-copy-code",
    );
    if (!button) return;

    const code =
      button.closest(".code-block")?.querySelector("pre")?.textContent ?? "";
    await navigator.clipboard.writeText(code);

    const originalIcon = button.innerHTML;
    button.innerHTML = CHECK_ICON;
    button.disabled = true;
    setTimeout(() => {
      button.innerHTML = originalIcon;
      button.disabled = false;
    }, RESET_DELAY_MS);
  }

  return (
    <div
      className={className}
      onClick={handleClick}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
