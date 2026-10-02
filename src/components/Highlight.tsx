import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const highlightVariants = cva(
  "inline cursor-pointer font-bold underline decoration-transparent decoration-wavy underline-offset-4 hover:decoration-current motion-safe:transition-[text-decoration-color] motion-safe:duration-300",
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
