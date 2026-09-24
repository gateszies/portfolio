import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import {
  ArrowLeft,
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
  mail: Mail01,
  code: Code01,
  "arrow-left": ArrowLeft,
};

export type IconName = keyof typeof icons;

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
