"use client" /* MUST use 'use client' on pages with framer motion */

import clsx from 'clsx';
import './globals.css';
import styles from '@/components/home/Home.module.css';
import { useContext } from 'react';
import { raleway } from '@/components/Fonts';
import { BioAnimation } from '@/components/TextAnimations';
import { AnimatePresence } from 'framer-motion';
import { StargazerContext } from '@/components/Context';
import HobbyCycle from '@/components/HobbyCycle';
import { DivAnimation } from '@/components/BoxAnimations';
import Stargazer from '@/components/Stargazer';

export default function Home() {

  const context = useContext(StargazerContext);

  const box1 = clsx(styles['twinkle-box'], styles['box-1']);
  const box2 = clsx(styles['twinkle-box'], styles['box-2']);
  const box3 = clsx(styles['twinkle-box'], styles['box-3']);

  return (
    <>
      <div className={styles['starry-page']}>

        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <DivAnimation props={box1}>
              <BioAnimation />
            </DivAnimation>
          )}
        </AnimatePresence>


        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <DivAnimation props={box2}>
              <h1
                  className={styles['bio']}
                  style={{
                      fontFamily: raleway.style.fontFamily,
                  }}
              >
                  I&apos;m David. I do cool things involving climate, weather, and political economics. 
              </h1>
            </DivAnimation>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <DivAnimation props={box3}>
              <p
                className={styles['bio']}
                style={{
                    fontFamily: raleway.style.fontFamily,
                }}
              >
                I love making new friends. Please feel free to reach out! Some nerdy topics I&apos;m interested in are...
              </p> 
              
              <p
                className={styles['bio']}
                style={{
                  fontStyle: 'italic',
                  marginTop: '2vw',
                  textAlign: 'center',
                  height: '8vw'
                }}
              >
                <HobbyCycle />
              </p>
            </DivAnimation>
          )}
        </AnimatePresence>

        {context.stargazer && <Stargazer />}

      </div>
    </>
  );
}