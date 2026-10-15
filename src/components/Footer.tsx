import { Icon } from "@/components/Icon";
import { LinkList } from "@/components/LinkList";
import { TextLink } from "@/components/TextLink";
import { textLinkVariants } from "@/components/textLinkVariants";

const socialLinks = [
  { label: "github", href: "https://github.com/gateszies" },
  { label: "linkedin", href: "https://www.linkedin.com/in/alygates/" },
  { label: "email", href: "mailto:aly.r.gates@gmail.com" },
];

export function Footer() {
  return (
    <footer className="bg-chrome mx-4 mb-4 grid grid-cols-1 items-center justify-items-start gap-6 rounded-2xl px-4 py-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-10">
      <p className="font-label text-xs leading-5 font-medium tracking-widest">
        <TextLink
          tone="chrome"
          href="https://www.figma.com/design/FQ2ZX1aw2lo4NR552AoaQ2/portfolio?node-id=1-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          designed in figma
        </TextLink>{" "}
        ·{" "}
        <TextLink
          tone="chrome"
          href="https://github.com/gateszies/about"
          target="_blank"
          rel="noopener noreferrer"
        >
          built with react &amp; next.js
        </TextLink>
      </p>
      <Icon
        name="glimmer"
        size="md"
        className="text-accent-one sm:justify-self-center"
        aria-hidden
      />
      <LinkList
        links={socialLinks}
        linkClassName={textLinkVariants({ tone: "chrome" })}
        className="flex-col gap-4 sm:flex-row sm:gap-8 sm:justify-self-end"
      />
    </footer>
  );
}
