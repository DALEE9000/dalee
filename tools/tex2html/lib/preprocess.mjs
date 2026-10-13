// TeX -> TeX rewrites applied before pandoc sees the document.
import fs from 'node:fs';
import path from 'node:path';

// Overrides spliced in right after the shared header, each only when that
// header defines the command (Meyer, for one, has a `thm` environment instead
// of a \thm command). The tcolorbox problem boxes become plain environments
// pandoc turns into <div class="...">, and macros pandoc only half-expands
// (\DeclarePairedDelimiter, \RenewDocumentCommand) get simple definitions.
const OVERRIDES = {
  qs: String.raw`\renewcommand{\qs}[2]{\begin{problem}\textbf{Problem #1.} #2\end{problem}}`,
  thm: String.raw`\renewcommand{\thm}[2]{\begin{theorem}\textbf{Theorem #1.} #2\end{theorem}}`,
  prp: String.raw`\renewcommand{\prp}[2]{\begin{theorem}\textbf{Property #1.} #2\end{theorem}}`,
  lemma: String.raw`\renewcommand{\lemma}[2]{\begin{theorem}\textbf{Lemma #1.} #2\end{theorem}}`,
  abs: String.raw`\renewcommand{\abs}[1]{\left\lvert #1\right\rvert}`,
  norm: String.raw`\renewcommand{\norm}[1]{\left\lVert #1\right\rVert}`,
  floor: String.raw`\renewcommand{\floor}[1]{\left\lfloor #1\right\rfloor}`,
  // Griffiths' script r is an image in the TeX; KaTeX has no lowercase script
  // face (\mathscr{r} falls back to italic r), fraktur keeps it distinct
  rcurs: String.raw`\renewcommand{\rcurs}{\mathfrak{r}}`,
  brcurs: String.raw`\renewcommand{\brcurs}{\boldsymbol{\mathfrak{r}}}`,
  hrcurs: String.raw`\renewcommand{\hrcurs}{\hat{\boldsymbol{\mathfrak{r}}}}`,
  mathcircled: String.raw`\renewcommand{\mathcircled}[1]{\boxed{#1}}`,
};

// \qs is always defined: presets synthesise it for manuals whose header lacks it
function overridesFor(header) {
  const defines = (name) =>
    name === 'qs' ||
    new RegExp(String.raw`\\(newcommand|def|DeclarePairedDelimiter|NewDocumentCommand)\*?\{?\\${name}\b`).test(header);
  return Object.entries(OVERRIDES)
    .filter(([name]) => defines(name))
    .map(([, line]) => line)
    .join('\n') + '\n';
}

// \graphicspath{{a/}{b/}} from the spliced header, for figure lookup. The
// argument may span lines with % comments between the groups.
export function graphicsPaths(tex) {
  const start = tex.indexOf('\\graphicspath{');
  if (start < 0) return [];
  let i = start + '\\graphicspath{'.length, depth = 1;
  for (; i < tex.length && depth > 0; i++) {
    if (tex[i] === '{') depth++;
    else if (tex[i] === '}') depth--;
  }
  const inner = tex.slice(start + '\\graphicspath{'.length, i - 1).replace(/%[^\n]*/g, '');
  return [...inner.matchAll(/\{([^}]*)\}/g)].map((x) => x[1].trim()).filter(Boolean);
}

// Find the index just past the \end{env} that closes the \begin{env} at `start`.
export function envEnd(tex, env, start) {
  const re = new RegExp(String.raw`\\(begin|end)\{${env}\}`, 'g');
  re.lastIndex = start;
  let depth = 0, m;
  while ((m = re.exec(tex))) {
    depth += m[1] === 'begin' ? 1 : -1;
    if (depth === 0) return m.index + m[0].length;
  }
  throw new Error(`unbalanced \\begin{${env}} at ${start}`);
}

// Shared across presets: splice the header, drop print-only commands, turn
// enumitem labels into the enumerate-package style pandoc understands.
function generic(tex, { repoRoot }) {
  const headerRe = /^.*\\(?:IfFileExists|input)\{(?:\.\.\/)?(header[^}.]*)(?:\.tex)?\}.*$/m;
  const m = headerRe.exec(tex);
  if (!m) throw new Error('no \\input{header...} line found');
  const header = fs.readFileSync(path.join(repoRoot, `${m[1]}.tex`), 'utf8');
  tex = tex.replace(headerRe, () => header + '\n' + overridesFor(header));

  return tex
    .replace(/\\begin\{enumerate\}\[label=\(\\alph\*\)\]/g, '\\begin{enumerate}[(a)]')
    .replace(/\\begin\{enumerate\}\[label=\(\\roman\*\)\]/g, '\\begin{enumerate}[(i)]')
    .replace(/\\begin\{enumerate\}\[label=\\alph\*[.)]\]/g, '\\begin{enumerate}[a)]')
    .replace(/\\begin\{enumerate\}\[label=\\arabic\*[.)]\]/g, '\\begin{enumerate}[1.]')
    .replace(/\\begin\{enumerate\}(?!\[)/g, '\\begin{enumerate}[(i)]')
    // KaTeX has no \setlength; the matrices read fine at default spacing
    .replace(/\\setlength\\arraycolsep\{[^}]*\}/g, '')
    .replace(/^\s*\\(maketitle|tableofcontents|newpage|clearpage|printindex|phantomsection)\s*$/gm, '')
    .replace(/^\s*\\addcontentsline\{[^}]*\}\{[^}]*\}\{[^}]*\}\s*$/gm, '')
    .replace(/^\s*\\setcounter\{[^}]*\}\{\d+\}\s*$/gm, '');
}

// Meyer (the first manual) predates \qs: each chapter is one enumerate whose
// items start with a "%Question N.M" comment and a tcolorbox statement.
// Rewrite those into \qs and drop the chapter-level enumerate so problems sit
// directly under the chapter heading. Sub-question tcolorboxes become bold text.
function meyer(tex, ctx) {
  tex = generic(tex, ctx);

  // chapter-level enumerate wrappers: \begin{enumerate}[label=N.\arabic*]
  const wrapRe = /\\begin\{enumerate\}\[label=\d+\.\\arabic\*\]\s*(\\itemsep0em)?/g;
  let m;
  while ((m = wrapRe.exec(tex))) {
    const end = envEnd(tex, 'enumerate', m.index);
    const inner = tex.slice(m.index + m[0].length, end).replace(/\\end\{enumerate\}\s*$/, '');
    tex = tex.slice(0, m.index) + inner + tex.slice(end);
    wrapRe.lastIndex = m.index;
  }

  // %Question N.M + \item + tcolorbox statement  ->  \qs{N.M}{statement}
  tex = tex.replace(
    /%Question (\d+\.\d+)\s*\n\s*\\item\s*\\begin\{tcolorbox\}\[[^\]]*\]\s*([\s\S]*?)\\end\{tcolorbox\}/g,
    (_, n, body) => `\\qs{${n}}{${body.trim()}}`,
  );
  // remaining (sub-question) boxes: keep the content, lose the box
  tex = tex.replace(/\\begin\{tcolorbox\}\[[^\]]*\]\s*([\s\S]*?)\\end\{tcolorbox\}/g, '$1');
  // figures sit in picture environments whose coordinates pandoc would print
  return tex
    .replace(/\\begin\{picture\}\([^)]*\)%?/g, '')
    .replace(/\\end\{picture\}%?/g, '')
    .replace(/\\put\([^)]*\)\{/g, '{')
    .replace(/\\lineheight\{[^}]*\}%?/g, '')
    .replace(/\\setlength\\tabcolsep\{[^}]*\}%?/g, '');
}

const presets = { qs: generic, meyer };

export function preprocess(tex, { preset = 'qs', repoRoot }) {
  const fn = presets[preset];
  if (!fn) throw new Error(`unknown preset ${preset}; have ${Object.keys(presets).join(', ')}`);
  return fn(tex, { repoRoot });
}
