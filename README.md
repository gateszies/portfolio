# Portfolio

The source for [alygates.com](https://alygates.com). Built with Next.js, Tailwind CSS v4, and MDX, and deployed on Vercel.

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
