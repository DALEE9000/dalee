// Split pandoc's flat HTML into one record per problem.
//
// Markers: <h1> chapter, <h2> section, <div class="problem"> statement; the
// solution is everything from the statement's end to the next marker.
// Footnotes sit at the end of the document and are re-attached to whichever
// problem references them.

const stripTags = (s) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

function divEnd(html, start) {
  const re = /<div\b|<\/div>/g;
  re.lastIndex = start;
  let depth = 0, m;
  while ((m = re.exec(html))) {
    depth += m[0] === '</div>' ? -1 : 1;
    if (depth === 0) return m.index + m[0].length;
  }
  throw new Error('unbalanced <div> in pandoc output');
}

// videos: Map of problem number -> html to append after that solution
export function splitProblems(html, { videos = new Map() } = {}) {
  const footnotes = new Map();
  html = html.replace(/<section id="[^"]*footnotes"[\s\S]*?<\/section>/, (sec) => {
    for (const m of sec.matchAll(/<li id="([^"]+)">([\s\S]*?)<\/li>/g)) footnotes.set(m[1], m[2]);
    return '';
  });

  // h1 is a chapter; h2 and anything deeper start a new section, so a
  // \subsubsection heading never ends up inside the preceding solution
  // (\section* comes out as <h1 class="unnumbered" id=...>, so match any attributes)
  const markers = [...html.matchAll(/<h[1-6]\b[^>]*>|<div class="problem">/g)];
  const chapters = [];
  const problems = [];
  const errors = [];
  let chapter = null, section = null;

  const ensureSection = () => {
    if (!chapter) { chapter = { title: '', sections: [] }; chapters.push(chapter); }
    if (!section) { section = { title: '', problems: [] }; chapter.sections.push(section); }
  };

  for (let i = 0; i < markers.length; i++) {
    const start = markers[i].index;
    const end = markers[i + 1]?.index ?? html.length;
    const tag = markers[i][0].slice(1, 3);

    if (/^h[1-6]$/.test(tag)) {
      const title = stripTags(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/.exec(html.slice(start, end))[1]);
      if (tag === 'h1') { chapter = { title, sections: [] }; chapters.push(chapter); section = null; }
      else { if (!chapter) ensureSection(); section = { title, problems: [] }; chapter.sections.push(section); }
      continue;
    }

    const stmtEnd = divEnd(html, start);
    let statement = html.slice(start, stmtEnd);
    const solution = html.slice(stmtEnd, end).trim();
    const num = /<strong>Problem ([^<]*?)\.?<\/strong>\s*/.exec(statement);
    if (!num) { errors.push(`problem without a number near offset ${start}`); continue; }
    statement = statement.replace(num[0], '');
    const number = num[1].trim();
    let slug = number.replace(/[^\w.]+/g, '-');
    if (problems.some((p) => p.slug === slug)) {
      // a numbering slip in the TeX; keep both pages reachable
      errors.push(`duplicate problem number ${number}`);
      let k = 2;
      while (problems.some((p) => p.slug === `${slug}-${k}`)) k++;
      slug = `${slug}-${k}`;
    }

    ensureSection();
    section.problems.push({ slug, number });

    let body = statement + '\n' + solution;
    if (videos.has(number)) { body += '\n' + videos.get(number); videos.delete(number); }
    const refs = [...body.matchAll(/href="#([^"]+-fn\d+)"/g)].map((m) => m[1]);
    if (refs.length) {
      body += '\n<section class="footnotes"><hr><ol>' +
        refs.map((id) => `<li id="${id}" value="${id.match(/\d+$/)[0]}">${footnotes.get(id) ?? ''}</li>`).join('') +
        '</ol></section>';
    }
    problems.push({ slug, number, html: body });
  }

  return { chapters, problems, errors };
}
