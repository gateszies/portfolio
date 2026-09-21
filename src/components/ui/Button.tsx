import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "accent";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center rounded-full font-heading transition hover:opacity-85 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-[var(--color-fg-primary)] text-[var(--color-bg-primary)]",
  secondary: "bgColor-secondary fgColor-primary",
  accent: "bgColor-accent text-[var(--color-bg-primary)]",
};

const sizes: Record<Size, string> = {
  sm: "text-body-sm px-4 py-1.5",
  md: "text-body-md px-5 py-2.5",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.href) {
    return <Link className={classes} {...props} href={props.href} />;
  }

  return (
    <button type="button" className={classes} {...(props as ButtonAsButton)} />
  );
}
