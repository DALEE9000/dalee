"use client"

import '../globals.css';
import { useContext } from 'react';
import clsx from 'clsx';
import SupascribeEmbed from './SupascribeEmbedSubstack';
import { AnimatePresence } from 'framer-motion';
import { raleway } from '@/components/Fonts';
import { WritingAnimation } from '@/components/TextAnimations';
import styles from "@/components/home/Home.module.css";
import { LightUpText, DivAnimation } from '@/components/BoxAnimations';
import { StargazerContext } from '@/components/Context';
import Stargazer from '@/components/Stargazer';

export default function Writing() {
  const context = useContext(StargazerContext);
  const box1 = clsx(styles['twinkle-box'], styles['about-box1']);

  return (
    <>
      <section id={styles['writing']}>

        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <DivAnimation props={box1}>
              <WritingAnimation />

              <p
                className={styles['about-text']}
                style={{
                  fontFamily: raleway.style.fontFamily,
                }}
              >
                I write a Substack named <a href="https://alphabetagency.substack.com/" target="_blank" rel="noopener noreferrer"><LightUpText props={styles['link-props']}>Alphabet Agency</LightUpText></a>. 
              </p>
              <SupascribeEmbed embedId="804504388187" />
            </DivAnimation>
          )}
        </AnimatePresence>
      </section>

      {context.stargazer && <Stargazer />}
    </>
  );
}