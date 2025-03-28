import { Suspense } from 'react';
import Link from 'next/link';
import "./globals.css";
import { Jersey_15 } from 'next/font/google';
import TwinkleStar from '@/components/home/TwinkleStar';
import BioAnimation from '@/components/home/BioAnimation';
import Loader from "@/components/Loader";

const jersey = Jersey_15({
    variable: "--font-jersey-15",
    weight: "400",
    subsets: ['latin'],
})

export default function Home() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className="twinkle">
            <TwinkleStar>
              <div className="twinkle-box">
                <BioAnimation />
                <p className="intro"
                  style={{ 
                    fontSize: 20,
                    fontFamily: jersey.style.fontFamily,
                  }}
                >
                  This is a <Link href="/about">link to my about page</Link>.
                </p>
              </div>
            </TwinkleStar>
        </div>
      </Suspense>
    <footer>
    </footer>
  </>
);
}
