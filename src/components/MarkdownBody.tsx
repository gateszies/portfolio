"use client";

import type { MouseEvent } from "react";
import { iconHtml } from "@/components/Icon";
import { cn } from "@/lib/utils";

const RESET_DELAY_MS = 1500;

type MarkdownBodyProps = {
  html: string;
  className?: string;
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
    button.innerHTML = iconHtml.check;
    button.disabled = true;
    setTimeout(() => {
      button.innerHTML = originalIcon;
      button.disabled = false;
    }, RESET_DELAY_MS);
  }

  return (
    <div
      className={cn(
        "prose prose-brand prose-lg markdown-body max-w-none pt-4",
        className,
      )}
      onClick={handleClick}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
