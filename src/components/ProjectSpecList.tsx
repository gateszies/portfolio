import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ProjectSpecListProps = ComponentProps<"dl">;

export function ProjectSpecList({ className, ...props }: ProjectSpecListProps) {
  return <dl className={cn("flex flex-col", className)} {...props} />;
}
