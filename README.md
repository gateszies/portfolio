# Aly Gates Portfolio

My portfolio site. Next.js (App Router), Tailwind CSS v4, and MDX, deployed on Vercel. There's no CMS: home copy and case studies are MDX files in `content/`.

## Project structure

```
content/
  home/              intro and about copy (MDX)
  projects/          one MDX file per case study
public/
  about/             photos for the about section
  click-reveal/      polaroid frame and shutter sound
  projects/<slug>/   case study images and video
src/
  app/               routes, layout, global CSS and tokens, fonts
  components/        all components, flat, one per file
  lib/               project loading, media sizes, utils (with tests)
  mdx-components.tsx components available inside MDX
plugins/rehype-code/ code block styling for MDX (Expressive Code)
AGENTS.md            conventions for AI agents (CLAUDE.md points here)
.claude/skills/      design system rules and the React Doctor scan
```

The rest of the root is tooling config: ESLint, Prettier, PostCSS, TypeScript, Vitest, Husky, and `.npmrc`. `.npmrc` makes npm copy `plugins/rehype-code` into `node_modules` instead of symlinking it, which the MDX loader needs.

## Design system

Tokens are CSS custom properties in `src/app/globals.css` (Tailwind v4 `@theme`, no JS config). Color primitives live on `:root`, and components only use semantic roles like `bg-background`, `text-foreground`, and `bg-brand`. Dark mode reassigns those roles under `:root.dark`, and `next-themes` handles switching.

Fonts come from `src/app/fonts.ts` and map to `font-display`, `font-label`, and `font-body`. Components are `cva`-based where they have variants.

The full rules live in `.claude/skills/design-system/SKILL.md`.

## Editing home copy

Intro and about copy live in `content/home/intro.mdx` and `content/home/about.mdx`. Inline components:

- `<Highlight>`, `<Highlight color="accentTwo">`, `<Highlight color="accentThree">`
- `<ClickReveal image="..." alt="..." caption="...">`: click (or Enter/Space) plays a shutter and fades in a polaroid

Keep each `<ClickReveal` opening on the same line as the sentence around it, with the closing `>` on the last attribute line. Otherwise MDX treats it as a block and breaks the paragraph. That's also why `about.mdx` is excluded from Prettier.

## Adding or editing a project

Each case study is `content/projects/<slug>.mdx`, and the filename becomes the URL (`/projects/<slug>`). Add a file to add a project; `src/lib/projects.ts` picks it up automatically.

The top of the file exports the card and page data. Everything after it is the write-up:

````mdx
export const project = {
  title: "Project Title",
  description: "One-sentence summary shown on the homepage card.",
  tags: ["Design Systems", "React", "Accessibility"],
  thumbnail: "/projects/project-title/cover.png",
  hero: "/projects/project-title/cover.png",
  heroAlt: "What the cover image shows",
  specs: [
    { label: "Role", value: "Design Engineer" },
    { label: "Stack", value: "React, TypeScript, Tailwind, Figma" },
    { label: "Live", value: "example.com", href: "https://example.com" },
  ],
  order: 1,
};

## Context

Regular Markdown works here: paragraphs, **bold**, [links](https://example.com),
lists, `inline code`, and fenced code blocks. Add `title` to a code fence to
show a filename tab:

```ts title="greet.ts"
function greet(name: string) {
  return `hello, ${name}`;
}
```

<ImageCard
  src="/projects/project-title/screenshot.png"
  alt="What the screenshot shows"
  caption="Optional caption"
/>
````

- `order` sets the position on the homepage. `draft: true` hides a project.
- Put media in `public/projects/<slug>/` and reference it by absolute path.
- Use `ImageCard` for one image, `ImageCarousel` for a set (`images={[{ src, alt, caption }]}`), and `VideoCard` for an `.mp4`.
- Export images at 2560×1440 so they stay sharp. Other sizes need `width` and `height` props. More detail is in the "Case study media" section of `AGENTS.md`.

## Development

```bash
npm run dev            # local dev server
npm run build          # production build (what Vercel runs)
npm run lint           # eslint (lint:fix to fix)
npm run format         # prettier --write (format:check to check)
npm run typecheck      # tsc --noEmit
npm test               # vitest
```

A Husky pre-commit hook runs ESLint and Prettier on staged files. Tests and type checks run on demand so commits stay fast.
