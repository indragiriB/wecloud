# Dot portfolio

A single-page React portfolio in frosted glass with a Nothing OS palette
(off-white, black, one red). A fixed backdrop of a red disc, a dotted ring and
three black pills moves as you scroll; the translucent, blurred panes slide over
it. Dot-matrix type for headings, light and dark modes.

Sections: **Home** (hero) → **Work** (projects with images) → **About** → **Contact**.

Frosted glass needs `backdrop-filter`, supported in all current browsers; older ones get
near-opaque panes instead.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in /dist
npm run preview   # serve the build locally
```

Needs Node 20.19 or newer.

## Make it yours

Everything lives in **`src/data.js`**: your name, intro, projects, skills,
timeline, email and social links. Nothing else needs touching to get started.

- **Name in the hero** – each word goes on its own line, drawn in dots. Letters,
  digits and basic punctuation are supported (see `src/lib/dotFont.js`).
- **Project images** – the dotted placeholder shows while `image` is `null`.
  Drop a file into `public/projects/` and set `image: '/projects/shop.jpg'`
  (the leading slash is fine, it is resolved against the site's base path).
  16:10 works best (about 1600 × 1000).
- **Portrait** – same idea with `about.photo` (4:5, about 1200 × 1500).
- **Clock timezone** – set `timezone` to an IANA name such as `America/New_York`.
- **Colours and glass** – the palette and glass strength are CSS variables at the top of
  `src/styles.css` (`--red`, `--ink`, `--glass`, `--blur`, …), with a separate block for dark mode.
- **Backdrop** – where the red disc sits for each section is the `STOPS` list in
  `src/components/Backdrop.jsx` (x and y are viewport percentages, s is scale).

## Fonts

The page loads **Geist** and **Geist Mono** from Google Fonts (see `index.html`) and
falls back to the system sans-serif if they can't load. To self-host:

```bash
npm install @fontsource-variable/geist @fontsource/geist-mono
```

then add `import '@fontsource-variable/geist'`, `import '@fontsource/geist-mono/400.css'`
to `src/main.jsx` and delete the three Google Fonts `<link>` tags. The dot-matrix lettering is drawn with SVG, so
it needs no font file.

## Structure

```
src/
  data.js            ← your content
  styles.css         ← tokens, layout, dark mode
  App.jsx
  sections/          Hero, Work, About, Contact
  components/        Backdrop, DotText, DotClock, Header, ProjectImage, CopyButton, SectionHead
  hooks/             useTheme, useActiveSection, useClock, useBackdrop
  lib/dotFont.js     5×7 dot-matrix glyphs and layout
  lib/asset.js       resolves /public paths for sub-path hosting
.github/workflows/   deploy.yml (GitHub Pages), ci.yml (build check)
```

## Deploy to GitHub Pages (automatic)

The repo ships with two GitHub Actions workflows in `.github/workflows/`:

- `deploy.yml` builds the site and publishes it to GitHub Pages on every push to `main`.
- `ci.yml` runs the build on pull requests and other branches, so a broken change is caught before it is merged.

Setup, once:

1. Create a GitHub repository and push this project to the `main` branch.
2. In the repository go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. Push (or run **Actions → Deploy to GitHub Pages → Run workflow**). The address appears in the
   workflow run and under Settings → Pages, usually `https://<username>.github.io/<repo>/`.

Tips:

- Run `npm install` once locally and commit the generated `package-lock.json`. The workflows then use `npm ci`
  (faster, reproducible), and you can add `cache: npm` to the setup-node step.
- If your default branch is `master`, change `branches: [main]` in `deploy.yml`.
- For a custom domain, add a `public/CNAME` file containing the domain and set it under Settings → Pages.
- The build uses relative paths (`base: './'`), so it works both at a domain root and under `/<repo>/`.

## Other hosts

`npm run build` creates a static `dist/` folder, so it can also go to Netlify, Vercel,
Cloudflare Pages or any static host.
