"use client"

import clsx from 'clsx';
import Link from 'next/link';
import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DivAnimation, AboutMeParagraph, LightUpText } from '@/components/BoxAnimations';
import { StargazerContext } from '@/components/Context';
import Stargazer from '@/components/Stargazer';
import { jersey } from '@/components/Fonts';
import { raleway } from '@/components/Fonts';
import homeStyles from '@/components/home/Home.module.css';
import mathStyles from '@/app/nerd-corner/Mathematics.module.css';
import type { Textbook, Chapter } from '@/components/mathematics/books';

function toEmbeddablePdfUrl(url: string): string {
  return `/api/pdf?url=${encodeURIComponent(url)}`;
}

function PdfEmbed({ src, title, className }: { src: string; title: string; className: string }) {
  const embedUrl = toEmbeddablePdfUrl(src);
  return (
    <>
      <iframe src={embedUrl} className={className} title={title} />
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className={mathStyles['pdf-open-link']}
        style={{ fontFamily: raleway.style.fontFamily }}
      >
        ↗ open in new tab
      </a>
    </>
  );
}

function Dropdown({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={mathStyles['chapter-section']}>
      <button
        className={mathStyles['chapter-toggle']}
        style={{ fontFamily: jersey.style.fontFamily }}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{label}</span>
        <span
          className={mathStyles['chapter-toggle-arrow']}
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ▼
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className={mathStyles['chapter-content']}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChapterDropdown({ chapter }: { chapter: Chapter }) {
  return (
    <Dropdown label={chapter.title}>
      {chapter.pdfUrl && (
        <>
          <p className={mathStyles['chapter-label']} style={{ fontFamily: raleway.style.fontFamily }}>
            Solutions PDF
          </p>
          <PdfEmbed
            src={chapter.pdfUrl}
            title={`${chapter.title} solutions`}
            className={mathStyles['chapter-pdf']}
          />
        </>
      )}

      {chapter.sections?.map((section, si) => (
        <div key={si} className={mathStyles['section-dropdown']}>
          <Dropdown label={section.title}>
            {section.animations.map((anim, ai) => (
              <div key={ai} className={mathStyles['section-animation']}>
                <p className={mathStyles['chapter-label']} style={{ fontFamily: raleway.style.fontFamily }}>
                  {anim.title}
                </p>
                {anim.url && (
                  <video controls loop className={mathStyles['chapter-video']}>
                    <source src={`/api/video?url=${encodeURIComponent(anim.url)}`} type="video/mp4" />
                  </video>
                )}
              </div>
            ))}
          </Dropdown>
        </div>
      ))}
    </Dropdown>
  );
}

export default function TextbookClient({ book }: { book: Textbook }) {
  const context = useContext(StargazerContext);
  const box1 = clsx(homeStyles['twinkle-box'], homeStyles['about-box1']);

  return (
    <>
      <section id={homeStyles['mathematics']}>
        <AnimatePresence mode="wait">
          {!context.stargazer && (
            <DivAnimation props={box1}>
              <Link href="/nerd-corner" className={mathStyles['back-link']}>
                <LightUpText style={{ fontFamily: jersey.style.fontFamily }}>
                  ← Nerd Corner
                </LightUpText>
              </Link>

              <h1 className={mathStyles['book-title']} style={{ fontFamily: jersey.style.fontFamily }}>
                {book.title}
              </h1>
              <p className={mathStyles['book-author']} style={{ fontFamily: raleway.style.fontFamily }}>
                {book.author}
              </p>

              {book.description && (
                <AboutMeParagraph props={homeStyles['about-text']}>
                  {book.description}
                </AboutMeParagraph>
              )}

              {book.fullSolutionsPdfUrl && (
                <Dropdown label="Full Solutions">
                  <PdfEmbed
                    src={book.fullSolutionsPdfUrl}
                    title={`${book.title} — full solutions`}
                    className={mathStyles['full-pdf-frame']}
                  />
                </Dropdown>
              )}

              {book.chapters.map((chapter, i) => (
                <ChapterDropdown key={i} chapter={chapter} />
              ))}
            </DivAnimation>
          )}
        </AnimatePresence>
      </section>

      {context.stargazer && <Stargazer />}
    </>
  );
}
