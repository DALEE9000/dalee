// Figure handling: \includegraphics targets (PDF, EPS, PNG) become files under
// <out>/figs and a lazy <img>. Vector figures get a dark, neon recolour for
// the site; the PDF manuals keep matplotlib's white originals.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const rgbToHsl = (r, g, b) => {
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min, s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? ((g - b) / d + (g < b ? 6 : 0))
    : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h / 6, s, l];
};
const hslToRgb = (h, s, l) => {
  const f = (n) => {
    const k = (n + h * 12) % 12;
    return l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return [f(0), f(8), f(4)].map((v) => (v * 100).toFixed(2) + '%');
};

// white paper -> near-black card, black ink -> off-white, greys inverted,
// anything saturated pushed to a bright neon of the same hue.
export const darkTheme = (svg) =>
  svg.replace(/rgb\(([\d.]+)%,([\d.]+)%,([\d.]+)%\)/g, (_, r, g, b) => {
    let [h, s, l] = rgbToHsl(r / 100, g / 100, b / 100);
    if (s < 0.15) {
      l = l > 0.9 ? 0.06 : l < 0.12 ? 0.93 : Math.min(0.9, Math.max(0.35, 1 - l));
      if (l < 0.1) { h = 0.68; s = 0.3; } else s = 0;
    } else {
      s = Math.max(s, 0.85);
      l = Math.min(0.72, Math.max(0.6, l));
    }
    return `rgb(${hslToRgb(h, s, l).join(',')})`;
  });

// pandoc writes <embed> for PDF and <img> for everything else; graphicx also
// allows omitting the extension.
const CANDIDATES = ['', '.pdf', '.eps', '.png', '.jpg', '.svg'];

function locate(src, searchDirs) {
  for (const dir of searchDirs) {
    for (const ext of CANDIDATES) {
      const p = path.resolve(dir, src + ext);
      if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
    }
  }
  return null;
}

function stale(out, src) {
  return !fs.existsSync(out) || fs.statSync(out).mtimeMs < fs.statSync(src).mtimeMs;
}

// Convert one source figure into <figDir>/<name>.<svg|png|jpg>; returns the
// output basename.
function convert(src, figDir) {
  const ext = path.extname(src).toLowerCase();
  const base = path.basename(src, ext);
  if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
    const out = path.join(figDir, base + ext);
    if (stale(out, src)) fs.copyFileSync(src, out);
    return path.basename(out);
  }
  const out = path.join(figDir, `${base}.svg`);
  const raster = path.join(figDir, `${base}.webp`);
  if (fs.existsSync(raster) && !stale(raster, src)) return path.basename(raster);
  if (stale(out, src)) {
    let pdf = src;
    if (ext === '.eps') {
      pdf = path.join(figDir, `${base}.pdf`);
      execFileSync('epstopdf', [src, `--outfile=${pdf}`]);
    } else if (ext === '.svg') {
      fs.writeFileSync(out, darkTheme(fs.readFileSync(src, 'utf8')));
      return path.basename(out);
    }
    execFileSync('pdftocairo', ['-svg', pdf, out]);
    fs.writeFileSync(out, darkTheme(fs.readFileSync(out, 'utf8')));
    if (pdf !== src) fs.unlinkSync(pdf);
  }
  return path.basename(out);
}

// Scatter plots with tens of thousands of markers come out as 10-20 MB of
// SVG; above this size the dark SVG is rasterised instead and the SVG dropped.
const RASTER_ABOVE = 400 * 1024;
const RASTER_WIDTH = 1800;

async function rasterizeIfHuge(figDir, name) {
  if (!name.endsWith('.svg')) return name;
  const svgPath = path.join(figDir, name);
  if (fs.statSync(svgPath).size <= RASTER_ABOVE) return name;
  const { default: sharp } = await import('sharp');
  const webp = svgPath.replace(/\.svg$/, '.webp');
  await sharp(svgPath, { density: 150 })
    .resize({ width: RASTER_WIDTH, withoutEnlargement: false })
    .webp({ lossless: true })
    .toFile(webp);
  fs.unlinkSync(svgPath);
  return path.basename(webp);
}

export async function processFigures(html, { docDir, repoRoot, figDir, figBase, graphicsPaths = [] }) {
  // \graphicspath entries are relative to wherever the build runs; try both
  const searchDirs = [
    docDir, repoRoot,
    ...graphicsPaths.flatMap((g) => [path.resolve(docDir, g), path.resolve(repoRoot, g)]),
  ];
  // the figs dir is rebuilt from scratch so renamed or rasterised figures
  // leave no stale files behind
  fs.rmSync(figDir, { recursive: true, force: true });
  fs.mkdirSync(figDir, { recursive: true });
  const errors = [];
  let count = 0;

  const re = /<(?:embed|img) src="([^"]+)"([^>]*?)\/?>/g;
  const parts = [];
  let last = 0, m;
  while ((m = re.exec(html))) {
    parts.push(html.slice(last, m.index));
    last = m.index + m[0].length;
    const [, rawSrc, attrs] = m;
    // pandoc percent-encodes spaces and parentheses in src
    const src = decodeURIComponent(rawSrc);

    const file = locate(src, searchDirs);
    if (!file) {
      errors.push(`missing figure ${src}`);
      parts.push(`<code class="tex-error">missing figure ${src}</code>`);
      continue;
    }
    let name;
    try {
      name = await rasterizeIfHuge(figDir, convert(file, figDir));
    } catch (e) {
      errors.push(`figure ${src}: ${e.message.split('\n')[0]}`);
      parts.push(`<code class="tex-error">figure failed: ${src}</code>`);
      continue;
    }
    count++;
    let ratio = 'auto', natural = null;
    if (name.endsWith('.svg')) {
      const vb = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(fs.readFileSync(path.join(figDir, name), 'utf8'));
      if (vb) { ratio = `${vb[1]} / ${vb[2]}`; natural = `${Math.round(vb[1] * 1.6)}px`; }
    }
    // \includegraphics width: a percentage of the text width or an absolute
    // length survive as a style; anything else (\unitlength, no width) falls
    // back to the figure's own size so a small diagram stays small
    const width = /width:([^;"]+)/.exec(attrs)?.[1] ?? natural ?? '100%';
    parts.push(`<figure class="fig" style="max-width:${width}">` +
      `<img src="${figBase}/${name}" alt="" loading="lazy" style="aspect-ratio:${ratio}"></figure>`);
  }
  parts.push(html.slice(last));
  return { html: parts.join(''), count, errors };
}
