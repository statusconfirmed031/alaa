# WMINFRA Interior finishing contractors Company Profile

A text-only, design-led edition of the 2025–2026 company profile, implemented as a Next.js App Router site. The profile is served at `/`; no standalone `index.html` is required because `app/page.tsx` is the root route.

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm start
```

## Vercel

Connect this repository to Vercel and use the repository root. Vercel should detect **Next.js** automatically. The build command is `npm run build`; no environment variables are required. The standalone designed HTML and plain-text files are also available from `public/`.

The profile omits the source PDF’s photographs; page 62’s image-only descriptive text is transcribed in the page content.
