import Link from "next/link";
import { cn } from "@/lib/utils";

type LinkListProps = {
  links: { label: string; href: string }[];
  linkClassName?: string;
  className?: string;
};

export function LinkList({ links, linkClassName, className }: LinkListProps) {
  return (
    <ul
      className={cn(
        "font-label flex flex-wrap gap-2 text-xs font-medium tracking-widest",
        className,
      )}
    >
      {links.map(({ label, href }) => (
        <li key={label}>
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
