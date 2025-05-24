"use client"

import '../globals.css';
import clsx from 'clsx';
import { useContext } from 'react';
import { ResearchAnimation, SWOT } from '@/components/TextAnimations';
import styles from "@/components/home/Home.module.css";
import { AnimatePresence } from "framer-motion";
import { LightUpText, DivAnimation, AboutMeParagraph } from '@/components/BoxAnimations';
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
                I work as a Research Staff Assistant in the <a href="https://ocean-transport.github.io/intro.html" target="_blank" rel="noopener noreferrer"><LightUpText props={styles['link-props']}>Ocean Transport Group</LightUpText></a> under Professor Dhruv Balwada at Columbia University&apos;s Lamont-Doherty Earth Observatory.
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
                My work with the Ocean Transport Group involves benchmarking simulated ocean data from the MITgcm LLC4320 global climate model to empirical data of oceanographic variables from NASA&apos;s SWOT mission and NOAA high-frequency (HF) data.
              </AboutMeParagraph>

              <AboutMeParagraph props={styles['about-text']}>
                I have a <a href="https://swot-llc-gallery.vercel.app" target="_blank" rel="noopener noreferrer"><LightUpText props={styles['link-props']}>gallery of assets</LightUpText></a> created from these datasets.
              </AboutMeParagraph>

              {/* Responsive Vimeo iframe wrapper */}
              <div 
                style={{ 
                  position: 'relative', 
                  paddingBottom: '56.25%', 
                  height: 'auto', 
                  width: '100%' }}
              >
                <iframe
                  title="vimeo-player"
                  src="https://player.vimeo.com/video/1087280103?h=a3ce494634&autoplay=1&muted=1&loop=1&background=1"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                  allowFullScreen
                ></iframe>
              </div>

            </DivAnimation>
          )}
        </AnimatePresence>
      </section>

      {context.stargazer && <Stargazer />}
    </>
  );
}