import type { Metadata } from 'next';
import ResearchClient from './ResearchClient';

export const metadata: Metadata = {
  title: 'Research | David A. Lee',
  description: 'Research Staff Assistant in the Ocean Transport Group at Columbia University\'s Lamont-Doherty Earth Observatory. Benchmarking MITgcm LLC4320 ocean model data against NASA SWOT and NOAA HF observations.',
  alternates: {
    canonical: 'https://www.davidalee.dev/research',
  },
  openGraph: {
    title: 'Research | David A. Lee',
    description: 'Research Staff Assistant in the Ocean Transport Group at Columbia University\'s Lamont-Doherty Earth Observatory. Benchmarking MITgcm LLC4320 ocean model data against NASA SWOT and NOAA HF observations.',
    url: 'https://www.davidalee.dev/research',
  },
};

export default function Research() {
  return <ResearchClient />;
}
