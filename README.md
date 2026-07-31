# sihyeonkim-becca.github.io

Sihyeon Kim's doctoral-application research portfolio. Static site, no build step —
plain HTML/CSS/JS.

## Structure
```
index.html                 Home (hero → About/profile → Published → Project → Architecture → Fine Art → CV)
research/                  Research hub (Published list + Project cards) + 4 project pages
architecture/               Architecture hub + 6 project pages
fine-art/                  Fine art hub + 5 work pages
cv.html                    CV page (download button + link to assets/Sihyeon_Kim_CV.pdf)
css/style.css               Design system
js/main.js                 Nav toggle, scroll reveal, generative hero canvas
images/<slug>/full|thumb   Optimized project photos
images/profile/full|thumb  Profile portrait used on the homepage About section
assets/Sihyeon_Kim_CV.pdf  Downloadable CV
```

## Deploying to GitHub Pages — IMPORTANT
All paths in this site are **root-relative** (e.g. `/css/style.css`, `/images/...`).
That means the contents of this folder must sit at the **root of the repository**,
not inside a subfolder (e.g. not inside a `files/` or `site/` folder) — otherwise
image and stylesheet paths will 404.

1. Create/open the repo `sihyeonkim-becca.github.io`.
2. Copy everything **inside** this folder (index.html, research/, architecture/,
   fine-art/, css/, js/, images/, assets/, cv.html, README.md) directly into the
   repository root — so `index.html` sits at `sihyeonkim-becca.github.io/index.html`,
   not `sihyeonkim-becca.github.io/site/index.html`.
3. Commit and push to the `main` branch.

**If you're uploading through the GitHub website (Add file → Upload files):**
that UI caps each drag-and-drop at ~100 files per batch. This repo now has more
files than that, so upload it in two batches instead of one:
- Batch 1: drag in just the `images/` folder
- Batch 2: drag in everything else — `index.html`, `research/`, `architecture/`,
  `fine-art/`, `cv.html`, `css/`, `js/`, `assets/`, `README.md`

Each batch is its own commit, which is fine. (Using GitHub Desktop or `git push`
from the command line avoids this limit entirely, if you'd rather do it in one go.)

4. In GitHub → Settings → Pages, set Source to "Deploy from branch", branch `main`, folder `/ (root)`.
5. The site will be live at `https://sihyeonkim-becca.github.io/`.

## Editing content
Pages are generated from small Python scripts in the original build environment
(`build_home.py`, `build_research.py`, `build_architecture.py`, `build_fineart.py`,
`build_cv.py`) — but the HTML files here are already final/static, so you can also
just hand-edit the `.html` files directly; no build step is required to deploy.

## Research structure
The Research hub (`research/index.html`) and the homepage both split work into:
- **Published** — a compact citation list (title, authors, venue, role), linking
  out to the fullest relevant page (a project page, or `architecture/01.html` for
  the incinerator conference paper).
- **Project** — in-progress work shown as image cards, each tagged with its
  status ("1st Draft", etc.) in the hero of its own detail page.

`research/project-04.html` (UN-Habitat Smart Inclusive Transition) is displayed
site-wide as **"Project 03"** — its file name wasn't changed to avoid breaking
links, only the on-page label.

## Notes
- `architecture/01.html` (Healing Fragmentation) gallery uses 8 photos instead of the
  original 11 — three were dropped to keep the total file count manageable for upload.
- Project 01 (Cost-Effective Heat Mitigation) now shows 6 images (2 large + 4 gallery);
  Project 02 (Green-Roof Optimization) shows 1; the UN project shows 2.
