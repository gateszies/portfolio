import type { IconName } from "@/components/Icon";

export type SocialLink = {
  label: string;
  href: string;
  icon: IconName;
};

// Placeholder hrefs — wire up to real profiles.
export const socialLinks: SocialLink[] = [
  { label: "github", href: "#", icon: "code" },
  { label: "email", href: "#", icon: "mail" },
];
