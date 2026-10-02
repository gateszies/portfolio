import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { cn } from "@/lib/utils";

export const linkListVariants = cva(
  "font-label flex flex-wrap font-medium tracking-widest",
  {
    variants: {
      size: {
        xs: "gap-2 text-xs",
        sm: "gap-4 text-sm",
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: { size: "sm", orientation: "horizontal" },
  },
);

type LinkListProps = {
  links: { label: string; href: string; icon?: IconName }[];
  linkClassName?: string;
  className?: string;
} & VariantProps<typeof linkListVariants>;

export function LinkList({
  links,
  size,
  orientation,
  linkClassName,
  className,
}: LinkListProps) {
  return (
    <ul className={cn(linkListVariants({ size, orientation }), className)}>
      {links.map(({ label, href, icon }) => {
        const hasIcon = Boolean(icon);

        return (
          <li key={label}>
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                linkClassName,
                hasIcon && "inline-flex items-center gap-2",
              )}
            >
              {icon ? <Icon name={icon} size="sm" /> : null}
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
