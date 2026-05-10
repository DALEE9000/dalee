import type { Metadata } from 'next';
import MathematicsClient from './MathematicsClient';

export const metadata: Metadata = {
  title: 'Mathematics | David A. Lee',
  description: 'Textbook solutions, worked problems, and visualizations.',
  alternates: {
    canonical: 'https://www.davidalee.dev/mathematics',
  },
  openGraph: {
    title: 'Mathematics | David A. Lee',
    description: 'Textbook solutions, worked problems, and visualizations.',
    url: 'https://www.davidalee.dev/mathematics',
  },
};

export default function Mathematics() {
  return <MathematicsClient />;
}
