import Link from 'next/link';
import TwinkleStar from '@/components/TwinkleStar';  // Adjust path if needed
import "./globals.css";
import { Jersey_15 } from 'next/font/google';

const jersey = Jersey_15({
    variable: "--font-jersey-15",
    weight: "400",
    subsets: ['latin'],
})

export default function Home() {
  return (
    <div className="twinkle">
      <main>
        <div className="twinkle">
          <TwinkleStar>
            <div className="twinkle-box">
              <p className={`${jersey.variable} intro`}
                style={{ 
                  fontSize: 100,
                  fontFamily: jersey.style.fontFamily,
                  zIndex: 10,
                }}
              >
                Welcome to David&apos;s website
              </p>

              <p className="intro"
                style={{ 
                  fontSize: 100,
                  fontFamily: jersey.style.fontFamily,
                  zIndex: 10,
                }}
              >
                This is a <Link href="/about">link to my about page</Link>.
              </p>
            </div>
          </TwinkleStar>  {/* Self-closing tag */}
        </div>
      </main>
      <footer>
      </footer>
    </div>
  );
}
