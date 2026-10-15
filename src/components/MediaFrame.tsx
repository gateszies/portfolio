import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type MediaFrameProps = ComponentProps<"div">;

export function MediaFrame({ className, ...props }: MediaFrameProps) {
  return (
    <div
      className={cn(
        "border-subtle bg-chrome overflow-hidden rounded-2xl border",
        className,
      )}
      {...props}
    />
  );
}
