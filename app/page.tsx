import Link from 'next/link';
import clsx from 'clsx';
import "./globals.css";
import styles from "@/components/home/Home.module.css";
import { Jersey_15 } from 'next/font/google';
import { Raleway } from 'next/font/google';
import BioAnimation from '@/components/home/BioAnimation';

const jersey = Jersey_15({
    variable: "--font-jersey-15",
    weight: "400",
    subsets: ['latin'],
})

const raleway = Raleway({
    weight: "400",
    subsets: ['latin'],
})

const box1 = clsx(styles['twinkle-box'], styles['box-1'])

const box2 = clsx(styles['twinkle-box'], styles['box-2'])

export default function Home() {
  const today = new Date();

  return (
    <>
      <div className={styles['starry-page']}>
        <div className={box1}>
          <BioAnimation />
        </div>

        <div className={box2}>
          <p
              className={`${styles['bio']}`}
              style={{
                  fontFamily: raleway.style.fontFamily,
              }}
          >
              I&apos;m David. I do cool things. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 

              <Link href="/about">blah</Link>
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
