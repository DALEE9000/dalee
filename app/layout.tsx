import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";
import { seoMetadata } from './metadata';
import LayoutClient from './layoutClient';

export const metadata = seoMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const spriteSheetURL = "/pixelart/space/spacesprites.png";
  const spriteDataURL = "/pixelart/space/spacesprites.json";

  return (
    <html lang="en">
      <body className="home-page">
        <LayoutClient children={children} spriteSheetURL={spriteSheetURL} spriteDataURL={spriteDataURL} />
      </body>
      <GoogleAnalytics gaId="G-SY4QB2DS8Q" />
    </html>
  );
}
