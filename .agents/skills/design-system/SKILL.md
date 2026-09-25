---
name: design-system
description: Conventions for this repo's design system — Tailwind v4 design tokens, typography scale, cva variants, primitive vs feature components, accessibility, and CSS hygiene. Use whenever creating or editing any React component, className, global CSS, theme token, or dark mode styling, even for small visual tweaks.
---

# Design system

## Design tokens (Tailwind v4)

- Tailwind v4 is configured in CSS (`src/app/globals.css`), not `tailwind.config.js`. Color primitives live on `:root`; semantic color tokens live in `@theme`; fonts live in `@theme inline`; dark overrides redeclare the same semantic `--*` names inside `@layer theme` under `:root[data-theme="dark"]` (same cascade layer as `@theme` — not bare `:root` outside the layer).
- Two color tiers:
  - **Primitives** (`:root`): `--cream`, `--wine`, `--brown`, `--sand`, `--taupe`, `--poppy`, `--poppy-bright`, `--blue`, `--blue-bright`, `--olive`, `--olive-bright`. Named after the color; hex lives only here. Nothing outside `globals.css` references them — no `bg-cream`, no `var(--brown)` at call sites.
  - **Semantic** (`@theme`): maps primitives into Tailwind namespaces so utilities exist — `--color-background` / `--color-foreground` → `bg-background` / `text-foreground`; `--color-primary` / `--color-primary-foreground` → `bg-primary` / `text-primary-foreground`; `--border-color-strong` / `--border-color-subtle` → `border-strong` / `border-subtle` (kept instead of shadcn's `muted`); `--color-accent-one` / `--color-accent-two` / `--color-accent-three` → `bg-*` / `text-*` / `border-*` for each. Not `inline` — utilities must reference the semantic vars so dark mode can reassign them.
- Accents are semantic slots (`accent-one` / `accent-two` / `accent-three`), not color names.
- Contrast-check (WCAG 2.1, 4.5:1 text / 3:1 large-text and non-text UI) before tokenizing. `primary-foreground` is for text/borders on a solid primary fill — verified for primary, not yet for a solid accent fill in dark mode.
- **Typography**: next/font sets `--font-family-*` (with fallbacks) in `src/app/fonts.ts`. `@theme inline` maps them to role utilities:
  - `font-display` — display-font; large page titles only
  - `font-label` — Google Sans Code (500 only); small UI chrome / section labels (nav, eyebrows, buttons, badges, footer). Always pair with `font-medium` and usually `tracking-widest`.
  - `font-body` — Nunito (400/500/700); body copy and rich-text headings
    Use Tailwind's default `text-*` scale for size.
- Use native utilities (`bg-background`, `text-foreground`, `bg-primary`, `border-strong`, `text-accent-one`, …) — never hex values, primitive names, palette class names, or arbitrary-value color classes that reach into another token's CSS variable. Stick to the spacing and type scales otherwise. Opacity values and structural zeros are not violations.
- Tokenize radius, fonts, and shadows as well as colors, but only the ones the site uses.
- Every token-based class must map to a theme variable that is actually defined. A class referencing a missing token generates no CSS and fails silently, so verify against `globals.css`.
- For translucent colors, prefer a dedicated token. Use `opacity-_` only when deliberately fading an element and its children together.
- Dark mode is a `data-theme` attribute on `<html>`, managed by `next-themes`, with `suppressHydrationWarning` on `<html>`. Do not use Tailwind's `dark:` variant or register `@custom-variant dark` — light/dark differences are color token swaps. Raise first if a structural (non-color) theme difference appears.

## Typography

- Use Tailwind's default `text-*` scale. Pair with `font-display` / `font-label` / `font-body` as above; `font-label` always with `font-medium`, plus `tracking-widest` when it reads as a section label.
- Uncontrolled HTML (project markdown) uses `@tailwindcss/typography` for rhythm/sizing (`prose prose-lg`) plus a custom color theme utility `prose-brand` (docs: “Adding custom color themes”). `prose-brand` sets text `--tw-prose-*` to `inherit` (follows `body` / `text-foreground`) and links/borders to semantic tokens (`--color-accent-one`, border tokens) — not a wall of `prose-*:…` modifiers. Dark mode follows via token swaps under `data-theme`. Custom chrome outside prose's model (`.code-block`, copy button) lives under `.markdown-body`. Shiki keeps `--shiki-light` / `--shiki-dark` for syntax colors only; block chrome still uses design tokens. Prose headings stay on `font-body` via inheritance from `body` — do not switch them to `font-display` / `font-label`.

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
        primary: "bg-primary border-primary-foreground text-primary-foreground",
        secondary: "border-primary text-primary",
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
