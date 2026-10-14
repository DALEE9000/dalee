import fs from 'node:fs/promises';
import path from 'node:path';

// Per-problem HTML built by tools/tex2html/build-all.mjs into
// public/solutions/<book slug>/ and committed, so everything here is plain
// file reads at build time. A book has rendered solutions iff its index.json
// exists.

export type ProblemRef = { slug: string; number: string };
// title is plain text (math as its source TeX) for metadata; titleHtml is the
// pandoc/KaTeX rendering for display
export type ProblemSection = { title: string; titleHtml?: string; problems: ProblemRef[] };
export type ProblemChapter = { title: string; titleHtml?: string; sections: ProblemSection[] };
export type ProblemIndex = { doc: string; chapters: ProblemChapter[] };

const root = path.join(process.cwd(), 'public', 'solutions');

async function read(rel: string): Promise<string | null> {
  try {
    return await fs.readFile(path.join(root, rel), 'utf8');
  } catch {
    return null;
  }
}

export async function getProblemIndex(bookSlug: string): Promise<ProblemIndex | null> {
  const text = await read(`${bookSlug}/index.json`);
  if (!text) return null;
  try {
    return JSON.parse(text) as ProblemIndex;
  } catch {
    return null;
  }
}

export async function getProblemHtml(bookSlug: string, problem: string): Promise<string | null> {
  // problem comes from the URL; keep it to what the build script emits
  if (!/^[\w.]+$/.test(problem)) return null;
  return read(`${bookSlug}/problems/${problem}.html`);
}

// Reading order with chapter and section titles, for prev/next and breadcrumbs.
export function flattenProblems(index: ProblemIndex) {
  return index.chapters.flatMap((chapter) =>
    chapter.sections.flatMap((section) =>
      section.problems.map((p) => ({
        ...p,
        chapter: chapter.title,
        section: section.title,
        chapterHtml: chapter.titleHtml ?? chapter.title,
        sectionHtml: section.titleHtml ?? section.title,
      })),
    ),
  );
}
