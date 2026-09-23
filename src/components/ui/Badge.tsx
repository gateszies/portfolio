import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border border-transparent font-subheading font-medium",
  {
    variants: {
      color: {
        brand: "",
        poppy: "",
        sky: "",
        ochre: "",
      },
      appearance: {
        solid: "text-[var(--color-bg-primary)]",
        outline: "",
      },
      size: {
        sm: "px-2.5 py-1.5 text-xs",
        md: "px-3.5 py-2 text-sm",
      },
    },
    compoundVariants: [
      { color: "brand", appearance: "solid", class: "bgColor-brand" },
      {
        color: "brand",
        appearance: "outline",
        class: "borderColor-brand fgColor-brand",
      },
      { color: "poppy", appearance: "solid", class: "bgColor-poppy" },
      {
        color: "poppy",
        appearance: "outline",
        class: "borderColor-poppy fgColor-poppy",
      },
      { color: "sky", appearance: "solid", class: "bgColor-sky" },
      {
        color: "sky",
        appearance: "outline",
        class: "borderColor-sky fgColor-sky",
      },
      { color: "ochre", appearance: "solid", class: "bgColor-ochre" },
      {
        color: "ochre",
        appearance: "outline",
        class: "borderColor-ochre fgColor-ochre",
      },
    ],
    defaultVariants: { color: "brand", appearance: "outline", size: "md" },
  },
);

type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({
  color,
  appearance,
  size,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ color, appearance, size }), className)}
      {...props}
    />
  );
}
