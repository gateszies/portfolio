---
name: design-system
description: Conventions for this repo's design system — Tailwind v4 design tokens, typography scale, cva variants, primitive vs feature components, accessibility, and CSS hygiene. Use whenever creating or editing any React component, className, global CSS, theme token, or dark mode styling, even for small visual tweaks.
---

# Design system

## Design tokens (Tailwind v4)

- Tailwind v4 is configured in CSS (`src/app/globals.css`), not `tailwind.config.js`. Color primitives live on `:root`; semantic color tokens live in `@theme`; fonts live in `@theme inline`; dark overrides redeclare the same semantic `--*` names inside `@layer theme` under `:root.dark` (same cascade layer as `@theme` — not bare `:root` outside the layer).
- Two color tiers:
  - **Primitives** (`:root`): `--cream`, `--cream-lift`, `--wine`, `--wine-lift`, `--brown`, `--sand`, `--taupe`, `--mauve`, `--poppy`, `--poppy-bright`, `--blue`, `--blue-bright`, `--olive`, `--olive-bright`. Named after the color; hex lives only here. Nothing outside `globals.css` references them — no `bg-cream`, no `var(--brown)` at call sites.
  - **Semantic** (`@theme`): role tokens only — the locked set is:

| Token                                             | Utilities                                          | Role                                                                                                 |
| ------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `--color-background`                              | `bg-background`                                    | Page / shell fill                                                                                    |
| `--color-foreground`                              | `text-foreground`                                  | Default text on background                                                                           |
| `--color-subtle`                                  | `text-subtle`                                      | Secondary / supporting text (captions, de-emphasized copy)                                           |
| `--color-chrome`                                  | `bg-chrome`                                        | Header / footer fill; translucent `--cream-lift` / `--wine-lift` so backdrop blur can read           |
| `--color-brand`                                   | `bg-brand`, `text-brand`, `border-brand`           | Brand fill or brand-colored UI                                                                       |
| `--color-brand-foreground`                        | `text-brand-foreground`, `border-brand-foreground` | Cream ink on solid brand (and solid accent) fills — same idea as Supabase `primary-solid-foreground` |
| `--border-color-strong` / `--border-color-subtle` | `border-strong` / `border-subtle`                  | Edges / dividers                                                                                     |
| `--color-accent-one` / `-two` / `-three`          | `bg-accent-*`, `text-accent-*`, `border-accent-*`  | Highlight slots (not color names)                                                                    |

Not `inline` — utilities must reference the semantic vars so dark mode can reassign them. Vocabulary is Supabase-style (`background` / `foreground` / `subtle` / `brand` / `chrome` / `border-strong`); no `surface-100` ladder, no brand subtle/strong — add a role only when a real call site needs it.

- Contrast-check (WCAG 2.1, 4.5:1 text / 3:1 large-text and non-text UI) before tokenizing. `brand-foreground` is verified on brand; `subtle` is verified on `background` / `chrome` in both themes; solid accent fills in dark mode are not fully verified yet.
- Typical pairings: body `bg-background text-foreground`; supporting copy `text-subtle`; chrome bands `bg-chrome`; primary button `bg-brand text-brand-foreground`; outline control `border-brand text-brand`.
- **Typography**: next/font sets `--font-family-*` (with fallbacks) in `src/app/fonts.ts`. `@theme inline` maps them to role utilities:
  - `font-display` — Corben (400 only, latin subset); large page titles only. Also sets `font-weight: 400` and `text-wrap: balance` in `globals.css`
  - `font-label` — Google Sans Code (500 only); small UI chrome / section labels (nav, eyebrows, buttons, badges, footer). Always pair with `font-medium` and usually `tracking-widest`.
  - `font-body` — Nunito (400/500/700); body copy and rich-text headings
    Use Tailwind's default `text-*` scale for size, except: `text-display` for the home name (`clamp` 3.5rem→5.625rem, leading 1); `text-title` for project page titles (`clamp` 1.25rem→2rem, leading 1.15).
- Use native utilities from the table above — never hex values, primitive names, palette class names, or arbitrary-value color classes that reach into another token's CSS variable. Stick to the spacing and type scales otherwise. Opacity values and structural zeros are not violations.
- Tokenize radius, fonts, and shadows as well as colors, but only the ones the site uses.
- Every token-based class must map to a theme variable that is actually defined. A class referencing a missing token generates no CSS and fails silently, so verify against `globals.css`.
- For translucent colors, prefer a dedicated token. Use `opacity-_` only when deliberately fading an element and its children together.
- Dark mode is a `.dark` class on `<html>`, managed by `next-themes` (`attribute="class"`), with `suppressHydrationWarning` on `<html>`. Site components still use color token swaps only (`background`, `foreground`, `chrome`, borders, accents; `brand` / `brand-foreground` stay put) — do not add `dark:` at call sites. Raise first if a structural (non-color) theme difference appears in site UI.

## Typography

- Use Tailwind's default `text-*` scale, plus `text-display` for the home name (`clamp` 3.5rem→5.625rem, leading 1) and `text-title` for project page titles (`clamp` 1.25rem→2rem, leading 1.15). Pair with `font-display` / `font-label` / `font-body` as above; `font-label` always with `font-medium`, plus `tracking-widest` when it reads as a section label. Body uses `text-pretty`; `font-display` uses `text-balance` for large titles.
- Project / rich MDX bodies are wrapped in `RichText` at the call site (`src/components/RichText.tsx`). Pass typography via `className` — home uses `text-lg`; case studies use `@tailwindcss/typography` (`prose prose-lg`). Default `prose` colors are overridden in `globals.css` (text `--tw-prose-*` inherit / follow `body` / `text-foreground`; links/borders use semantic tokens) — not a wall of `prose-*:…` modifiers. Dark mode follows via token swaps under `.dark`. Inline `code` is styled in `globals.css` (`:not(pre) > code`); fenced blocks via Expressive Code (`plugins/rehype-code`, wired from `next.config.ts` by absolute path) — Shiki + editor frames; `themeCssSelector` follows the site `.dark` class. Filename: ` ```ts title="file.ts" ` (basename only; VS Code file icons via `@xt0rted/expressive-code-file-icons`). Themes in `plugins/rehype-code/code-themes.mjs` (`gruvbox-light-hard` / `gruvbox-dark-hard`). Prose headings stay on `font-body` via inheritance from `body` — do not switch them to `font-display` / `font-label`.

## Styling and variants

- Use `cva` (class-variance-authority) to define variants, combined with a `cn` helper (clsx + tailwind-merge). Think of it as BEM-style modifiers (.Button / .Button--primary), but typed and expressed as Tailwind utilities.
- Only define the variants and sizes the site actually uses (e.g. primary/outline, md/lg). No unused variants copied from shadcn.
- Set defaults only in `defaultVariants`. Don't repeat them as default values in the prop destructuring.
- Handle interaction states in CSS with Tailwind modifiers (disabled:, focus-visible:, hover:, aria-*:), not JavaScript toggles.
- Merge classes as `cn(buttonVariants({ variant, size }), className)`, with className last so callers can override.
- Don't use shadcn's `data-slot` attributes unless a real need comes up.
- Export the variant function so it can be reused, e.g. an <a> styled with buttonVariants().
- An element's styles live on that element. When it changes based on a parent's state, put the variant on the element itself (group-data-[state=open]:rotate-180) rather than reaching in from the parent with descendant selectors ([&_svg]:rotate-180). Descendant selectors are only for children the component doesn't render itself, like icons passed in by the caller.
- Class names are always complete strings. Never build them dynamically (`bg-${color}`), because Tailwind can't detect them; map values to full class strings instead.
- Put static `className` strings inline on the element. Don't hoist one-off class strings into `*Classes` consts above the component. Extract only when the string is reused, looks up from a map (e.g. cycling accent classes), or belongs in `cva`.
- No classes that do nothing: no group or peer without a matching group-* or peer-*, no leftover hook class names without styles.
- Animate only transform and opacity where possible.

## No unnecessary CSS

- Don't add utilities Preflight already covers: box-border, m-0, p-0, and list-none on ul/ol/menu.
- No justify-* on a shrink-wrapped flex container; there is no free space to distribute.
- No min-h-0 on a flex item that already can't shrink.
- No overflow-hidden added just in case; it clips focus rings and descenders. Use min-w-0 plus one wrapping rule instead.
- Inherited properties like break-words go once on the shared parent, not repeated on siblings.
- Check the box math. For example, size-6 border p-1 leaves 14px, which can't hold a size-4 (16px) icon. Centering usually replaces the padding.

## Primitives vs feature components

- Primitives (Button, Card, Badge) are generic, extend native element props, and use cva.
- Feature components (ProjectCard, ContactForm) take narrow, domain-specific props (e.g. `project: Project`), optionally `className` for layout, and compose the primitives internally.
- Apply the pattern consistently across a few primitives so it reads as a system, not a one-off.

## Accessibility

- Semantic HTML first: <button> for actions, <a>/<Link> for navigation, landmarks (header, nav, main, footer), one h1 per page, headings in order.
- Every interactive element has a visible focus style using the ring token via focus-visible:. Never remove outlines without a replacement.
- Style state from semantic attributes with Tailwind's aria-* modifiers (aria-pressed:, aria-[current=page]:).
- Respect reduced motion with motion-safe: / motion-reduce:.
- Text and UI meet WCAG AA contrast in both light and dark themes.
- Icon-only buttons get an aria-label; decorative icons get aria-hidden.
- Meaningful alt text on content images; alt="" on decorative ones.
- Interactive targets are comfortably sized, not just the size of their text or icon.

## Example of the expected shape

This is `src/components/Button.tsx` verbatim — the reference for how every primitive in this repo should be shaped:

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full border font-label font-medium transition-opacity hover:opacity-85 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand border-brand-foreground text-brand-foreground",
        secondary: "border-brand text-brand",
      },
      size: {
        sm: "px-4 py-1.5 text-sm",
        md: "px-5 py-2.5 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

Note this primitive doesn't yet have an explicit `focus-visible:` ring style (it currently relies on the browser's native focus outline, which the Accessibility section below says to never remove without a replacement — that's satisfied, just not customized). Add one with a real ring token, not an arbitrary value, if that's ever wanted.
