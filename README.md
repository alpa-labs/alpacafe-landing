# ALPA CAFÉ - Landing Page

A modern, responsive landing page for **ALPA CAFÉ**, a specialty coffee shop in Córdoba, Argentina. Built with **Next.js 14**, **Tailwind CSS**, and **shadcn/ui**-style components.

## Features

- **Next.js 14** (App Router) with TypeScript
- **Tailwind CSS** - Linktree-inspired light/dark theme
- **shadcn/ui** - Button and Card components (CVA + `cn` utility)
- **Dark / light mode** - `next-themes` with system preference and persistence
- **English & Spanish** - Client-side language switch (default: Spanish), persisted in `localStorage`
- **Responsive** - Mobile-first, hamburger menu on small screens
- **SEO** - Metadata, Open Graph, semantic HTML, skip link

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

1. Set **canonical URL** and **Open Graph** `url` in `app/layout.tsx` metadata (or via env).
2. Add **og:image** in metadata for social previews.
3. Replace the location map placeholder with an embedded map or keep the “Open in maps” link.
4. Update contact links if needed in the Linktree and in `components/contact-section.tsx`.

## Structure

- `app/` - Layout, page, global styles
- `components/` - Header, Hero, About, Menu, Links, Location, Contact, Footer; `ui/` for Button, Card
- `context/` - LanguageProvider (i18n state + `localStorage`)
- `lib/` - `translations.ts`, `utils.ts` (cn)
- `tailwind.config.ts` - Theme (CSS variables for shadcn-style tokens)

## Tech stack

- Next.js 14, React 18, TypeScript
- Tailwind CSS
- ESLint (next), Prettier
- Husky (pre-commit: lint)
- class-variance-authority, clsx, tailwind-merge (shadcn-style)
