# ALPA CAFÉ - Landing Page

A modern, responsive landing page for **ALPA CAFÉ**, a specialty coffee shop in Córdoba, Argentina. Built with **Next.js 14**, **Tailwind CSS**, and shared UI components (CVA + `cn` utility).

## Features

- **Next.js 14** (App Router) with TypeScript
- **Tailwind CSS** – Dark theme with brand palette (white, grey, black)
- **Shared UI** – Button, Heading, Subtitle, ScrollSpy (CVA + `cn`)
- **Responsive** – Mobile-first, hamburger menu on small screens
- **Contact form** – Server action with Resend, Zod validation
- **SEO** – Metadata, sitemap, robots.txt, semantic HTML, skip link

## Initial setup

After cloning the repo:

```bash
npm install
cp .env.example .env
```

Then edit `.env` with your values (see `.env.example` for required variables). The `prepare` script runs on `npm install` and sets up Husky git hooks.

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Git hooks (Husky)

Pre-commit runs `npm run lint` so ESLint must pass before each commit. Hooks are installed automatically when you run `npm install` (via the `prepare` script).

## Build & deploy

```bash
npm run build
npm start
```

Deploy to **Vercel**, **Netlify**, or any Node host that supports Next.js.

**Before going live:**

1. Set **canonical URL** and **Open Graph** `url` in `app/layout.tsx` metadata (or via `NEXT_PUBLIC_BASE_URL`).
2. Add **og:image** in metadata for social previews.
3. Configure contact env vars (`RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`) and update contact links in `lib/constants.ts` and `components/features/Contact/` if needed.

## Structure

- `app/` – Layout, page, global styles
- `components/features/` – Hero, About, Menu, Products, Events, Contact (section components + data)
- `components/shared/` – layout (Header, Footer, Section, Container), ui (Button, Heading, Subtitle, ScrollSpy), icons
- `lib/` – `config.ts` (env), `constants.ts` (URLs, nav, section IDs), `utils.ts` (`cn`)
- `tailwind.config.ts` – Theme (CSS variables, font)

## Tech stack

- Next.js 14, React 18, TypeScript
- Tailwind CSS
- ESLint (next), Prettier
- Husky (pre-commit: lint)
- Resend (contact form), Zod (validation)
- class-variance-authority, clsx, tailwind-merge
