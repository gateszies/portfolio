import type { IconName } from "@/components/Icon";
import { LinkList } from "@/components/LinkList";

const socialLinks: { label: string; href: string; icon: IconName }[] = [
  { label: "github", href: "#", icon: "code" },
  { label: "email", href: "#", icon: "mail" },
];

export function Footer() {
  return (
    <footer className="flex items-center justify-between gap-6 px-12 py-8">
      <p className="font-label text-foreground text-sm font-medium tracking-widest">
        designed in figma, built with next.js + tailwind, deployed on vercel
      </p>
      <LinkList links={socialLinks} />
    </footer>
  );
}
