# AGENTS.md

## Principles (these take priority over everything below)
- Prefer the simplest solution that fully solves the problem. Optimize for readability and maintainability over cleverness.
- Use what already exists before creating something new: an existing component, token, variant, utility, or platform feature (HTML, CSS, Tailwind, Next.js) comes before any new abstraction.
- Don't apply bandaid fixes that mask a real need. If something can't be done cleanly with what exists (a missing token, a variant that doesn't fit, a primitive that needs a new capability, an arbitrary value, a dark: override), stop and raise it with the reason instead of working around it, so we can decide on a scalable solution together.

## UI work
- Before creating or editing components, styles, or tokens, read and follow `.agents/skills/design-system/SKILL.md`.

## Comments
- Do not add comments in component files. Names and structure should make the code self-explanatory.
- The only exception is something genuinely unconventional that a reader would otherwise "fix" incorrectly. This should almost never happen.
- No JSDoc on props, no section-divider comments, no comments restating what the code does, no leftover TODOs.

## Typing
- Always use named prop types declared above the component with `type` (never `interface`), not inline in the function signature. Only export a props type once another file actually needs it.
- Primitives that wrap an HTML element (Button, Card, Badge) extend native props: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>. Don't hand-list native props like onClick, disabled, children, className, or style.
- Custom props go in an additional object type in the intersection, and must be destructured out before spreading ...props onto the DOM element.
- If a custom prop would collide with a native prop name, prefer a different name (e.g. `intent` instead of `type`); use Omit only if the same name is really needed.
- Prefer native semantic attributes over invented props where they fit: aria-pressed for toggle state, aria-current="page" for current nav item.
- Let TypeScript infer types inside components; only annotate at boundaries (props, function params, exports).

## Inside components
- Every condition becomes a named const above the JSX (isPrimary, showIcon, labelClass). No inline comparisons in the markup; the JSX should read as a sequence of named booleans.
- Derive values during render instead of syncing state with useEffect. Don't add useMemo/useCallback by default.

## Next.js
- Components use named exports declared inline: `export function Button(...)`, `export const buttonVariants = cva(...)`. No export list at the bottom of the file.
- Use `export default` only in Next.js special files in app/ (page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx, template.tsx). route.ts files use named GET/POST exports.
- Components are Server Components by default. Add "use client" only to small interactive pieces that need state, effects, browser APIs, or their own event handlers, not to whole pages.
- Use next/link for internal links, next/image for images (with width/height, or fill plus sizes), and next/font for fonts, exposed as CSS variables and mapped in @theme.
- Use the Metadata API for titles, descriptions, and Open Graph data. Set lang on <html>.

## File structure and hygiene
- Primitives live in components/ui/, one per file. Feature components live outside ui/. The cn helper lives in lib/utils.ts.
- File names are kebab-case (button.tsx, project-card.tsx); component names are PascalCase.
- No unused variants, props, exports, or dead code. No console.log left in.

## Before finishing
- Run tsc --noEmit, next lint (or ESLint), prettier --check, and next build.
- Report what was verified by name rather than asserting it is clean (e.g. "all 9 token classes confirmed defined in globals.css", not "tokens look good"). Call out anything deliberately left, with the reason.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
