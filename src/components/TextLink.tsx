import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const textLinkVariants = cva(
  "inline underline decoration-transparent decoration-wavy underline-offset-4 motion-safe:transition-[text-decoration-color,transform] motion-safe:duration-300 motion-safe:active:scale-[0.98] motion-safe:active:duration-0",
  {
    variants: {
      tone: {
        body: "font-bold text-accent-one hover:decoration-current",
        chrome: "hover:decoration-accent-one",
      },
    },
    defaultVariants: { tone: "body" },
  },
);

type TextLinkProps = ComponentProps<typeof Link> &
  VariantProps<typeof textLinkVariants>;

export function TextLink({ tone, className, ...props }: TextLinkProps) {
  return (
    <Link className={cn(textLinkVariants({ tone }), className)} {...props} />
  );
}
