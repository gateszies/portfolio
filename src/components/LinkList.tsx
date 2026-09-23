import Link from "next/link";

const listClasses =
  "flex flex-wrap gap-8 font-subheading text-subheading-sm fgColor-primary";
const linkClasses =
  "underline decoration-dotted decoration-transparent underline-offset-4 transition-colors hover:decoration-current";

type LinkListProps = {
  links: { label: string; href: string }[];
};

export function LinkList({ links }: LinkListProps) {
  return (
    <ul className={listClasses}>
      {links.map(({ label, href }) => (
        <li key={label}>
          <Link href={href} className={linkClasses}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
