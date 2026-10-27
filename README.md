# We Cloud

Website jasa pembuatan website dan aplikasi (Solo). Single-page React in frosted glass with a Nothing OS palette
(off-white, black, one red). A fixed backdrop of a red disc, a dotted ring and
three black pills moves as you scroll; the translucent, blurred panes slide over
it. Dot-matrix type for headings, light and dark modes.

Sections: **Beranda** (hero) → **Proyek** (top projects with screenshots) → **Layanan** (services and process) → **Tentang** → **Kontak**.
The copy is in Bahasa Indonesia; every string, including button labels, lives in `src/data.js`.

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

Everything lives in **`src/data.js`**: name, intro, projects, services, process, about, email, WhatsApp and links.
Nothing else needs touching to get started.

- **Name in the hero** – each word goes on its own line, drawn in dots. Letters,
  digits and basic punctuation are supported (see `src/lib/dotFont.js`).
- **Project images** – the dotted placeholder shows while `image` is `null`.
  Drop a file into `public/projects/` and set `image: '/projects/shop.jpg'`
  (the leading slash is fine, it is resolved against the site's base path).
  The project panels are 32:15, so wide screenshots of about 1600 × 750 fit without cropping.
- **Team photo** – same idea with `about.photo` (square, about 1200 × 1200, shown in a circle).
- **WhatsApp button** – set `contact.whatsapp` to a number in international format without `+` (for example `6281234567890`). It stays hidden while empty.
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
  sections/          Hero, Work, Services, About, Contact
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
- For a custom domain see the next section. (No `CNAME` file is needed: with the Actions source GitHub ignores it.)
- The build uses relative paths (`base: './'`), so it works both at a domain root and under `/<repo>/`.

## Custom subdomain (e.g. porto.example.com)

1. In your DNS provider (for Hostinger: hPanel → Domains → your domain → DNS / Nameservers → DNS Zone Editor)
   add a record: **Type** `CNAME`, **Name** `porto`, **Target** `<your-github-username>.github.io`
   (just the host: no `https://`, no repo name). Remove any existing A, AAAA or CNAME record named `porto`.
2. In the repository open **Settings → Pages → Custom domain**, enter `porto.example.com` and **Save**.
   GitHub checks the DNS record; this can take a few minutes up to a few hours.
3. When the check passes, tick **Enforce HTTPS** (the certificate is issued automatically, it may take a while to appear).
4. Optional but recommended: verify the domain under your GitHub account (Settings → Pages → Add a domain) so nobody else can claim it.

Check the record with `dig porto.example.com CNAME +short`, it should print `<username>.github.io.`
The site is then served from the root of the subdomain, so no code changes are needed.

## Other hosts

`npm run build` creates a static `dist/` folder, so it can also go to Netlify, Vercel,
Cloudflare Pages or any static host.
