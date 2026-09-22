import Link from "next/link";

const footerClasses = "text-body-sm fgColor-secondary";
const linkClasses = "underline decoration-dotted underline-offset-4";

type FooterProps = {
  linkHref: string;
  linkLabel: string;
};

export function Footer({ linkHref, linkLabel }: FooterProps) {
  return (
    <footer className={footerClasses}>
      Designed in Figma and coded with Next.js by me.{" "}
      <Link href={linkHref} className={linkClasses}>
        {linkLabel}
      </Link>
    </footer>
  );
}
