import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type LogoProps = ComponentProps<"svg">;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 156 147"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("fill-accent-one", className)}
      aria-hidden
      {...props}
    >
      <path d="M84.2402 0C123.872 0.000125057 156 32.1279 156 71.7598V146.64H112.32C93.3659 146.64 78 131.274 78 112.319C78 131.274 62.6341 146.64 43.6797 146.64H0V71.7598C3.65954e-06 32.1279 32.1279 0.00012198 71.7598 0H84.2402ZM78 46.7998C77.9993 62.3047 65.4273 74.8721 49.9199 74.8721V74.8867C65.4274 74.8867 77.9995 87.455 78 102.96C78.0005 87.9391 89.8001 75.6721 104.637 74.9209L106.08 74.8867V74.8721C90.5727 74.8721 78.0007 62.3047 78 46.7998Z" />
    </svg>
  );
}
