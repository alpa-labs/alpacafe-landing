# ALPA CAFÉ - Landing Page

A modern, responsive landing page for **ALPA CAFÉ**, a specialty coffee shop in Córdoba, Argentina. Built with **Next.js 14**, **Tailwind CSS**, and a robust component architecture.

## Features

- **Next.js 14** (App Router) with TypeScript
- **Tailwind CSS** – Dark theme with brand palette (white, grey, black)
- **Form Management** – React Hook Form with Zod validation, real-time error handling
- **Contact Form** – Server action with Resend, rate limiting, XSS protection
- **Shared UI Components** – Button, FormInput, FormTextArea, Heading, Subtitle, ScrollSpy (CVA + `cn`)
- **Responsive Design** – Mobile-first, hamburger menu on small screens
- **SEO Optimized** – Metadata, sitemap, robots.txt, semantic HTML, skip link
- **Code Quality** – ESLint, Prettier, Husky pre-commit hooks

## Tech Stack

- **Framework**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with CSS variables
- **Forms**: React Hook Form, Zod, @hookform/resolvers
- **Email**: Resend API
- **Utilities**: class-variance-authority, clsx, tailwind-merge
- **Code Quality**: ESLint (Next.js config), Prettier, Husky

## Initial Setup

After cloning the repository:

```bash
npm install
cp .env.example .env
```

Then edit `.env` with your values. See [Environment Variables](#environment-variables) below for required variables.

The `prepare` script runs automatically on `npm install` and sets up Husky git hooks.

## Environment Variables

Create a `.env` file based on `.env.example` and fill in the required values. See `.env.example` for all available environment variables.

## Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint
- `npm run format` – Format code with Prettier

## Git Hooks (Husky)

Pre-commit hooks run `npm run lint` automatically, so ESLint must pass before each commit. Hooks are installed automatically when you run `npm install` (via the `prepare` script).

## Build & Deploy

```bash
npm run build
npm start
```

Deploy to **Vercel**, **Netlify**, or any Node host that supports Next.js.

### Pre-Deployment Checklist

1. Set **canonical URL** and **Open Graph** `url` in `app/layout.tsx` metadata (or via `NEXT_PUBLIC_BASE_URL`)
2. Add **og:image** in metadata for social previews
3. Configure contact environment variables (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`)
4. Update contact links in `lib/constants.ts` if needed
5. Verify rate limiting settings in `lib/rate-limit.ts`

## Form Architecture

The contact form uses a modern, type-safe architecture:

- **Client-side**: React Hook Form with Zod schema validation
- **Server-side**: Server action receives validated `ContactSchema` type
- **Validation**: Real-time validation with error messages per field
- **Security**: XSS protection, rate limiting, server-side validation (defense in depth)
- **UX**: Error states, loading states, success feedback

### Form Components

- `FormInput` – Text input with label, helper text, error states
- `FormTextArea` – Textarea with label, helper text, error states
- `FormStatusMessage` – Success/error messages

Styles are centralized in `app/globals.css` using Tailwind's `@layer components` for consistency.

## Styling Approach

The project uses a consistent styling approach:

- **CSS Variables**: Defined in `globals.css` for colors, spacing, shadows
- **Component Styles**: Complex styles (variants, states) in `@layer components` in `globals.css`
- **Utility Classes**: Tailwind utilities for layout and spacing
- **Type Safety**: Style constants exported from TypeScript files for autocompletion

This approach provides:
- Consistency across components
- Easy theme customization
- Better performance (CSS compiled once)
- Type-safe style references

## Contact Form Features

- **Real-time Validation**: Validates on change after field is touched
- **Field-level Errors**: Shows errors below each field
- **Rate Limiting**: Prevents spam (3 requests per minute)
- **XSS Protection**: HTML escaping for user input
- **Email Template**: Clean HTML email template with escaped content
- **Accessibility**: ARIA labels, error announcements, keyboard navigation

## License

Private project - All rights reserved.
