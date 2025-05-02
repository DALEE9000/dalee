"use client"

import '../globals.css';
import clsx from 'clsx';
import { raleway } from '@/components/Fonts';
import { ResearchAnimation } from '@/components/TextAnimations';
import styles from "@/components/home/Home.module.css";
import { motion } from "framer-motion";

const box1 = clsx(styles['twinkle-box'], styles['about-box1'])

const boxVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, type: "spring", bounce: 0.5 } },
};


export default function Home() {
  return (
    <>
      <section id={styles['research']}>
        <div
          className={box1}
        >
          <ResearchAnimation />

          <motion.p
            className={styles['about-text']}
            style={{
                fontFamily: raleway.style.fontFamily,
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={boxVariants}
          >
            To be added...
          </motion.p>
        </div>
      </section>
    </>
  );
}