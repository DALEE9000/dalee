"use client"

import Link from 'next/link';
import clsx from 'clsx';
import { useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DivAnimation } from '@/components/BoxAnimations';
import { StargazerContext } from '@/components/Context';
import Stargazer from '@/components/Stargazer';
import { MathematicsAnimation } from '@/components/TextAnimations';
import { jersey } from '@/components/Fonts';
import { raleway } from '@/components/Fonts';
import { textbooks, categories } from '@/components/mathematics/books';
import homeStyles from '@/components/home/Home.module.css';
import mathStyles from '@/app/nerd-corner/Mathematics.module.css';

export default function MathematicsClient() {
  const context = useContext(StargazerContext);
  const box1 = clsx(homeStyles['twinkle-box'], homeStyles['about-box1']);

  return (
    <>
      <section id={homeStyles['mathematics']}>
        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <DivAnimation props={box1}>
              <MathematicsAnimation />

              <p style={{ fontFamily: raleway.style.fontFamily, fontSize: 'clamp(1rem, 1.8vw, 1.5rem)', margin: '1rem 0 0.5rem', color: 'rgba(255,255,255,0.75)' }}>
                Textbook solutions, worked problems, and visualizations.
              </p>

              {categories.map((category) => (
                <div key={category}>
                  <h2 className={mathStyles['category-header']} style={{ fontFamily: jersey.style.fontFamily }}>
                    {category}
                  </h2>
                  {textbooks.filter((book) => book.category === category).map((book) => (
                    <Link
                      key={book.slug}
                      href={`/nerd-corner/${book.slug}`}
                      className={mathStyles['textbook-card']}
                    >
                      <div className={mathStyles['textbook-card-title']} style={{ fontFamily: jersey.style.fontFamily }}>
                        {book.title}
                      </div>
                      <div className={mathStyles['textbook-card-author']} style={{ fontFamily: raleway.style.fontFamily }}>
                        {book.author}
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </DivAnimation>
          )}
        </AnimatePresence>
      </section>

      {context.stargazer && <Stargazer />}
    </>
  );
}
