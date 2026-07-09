"use client"

import '../globals.css';
import { useContext } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { AboutMeAnimation } from '@/components/TextAnimations';
import styles from "@/components/home/Home.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { StargazerContext } from '@/components/Context';
import { DivAnimation, AboutMeParagraph, AboutMeList } from '@/components/BoxAnimations';
import { LightUpText } from '@/components/BoxAnimations';
import Stargazer from '@/components/Stargazer';

export default function AboutClient() {

  const context = useContext(StargazerContext);

  const box1 = clsx(styles['about-box1']);
  const box2 = clsx(styles['twinkle-box'], styles['about-box2']);

  const currentWork = [
    <> Fiscal Policy Analyst for the <a href="https://www.centernyc.org/" target="_blank" rel="noopener noreferrer"><LightUpText props={styles['link-props']}>Center for New York City Affairs</LightUpText></a> </>,
    <> Oceanography Researcher in the <a href="https://ocean-transport.github.io/intro.html" target="_blank" rel="noopener noreferrer"><LightUpText props={styles['link-props']}>Ocean Transport Group</LightUpText></a> at Columbia University's Lamont Doherty Earth Observatory </>,
  ]

  const aboutParagraphs = [
    <> I am an independent researcher, with investigative endeavors ranging between atmospheric and ocean physics, legal institutionalism and political economy, and applied statistics in the physical and social sciences. You can read about many of my thoughts and musings on my Substack, <a href="https://alphabetagency.substack.com/" target="_blank" rel="noopener noreferrer"><LightUpText props={styles['link-props']}>Alphabet Agency</LightUpText></a>. </>,
  ]

  return (
    <>
      <section id={styles['about']}>

        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <DivAnimation props={box1}>
              <Image
                unoptimized
                className={styles['portrait']}
                src="/images/portrait.jpeg"
                width={300}
                height={300}
                alt="David A. Lee Portrait"
              />
            </DivAnimation>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <motion.div
              className={box2}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* This twinkle-box isn't a DivAnimation, so it needs its
                  spinning border rendered explicitly */}
              <span className={styles['twinkle-ring']} aria-hidden="true" />
              <AboutMeAnimation />

              <AboutMeParagraph props={styles['about-text']}>
                {aboutParagraphs[0]}
              </AboutMeParagraph>

              <AboutMeParagraph props={styles['about-text']}>
                Currently, I work as:
              </AboutMeParagraph>

              <AboutMeList props={styles['about-list']}>
                {currentWork.map((item, index) =>
                  <li key={`work-${index}`}>{item}</li>
                )}
              </AboutMeList>

              {aboutParagraphs.slice(1).map((para, index) =>
                <AboutMeParagraph
                  key={`para-${index}`}
                  props={styles['about-text']}
                >
                  {para}
                </AboutMeParagraph>
              )}

              <AboutMeParagraph
                props={styles['about-text']}
              >
                <a href="/dal_resume.pdf" target="_blank" rel="noopener noreferrer"><LightUpText props={styles['link-props']}>View my curriculum vitae.</LightUpText></a>
              </AboutMeParagraph>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {context.stargazer && <Stargazer />}
    </>
  );
}
