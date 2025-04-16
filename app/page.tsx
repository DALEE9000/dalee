import clsx from 'clsx';
import "./globals.css";
import styles from "@/components/home/Home.module.css";
import { Raleway } from 'next/font/google';
import BioAnimation from '@/components/home/BioAnimation';

const raleway = Raleway({
    weight: "400",
    subsets: ['latin'],
})

const box1 = clsx(styles['twinkle-box'], styles['box-1'])

const box2 = clsx(styles['twinkle-box'], styles['box-2'])

export default function Home() {
  return (
    <>
      <div className={styles['starry-page']}>

        <div className={box1}>
          <BioAnimation />
        </div>

        <div className={box2}>
          <p
              className={styles['bio']}
              style={{
                  fontFamily: raleway.style.fontFamily,
              }}
          >
              I&apos;m David. I do cool things involving climate, weather, and political economics. 
          </p>
        </div>
      </div>
    </>
);
}
