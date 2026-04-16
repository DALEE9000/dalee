import type { Metadata } from 'next';
import HireMeClient from './HireMeClient';

export const metadata: Metadata = {
  title: 'Hire Me | David A. Lee',
  description: 'Available for research, consulting, and policy work in climate science, political economy, and applied statistics. Reach out to David A. Lee.',
  alternates: {
    canonical: 'https://www.davidalee.dev/hireme',
  },
  openGraph: {
    title: 'Hire Me | David A. Lee',
    description: 'Available for research, consulting, and policy work in climate science, political economy, and applied statistics. Reach out to David A. Lee.',
    url: 'https://www.davidalee.dev/hireme',
  },
};

export default function HireMe() {
  return <HireMeClient />;
}
