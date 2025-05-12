"use client"

import '../globals.css';
import clsx from 'clsx';
import { useContext } from 'react';
import { LibraryAnimation } from '@/components/TextAnimations';
import ReadBooks from '@/components/library/Library';
import styles from "@/components/home/Home.module.css";
import { AnimatePresence } from "framer-motion";
import { DivAnimation, AboutMeParagraph } from '@/components/BoxAnimations';
import { StargazerContext } from '@/components/Context';
import Stargazer from '@/components/Stargazer';

export default function Library() {

  const context = useContext(StargazerContext);
  const box1 = clsx(styles['twinkle-box'], styles['about-box1']);

  return (
    <>
      <section id={styles['library']}>
        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <DivAnimation props={box1}>
              <LibraryAnimation />

              <ReadBooks />

              <AboutMeParagraph props={styles['about-text']}>
                Under construction
              </AboutMeParagraph>
            </DivAnimation>
          )}
        </AnimatePresence>
      </section>

      {context.stargazer && <Stargazer />}
    </>
  );
}