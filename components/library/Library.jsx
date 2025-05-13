"use client";
import { useEffect, useState } from "react";
import { DivAnimation, AboutMeParagraph } from '@/components/BoxAnimations';
import Image from 'next/image';
import styles from './Library.module.css';

export default function Library() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch("/api/hardcover");
      const data = await res.json();
      setBooks(data["data"]["me"][0]["user_books"]); // Make sure this matches the shape returned
    };

    fetchBooks();
  }, []);

  return (
    <>
      <div
        className={styles['library-page']}
      >
        <div
        >
          <p>This is going to be the menu</p>
        </div>
        <div
          className={styles['library-grid']}
        >
        {books.map((item, index) => (
          <DivAnimation
            key={index}
          >
            {item?.book?.image?.url ? (
              <div
                className={styles['book-image']}
              >
                <Image
                  src={item.book.image.url}
                  fill={true}
                  alt={item.book.title}
                /> 
            </div>) : (
              <span>{item.book.title}</span>
            )}
          </DivAnimation>
          )
        )}
        </div>
      </div>
    </>
  );
}