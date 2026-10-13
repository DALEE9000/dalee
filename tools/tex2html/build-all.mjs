// Build every manual in manuals.json into public/solutions/<slug>/.
//
//   node tools/tex2html/build-all.mjs [--force] [slug ...]
//
// Each solutions repo is shallow-cloned (or fetched) into .tex2html-work/ and
// rebuilt only when its HEAD commit changed since the sha recorded in
// public/solutions/manifest.json. --force rebuilds regardless. Exit code 1 if
// any manual failed to build, so CI notices; KaTeX/figure issues inside a
// manual are reported but do not fail the run.

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildManual } from './build.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');
const workDir = path.join(root, '.tex2html-work');
const outRoot = path.join(root, 'public', 'solutions');
const manifestPath = path.join(outRoot, 'manifest.json');

const args = process.argv.slice(2);
const force = args.includes('--force');
const only = args.filter((a) => !a.startsWith('--'));

const manuals = JSON.parse(fs.readFileSync(path.join(here, 'manuals.json'), 'utf8'))
  .filter((m) => !only.length || only.includes(m.slug));
if (!manuals.length) { console.error('no manuals matched'); process.exit(2); }

const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {};

// A change to the pipeline itself must rebuild every manual, not just a
// change in a repo: hash the tool sources and store it alongside the sha.
const toolHash = (() => {
  const h = createHash('sha256');
  const files = ['build.mjs', 'build-all.mjs', ...fs.readdirSync(path.join(here, 'lib')).map((f) => `lib/${f}`)];
  for (const f of files.sort()) h.update(fs.readFileSync(path.join(here, f)));
  return h.digest('hex').slice(0, 12);
})();
// core.longpaths: Meyer's "Chapter N - Title/Chapter N - Title.tex" paths
// exceed the Windows default limit
const git = (cwd, ...a) =>
  execFileSync('git', ['-c', 'core.longpaths=true', ...a], { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }).trim();

fs.mkdirSync(workDir, { recursive: true });
fs.mkdirSync(outRoot, { recursive: true });
const saveManifest = () => fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
let failed = 0, built = 0, unchanged = 0;

for (const m of manuals) {
  const repoDir = path.join(workDir, m.repo.split('/')[1]);
  const url = `https://github.com/${m.repo}.git`;
  try {
    if (fs.existsSync(path.join(repoDir, '.git'))) {
      git(repoDir, 'fetch', '--depth=1', 'origin', 'HEAD');
      git(repoDir, 'reset', '--hard', 'FETCH_HEAD');
    } else {
      fs.rmSync(repoDir, { recursive: true, force: true });
      git(workDir, 'clone', '--quiet', '--depth=1', url, repoDir);
    }
    const sha = git(repoDir, 'rev-parse', 'HEAD');

    const prev = manifest[m.slug];
    if (!force && prev?.sha === sha && prev?.tool === toolHash && fs.existsSync(path.join(outRoot, m.slug, 'index.json'))) {
      console.error(`${m.slug}: unchanged (${sha.slice(0, 7)})`);
      unchanged++;
      continue;
    }

    console.error(`${m.slug}: building ${sha.slice(0, 7)}${prev && prev.sha === sha ? ' (pipeline changed)' : ''}`);
    const r = await buildManual({
      repoRoot: repoDir,
      doc: m.doc,
      outDir: path.join(outRoot, m.slug),
      figBase: `/solutions/${m.slug}/figs`,
      repo: m.repo,
      preset: m.preset,
    });
    manifest[m.slug] = { sha, tool: toolHash, builtAt: new Date().toISOString(), problems: r.problems, issues: r.errors.length };
    built++;
  } catch (e) {
    console.error(`${m.slug}: FAILED: ${e.message.split('\n')[0]}`);
    const stderr = e.stderr?.toString().trim();
    if (stderr) console.error('  ' + stderr.split('\n').slice(-5).join('\n  '));
    failed++;
  }
  saveManifest();
}

console.error(`done: ${built} built, ${unchanged} unchanged, ${failed} failed`);
process.exit(failed ? 1 : 0);
