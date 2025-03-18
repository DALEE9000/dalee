import Link from 'next/link';
import TwinkleStar from '@/components/TwinkleStar';  // Adjust path if needed
import "./globals.css";

export default function Home() {
  return (
    <div className="twinkle">
      <main>
        <div className="twinkle">
          <TwinkleStar>
          <p>Welcome to David&apos;s website</p>

          <p>
            This is a <Link href="/about">link to my about page</Link>.
          </p>
          </TwinkleStar>  {/* Self-closing tag */}
        </div>
      </main>
      <footer>
      </footer>
    </div>
  );
}
