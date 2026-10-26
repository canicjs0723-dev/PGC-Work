# Pangyo Global Campus

English-only website for Pangyo Global Campus (PGC), built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. The original premium business-hospitality design, page structure, imagery, and interactions are retained.

## Run locally

```powershell
npm ci
npm run dev -- --webpack
```

Open `http://localhost:3000`.

## Contact form delivery

GitHub Pages cannot send email, so the contact form posts to [FormSubmit](https://formsubmit.co), which emails each inquiry to `inquiryEmail` in `src/content/site.ts` (`evan.kim@rondakorea.com`). No account, key or repository variable is needed.

1. After deploying, submit one test inquiry on the live site.
2. FormSubmit sends a one-time **Activate Form** email to `evan.kim@rondakorea.com` (check spam too). Click the button in it.
3. From then on every inquiry arrives in that inbox as a table, with the visitor's email as Reply-To. Submit a second test to confirm.

To change the recipient, edit `inquiryEmail` in `src/content/site.ts`; the new address needs the same one-time activation. The form validates required fields and email format, requires privacy consent, and includes FormSubmit's `_honey` spam trap.

## Deploy to GitHub Pages

The `Deploy GitHub Pages` workflow builds the static export at `/rk_pgc/` and publishes it when commits are pushed to `main`.

1. In repository **Settings → Pages**, set the build and deployment source to **GitHub Actions**.
2. Push or merge changes to `main`; check **Actions → Deploy GitHub Pages** for build and deployment status.

The public project URL is `https://jihyun37.github.io/rk_pgc/`. The standard site pages are statically exported; FormSubmit handles inquiry emails independently of the Pages host.

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
npm run build -- --webpack
```
