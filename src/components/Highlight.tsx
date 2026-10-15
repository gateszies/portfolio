import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const highlightVariants = cva(
  "squiggle-underline squiggle-underline-inline inline-block cursor-pointer font-bold after:bg-current",
  {
    variants: {
      color: {
        accentOne: "text-accent-one",
        accentTwo: "text-accent-two",
        accentThree: "text-accent-three",
      },
    },
    defaultVariants: { color: "accentOne" },
  },
);

type HighlightProps = ComponentProps<"span"> &
  VariantProps<typeof highlightVariants>;

export function Highlight({ color, className, ...props }: HighlightProps) {
  return (
    <span className={cn(highlightVariants({ color }), className)} {...props} />
  );
}
