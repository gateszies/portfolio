import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";

const listClasses =
  "flex flex-wrap gap-8 fontFamily-heading fontSize-heading-sm lineHeight-heading-sm letterSpacing-heading fgColor-primary";
const linkClasses =
  "flex items-center gap-2 underline decoration-dotted decoration-transparent underline-offset-4 transition-colors hover:decoration-current";

type LinkListProps = {
  links: { label: string; href: string; icon: IconName }[];
};

export function LinkList({ links }: LinkListProps) {
  return (
    <ul className={listClasses}>
      {links.map(({ label, href, icon }) => (
        <li key={label}>
          <Link href={href} className={linkClasses}>
            <Icon name={icon} size="sm" />
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
