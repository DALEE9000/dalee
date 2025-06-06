"use client"

import '../globals.css';
import clsx from 'clsx';
import { useContext } from 'react';
import { LibraryAnimation } from '@/components/TextAnimations';
import ReadBooks from '@/components/library/Library';
import styles from "@/components/home/Home.module.css";
import { raleway } from '@/components/Fonts';
import { AnimatePresence } from "framer-motion";
import { LightUpText, AboutMeParagraph, DivAnimation } from '@/components/BoxAnimations';
import { StargazerContext } from '@/components/Context';
import Stargazer from '@/components/Stargazer';

export default function Library() {

  const context = useContext(StargazerContext);
  const box1 = clsx(styles['twinkle-box'], styles['about-box1']);

  const readingLists = [
    {"link": "https://bookshop.org/shop/FAI", "title": "Foundation for American Innovation Bookshop"},
    {"link": "https://natolibguides.info/natolibrary", "title": "NATO Library"},
    {"link": "https://www.usni.org/press/books", "title": "United States Naval Institute"},
    {"link": "https://press.stripe.com/", "title": "Stripe Press"}
  ]

  return (
    <>
      <section id={styles['library']}>
        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <DivAnimation props={box1}>
              <LibraryAnimation />

              <AboutMeParagraph
                props={styles['about-text']}
              >
                One personal attribute my friends would universally agree on is I am a prolific reader.
              </AboutMeParagraph>

              <AboutMeParagraph
                props={styles['about-text']}
              >
                My online addiction is perusing through bespoke libraries from think tanks and government organizations on niche public policy. Some of my recommendations for organizations you should follow for reading lists are:

              </AboutMeParagraph>

              <ul
                className={styles['about-text']}
                style={{ fontFamily: raleway.style.fontFamily }}
              >
                {readingLists.map((item, index) => 
                  <li key={index}>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <LightUpText props={styles['link-props']}>{item.title}</LightUpText>
                    </a>
                  </li>
                )}
              </ul>

              <AboutMeParagraph
                props={styles['about-text']}
              >
                Otherwise, check out what I&apos;m reading!
              </AboutMeParagraph>

              <ReadBooks />

            </DivAnimation>
          )}
        </AnimatePresence>
      </section>

      {context.stargazer && <Stargazer />}
    </>
  );
}