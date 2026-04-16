import type { Metadata } from 'next';
import WritingClient from './WritingClient';

export const metadata: Metadata = {
  title: 'Writing | David A. Lee',
  description: 'David A. Lee writes Alphabet Agency, a Substack newsletter covering climate science, political economy, and public policy.',
  alternates: {
    canonical: 'https://www.davidalee.dev/writing',
  },
  openGraph: {
    title: 'Writing | David A. Lee',
    description: 'David A. Lee writes Alphabet Agency, a Substack newsletter covering climate science, political economy, and public policy.',
    url: 'https://www.davidalee.dev/writing',
  },
};

export default function Writing() {
  return <WritingClient />;
}
