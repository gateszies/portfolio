import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const badgeClasses =
  "rounded-full bgColor-secondary px-3 py-1 text-body-sm fgColor-secondary";

export function Badge({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn(badgeClasses, className)} {...props} />;
}
