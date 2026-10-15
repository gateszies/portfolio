import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps } from "react";
import { textLinkVariants } from "@/components/textLinkVariants";
import { cn } from "@/lib/utils";

type TextLinkProps = ComponentProps<typeof Link> &
  VariantProps<typeof textLinkVariants>;

export function TextLink({ tone, className, ...props }: TextLinkProps) {
  return (
    <Link className={cn(textLinkVariants({ tone }), className)} {...props} />
  );
}
