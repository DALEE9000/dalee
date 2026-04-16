import type { Metadata } from 'next';
import LibraryClient from './LibraryClient';

export const metadata: Metadata = {
  title: 'Library | David A. Lee',
  description: 'Books David A. Lee is reading, plus curated reading lists from think tanks and government organizations covering public policy, national security, and technology.',
  alternates: {
    canonical: 'https://www.davidalee.dev/library',
  },
  openGraph: {
    title: 'Library | David A. Lee',
    description: 'Books David A. Lee is reading, plus curated reading lists from think tanks and government organizations covering public policy, national security, and technology.',
    url: 'https://www.davidalee.dev/library',
  },
};

export default function Library() {
  return <LibraryClient />;
}
