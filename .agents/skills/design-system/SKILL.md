---
name: design-system
description: Conventions for this repo's design system — Tailwind v4 design tokens, typography scale, cva variants, primitive vs feature components, accessibility, and CSS hygiene. Use whenever creating or editing any React component, className, global CSS, theme token, or dark mode styling, even for small visual tweaks.
---

# Design system

## Design tokens (Tailwind v4)
- Tailwind v4 is configured in CSS, not tailwind.config.js. All tokens live in the global CSS file.
- Two different registration mechanisms are used, deliberately, for two different kinds of tokens:
  - Colors: raw CSS variables (`--color-bg-primary`, `--color-bg-secondary`, `--color-fg-primary`, `--color-fg-secondary`, `--color-accent`) defined once in `:root` / `:root[data-theme="dark"]`, exposed as utilities via `@utility bgColor-primary { background-color: var(--color-bg-primary); }` (and so on) — not registered under Tailwind's `@theme` color namespace, and not Tailwind's native `bg-primary`/`text-primary-foreground` naming.
  - Fonts and the type scale: registered under `@theme inline` / `@theme` (e.g. `--font-display: var(--font-display)`, `--text-heading-lg: 1.75rem`), producing Tailwind's native `font-display`, `text-heading-lg` utilities.
- Use `bgColor-*`/`fgColor-*` classes for color, never `bg-primary`/`text-primary` or a hex value.
- Tokenize radius, fonts, and shadows as well as colors, but only the ones the site uses.
- Every token-based class must map to a theme variable that is actually defined. A class referencing a missing token generates no CSS and fails silently, so verify against the global CSS file rather than assuming.
- Components never use raw palette classes (bg-blue-600) or hex values. No arbitrary values (p-[13px], text-[#333]) when a token or scale value exists — the one standing exception is compositing an inverted pair straight from the CSS variables (e.g. `bg-[var(--color-fg-primary)] text-[var(--color-bg-primary)]` for a solid inverted button), since there's no bgColor-*/fgColor-* utility for "the other token's color used as this property." Stick to the spacing and type scales otherwise. Opacity values and structural zeros are not violations.
- For translucent colors, use the color opacity modifier (bg-accent/50) instead of opacity-*, which creates a stacking context. Use opacity-* only when deliberately fading an element and its children together.
- Dark mode is set with a data-theme attribute on <html>, managed by next-themes (which uses data-theme by default) with suppressHydrationWarning on <html>. This project does not use Tailwind's `dark:` variant at all, and `@custom-variant dark` is deliberately not registered — every light/dark difference is a color, and color is already fully handled by the token swap above, so a `dark:` class would compile to nothing being used. Do not add `dark:` utilities or register the variant; if a real need for one arises (a structural difference that isn't a color swap — inverting a logo, dropping a shadow, a theme-only border), raise it first rather than adding it unilaterally.

## Typography
- Define the type scale as named tokens in @theme using the --text-* namespace with paired line-height (and weight or letter-spacing where the style needs it), so one class like text-heading-lg applies the whole style.
- Components use those scale classes instead of combining text-*, leading-*, and font-* by hand. Adding a weight (e.g. font-semibold) alongside a body size is fine.

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

This is `src/components/ui/Button.tsx` verbatim — the reference for how every primitive in this repo should be shaped:

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-heading transition hover:opacity-85 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-[var(--color-fg-primary)] text-[var(--color-bg-primary)]",
        secondary: "bgColor-secondary fgColor-primary",
        accent: "bgColor-accent text-[var(--color-bg-primary)]",
      },
      size: {
        sm: "text-body-sm px-4 py-1.5",
        md: "text-body-md px-5 py-2.5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

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
