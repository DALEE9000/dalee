"use client"

import '../globals.css';
import { useContext } from 'react';
import clsx from 'clsx';
import { jersey } from '@/components/Fonts';
import { HireMeAnimation } from '@/components/TextAnimations';
import styles from "@/components/home/Home.module.css";
import { AnimatePresence } from "framer-motion";
import { StargazerContext } from '@/components/Context';
import { DivAnimation, AboutMeParagraph } from '@/components/BoxAnimations';
import { LightUpText } from '@/components/BoxAnimations';
import Stargazer from '@/components/Stargazer';

export default function HireMe() {
  const context = useContext(StargazerContext);

  const box1 = clsx(styles['twinkle-box'], styles['about-box1']);

  return (
    <>
      <section id={styles['hire-me']}>
        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <DivAnimation props={box1}>
              <HireMeAnimation />

              <AboutMeParagraph props={styles['about-text']}>
                Like what you see? Hire me and let&apos;s build something amazing.
              </AboutMeParagraph>

              <AboutMeParagraph props={styles['about-text']}>
                Reach out to me at <span style={{ fontFamily: jersey.style.fontFamily }}>david [dot] a [dot] lee95 [at] gmail [dot] com</span>
              </AboutMeParagraph>

              <AboutMeParagraph props={styles['about-text']}>
                <a href="/dal_resume.pdf" target="_blank" rel="noopener noreferrer"><LightUpText props={styles['link-props']}>View my curriculum vitae to see the cool projects I&apos;ve done.</LightUpText></a>
              </AboutMeParagraph>

            </DivAnimation>
          )}
        </AnimatePresence>
      </section>

      {context.stargazer && <Stargazer />}
    </>
  );
}