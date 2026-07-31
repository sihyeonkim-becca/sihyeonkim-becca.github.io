# sihyeonkim-becca.github.io

Sihyeon Kim's doctoral-application research portfolio. Static site, no build step —
plain HTML/CSS/JS.

## Structure
```
index.html                 Home (hero → About/profile → Published → Project → Architecture → Fine Art → CV)
research/                  Research hub (Published list + Project cards) + 4 project pages
architecture/               Architecture hub + 6 project pages
fine-art/                  Fine art hub + 6 work pages
cv.html                    CV page (download button + link to assets/Sihyeon_Kim_CV.pdf)
css/style.css               Design system
js/main.js                 Nav toggle, scroll reveal, generative hero canvas
images/<slug>/full         Optimized project photos — every image, big or in a gallery grid, is wrapped
                            in a link to its own full-resolution file, so clicking any photo opens it
                            at full size in a new tab
images/profile/full        Profile portrait used on the homepage About section
assets/Sihyeon_Kim_CV.pdf  Downloadable CV
```

There is no `thumb/` folder anymore — every image now lives only under `full/`,
and grid/card views just size the same file down with CSS. This roughly halved
the image file count (previously the site kept two copies of every photo).

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
that UI caps each drag-and-drop at ~100 files per batch. The site is now about
80 files total, so a single drag-and-drop of the whole folder should work in one
go. If you keep adding photos and cross 100 again, split into two batches (e.g.
`images/` first, everything else second) — each batch is its own commit, which
is fine. (Using GitHub Desktop or `git push` from the command line avoids this
limit entirely.)

4. In GitHub → Settings → Pages, set Source to "Deploy from branch", branch `main`, folder `/ (root)`.
5. The site will be live at `https://sihyeonkim-becca.github.io/`.

## Editing content
Pages are generated from small Python scripts in the original build environment
(`build_home.py`, `build_research.py`, `build_architecture.py`, `build_fineart.py`,
`build_cv.py`) — but the HTML files here are already final/static, so you can also
just hand-edit the `.html` files directly; no build step is required to deploy.

## Research structure
The Research hub (`research/index.html`) and the homepage both split work into:
- **Publication** — Project 01, 02, and 03 (Cost-Effective Heat Mitigation, Green-Roof
  Optimization, Mixture of Urban Form Archetypes), each shown with a status pill
  ("1st Draft" or "Accepted — Urban Design International").
- **Project** — the UN-Habitat Smart Inclusive Transition collaboration, kept separate
  from the numbered publication series since it isn't (yet) a first/second-author
  manuscript of her own.

`research/project-03.html` is the Mixture of Urban Form Archetypes paper (accepted,
Urban Design International — Second Author). `research/project-04.html` is the UN
project. File names weren't changed to avoid breaking links; only labels were fixed.

## Notes
- `architecture/01.html` (Healing Fragmentation) gallery uses 8 photos instead of the
  original 11 — three were dropped to keep the total file count manageable for upload.
- Project 01 (Cost-Effective Heat Mitigation) now shows 6 images (2 large + 4 gallery);
  Project 02 (Green-Roof Optimization) shows 1; the UN project shows 2.
- `fine-art/06.html` ("Confront") only has a title and exhibition credit so far — its
  Concept / Statement / Keywords sections are simply omitted rather than left blank.
  Once there's a concept, artist statement, and keywords, add them to the `art-06` entry
  in `build_fineart.py` (or just hand-edit `fine-art/06.html` directly).
