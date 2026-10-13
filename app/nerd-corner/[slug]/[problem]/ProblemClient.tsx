"use client"

import clsx from 'clsx';
import Link from 'next/link';
import { useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DivAnimation, LightUpText } from '@/components/BoxAnimations';
import { StargazerContext } from '@/components/Context';
import Stargazer from '@/components/Stargazer';
import { jersey, raleway } from '@/components/Fonts';
import homeStyles from '@/components/home/Home.module.css';
import mathStyles from '@/app/nerd-corner/Mathematics.module.css';
import type { Textbook } from '@/components/mathematics/books';
import type { ProblemRef } from '@/components/mathematics/solutionsHtml';

type Located = ProblemRef & { chapter: string; section: string };

export default function ProblemClient(
  { book, problem, html, prev, next }:
  { book: Textbook; problem: Located; html: string; prev: ProblemRef | null; next: ProblemRef | null }
) {
  const context = useContext(StargazerContext);
  const box1 = clsx(homeStyles['twinkle-box'], homeStyles['about-box1'], mathStyles['problem-box']);
  const base = `/nerd-corner/${book.slug}`;

  const nav = (
    <nav className={mathStyles['problem-nav']} style={{ fontFamily: jersey.style.fontFamily }}>
      {prev ? <Link href={`${base}/${prev.slug}`}>← {prev.number}</Link> : <span />}
      <Link href={base}>all problems</Link>
      {next ? <Link href={`${base}/${next.slug}`}>{next.number} →</Link> : <span />}
    </nav>
  );

  return (
    <>
      <section id={homeStyles['mathematics']}>
        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <DivAnimation props={box1}>
              <Link href={base} className={mathStyles['back-link']}>
                <LightUpText style={{ fontFamily: jersey.style.fontFamily }}>
                  {`← ${book.title}`}
                </LightUpText>
              </Link>

              <h1 className={mathStyles['book-title']} style={{ fontFamily: jersey.style.fontFamily }}>
                Problem {problem.number}
              </h1>
              <p className={mathStyles['book-author']} style={{ fontFamily: raleway.style.fontFamily }}>
                {[problem.chapter, problem.section].filter(Boolean).join(' · ')}
              </p>

              <article className="solutions" dangerouslySetInnerHTML={{ __html: html }} />

              {nav}
            </DivAnimation>
          )}
        </AnimatePresence>
      </section>

      {context.stargazer && <Stargazer />}
    </>
  );
}
