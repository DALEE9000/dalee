"use client"

import '../globals.css';
import clsx from 'clsx';
import { useContext } from 'react';
import { raleway } from '@/components/Fonts';
import { ResearchAnimation } from '@/components/TextAnimations';
import styles from "@/components/home/Home.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { StargazerContext } from '@/components/Context';
import Stargazer from '@/components/Stargazer';

export default function Home() {

  const context = useContext(StargazerContext);
  const box1 = clsx(styles['twinkle-box'], styles['about-box1']);

  const boxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, type: "spring", bounce: 0.5 } },
  };

  return (
    <>
      <section id={styles['research']}>
        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <motion.div
              className={box1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={boxVariants}
              exit={{ opacity: 0, y: -20 }}
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
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {context.stargazer && <Stargazer />}
    </>
  );
}