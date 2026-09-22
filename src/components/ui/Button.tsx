import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-heading transition hover:opacity-85 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-fg-primary)] text-[var(--color-bg-primary)]",
        secondary: "bgColor-secondary fgColor-primary",
        accent: "bgColor-accent text-[var(--color-bg-primary)]",
      },
      size: {
        sm: "text-body-sm px-4 py-1.5",
        md: "text-body-md px-5 py-2.5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
