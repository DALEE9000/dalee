"use client" /* MUST use 'use client' on pages with framer motion */

import clsx from 'clsx';
import "./globals.css";
import styles from "@/components/home/Home.module.css";
import { useContext } from "react";
import { raleway } from '@/components/Fonts';
import { BioAnimation } from '@/components/TextAnimations';
import { AnimatePresence, motion } from "framer-motion";
import { StargazerContext } from '@/components/Context';
import Stargazer from '@/components/Stargazer';

export default function Home() {

  const context = useContext(StargazerContext);

  const box1 = clsx(styles['twinkle-box'], styles['box-1']);
  const box2 = clsx(styles['twinkle-box'], styles['box-2']);
  const box3 = clsx(styles['twinkle-box'], styles['box-3']);

  const boxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, type: "spring", bounce: 0.5 } },
  };

  return (
    <>
      <div className={styles['starry-page']}>

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
              <BioAnimation />
            </motion.div>
          )}
        </AnimatePresence>


        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <motion.div 
              className={box2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={boxVariants}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1
                  className={styles['bio']}
                  style={{
                      fontFamily: raleway.style.fontFamily,
                  }}
              >
                  I&apos;m David. I do cool things involving climate, weather, and political economics. 
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <motion.div
              className={box3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={boxVariants}
              exit={{ opacity: 0, y: -20 }}
            >
              <p
                className={styles['bio']}
                style={{
                    fontFamily: raleway.style.fontFamily,
                }}
              >
                I love making new friends. Please feel free to reach out! Some nerdy topics I&apos;m interested in are...
              </p> 
            </motion.div>
          )}
        </AnimatePresence>

        {context.stargazer && <Stargazer />}

      </div>
    </>
  );
}