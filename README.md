# Aly Gates — portfolio

Next.js 15+ (App Router) portfolio, styled with Tailwind CSS v4 and deployed on Vercel.

## Stack

- **Next.js (App Router) + React + TypeScript** — Server Components for the static pages, a few client islands (`ThemeToggle`, `HoverReveal`) for interactivity.
- **Tailwind CSS v4** — design tokens are plain CSS custom properties defined in `src/app/globals.css` via `@theme`, not a JS config file.
- **No CMS** — content lives in typed data files under `src/data/`.
- **Vercel** — connect this repo in the Vercel dashboard for automatic deploys on push; the free Hobby plan covers a personal portfolio.

## Design system

- **Color tokens** (`src/app/globals.css`): `--color-bg-primary/secondary`, `--color-fg-primary/secondary`, `--color-accent`, each with a light value in `:root` and a dark override under `:root[data-theme="dark"]`. Exposed as utility classes `bgColor-primary`, `fgColor-primary`, etc. **The hex values are placeholders — swap them for the real brand palette in one place.**
- **Fonts** (`src/app/fonts.ts`): `--font-display` / `--font-heading` / `--font-body`, currently wired to free Google Font stand-ins (Fraunces / Archivo / Inter) for GT Super / Acumin Pro Wide / Acumin Pro. Swap to `next/font/local` with the licensed font files once available — every component already reads the `--font-*` variables, so this is the only file to change.
- **Type scale**: `text-display-sm/md/lg`, `text-heading-sm/md/lg`, `text-body-sm/md/lg` utilities, defined in the `@theme` block in `globals.css`.
- **Theme switching**: an inline script in `src/app/layout.tsx` sets `data-theme` on `<html>` before hydration (localStorage choice, else system preference). `ThemeToggle` flips and persists it.
- **Components** (`src/components/ui/`): `Button`, `ProjectCard`, `LineItem`, `HoverReveal` (the star-cursor hover interaction), `ThemeToggle`.

## Placeholders to replace

- `public/placeholders/*.svg` — swap for real photos (Aly, Ivy) and project images.
- `public/star-cursor.svg` — the custom cursor graphic.
- `src/data/projects.ts` / `src/data/experience.ts` — real copy and dates (Figma itself only had lorem ipsum / "2020 - Now" placeholders for these).
- Color palette and fonts, as above.

## Development

```bash
npm run dev     # local dev server
npm run lint    # eslint
npm run build   # production build (what Vercel runs)
```
