import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border border-transparent font-label font-medium",
  {
    variants: {
      color: {
        primary: "",
        accentOne: "",
        accentTwo: "",
        accentThree: "",
      },
      appearance: {
        solid: "text-primary-foreground",
        outline: "",
      },
      size: {
        sm: "px-2.5 py-1.5 text-xs",
        md: "px-3.5 py-2 text-sm",
      },
    },
    compoundVariants: [
      { color: "primary", appearance: "solid", class: "bg-primary" },
      {
        color: "primary",
        appearance: "outline",
        class: "border-strong text-foreground",
      },
      { color: "accentOne", appearance: "solid", class: "bg-accent-one" },
      {
        color: "accentOne",
        appearance: "outline",
        class: "border-accent-one text-accent-one",
      },
      { color: "accentTwo", appearance: "solid", class: "bg-accent-two" },
      {
        color: "accentTwo",
        appearance: "outline",
        class: "border-accent-two text-accent-two",
      },
      {
        color: "accentThree",
        appearance: "solid",
        class: "bg-accent-three",
      },
      {
        color: "accentThree",
        appearance: "outline",
        class: "border-accent-three text-accent-three",
      },
    ],
    defaultVariants: { color: "primary", appearance: "outline", size: "md" },
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
