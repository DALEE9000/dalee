import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { textbooks, getTextbook } from '@/components/mathematics/books';
import { getProblemIndex } from '@/components/mathematics/solutionsHtml';
import TextbookClient from './TextbookClient';
// chapter and section titles can contain rendered math
import 'katex/dist/katex.min.css';

export function generateStaticParams() {
  return textbooks.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const book = getTextbook(slug);
  if (!book) return {};
  return {
    title: `${book.title} | Nerd Corner | David A. Lee`,
    description: book.coverDescription,
    alternates: { canonical: `https://www.davidalee.dev/nerd-corner/${slug}` },
    openGraph: {
      title: `${book.title} | Nerd Corner | David A. Lee`,
      description: book.coverDescription,
      url: `https://www.davidalee.dev/nerd-corner/${slug}`,
    },
  };
}

export default async function TextbookPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const book = getTextbook(slug);
  if (!book) notFound();
  const index = await getProblemIndex(slug);
  return <TextbookClient book={book} index={index} />;
}
