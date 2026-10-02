import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RichTextProps = {
  children: ReactNode;
  className?: string;
};

export function RichText({ children, className }: RichTextProps) {
  return <div className={cn(className)}>{children}</div>;
}
