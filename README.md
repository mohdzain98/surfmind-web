# SurfMind — Web

Marketing and support site for the [SurfMind Chrome extension](https://surfmind.docschat.in/) — built with React, TypeScript, Tailwind CSS v4, and deployed on Vercel.

## Pages

| Route      | Description                                                               |
| ---------- | ------------------------------------------------------------------------- |
| `/`        | Landing page — hero, screenshots, demo video, features, how it works, CTA |
| `/privacy` | Privacy Policy                                                            |
| `/terms`   | Terms of Service                                                          |
| `/contact` | Contact form (Formspree)                                                  |
| `/admin`   | Protected operations dashboard for SurfMind administrators                |

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **React Router v7** (BrowserRouter)
- **Lucide React** — icons
- **Formspree** — contact form backend

## Getting Started

Use Node.js 20.19+ or 22.12+ and npm.

```bash
# Install dependencies
npm install

# Copy env file and fill in your Formspree form ID
cp .env.example .env

# Start dev server
npm run dev
```

## Environment Variables

| Variable                  | Description                                        |
| ------------------------- | -------------------------------------------------- |
| `VITE_FORMSPREE_ENDPOINT` | Your Formspree form endpoint URL                   |
| `VITE_ADMIN_API_BASE_URL` | Admin API base URL, including the `/v1/admin` path |

Copy `.env.example` to `.env`, replace `FORM_ID` with your actual Formspree form ID from [formspree.io](https://formspree.io), and point `VITE_ADMIN_API_BASE_URL` at the SurfMind backend admin API.

The admin console stores its JWT only in `sessionStorage`, automatically signs out at the backend-provided expiry time, and redirects to `/admin/login` whenever a protected request returns `401`.

## Scripts

| Command                | Description                             |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Start local dev server                  |
| `npm run build`        | Type-check and build for production     |
| `npm run preview`      | Preview the production build locally    |
| `npm run lint`         | Run ESLint                              |
| `npm run format`       | Format supported files with Prettier    |
| `npm run format:check` | Check formatting without changing files |
| `npm run sitemap`      | Regenerate `public/sitemap.xml`         |

Husky runs lint-staged formatting and ESLint before each commit.

## Project Structure

```
src/
  components/
    Navbar.tsx
    Footer.tsx
    home/
      Hero.tsx
      ImageCarousel.tsx
      DemoVideo.tsx
      Features.tsx
      HowItWorks.tsx
      CtaBanner.tsx
  admin/
    AdminApp.tsx
    AdminLayout.tsx
    AdminLogin.tsx
    api.ts
    pages/
      AdminDashboard.tsx
      AdminLogs.tsx
      AdminLlmUsage.tsx
      AdminSearchMetrics.tsx
      AdminAccountsList.tsx
      AdminAccounts.tsx
  pages/
    Home.tsx
    Privacy.tsx
    Terms.tsx
    Contact.tsx
  assets/
    1.png – 5.png   # Extension screenshots
    webstore.png    # Chrome Web Store icon
scripts/
  generate-sitemap.js
public/
  android-chrome-256x256.png
  favicon.svg
```

## Deployment

Deployed on Vercel. Push to `main` triggers an automatic deployment.
