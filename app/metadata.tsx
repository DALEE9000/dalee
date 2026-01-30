// Metadata.tsx (server)

import type { Metadata } from 'next';

export const seoMetadata: Metadata = {
  title: 'David A. Lee | Climate Researcher and Economist',
  description: 'Researcher in physical oceanography, political economy, and applied statistics.',
  openGraph: {
    title: 'David A. Lee | Climate Researcher and Economist',
    description: 'Researcher in physical oceanography, political economy, and applied statistics.',
    type: 'website',
    url: 'https://www.davidalee.dev',
    siteName: 'David A. Lee | Climate Researcher and Economist',
    locale: 'en_US',
  },
  twitter: {
    /* card: 'summary_large_image', */
    title: 'David A. Lee | Climate Researcher and Economist',
    description: 'Researcher in physical oceanography, political economy, and applied statistics.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://www.davidalee.dev',
  },
};
