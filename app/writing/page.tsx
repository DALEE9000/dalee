"use client"

import '../globals.css';
import { useEffect, useContext } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { raleway } from '@/components/Fonts';
import { WritingAnimation } from '@/components/TextAnimations';
import styles from "@/components/home/Home.module.css";
import { StargazerContext } from '@/components/Context';
import Stargazer from '@/components/Stargazer';

declare global {
  interface Window {
    SubstackFeedWidget?: {
      substackUrl: string;
      posts?: number;
      colors?: {
        primary?: string;
        secondary?: string;
        background?: string;
      };
    };
  }
}

export default function Writing() {

  const context = useContext(StargazerContext);
  const box1 = clsx(styles['twinkle-box'], styles['about-box1']);

  const boxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, type: "spring", bounce: 0.5 } },
  };

  useEffect(() => {
    // Set up the widget configuration
    window.SubstackFeedWidget = {
      substackUrl: "alphabetagency.substack.com",
      posts: 5,
      colors: {
        primary: "#FFFFFF",
        secondary: "#FFFFFF",
        background: "#29465B",
      },
    };

    // Dynamically load the Substack feed script
    const script = document.createElement("script");
    script.src = "https://substackapi.com/embeds/feed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up if needed
      document.body.removeChild(script);
    };
  }, [context.stargazer]);

  return (
    <>
      <section id={styles['writing']}>

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

              <WritingAnimation />

              <p
                className={styles['about-text']}
                style={{
                  fontFamily: raleway.style.fontFamily,
                }}
              >
                I write a Substack named Alphabet Agency. 
              </p>

              <div 
                id='substack-feed-embed' 
                className={styles['substack-post-embed']}
              />

            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {context.stargazer && <Stargazer />}
    </>
  );
}