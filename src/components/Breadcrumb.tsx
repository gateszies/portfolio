import Link from "next/link";
import { Icon } from "@/components/Icon";

const linkClasses =
  "flex items-center gap-1.5 font-label text-sm font-medium tracking-widest text-foreground underline decoration-dotted decoration-transparent underline-offset-4 transition-colors hover:decoration-current";

type BreadcrumbProps = {
  href: string;
  label: string;
};

export function Breadcrumb({ href, label }: BreadcrumbProps) {
  return (
    <Link href={href} className={linkClasses}>
      <Icon name="arrow-left" size="sm" />
      {label}
    </Link>
  );
}
