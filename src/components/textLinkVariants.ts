import { cva } from "class-variance-authority";

export const textLinkVariants = cva(
  "squiggle-underline motion-safe:transition-transform motion-safe:duration-300 motion-safe:active:scale-[0.98] motion-safe:active:duration-0",
  {
    variants: {
      tone: {
        body: "squiggle-underline-inline inline-block font-bold text-accent-one after:bg-current",
        chrome: "squiggle-underline-chrome inline after:bg-accent-one",
      },
    },
    defaultVariants: { tone: "body" },
  },
);
