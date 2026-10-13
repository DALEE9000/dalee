// Convert one LaTeX solutions manual into per-problem HTML.
//
//   node tools/tex2html/build.mjs <repo-root> <doc.tex> <out-dir> <fig-url-base> [preset]
//
// Writes <out-dir>/index.json, <out-dir>/problems/<slug>.html, <out-dir>/figs/*.
// Needs pandoc, pdftocairo (poppler) and epstopdf (TeX Live) on PATH, and the
// katex npm package resolvable from the cwd. build-all.mjs drives this for
// every manual in manuals.json.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { preprocess, graphicsPaths } from './lib/preprocess.mjs';
import { renderMath } from './lib/math.mjs';
import { processFigures } from './lib/figures.mjs';
import { splitProblems } from './lib/split.mjs';

export async function buildManual({ repoRoot, doc, outDir, figBase, preset = 'qs', log = console.error }) {
  const texPath = path.resolve(repoRoot, doc);
  const docDir = path.dirname(texPath);
  const docName = path.basename(texPath, '.tex');

  const tex = preprocess(fs.readFileSync(texPath, 'utf8'), { preset, repoRoot });

  let html = execFileSync(
    'pandoc',
    ['-f', 'latex', '-t', 'html5', '--math-method=katex', '--wrap=none'],
    { cwd: docDir, input: tex, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 },
  );

  const math = renderMath(html);
  const figs = await processFigures(math.html, {
    docDir, repoRoot, figDir: path.join(outDir, 'figs'), figBase,
    graphicsPaths: graphicsPaths(tex),
  });

  // ids are namespaced per document so nothing collides if two manuals ever
  // share a page
  html = figs.html
    .replace(/\bid="([^"]+)"/g, `id="${docName}-$1"`)
    .replace(/\bhref="#([^"]+)"/g, `href="#${docName}-$1"`);

  const split = splitProblems(html);

  const probDir = path.join(outDir, 'problems');
  fs.rmSync(probDir, { recursive: true, force: true });
  fs.mkdirSync(probDir, { recursive: true });
  for (const p of split.problems) fs.writeFileSync(path.join(probDir, `${p.slug}.html`), p.html);
  fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify({ doc: docName, chapters: split.chapters }));

  const errors = [...math.errors, ...figs.errors, ...split.errors];
  log(`${docName}: ${split.problems.length} problems, ${figs.count} figures` +
      (errors.length ? `, ${errors.length} issue(s)` : ''));
  for (const e of errors) log('  - ' + e);
  return { problems: split.problems.length, figures: figs.count, errors };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [repoRoot, doc, outDir, figBase, preset] = process.argv.slice(2);
  if (!repoRoot || !doc || !outDir || !figBase) {
    console.error('usage: build.mjs <repo-root> <doc.tex> <out-dir> <fig-url-base> [preset]');
    process.exit(2);
  }
  await buildManual({ repoRoot, doc, outDir, figBase, preset });
}
