# WMINFRA Interior finishing contractors Company Profile

A design-led edition of the 2025–2026 company profile, implemented as a Next.js App Router site. The profile is served at `/`; no standalone `index.html` is required because `app/page.tsx` is the root route.

The profile now contains 85 pages. Pages 69–85 add the 17 project titles and descriptions from Connect Profile 2024; the first 15 use 45 existing Cloudinary photos, while Finishing and Tile Design are text-only because no matching uploads were present in the manifest.

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

Page 62’s image-only descriptive text is transcribed in the page content.
