# Aly Gates — portfolio

Next.js 15+ (App Router) portfolio, styled with Tailwind CSS v4 and deployed on Vercel.

## Stack

- **Next.js (App Router) + React + TypeScript** — Server Components for the static pages, a few client islands (`ThemeToggle`, `ClickReveal`) for interactivity.
- **Tailwind CSS v4** — design tokens are plain CSS custom properties defined in `src/app/globals.css` via `@theme`, not a JS config file.
- **No CMS** — home copy and project case studies are MDX (`content/home/`, `content/projects/`); experience and social links live next to the components that render them.
- **MDX** — `@next/mdx` compiles `.mdx` files; shared components (`Highlight`, `ClickReveal`) are registered in `src/mdx-components.tsx`.
- **Vercel** — connect this repo in the Vercel dashboard for automatic deploys on push; the free Hobby plan covers a personal portfolio.

## Design system

- **Color tokens** (`src/app/globals.css`): primitives on `:root` (`--cream`, `--brown`, …); semantic roles in `@theme` — `background` / `foreground` / `brand` / `brand-foreground` / `border-strong` / `border-subtle` / `accent-one|two|three`. Call sites use those utilities only (`bg-background`, `text-foreground`, `bg-brand`, `text-brand-foreground`, …). Dark mode remaps `background`, `foreground`, borders, and accents under `:root.dark` (`brand` / `brand-foreground` unchanged).
- **Fonts** (`src/app/fonts.ts`): next/font sets `--font-family-*`; `@theme inline` maps them to `font-display` (large titles), `font-label` (UI / section labels), `font-body` (copy + rich-text headings).
- **Type scale**: Tailwind's default `text-*` utilities.
- **Theme switching**: [`next-themes`](https://github.com/pacocoursey/next-themes) (`attribute="class"`) handles the no-flash script, persistence, and system-preference default. `ThemeToggle` calls its `useTheme()` hook.
- **Code blocks**: inline `code` styled in `globals.css`; fenced blocks via Expressive Code (`plugins/rehype-code`, referenced as `"rehype-code"` in `next.config.ts`). Themes in `plugins/rehype-code/code-themes.mjs` (`gruvbox-light-hard` / `gruvbox-dark-hard`, follows site `.dark`). Filename tab with VS Code file icons: ` ```ts title="greet.ts" ` (basename only).
- **Components** (`src/components/`, flat): generic `cva`-based primitives (`Badge`, `Icon`, `Highlight`) alongside domain-specific ones (`Section`, `ProjectCard`, `ProjectList`, `ExperienceList`, `LineItem`, `Footer`, `LinkList`, `RichText`, `ClickReveal`, `Eyebrow`, `ThemeToggle`).
- Conventions for all of the above are written down in `AGENTS.md` and `.agents/skills/design-system/SKILL.md`.

## Editing home copy

Intro and about prose live in MDX under `content/home/`:

- `intro.mdx` — opening paragraph
- `about.mdx` — the about section paragraphs

Use `<Highlight>`, `<Highlight color="accentTwo">` / `accentThree`, and `<ClickReveal image="..." alt="..." caption="...">` inline. A click (or Enter/Space) plays a shutter and fades in a polaroid (frame + caption), which fades out after a short hold, or sooner on scroll. Keep each `<ClickReveal` opening on the same line as the surrounding sentence text, with the final `>` on the last attribute line (not alone) — otherwise MDX treats it as a block and breaks the paragraph. `content/home/about.mdx` is Prettier-ignored for that reason. The intro eyebrow and name stay in `src/app/page.tsx`, which imports the MDX files and wraps them in `RichText` for type size (`className="text-lg"`).

## Adding or editing a project

Each case study is an MDX file in `content/projects/`, named `<slug>.mdx` — the filename becomes the URL (`/projects/<slug>`). To add a new project, add a new file; nothing else needs to change. To edit one, just edit its text and save.

Card data is a named `project` export at the top of the file (title, description, tags, images). The rest is Markdown/MDX body — the project page wraps it in `RichText` with prose classes:

````mdx
export const project = {
  title: "Project Title",
  description: "One-sentence summary shown on the homepage card.",
  tags: ["Typescript", "JavaScript", "CraftCMS"],
  thumbnail: "/placeholders/project-thumb.svg",
  hero: "/placeholders/project-hero.svg",
};

The write-up goes here as regular Markdown — paragraphs, **bold**,
[links](https://example.com), lists, `inline code`, and fenced code blocks.
For a filename in the chrome, pass `title` in the fence meta; bare languages
work too when you don't need a title:

```ts title="greet.ts"
function greet(name: string) {
  return `hello, ${name}`;
}
```

Images work too — drop the file under `public/` (e.g.
`public/projects/prodpi/screenshot.png`) and reference it by that
absolute path:

![a screenshot](/projects/prodpi/screenshot.png)
````

`src/lib/projects.ts` imports every `.mdx` file in that folder automatically, so there's no separate list to keep in sync.

## Placeholders to replace

- `public/placeholders/` — Aly, Ivy, design-school photos, and project image placeholders.
- `public/hover-reveal/` — polaroid frame and CC0 shutter click (`shutter.mp3` from BigSoundBank / Joseph Sardin) used by `ClickReveal`.
- `content/home/*.mdx` / `content/projects/*.mdx` / experience rows in `ExperienceList` — real copy and dates (Figma itself only had lorem ipsum / "2020 - Now" placeholders for these).
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
