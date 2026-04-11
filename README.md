# SurfMind — Web

Marketing and landing site for the [SurfMind Chrome extension](https://github.com/mohdzain98/surfmind) — built with React, TypeScript, Tailwind CSS v4, and deployed on Vercel.

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — hero, screenshot carousel, features, how it works, CTA |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/contact` | Contact form (Formspree) |

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **React Router v7** (HashRouter)
- **Lucide React** — icons
- **Formspree** — contact form backend

## Getting Started

```bash
# Install dependencies
npm install

# Copy env file and fill in your Formspree form ID
cp .env.example .env

# Start dev server
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_FORMSPREE_ENDPOINT` | Your Formspree form endpoint URL |

Copy `.env.example` to `.env` and replace `FORM_ID` with your actual Formspree form ID from [formspree.io](https://formspree.io).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
  components/
    Navbar.tsx
    Footer.tsx
    home/
      Hero.tsx
      ImageCarousel.tsx
      Features.tsx
      HowItWorks.tsx
      CtaBanner.tsx
  pages/
    Home.tsx
    Privacy.tsx
    Terms.tsx
    Contact.tsx
  assets/
    1.png – 4.png   # Extension screenshots
public/
  android-chrome-256x256.png
  favicon.svg
```

## Deployment

Deployed on Vercel. Push to `main` triggers an automatic deployment.
