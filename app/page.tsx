import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'David A. Lee | Climate Researcher and Economist',
  description: 'Researcher in physical oceanography, political economy, and applied statistics. Fiscal Policy Analyst at Center for NYC Affairs and Research Staff at Columbia University.',
  alternates: {
    canonical: 'https://www.davidalee.dev',
  },
  openGraph: {
    title: 'David A. Lee | Climate Researcher and Economist',
    description: 'Researcher in physical oceanography, political economy, and applied statistics. Fiscal Policy Analyst at Center for NYC Affairs and Research Staff at Columbia University.',
    url: 'https://www.davidalee.dev',
  },
};

export default function Home() {
  return <HomeClient />;
}
