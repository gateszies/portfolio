import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import {
  ArrowLeft,
  Check,
  Code01,
  Copy01,
  Mail01,
  Moon01,
  Sun,
} from "@untitledui/icons";
import { cn } from "@/lib/utils";

const icons = {
  sun: Sun,
  moon: Moon01,
  copy: Copy01,
  check: Check,
  mail: Mail01,
  code: Code01,
  "arrow-left": ArrowLeft,
};

export type IconName = keyof typeof icons;

export const iconHtml = {
  check:
    '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>',
} as const satisfies Partial<Record<IconName, string>>;

export const iconVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
    },
  },
  defaultVariants: { size: "md" },
});

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
