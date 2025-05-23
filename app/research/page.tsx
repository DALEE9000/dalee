"use client"

import '../globals.css';
import clsx from 'clsx';
import { useContext } from 'react';
import { ResearchAnimation, SWOT } from '@/components/TextAnimations';
import styles from "@/components/home/Home.module.css";
import { AnimatePresence } from "framer-motion";
import { DivAnimation, AboutMeParagraph } from '@/components/BoxAnimations';
import { StargazerContext } from '@/components/Context';
import Stargazer from '@/components/Stargazer';

export default function Research() {

  const context = useContext(StargazerContext);
  const box1 = clsx(styles['twinkle-box'], styles['about-box1']);
  const box2 = clsx(styles['twinkle-box'], styles['about-box2']);

  return (
    <>
      <section id={styles['research']}>
        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <DivAnimation props={box1}>
              <ResearchAnimation />

              <AboutMeParagraph props={styles['about-text']}>
                I work as a Research Staff Assistant in the Ocean Transport Group under Professor Dhruv Balwada at Columbia University's Lamont-Doherty Earth Observatory.
              </AboutMeParagraph>

              <AboutMeParagraph props={styles['about-text']}>
                I also do independent research in economic and foreign policy.
              </AboutMeParagraph>

              <AboutMeParagraph props={styles['about-text']}>
                My research projects include:
              </AboutMeParagraph> 
            </DivAnimation>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <DivAnimation props={box2}>
              <SWOT />

              <AboutMeParagraph props={styles['about-text']}>
                My work with the Ocean Transport Group involves benchmarking simulated ocean data from the MITgcm LLC4320 global climate model to empirical data of oceanographic variables from NASA's SWOT mission and NOAA high-frequency (HF) data.
              </AboutMeParagraph> 

              <video
                width="100%"
                height="auto"
                controls
                loop
                muted
              >
                <source src={'/research/strain_map.mp4'} />
              </video>
            </DivAnimation>
          )}
        </AnimatePresence>
      </section>

      {context.stargazer && <Stargazer />}
    </>
  );
}