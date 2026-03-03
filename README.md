# ALPA CAFÉ - Landing Page

A modern, responsive landing page for **ALPA CAFÉ**, a specialty coffee shop in Córdoba, Argentina. Built with **Next.js 14**, **Tailwind CSS**, **Framer Motion**, and a robust component architecture.

## Features

- **Next.js 14** (App Router) with TypeScript
- **Tailwind CSS** – Dark theme with brand palette (white, grey, black)
- **Framer Motion** – Scroll-triggered animations, MotionDiv for section transitions
- **Form Management** – React Hook Form with Zod validation, real-time error handling
- **Contact Form** – Server action with Resend, Cloudflare Turnstile (CAPTCHA), rate limiting, XSS protection
- **Shared UI Components** – Button, FormInput, FormTextArea, Heading, Subtitle, ScrollSpy (CVA + `cn`)
- **Responsive Design** – Mobile-first, hamburger menu on small screens
- **SEO Optimized** – Metadata, sitemap, robots.txt, semantic HTML, skip link
- **Code Quality** – ESLint, Prettier, Husky pre-commit hooks

## Tech Stack

- **Framework**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with CSS variables
- **Animation**: Framer Motion
- **Forms**: React Hook Form, Zod, @hookform/resolvers
- **Email**: Resend API
- **CAPTCHA**: Cloudflare Turnstile
- **Utilities**: class-variance-authority, clsx, tailwind-merge
- **Code Quality**: ESLint (Next.js config), Prettier, Husky

## Project Structure

```
app/
  layout.tsx          # Root layout, metadata
  page.tsx            # Home page (sections in order)
  sitemap.ts          # Dynamic sitemap
  robots.ts           # Robots.txt
components/
  features/           # Section components (Hero, About, Menu, Products, Events, Contact)
    */feature.data.ts # Content per section (hero.data.ts, menu.data.ts, etc.)
    */feature.types.ts
  shared/             # UI components, layout (Header, Footer), icons
lib/
  site.config.ts      # siteConfig, siteImages
  constants.ts        # siteSections, siteNav, siteImages (re-export)
  rate-limit.ts       # Contact form rate limiting
public/images/
  logo/               # Brand assets
  hero/               # Hero section images
  events/             # Event images
  products/           # Product images
  menu/               # Menu gallery images
```

**Sections** (in order): Hero → About → Menu → Products → Events → Contact. Content is data-driven via `feature.data.ts` files in each feature folder.

## Initial Setup

After cloning the repository:

```bash
npm install
cp .env.example .env
```

Then edit `.env` with your values. See [Environment Variables](#environment-variables) below for required variables.

The `prepare` script runs automatically on `npm install` and sets up Husky git hooks.

## Environment Variables

Create a `.env` file based on `.env.example` and fill in the required values:

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend API key for contact form |
| `RESEND_FROM_EMAIL` | Sender address. **Production**: use a verified domain (e.g. `onboarding@yourdomain.com`). Verify at [resend.com/domains](https://resend.com/domains). |
| `RESEND_TO_EMAIL` | Recipient for contact form submissions |
| `NEXT_PUBLIC_BASE_URL` | Canonical URL for sitemap, robots, Open Graph |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile CAPTCHA for contact form |

**Resend**: On the free tier, you can only send to your Resend account email until you verify a domain. Add your domain in Resend, add the DNS records to your provider, then use a `@yourdomain.com` address for `RESEND_FROM_EMAIL`.

**Turnstile**: For local development, use the test keys in `.env.example` (always passes verification).

## Site Configuration

All brand and content config lives in `lib/site.config.ts`:

### siteConfig

| Key | Description |
|-----|-------------|
| `name` | Brand name (e.g. "ALPA CAFÉ") |
| `nameRegistered` | Brand name with ® (e.g. "ALPA CAFÉ®") |
| `year` | Current year (for footer) |
| `social` | `instagram`, `facebook`, `tiktok`, `instagramAlpacaos` |
| `address` | Physical address (Contact section, Footer) |
| `hours` | Opening hours (Contact section, Footer) |
| `menu` | Link to menu (Google Drive, etc.) |
| `maps` | Google Maps link |
| `whatsapp` | WhatsApp group/channel link |

### siteImages

| Section | Keys |
|---------|------|
| `logo` | `circle`, `wordmark` |
| `hero` | `background` |
| `events` | `homeCoffeeWorkshop`, `tasting`, `coffeeBreak` |
| `products` | `alpacaos`, `alpaBeans`, `alpaCups`, `alpaSpoons` |
| `menu` | `hotCoffee`, `icedCoffee`, `scondwitch`, `brewing`, `food`, `cookies` |

Update this file to change site-wide content.

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

1. Set **canonical URL** and **Open Graph** `url` (or via `NEXT_PUBLIC_BASE_URL`)
2. Add **og:image** in metadata for social previews
3. **Resend**: Verify your domain at [resend.com/domains](https://resend.com/domains), add DNS records, and set `RESEND_FROM_EMAIL` to an address on that domain (e.g. `onboarding@yourdomain.com`)
4. Configure **Turnstile** keys for production (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`)
5. Update `lib/site.config.ts` with your brand info, social links, and address
6. Verify rate limiting settings in `lib/rate-limit.ts`

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
- **Cloudflare Turnstile**: CAPTCHA to prevent bots
- **Rate Limiting**: Prevents spam (3 requests per minute)
- **XSS Protection**: HTML escaping for user input
- **Email Template**: Clean HTML email template with escaped content
- **Recipient**: Set via `RESEND_TO_EMAIL` in `.env`
- **Accessibility**: ARIA labels, error announcements, keyboard navigation

## License

Private project - All rights reserved.
