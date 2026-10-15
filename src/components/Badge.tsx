import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border border-transparent px-2.5 py-1.5 font-label text-xs font-medium",
  {
    variants: {
      color: {
        accentOne: "border-accent-one text-accent-one",
        accentTwo: "border-accent-two text-accent-two",
        accentThree: "border-accent-three text-accent-three",
      },
    },
    defaultVariants: { color: "accentOne" },
  },
);

type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({ color, className, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ color }), className)} {...props} />
  );
}
