import Link from 'next/link';
import "./globals.css";
import styles from "@/components/home/Home.module.css";
import { Jersey_15 } from 'next/font/google';
import BioAnimation from '@/components/home/BioAnimation';

const jersey = Jersey_15({
    variable: "--font-jersey-15",
    weight: "400",
    subsets: ['latin'],
})

export default function Home() {
  const today = new Date();

  return (
    <>
      <div className={styles['starry-page']}>
        <div className={styles['twinkle-box']}>
          <BioAnimation />
          <p
            style={{ 
              fontSize: 20,
              fontFamily: jersey.style.fontFamily,
            }}
          >
            This is a <Link href="/about">link to my about page</Link>.
          </p>
        </div>

        <footer
          style={{
            fontFamily: jersey.style.fontFamily,
          }}
        >
          Created with Next.js, &copy; {today.getFullYear()} David A. Lee
        </footer>
      </div>
    </>
);
}
