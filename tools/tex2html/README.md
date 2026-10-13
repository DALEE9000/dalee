# tex2html: LaTeX solutions manuals as web pages

Renders every solutions manual listed in `manuals.json` into one HTML page per
problem under `public/solutions/<book slug>/`. The site lists problems on the
book page and serves each at `/nerd-corner/<book>/<problem>`. The output is
committed, so the site is fully static. PDFs are linked, not embedded.

## Layout

```
tools/tex2html/
  manuals.json        registry: { slug, repo, doc, preset? } per manual
  build-all.mjs       clone/fetch each repo, rebuild the changed ones, write manifest
  build.mjs           one manual: TeX -> pandoc -> KaTeX -> figures -> split
  lib/preprocess.mjs  TeX rewrites before pandoc; presets "qs" (default) and "meyer"
  lib/math.mjs        server-side KaTeX plus the macro table
  lib/figures.mjs     PDF/EPS/PNG figures -> SVG, dark neon recolour
  lib/split.mjs       chapter / section / problem splitting, footnotes
public/solutions/<slug>/
  index.json          { doc, chapters: [{ title, sections: [{ title, problems: [{ slug, number }] }] }] }
  problems/<n>.html   statement box + solution + its footnotes
  figs/*.svg|png
public/solutions/manifest.json   per-slug: source sha, build time, problem count, issue count
```

`slug` must match the book's slug in `components/mathematics/books.ts`; that
is the only link between the registry and the site. `doc` is the full
manual's TeX file relative to the repo root. `preset` is only needed for a
manual whose markup differs from the `\qs` template (currently Meyer).

## Pipeline per manual

1. Preprocess the TeX: splice the shared `header*.tex` in verbatim so pandoc
   sees every macro, then override `\qs`, `\thm`, `\prp`, `\lemma`, `\abs`,
   `\norm`, `\floor`, `\rcurs`, `\brcurs` with forms pandoc can convert;
   rewrite `enumitem` labels; drop `\maketitle`, `\tableofcontents`,
   `\newpage` and friends. The Meyer preset first rewrites its
   `%Question N.M` + `\item` + tcolorbox items into `\qs`.
2. `pandoc -f latex -t html5 --math-method=katex`.
3. KaTeX on every math span. Rejected spans are logged and left in the page
   as a red `code.tex-error` block so they get fixed at the source.
4. Figures: EPS goes through `epstopdf`, PDF through `pdftocairo -svg`, PNG is
   copied. Every SVG colour is remapped for the dark site (white paper to
   near-black, black ink to off-white, greys inverted, saturated colours to a
   bright neon of the same hue). The PDF manuals keep the white originals, so
   there is nothing to change in the notebooks. An SVG over 400 KB (scatter
   plots with tens of thousands of markers reach 20 MB) is rasterised to a
   1800 px lossless WebP with `sharp` and the SVG dropped.
5. Split on `<h1>` (chapter), `<h2>` and deeper (section), `<div class="problem">`.
   The slug is the `\qs` number with anything but word characters and dots
   replaced by `-`.
6. Animations: any `.mp4` or `.webm` in the repo is attached to the problem
   its filename names and streamed through the site's `/api/video` proxy
   (nothing is copied). Two filename conventions are recognised:
   `chap8sec8.3ex2.mp4` is problem 8.3.2, `chap3ex3.10.mp4` is problem 3.10.
   Anything else is reported in the build log and skipped.

The manifest also records a hash of the pipeline sources, so editing
anything under `tools/tex2html` rebuilds every manual on the next run.

## Rebuild locally

Needs `pandoc`, `pdftocairo` (poppler) and `epstopdf` (TeX Live) on PATH; on
this machine pandoc is in `~/.local/bin`, the other two come with TeX Live.
`katex` and `sharp` come from this repo's `npm install`.

```bash
# from the dalee repo root
node tools/tex2html/build-all.mjs                 # changed manuals only
node tools/tex2html/build-all.mjs --force         # everything
node tools/tex2html/build-all.mjs griffiths-introduction-to-quantum-mechanics
npm run dev                                       # then open /nerd-corner/<slug>
```

Clones live in `.tex2html-work/` (gitignored). Read the build log: it lists
every math span KaTeX rejected, missing figures, and `\qs` boxes without a
number. Do not run `npm install` while `next dev` is up (Turbopack loses its
module graph; stop, delete `.next`, restart).

## Production

`.github/workflows/render-solutions.yml` runs `build-all.mjs` when a solutions
repo pushes (see below), every 15 minutes as a fallback, and on manual dispatch (with a
"force" option). It commits any change under `public/solutions` to `main`,
and Vercel deploys. `GITHUB_TOKEN` is enough to push here.

### Push-to-live in minutes

Every solutions repo carries `.github/workflows/notify-site.yml` (template:
`notify-site.yml` here). On push to its `main` it sends a `repository_dispatch`
event to this repo, which starts the render immediately. That needs one
secret, `DALEE_DISPATCH_TOKEN`, in each solutions repo:

1. GitHub → Settings → Developer settings → Personal access tokens →
   Fine-grained → Generate. Repository access: only `DALEE9000/dalee`.
   Permissions: Contents, read and write. Expiry as you like (renew the
   secrets when it lapses).
2. Store it in every solutions repo (paste the token when prompted, it is
   never echoed):

   ```bash
   for r in $(node -e "console.log(require('./tools/tex2html/manuals.json').map(m=>m.repo).join(' '))"); do
     gh secret set DALEE_DISPATCH_TOKEN -R "$r"
   done
   ```

Without the secret the notify job exits quietly and the hourly fallback still
applies. A new manual needs the workflow file copied in and the secret set.

## Adding a manual

The new repo should follow the template the others use: a `header*.tex` at
the root that defines `\qs`, one full-manual document (`<doc>/<doc>.tex`),
figures referenced from `\includegraphics` as PDF, EPS or PNG.

In dalee:

1. Add the book to `components/mathematics/books.ts` as before (title,
   author, PDF links). Its `slug` is the key everything else hangs on.
2. Add `{ "slug", "repo", "doc" }` to `manuals.json`: the same slug, the
   GitHub `owner/name`, and the full manual's `.tex` path relative to the repo
   root. If the manual does not use `\qs`, add a preset in
   `lib/preprocess.mjs` and name it in the entry.
3. Dry run locally to catch problems before CI sees them:
   `node tools/tex2html/build-all.mjs <slug>`. Read the log: it lists every
   math span KaTeX rejected, missing figures, and `\qs` boxes without a
   number. Fix those in the TeX (or extend the macro table in `lib/math.mjs`
   if KaTeX lacks a command). Do not commit the local `public/solutions/<slug>`
   output: CI renders with its own toolchain and the bytes differ, so a local
   commit just churns. `git checkout -- public/solutions` to discard it.
4. Commit `books.ts` and `manuals.json`, push. Within 15 minutes the cron
   render builds the new manual and commits it; or run the workflow by hand
   from the Actions tab for sooner.

In the new solutions repo, for push-to-live:

5. Copy `tools/tex2html/notify-site.yml` to
   `.github/workflows/notify-site.yml` and push it.
6. Store the dispatch token there:
   `gh secret set DALEE_DISPATCH_TOKEN -R DALEE9000/<repo> -b <token>`
   (same token the other repos use; if it is lost, generate a new one with
   the link above and set it on every repo).

Without steps 5 and 6 the manual still renders, just on the 15-minute cron.

## Known gaps

- KaTeX has no `siunitx`, `\slashed`, `xy`, `tikz-cd`, inline `tikzpicture`,
  or small caps (`\textsc` is mapped to `\mathrm`).
- `\index`, running headers and `\printindex` are dropped.
- Pandoc expands `\DeclarePairedDelimiter` / `\RenewDocumentCommand` only
  partially; any new such macro in a header needs an override in
  `lib/preprocess.mjs`.
- Text between a section heading and its first `\qs` (section intros) is not
  kept anywhere.
- Fonts: prose uses `KaTeX_Main` and headings `KaTeX_SansSerif`, the
  Computer Modern faces KaTeX already ships, so no extra font download.
