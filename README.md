# sihyeonkim-becca.github.io

Sihyeon Kim's doctoral-application research portfolio. Static site, no build step —
plain HTML/CSS/JS.

## Structure
```
index.html                 Home
research/                  Research hub + 4 project pages
architecture/               Architecture hub + 6 project pages
fine-art/                  Fine art hub + 5 work pages
cv.html                    CV page (download button + link to assets/Sihyeon_Kim_CV.pdf)
css/style.css               Design system
js/main.js                 Nav toggle, scroll reveal, generative hero canvas
images/<slug>/full|thumb   Optimized project photos
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
that UI caps each drag-and-drop at ~100 files per batch. This repo has 114 files
total, so upload it in two batches instead of one:
- Batch 1: drag in just the `images/` folder (90 files)
- Batch 2: drag in everything else — `index.html`, `research/`, `architecture/`,
  `fine-art/`, `cv.html`, `css/`, `js/`, `assets/`, `README.md` (24 files)

Each batch is its own commit, which is fine. (Using GitHub Desktop or `git push`
from the command line avoids this limit entirely, if you'd rather do it in one go.)

4. In GitHub → Settings → Pages, set Source to "Deploy from branch", branch `main`, folder `/ (root)`.
5. The site will be live at `https://sihyeonkim-becca.github.io/`.

## Editing content
Pages are generated from small Python scripts in the original build environment
(`build_home.py`, `build_research.py`, `build_architecture.py`, `build_fineart.py`,
`build_cv.py`) — but the HTML files here are already final/static, so you can also
just hand-edit the `.html` files directly; no build step is required to deploy.

## Notes
- `architecture/01.html` (Healing Fragmentation) gallery now uses 8 photos instead of the
  original 11 — three were dropped to keep the total file count manageable for upload.
- `research/project-03.html` uses the AAAI AI4UP workshop presentation photo; `research/project-04.html`
  uses the SNUAC proposal cover. Swap either `<img>` for a different figure any time by editing
  `/images/research/full/project-03.jpg` or `project-04.jpg`.
