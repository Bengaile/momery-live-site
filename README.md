# MOmery.live

A living digital archive for Deer Camp — documentary, photos, music, stories,
and people. Built to be extended for decades, by whoever (or whatever) picks
this project up next.

## Stack

- **[Astro](https://astro.build)** — static site generator, zero JS by default,
  file-based routing, content collections for structured Markdown content.
- **Tailwind CSS** — utility-first styling, design tokens defined once in
  `tailwind.config.mjs`.
- **Cloudflare Pages** — hosting. Domain stays registered at Squarespace;
  DNS points to Cloudflare Pages.

No server, no database, no CMS lock-in. Content lives as Markdown files in
git. That's deliberate: in 20 years, Markdown and a static folder structure
will still open and still mean something, regardless of what frameworks come
and go.

## Deploying to Cloudflare Pages

1. Push this repo to GitHub (or GitLab).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Keep the domain registered at Squarespace. In Cloudflare Pages, add
   `momery.live` as a custom domain, then update the DNS records at
   Squarespace (or transfer DNS management to Cloudflare) to point at the
   Pages deployment as instructed in the Cloudflare dashboard.
5. Every push to `main` redeploys automatically. Pull requests get their own
   preview URL — useful for reviewing a year's worth of new photos before they
   go live.

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

## How the project is organized

```
src/
  components/   reusable UI pieces (Nav, Footer, PersonCard, SongTable, ...)
  content/      the archive itself — one Markdown file per "thing"
    people/
    stories/
    songs/
    gallery/
    timeline-events/   (Phase 2)
    vietnam-slides/    (Phase 2)
    family-archive/    (Phase 2)
  layouts/      BaseLayout.astro wraps every page (nav, footer, SEO, fonts)
  pages/        one file per route — Astro turns each into a real URL
    phase2/     stub "coming soon" pages for not-yet-built features
  styles/       global.css (Tailwind + fonts + small global rules)
public/         static files served as-is (images, robots.txt, _headers)
```

### The core idea: content collections, not hardcoded pages

Every part of the archive that will keep growing — people, stories, songs,
photos — is a **content collection**: a folder of Markdown files validated
against a schema in `src/content/config.ts`.

**To add a new story, person, song, or photo, you never touch a template.**
You add one new `.md` file to the matching folder. The page that lists them
(`/stories/`, `/people/`, etc.) picks it up automatically on the next build.

Example — adding a new story:

```markdown
---
title: "The Year the Lake Froze Over"
date: "January 2031"
people: ["dave", "thor"]
summary: "One sentence about what happened."
---

The full story, in Markdown, goes here.
```

Drop that file in `src/content/stories/`, and it appears on `/stories/` and
gets its own page at `/stories/the-year-the-lake-froze-over/` automatically,
via the dynamic route in `src/pages/stories/[slug].astro`.

The same pattern applies to `people/`, `songs/`, and `gallery/`.

### Adding a brand-new section (not just new content)

If a future addition doesn't fit an existing collection — say, "Drone
Footage" needs its own page beyond just being a gallery category — the
pattern is:

1. Add a new collection schema in `src/content/config.ts` (Phase 2 ones are
   already pre-declared there as a template to copy from).
2. Add a content folder under `src/content/your-new-thing/`.
3. Add a route under `src/pages/your-new-thing/` that calls `getCollection()`.
4. Add one line to `NAV_LINKS` in `src/components/Nav.astro` if it belongs in
   the main menu.

Nothing else needs to change. Layouts, the design system, and SEO handling
are shared automatically.

## Phase 1 (built)

Home, Documentary, Deer Camp, About, People, Stories, Photo Gallery,
Contact / Share a MOment. A bonus Songs & Soundtrack page also exists at
`/songs/`, pulling from the `songs` collection.

## Phase 2 (scaffolded, not built)

Stub pages already exist at `/phase2/search/`, `/phase2/timeline/`,
`/phase2/map/`, `/phase2/vietnam-slides/`, `/phase2/family-archive/`, and
`/phase2/login/`. Each is marked `noindex` so search engines skip it until
it's real. The matching content collections (`timeline-events`,
`vietnam-slides`, `family-archive`) are already declared in
`src/content/config.ts`, so populating them later is just adding Markdown
files — no schema migration required.

Notes for whoever builds Phase 2:

- **Search** — for a static site this size, a client-side index (e.g.
  Pagefind, which runs as a post-build step over the static `dist/` output)
  is a better fit than a server. No backend needed.
- **Interactive Map** — keep it a client-side island (a small script or a
  single interactive component) rather than converting the whole site to a
  JS framework. Astro supports islands from React/Vue/Svelte if needed later
  without a rewrite.
- **Private family content / login** — Cloudflare Pages supports Cloudflare
  Access for gating whole paths (like `/phase2/family-archive/`) behind
  authentication without writing any login code. That's the natural fit
  before reaching for a custom auth system.
- **Vietnam Slides** and **Family Archive** are content collections already
  schema'd — when slides are digitized, add them as Markdown + images and
  remove `noindex` from the page once it's ready to go public.

## Design system

Colors, fonts, and spacing are defined once in `tailwind.config.mjs`:

- **Colors:** forest green, cream, gold, charcoal, muted lake blue — a
  "digital campfire," not a corporate template.
- **Type:** Fraunces (serif, headings), Source Sans 3 (body), Caveat
  (handwritten accent for captions and quotes).
- **Signature element:** a winding dotted "road" divider between sections —
  a visual echo of the road into camp.

Change a color or font once here and it updates everywhere — no
search-and-replace across pages.

## SEO

Every page sets `title` and `description` via `src/components/SEO.astro`,
which generates canonical URLs, Open Graph tags, and Twitter card tags
consistently. `@astrojs/sitemap` generates `sitemap-index.xml` automatically
at build time. `robots.txt` excludes `/phase2/` until those sections are
ready for the public.

## Performance

Astro ships zero JavaScript by default — the embers animation and mobile nav
toggle are the only client-side scripts, and they're small and scoped to the
pages that need them. Images should be added through `public/images/` (or
Astro's built-in `<Image />` component later, if richer photo galleries need
automatic resizing/format conversion). `_headers` sets long-lived caching for
static assets.
