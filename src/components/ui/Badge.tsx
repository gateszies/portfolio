import type { ReactNode } from "react";

const badgeClasses =
  "rounded-full bgColor-secondary px-3 py-1 text-body-sm fgColor-secondary";

export function Badge({ children }: { children: ReactNode }) {
  return <span className={badgeClasses}>{children}</span>;
}
