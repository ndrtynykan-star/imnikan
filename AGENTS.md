# Dubai Elite Homes — working notes

Static marketing + property-browsing site. React 18 + TypeScript + Vite + Tailwind,
no backend and no external credentials. Property/location/service/testimonial data
is local (`src/data/`), photography is hot-linked from Unsplash.

## Run

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

- Single service `web` (node:22) binds `./` to `/app`, keeps `node_modules` in a
  named volume, runs `npm ci` then `npm run dev` (Vite dev server on 0.0.0.0:3000).
- Editing any file under `src/` hot-reloads; a change to `package.json` needs
  `docker compose -f docker-compose.base44.yml up -d --force-recreate web`.

## Verify

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/    # expect 200
docker compose -f docker-compose.base44.yml ps
```

`package-lock.json` is committed and must stay in sync with `package.json`
(the container runs `npm ci`, which fails on drift). Regenerate with:

```bash
docker run --rm -v "$PWD":/app -w /app node:22 npm install --package-lock-only --no-audit --no-fund
```

## Quirks

- Vite `allowedHosts: true` and `watch.usePolling` are required: the preview is
  proxied on an environment-specific host over a bind mount.
- Remote images require network access from the *browser*, not the container.
