import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import {
  ArrowLeft as arrowLeft,
  ArrowRight as arrowRight,
  ArrowUpRight as arrowUpRight,
  Menu01 as menu,
  Moon01 as moon,
  Sun as sun,
  XClose as close,
} from "@untitledui/icons";
import { cn } from "@/lib/utils";

function glimmer({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="49.92 46.8 56.16 56.16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M78 46.7998C77.9993 62.3047 65.4273 74.8721 49.9199 74.8721V74.8867C65.4274 74.8867 77.9995 87.455 78 102.96C78.0005 87.9391 89.8001 75.6721 104.637 74.9209L106.08 74.8867V74.8721C90.5727 74.8721 78.0007 62.3047 78 46.7998Z"
        fill="currentColor"
      />
    </svg>
  );
}

const icons = {
  sun,
  moon,
  menu,
  close,
  glimmer,
  arrowLeft,
  arrowRight,
  arrowUpRight,
};

type IconName = keyof typeof icons;

const iconVariants = cva(
  "shrink-0 motion-safe:transition-colors motion-safe:duration-300",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
      },
    },
    defaultVariants: { size: "md" },
  },
);

type IconProps = Omit<ComponentProps<"svg">, "name"> &
  VariantProps<typeof iconVariants> & {
    name: IconName;
  };

export function Icon({ name, size, className, ...props }: IconProps) {
  const IconSvg = icons[name];

  return (
    <IconSvg className={cn(iconVariants({ size }), className)} {...props} />
  );
}
