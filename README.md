# Free Image Converter

Free Image Converter is a browser-based tool for converting PNG, JPG, and WEBP images. It is designed for quick, private conversions: files are processed locally in the browser and are not uploaded to a server.

Live site: [www.freeimageconverterfree.xyz](https://www.freeimageconverterfree.xyz/)

## Features

- Convert PNG, JPG, and WEBP images
- Convert multiple images at once
- Resize images with optional width and height controls
- Adjust JPG and WEBP quality
- Drag-and-drop uploads
- Download converted files individually
- No account or server upload required
- SEO pages for common format conversions

## Tech stack

- Next.js with the App Router
- React and TypeScript
- Tailwind CSS
- Framer Motion
- Google Analytics 4
- GitHub Pages with a static Next.js export

## Local development

Install dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful commands:

```bash
npm run lint
npm run build
```

The production build creates a static site in the `out/` directory.

## Google Analytics

Google Analytics is optional. To enable it locally, create a `.env.local` file:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

The app tracks privacy-safe conversion funnel events, including uploads, conversion starts and completions, failures, downloads, format selection, batch conversion, resizing, and quality adjustments. Image filenames are not sent to Analytics.

For the production GitHub Actions build, add a repository secret named:

```text
NEXT_PUBLIC_GA_MEASUREMENT_ID
```

The workflow reads this secret during the build. The GA4 measurement ID is intended to be visible in browser code; it is not a private API key.

## Deployment

Production deployment is handled by GitHub Actions in `.github/workflows/deploy-pages.yml`.

Every push to `main` builds the static export, uploads the `out/` directory, and deploys it to GitHub Pages.

To enable deployment:

1. Open **Settings -> Pages**.
2. Set the source to **GitHub Actions**.
3. Confirm the workflow has `pages: write` and `id-token: write` permissions.
4. Push to `main` or run the workflow manually from the **Actions** tab.

The `id-token: write` permission allows GitHub to create a temporary OIDC token for the Pages deployment. It is generated automatically and must not be committed or added as a secret.

## Custom domain

The site uses `www.freeimageconverterfree.xyz`. The domain is also stored in `public/CNAME`.

At the domain registrar, configure:

```text
Type:  CNAME
Name:  www
Value:  evan63w.github.io
```

Then set the same custom domain under **Repository Settings -> Pages** and enable HTTPS after DNS verification completes.

## Privacy

Image conversion happens in the browser using the Canvas API. The site does not upload or store selected images. Google Analytics may collect standard usage and interaction data when configured.
