"use client"

import '../globals.css';
import clsx from 'clsx';
import { useContext } from 'react';
import { ResearchAnimation } from '@/components/TextAnimations';
import styles from "@/components/home/Home.module.css";
import { AnimatePresence } from "framer-motion";
import { DivAnimation, AboutMeParagraph } from '@/components/BoxAnimations';
import { StargazerContext } from '@/components/Context';
import Stargazer from '@/components/Stargazer';

export default function Home() {

  const context = useContext(StargazerContext);
  const box1 = clsx(styles['twinkle-box'], styles['about-box1']);

  return (
    <>
      <section id={styles['research']}>
        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <DivAnimation props={box1}>
              <ResearchAnimation />

              <AboutMeParagraph props={styles['about-text']}>
                To be added...
              </AboutMeParagraph>
            </DivAnimation>
          )}
        </AnimatePresence>
      </section>

      {context.stargazer && <Stargazer />}
    </>
  );
}