import '../globals.css';
import clsx from 'clsx';
import { Raleway } from 'next/font/google';
import styles from "@/components/home/Home.module.css";

const raleway = Raleway({
    weight: "400",
    subsets: ['latin'],
})

const box1 = clsx(styles['twinkle-box'], styles['box-1'])

export default function Home() {
  return (
    <>
      <section id="about">
        <div className={box1}>
          <p
              style={{
                  fontFamily: raleway.style.fontFamily,
              }}
          >
            I&apos;m David. I wear many hats.
          </p>
        </div>
      </section>
    </>
  );
}