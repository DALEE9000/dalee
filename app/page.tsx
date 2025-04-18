import clsx from 'clsx';
import "./globals.css";
import styles from "@/components/home/Home.module.css";
import { raleway } from '@/components/Fonts';
import BioAnimation from '@/components/home/BioAnimation';

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
          <h1
              className={styles['bio']}
              style={{
                  fontFamily: raleway.style.fontFamily,
              }}
          >
              I&apos;m David. I do cool things involving climate, weather, and political economics. 
          </h1>
        </div>
      </div>
    </>
);
}
