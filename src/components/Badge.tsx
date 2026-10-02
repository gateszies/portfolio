import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border border-transparent font-label font-medium",
  {
    variants: {
      variant: {
        primary: "text-brand-foreground",
        outline: "",
      },
      color: {
        primary: "",
        accentOne: "",
        accentTwo: "",
        accentThree: "",
      },
      size: {
        sm: "px-2.5 py-1.5 text-xs",
        md: "px-3.5 py-2 text-sm",
      },
    },
    compoundVariants: [
      { variant: "primary", color: "primary", class: "bg-brand" },
      { variant: "primary", color: "accentOne", class: "bg-accent-one" },
      { variant: "primary", color: "accentTwo", class: "bg-accent-two" },
      { variant: "primary", color: "accentThree", class: "bg-accent-three" },

      {
        variant: "outline",
        color: "primary",
        class: "border-strong text-foreground",
      },
      {
        variant: "outline",
        color: "accentOne",
        class: "border-accent-one text-accent-one",
      },
      {
        variant: "outline",
        color: "accentTwo",
        class: "border-accent-two text-accent-two",
      },
      {
        variant: "outline",
        color: "accentThree",
        class: "border-accent-three text-accent-three",
      },
    ],
    defaultVariants: { variant: "outline", color: "primary", size: "md" },
  },
);

type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({
  variant,
  color,
  size,
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, color, size }), className)}
      {...props}
    />
  );
}
