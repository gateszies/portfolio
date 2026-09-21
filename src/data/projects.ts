export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  hero: string;
  // Figma only had lorem ipsum for the case-study body — swap for the real write-up.
  body: string;
};

export const projects: Project[] = [
  {
    slug: "prodpi-site-migration",
    title: "ProDPI Site Migration",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    tags: ["Typescript", "JavaScript", "CraftCMS"],
    thumbnail: "/placeholders/project-thumb.svg",
    hero: "/placeholders/project-hero.svg",
    body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  },
];
