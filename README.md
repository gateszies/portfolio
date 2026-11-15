# Portfolio

The source for [alygates.com](https://alygates.com). Built with Next.js, Tailwind CSS v4, and MDX, and deployed on Vercel.

## Structure

```text
.
├── content/
│   ├── home/                  # intro.mdx, about.mdx
│   └── projects/              # one <slug>.mdx per case study
├── plugins/
│   └── rehype-code/           # code fence highlighting and themes
├── public/
│   ├── about/                 # about section photos
│   ├── click-reveal/          # ClickReveal frame and sound
│   └── projects/<slug>/       # case study images and video
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx           # homepage
│   │   ├── projects/[slug]/   # case study page
│   │   ├── fonts.ts
│   │   └── globals.css        # Tailwind theme and tokens
│   ├── components/            # one PascalCase component per file
│   ├── lib/                   # projects, media sizes, layout, cn helper, tests
│   └── mdx-components.tsx     # components available in MDX
├── .claude/skills/            # design-system and react-doctor skills
├── AGENTS.md                  # code and content conventions
└── next.config.ts
```

## Content

- `content/home/` holds the intro and about copy.
- `content/projects/` has one MDX file per case study. The filename becomes the URL, so adding a project is just adding a file. Copy an existing one to start.
- `public/projects/<slug>/` holds each case study's images and video.

## Development

```bash
npm install
npm run dev
```

`npm run build`, `lint`, `typecheck`, and `test` are available too. A pre-commit hook handles linting and formatting.

Conventions for code and content live in `AGENTS.md`.
