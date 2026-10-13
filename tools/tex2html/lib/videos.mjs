// Animations committed next to the TeX (mp4/webm) attach to the problem their
// filename names. Two conventions appear in the repos:
//   chap8sec8.3ex2.mp4   -> 8.3.2   (section + exercise)
//   chap3ex3.10.mp4      -> 3.10    (chapter + already-qualified exercise)
// Files that match neither are reported and skipped. Videos are not copied:
// the page streams them from GitHub through the site's /api/video proxy.
import fs from 'node:fs';
import path from 'node:path';

const VIDEO = /\.(mp4|webm)$/i;
const SKIP = new Set(['.git', 'node_modules', 'build', '.tex2html-work']);

function walk(dir, rel = '', out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) walk(path.join(dir, e.name), r, out);
    else if (VIDEO.test(e.name)) out.push(r);
  }
  return out;
}

export function problemOfVideo(relPath) {
  const name = path.basename(relPath).replace(VIDEO, '');
  const sec = /sec(\d+(?:\.\d+)*)ex(\d+(?:\.\d+)*)/.exec(name);
  if (sec) return sec[2].includes('.') ? sec[2] : `${sec[1]}.${sec[2]}`;
  const chap = /chap(\d+)ex(\d+(?:\.\d+)*)/.exec(name);
  if (chap) return chap[2].includes('.') ? chap[2] : `${chap[1]}.${chap[2]}`;
  return null;
}

// Map of problem number -> [{ relPath, url }]
export function findVideos(repoRoot, repo) {
  const byProblem = new Map();
  const unmatched = [];
  for (const rel of walk(repoRoot).sort()) {
    const n = problemOfVideo(rel);
    if (!n) { unmatched.push(rel); continue; }
    const url = `/api/video?url=${encodeURIComponent(`https://github.com/${repo}/blob/main/${rel}`)}`;
    if (!byProblem.has(n)) byProblem.set(n, []);
    byProblem.get(n).push({ relPath: rel, url });
  }
  return { byProblem, unmatched };
}

export function videoHtml(videos) {
  return videos.map((v) =>
    `<figure class="video"><video controls loop preload="metadata" src="${v.url}"></video></figure>`,
  ).join('\n');
}
