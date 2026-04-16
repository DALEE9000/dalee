import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About | David A. Lee',
  description: 'Independent researcher in physical oceanography, political economy, and applied statistics. Fiscal Policy Analyst at Center for NYC Affairs and Research Staff at Columbia University Ocean Transport Group.',
  alternates: {
    canonical: 'https://www.davidalee.dev/about',
  },
  openGraph: {
    title: 'About | David A. Lee',
    description: 'Independent researcher in physical oceanography, political economy, and applied statistics. Fiscal Policy Analyst at Center for NYC Affairs and Research Staff at Columbia University Ocean Transport Group.',
    url: 'https://www.davidalee.dev/about',
  },
};

export default function About() {
  return <AboutClient />;
}
