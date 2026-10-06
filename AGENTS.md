# Dubai House — working notes

Luxury Dubai real estate marketing + property-browsing site. React 18 + TypeScript +
Vite + Tailwind. No backend and no external credentials: properties, blog posts,
locations, testimonials and investment figures are local static data (`src/data/`),
and photography is hot-linked from Unsplash.

## Run

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

- Single service `web` (node:22) binds `./` to `/app`, keeps `node_modules` in a
  named volume, runs `npm ci` then `npm run dev` (Vite dev server on 0.0.0.0:3000).
- Editing any file under `src/` hot-reloads. A change to `package.json` needs
  `docker compose -f docker-compose.base44.yml up -d --force-recreate web`.

## Verify

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/    # expect 200
docker compose -f docker-compose.base44.yml exec -T web npx tsc --noEmit
docker compose -f docker-compose.base44.yml ps
```

`package-lock.json` is committed and must stay in sync with `package.json`
(the container runs `npm ci`, which fails on drift). Regenerate with:

```bash
docker run --rm -v "$PWD":/app -w /app node:22 npm install --package-lock-only --no-audit --no-fund
```

## Routes

`/` · `/properties` · `/properties/:slug` · `/favorites` · `/invest` · `/about` ·
`/blog` · `/blog/:slug` · `/contact` · `*` (404).

## Design system

Tokens live in `tailwind.config.js`; component classes (`.shell`, `.eyebrow`,
`.display-xl|lg|md`, `.link-underline`, `.reveal`) live in `src/index.css`.

- Palette: `navy` (#071726), `navy-dark` (#0B1D2C), `ivory` (#F5F0E7),
  `warm` (#FAF8F2), `beige` (#E8E0D2), `gold` (#C6A56A), `ink` (#17212B),
  `muted` (#69727A). Sections alternate ivory ↔ navy; gold is accent-only.
- Type: Playfair Display (headings), Inter (UI/body), Great Vibes (script accents,
  via the `.font-script` utility).
- Every route opens on a dark hero, so `Navbar` may start transparent and resolve
  into navy on scroll (`solid = scrolled || pathname !== '/'`).

## Quirks

- Vite `allowedHosts: true` and `watch.usePolling` are required: the preview is
  proxied on an environment-specific host over a bind mount.
- Remote images require network access from the *browser*, not the container.
- Tailwind config changes are NOT hot-reloaded by the running dev server — the
  PostCSS cache goes stale and every `@apply` of a new class errors. Restart the
  service after editing `tailwind.config.js`.
- Filters round-trip through the URL (`src/lib/filters.ts`); the hero search,
  footer links and the Properties page all read the same query params.
