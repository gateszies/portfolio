import Link from "next/link";

const listClasses = "flex flex-wrap gap-4 text-body-md fgColor-secondary";
const linkClasses =
  "underline decoration-dotted underline-offset-4 transition hover:fgColor-accent";

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
