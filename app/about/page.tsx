"use client"

import '../globals.css';
import { useContext } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { raleway } from '@/components/Fonts';
import { AboutMeAnimation } from '@/components/TextAnimations';
import styles from "@/components/home/Home.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { StargazerContext } from '@/components/Context';
import { DivAnimation, AboutMeParagraph } from '@/components/BoxAnimations';
import Stargazer from '@/components/Stargazer';

export default function About() {

  const context = useContext(StargazerContext);

  const box1 = clsx(styles['about-box1']);
  const box2 = clsx(styles['twinkle-box'], styles['about-box2']);
  const box3 = clsx(styles['twinkle-box'], styles['about-box3']);

  const aboutParagraphs = [
    'I am an independent researcher, with investigative endeavors ranging between atmospheric and ocean physics, legal institutionalism and political economy, and applied statistics in the physical and social sciences.',
    'Currently, I work as a Research Staff Assistant in the Ocean Transport group at Columbia University\'s Lamont Doherty Earth Observatory. I also moonlight as a political consultant for Democratic Party candidates running for office in New York City.',
    'Most recently, I was an Adjunct Professor of Economics at the Adelphi University Robert B. Willumstad School of Business.',
    'In past lives, I held roles as eclectic as Legislative Director to New York State Assemblymember Ron Kim, Research Intern at the NASA Goddard Institute for Space Studies, and a Teaching Artist at the New York Philharmonic.',
    'My work in New York State government and politics has been featured in national and local journalism outlets such as The American Prospect, The Guardian, New York Focus, The Christian Science Monitor, and Singtao Daily.',
    'Additionally, I have presented original legal and science research at venues like Yale Law School, the American Bar Association Section on Labor and Employment Law, and the Microsoft Technology Center in New York City.',
    'My media appearances include the Netflix-acclaimed documentary Knock Down The House (2019) and For Whom the Alarm Sounds (2022).',
    'I am based in Queens, New York, where I happily enjoy collecting LEGO® minifigures, reading vintage books, and cooking.'
  ]

  return (
    <>
      <section id={styles['about']}>

        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <DivAnimation props={box1}>
              <Image
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
              <AboutMeAnimation />

              {aboutParagraphs.map((para, index) => 
                <AboutMeParagraph 
                  key={index}
                  props={styles['about-text']}
                >
                  {para}
                </AboutMeParagraph>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <DivAnimation props={box3}>
              <p
                className={styles['about-text']}
                style={{
                    fontFamily: raleway.style.fontFamily,
                }}
              >
                Curriculum Vitae
              </p>
            </DivAnimation>
          )}
        </AnimatePresence>

      </section>

      {context.stargazer && <Stargazer />}
    </>
  );
}