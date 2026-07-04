# Korea Tax Guide for Foreigners

Static Astro MVP for an English-language Korea tax guide site for foreigners, freelancers, employees, students, and expats in Korea.

## Tech stack

- Astro
- TypeScript
- Astro Content Collections
- Plain CSS
- Static pages only, no database, no login, no external API

## Main structure

- `/` home with search, category cards, and situation cards
- `/guides/` guide listing with keyword and category filters
- `/guides/[slug]/` individual tax guides
- `/procedures/` Hometax and tax procedure listing
- `/procedures/[slug]/` step-by-step procedure pages
- `/tools/do-i-need-to-file-tax/` general filing checklist
- `/glossary/` simple English Korean tax glossary
- `/about/`, `/privacy/`, `/contact/`
- `/rss.xml`, `/robots.txt`, `/sitemap-index.xml`

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production output is generated in `dist`.

## Preview

```bash
npm run preview
```

## Cloudflare Pages deployment

Use these settings in Cloudflare Pages:

```txt
Framework preset: Astro
Build command: npm run build
Output directory: dist
Production branch: main
```

The production domain in `astro.config.mjs` is set to:

```txt
https://taxguidekorea.com
```

## GitHub push

```bash
git add .
git commit -m "Initial Korea tax guide site"
git branch -M main
git remote add origin [your GitHub repository URL]
git push -u origin main
```

After pushing to GitHub, connect the repository in Cloudflare Pages and use the settings above.

## Adding content

Add guide posts in:

```txt
src/content/guides/
```

Add procedure posts in:

```txt
src/content/procedures/
```

Each content file uses frontmatter for SEO title, meta description, category, tags, quick answer, FAQ, related guides, and updated date. Keep internal links pointed to existing pages unless the target is intentionally marked as coming soon.

## SEO and GEO structure

The MVP includes:

- Canonical URLs
- Meta descriptions
- Open Graph tags
- RSS feed
- Robots file
- Sitemap integration
- Article JSON-LD for guide pages
- FAQPage JSON-LD for guide FAQs
- HowTo JSON-LD for procedure pages
- Breadcrumb JSON-LD for guide pages
- Quick Answer sections for AI-search-friendly summaries
- Consistent headings, tables, checklists, FAQs, and related internal links

## Tax content disclaimer

This website is for general information only and does not replace professional tax advice. Korean tax rules may change, and a user's situation may depend on visa status, income type, tax residency, and applicable tax treaties. Users should always check official sources or consult a qualified tax professional.
