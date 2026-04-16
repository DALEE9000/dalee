import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";
import { seoMetadata } from './metadata';
import LayoutClient from './layoutClient';

export const metadata = seoMetadata;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.davidalee.dev/#person",
      "name": "David A. Lee",
      "url": "https://www.davidalee.dev",
      "jobTitle": "Climate Researcher and Economist",
      "description": "Researcher in physical oceanography, political economy, and applied statistics.",
      "sameAs": [
        "https://www.linkedin.com/in/david-lee-5b7aa4143/",
        "https://scholar.google.com/citations?user=ypZIE6UAAAAJ&hl=en"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.davidalee.dev/#website",
      "url": "https://www.davidalee.dev",
      "name": "David A. Lee",
      "publisher": {
        "@id": "https://www.davidalee.dev/#person"
      }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const spriteSheetURL = "/pixelart/space/spacesprites.png";

  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/pixelart/space/spacesprites.png" as="image" type="image/png" />
      </head>
      <body className="home-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LayoutClient children={children} spriteSheetURL={spriteSheetURL} />
      </body>
      <GoogleAnalytics gaId="G-SY4QB2DS8Q" />
    </html>
  );
}
