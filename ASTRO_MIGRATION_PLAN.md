# Astro Migration Plan for aws-restart-portfolio

This plan migrates the current GitHub Pages setup to Astro with minimal risk and no content loss.

## 1. Migration goals

- Keep existing markdown content in place (Labs, Projects, Certs-Badges)
- Preserve custom domain (`aws.njmtech.co.za`)
- Move deployment to GitHub Actions (Astro official action)
- Add local developer workflow (`npm run dev`, `npm run build`)
- Cut over only after parity checks pass

## 2. Proposed rollout strategy

### Phase A: Safe bootstrap (no cutover)

1. Create an Astro app in a feature branch.
2. Keep current site files untouched (`index.html`, `.github/assets/*`, `nav.json`).
3. Build Astro pages that read and render existing markdown content.
4. Deploy Astro site to a temporary branch/repo for preview.

### Phase B: Cutover

1. Add `.github/workflows/deploy.yml` for Astro Pages deploy.
2. Set Pages source to GitHub Actions.
3. Move CNAME handling to `public/CNAME` inside Astro project.
4. Merge and monitor first production deployment.

### Phase C: Cleanup

1. Remove old static viewer files once parity is confirmed.
2. Keep `update-nav.yml` if nav generation is still needed.
3. Archive migration notes and known deltas.

## 3. Astro configuration decisions

Because this repo uses a custom domain, configure Astro as:

- `site: 'https://aws.njmtech.co.za'`
- No `base` value

If custom domain is removed in future, set:

- `site: 'https://omoinjm.github.io'`
- `base: '/aws-restart-portfolio'`

## 4. Required files to add in Astro project

- `package.json`
- `astro.config.mjs`
- `src/pages/index.astro`
- `src/pages/[...slug].astro` (dynamic markdown routes)
- `src/layouts/BaseLayout.astro`
- `public/CNAME`
- `.github/workflows/deploy.yml`

## 5. Deployment workflow template

Use Astro official deployment workflow from docs:

- Checkout repo
- Build with `withastro/action@v5`
- Deploy with `actions/deploy-pages@v4`
- Permissions: `contents: read`, `pages: write`, `id-token: write`

## 6. Parity checklist before cutover

- Home page renders equivalent content
- Sidebar navigation includes all current sections
- Markdown links resolve correctly
- Images under `assets/` render correctly
- Instructions and architecture docs are reachable
- Mobile navigation behavior validated
- Custom domain resolves with HTTPS

## 7. Risks and mitigations

Risk: Relative markdown links may break in generated routes.
Mitigation: Normalize links during markdown render and test all section entry points.

Risk: Existing modal UX differs from Astro routing UX.
Mitigation: Implement modals as Astro components only after base parity.

Risk: Content growth introduces build-time path edge cases.
Mitigation: Add route-generation tests for missing README/Instructions files.

## 8. Recommended next command sequence

1. `git checkout -b feat/astro-migration`
2. `npm create astro@latest`
3. `npm install`
4. `npm run dev`
5. Add deployment workflow
6. Push and validate Actions deployment

## 9. Success criteria

- Deployments are automatic on push to main
- Site renders current portfolio content accurately
- No dependency on legacy root `index.html` runtime markdown fetching
- Domain `aws.njmtech.co.za` serves Astro build successfully
