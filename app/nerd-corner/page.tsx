import type { Metadata } from 'next';
import MathematicsClient from './MathematicsClient';

export const metadata: Metadata = {
  title: 'Nerd Corner | David A. Lee',
  description: 'Textbook solutions, worked problems, and visualizations.',
  alternates: {
    canonical: 'https://www.davidalee.dev/nerd-corner',
  },
  openGraph: {
    title: 'Nerd Corner | David A. Lee',
    description: 'Textbook solutions, worked problems, and visualizations.',
    url: 'https://www.davidalee.dev/nerd-corner',
  },
};

export default function Mathematics() {
  return <MathematicsClient />;
}
