"use client";

import { jersey } from '@/components/Fonts';
import styles from './Pagination.module.css';

// Shared prev/next pager — used by the writing feed and the library grid
// so they look identical. `page` is 1-based.
export default function Pagination({ page, pageCount, onPrev, onNext, className }) {
  if (pageCount <= 1) return null;

  return (
    <nav
      className={`${styles['pagination']} ${className || ''}`}
      style={{ fontFamily: jersey.style.fontFamily }}
    >
      <button
        className={styles['page-button']}
        onClick={onPrev}
        disabled={page <= 1}
      >
        &lt; prev
      </button>

      <span className={styles['page-label']}>
        page {page} of {pageCount}
      </span>

      <button
        className={styles['page-button']}
        onClick={onNext}
        disabled={page >= pageCount}
      >
        next &gt;
      </button>
    </nav>
  );
}
