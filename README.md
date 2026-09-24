# Aly Gates — portfolio

Next.js 15+ (App Router) portfolio, styled with Tailwind CSS v4 and deployed on Vercel.

## Stack

- **Next.js (App Router) + React + TypeScript** — Server Components for the static pages, a few client islands (`ThemeToggle`, `HoverReveal`) for interactivity.
- **Tailwind CSS v4** — design tokens are plain CSS custom properties defined in `src/app/globals.css` via `@theme`, not a JS config file.
- **No CMS** — project case studies are Markdown files (`content/projects/`); everything else (resume, social links) is typed data under `src/data/`.
- **Vercel** — connect this repo in the Vercel dashboard for automatic deploys on push; the free Hobby plan covers a personal portfolio.

## Design system

- **Color tokens** (`src/app/globals.css`): a primitive tier of raw named hexes (`--cream`, `--brown`, `--poppy`, `--blue`, …) that a semantic tier (`--bgColor-primary`, `--fgColor-primary`, `--borderColor-strong`, plus `bgColor`/`fgColor`/`borderColor` trios for `brand`, `poppy`, `sky`, `ochre`) points at, re-pointed per theme under `:root[data-theme="dark"]`. Each semantic token is exposed as the utility class of the same name.
- **Fonts** (`src/app/layout.tsx`): `--fontFamily-display` (display-font, self-hosted via `next/font/local`), `--fontFamily-heading` (Google Sans Code), `--fontFamily-body` (Nunito) — each exposed as a `fontFamily-*` utility in `globals.css`.
- **Type scale**: `fontSize-*`, `lineHeight-*`, `fontWeight-*`, and `letterSpacing-*` utilities across `body`, `heading`, and `display` roles, one CSS property each, defined in `globals.css`. Font sizes are multiples of Tailwind's `--spacing` base.
- **Theme switching**: [`next-themes`](https://github.com/pacocoursey/next-themes) (`attribute="data-theme"`, matching the CSS above) handles the no-flash script, persistence, and system-preference default. `ThemeToggle` calls its `useTheme()` hook.
- **Components** (`src/components/`, flat): generic `cva`-based primitives (`Button`, `Badge`, `Icon`) alongside domain-specific ones (`ProjectCard`, `LineItem`, `Footer`, `LinkList`, `Breadcrumb`, `MarkdownBody`, `HoverReveal` — the star-cursor hover interaction, `ThemeToggle`).
- Conventions for all of the above are written down in `AGENTS.md` and `.agents/skills/design-system/SKILL.md`.

## Adding or editing a project

Each case study is a Markdown file in `content/projects/`, named `<slug>.md` — the filename becomes the URL (`/projects/<slug>`). To add a new project, add a new file; nothing else needs to change. To edit one, just edit its text and save.

````markdown
---
title: Project Title
description: One-sentence summary shown on the homepage card.
tags: [Typescript, JavaScript, CraftCMS]
thumbnail: /placeholders/project-thumb.svg
hero: /placeholders/project-hero.svg
---

The write-up goes here as regular Markdown — paragraphs, **bold**,
[links](https://example.com), lists, `inline code`, and fenced code blocks
all render with styling that matches the rest of the site:

```ts
function greet(name: string) {
  return `hello, ${name}`;
}
```

Images work too — drop the file under `public/` (e.g.
`public/projects/prodpi/screenshot.png`) and reference it by that
absolute path:

![a screenshot](/projects/prodpi/screenshot.png)
````

`src/lib/projects.ts` reads every file in that folder automatically (via `gray-matter` for the frontmatter and `marked` to render the body), so there's no separate list to keep in sync.

## Placeholders to replace

- `public/placeholders/*.svg` — swap for real photos (Aly, Ivy) and project images.
- `public/star-cursor.svg` — the custom cursor graphic.
- `content/projects/*.md` / `src/data/experience.ts` — real copy and dates (Figma itself only had lorem ipsum / "2020 - Now" placeholders for these).
- Color palette and fonts, as above.

## Development

```bash
npm run dev            # local dev server
npm run lint            # eslint
npm run lint:fix         # eslint --fix
npm run format           # prettier --write .
npm run format:check     # prettier --check .
npm run typecheck        # tsc --noEmit
npm test                 # vitest run
npm run build            # production build (what Vercel runs)
```

Linting and formatting run automatically on every commit via a Husky pre-commit hook (`lint-staged` runs `eslint --fix` + `prettier --write` on staged files) — no need to run them by hand first. `npm test` and `npm run typecheck` are separate, on-demand commands; they don't block commits, so commits stay fast.
