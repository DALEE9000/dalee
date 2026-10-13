import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { textbooks, getTextbook } from '@/components/mathematics/books';
import {
  getProblemIndex, getProblemHtml, flattenProblems,
} from '@/components/mathematics/solutionsHtml';
import ProblemClient from './ProblemClient';
import 'katex/dist/katex.min.css';
import '../../solutions.css';

// Every problem is known at build time: the rendered HTML is committed under
// public/solutions, so the whole set is prerendered and anything else is 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  const all = await Promise.all(
    textbooks.map(async (book) => {
      const index = await getProblemIndex(book.slug);
      return index ? flattenProblems(index).map((p) => ({ slug: book.slug, problem: p.slug })) : [];
    }),
  );
  return all.flat();
}

type Params = Promise<{ slug: string; problem: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug, problem } = await params;
  const book = getTextbook(slug);
  if (!book) return {};
  const title = `Problem ${problem} | ${book.title} | Nerd Corner | David A. Lee`;
  const description = `Worked solution to problem ${problem} of ${book.author}'s ${book.title}.`;
  const url = `https://www.davidalee.dev/nerd-corner/${slug}/${problem}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function ProblemPage({ params }: { params: Params }) {
  const { slug, problem } = await params;
  const book = getTextbook(slug);
  if (!book) notFound();

  const [index, html] = await Promise.all([getProblemIndex(slug), getProblemHtml(slug, problem)]);
  if (!index || !html) notFound();

  const order = flattenProblems(index);
  const i = order.findIndex((p) => p.slug === problem);
  if (i < 0) notFound();

  return (
    <ProblemClient
      book={book}
      problem={order[i]}
      html={html}
      prev={order[i - 1] ?? null}
      next={order[i + 1] ?? null}
    />
  );
}
