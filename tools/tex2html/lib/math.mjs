// Server-side KaTeX over pandoc's <span class="math ..."> elements.
import katex from 'katex';

// Macros for what the headers define in ways pandoc cannot expand, plus
// LaTeX commands KaTeX lacks that appear inside math in these manuals.
const macros = {
  '\\abs': '\\left\\lvert #1\\right\\rvert',
  '\\norm': '\\left\\lVert #1\\right\\rVert',
  '\\bra': '\\Bra{#1}',
  '\\ket': '\\Ket{#1}',
  '\\braket': '\\Braket{#1}',
  '\\sfrac': '\\tfrac{#1}{#2}',
  '\\sd': '\\operatorname{sd}',
  '\\se': '\\operatorname{se}',
  '\\textsc': '\\mathrm{#1}',
  '\\shortstack': '\\begin{array}{c}#1\\end{array}',
  '\\centernot': '\\not#1',
  '\\rcurs': '\\mathfrak{r}',
  '\\brcurs': '\\boldsymbol{\\mathfrak{r}}',
  '\\hrcurs': '\\hat{\\boldsymbol{\\mathfrak{r}}}',
  // \vcenter{\hbox{\shortstack{...}}} in the PDE manual: \hbox would put the
  // array into text mode, so it is dropped and \vcenter does the centring
  '\\hbox': '#1',
  '\\O': '\\varnothing',
  // string macros only count #1, #2, ... in sequence, so "#3" alone would
  // take no arguments; consume the three and keep the last
  '\\resizebox': (ctx) => ({ tokens: ctx.consumeArgs(3)[2], numArgs: 0 }),
};

// LaTeX constructs KaTeX rejects that are easier to rewrite than to emulate.
const rewrite = (src) =>
  src
    .replace(/\\begin\{tabular\}/g, '\\begin{array}').replace(/\\end\{tabular\}/g, '\\end{array}')
    // \resizebox{..}{..}{\( ... \)} inside display math: nested math delimiters
    .replace(/\\[()]/g, '')
    // \mbox{$...$} wrappers left by the header's glyph macros
    .replace(/\\mbox\{\$([^$]*)\$\}/g, '{$1}');

const unescape = (s) =>
  s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
   .replace(/&#39;/g, "'").replace(/&amp;/g, '&');

// Returns the html with math rendered, and the list of spans KaTeX rejected
// (left in place as <code class="tex-error"> so they get fixed at the source).
export function renderMath(html) {
  const errors = [];
  const out = html.replace(
    /<span class="math (inline|display)">([\s\S]*?)<\/span>/g,
    (_, mode, body) => {
      const src = rewrite(unescape(body));
      try {
        return katex.renderToString(src, {
          displayMode: mode === 'display',
          macros,
          strict: 'ignore',
          trust: false,
          throwOnError: true,
        });
      } catch (e) {
        errors.push(`${e.message}\n      ${src.slice(0, 120).replace(/\s+/g, ' ')}`);
        return `<code class="tex-error">${body}</code>`;
      }
    },
  );
  return { html: out, errors };
}
