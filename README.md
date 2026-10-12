# Pangyo Global Campus

English-only website for Pangyo Global Campus (PGC), built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. The original premium business-hospitality design, page structure, imagery, and interactions are retained.

## Run locally

```powershell
npm ci
npm run dev -- --webpack
```

Open `http://localhost:3000`.

## Contact form delivery

The contact form uses Formspree because GitHub Pages does not provide server-side email delivery.

1. The project form endpoint is `https://formspree.io/f/xoejwjdk`.
2. Add and verify `rondakorea@rondakorea.com` under **Formspree Account → Linked Emails**.
3. Open the form's **Workflow → Email → Settings** and select the verified business email as **Send to**.
4. For local testing, copy `.env.example` to `.env.local` and restart the development server.
5. Submit a test inquiry and confirm receipt in the verified inbox.

The endpoint identifier is public by design for static browser forms and is not a credential. The website validates required fields and email format, requires privacy consent, and includes Formspree's `_gotcha` honeypot field. Review Formspree's processing and retention terms for your privacy policy before production use.

## Deploy to GitHub Pages

The `Deploy GitHub Pages` workflow builds the static export at `/rk_pgc/` and publishes it when commits are pushed to `main`.

1. In repository **Settings → Pages**, set the build and deployment source to **GitHub Actions**.
2. Verify the Formspree recipient and select it in the form's Email workflow.
3. Push or merge changes to `main`; check **Actions → Deploy GitHub Pages** for build and deployment status.

The public project URL is `https://jihyun37.github.io/rk_pgc/`. The standard site pages are statically exported; Formspree handles submissions independently of the Pages host.

## Project structure

| Path | Purpose |
|---|---|
| `src/app/` | Home, about, rooms, guide, location, contact, and privacy routes |
| `src/components/` | Header, footer, room galleries, forms, and shared UI |
| `src/content/` | English site, room, visitor-guide, contact, and home-slider content |
| `public/images/` | Original PGC image assets; see the Korean inventory for page usage |
| `.github/workflows/pages.yml` | Lint, static build, and GitHub Pages deployment |
| `docs/` | Korean operator guide, image inventory, source comparison, and implementation notes |

For instructions on editing content and images, previewing changes in VS Code, building for FTP/SFTP hosting, and the CMS options, read [the Korean operator guide](docs/OPERATOR-GUIDE-KO.md) and [the image inventory](docs/IMAGE-INVENTORY-KO.md).

## Validate (PowerShell)

```powershell
npm run lint
npx tsc --noEmit
$env:GITHUB_PAGES = "1"
$env:PAGES_BASE_PATH = "/rk_pgc"
$env:NEXT_PUBLIC_FORMSPREE_ENDPOINT = "https://formspree.io/f/xoejwjdk"
npm run build -- --webpack
```
