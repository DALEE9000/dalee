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
        className={styles['librarygrid']}
      >
      {books.map((item, index) => (
        <AboutMeParagraph
          key={index}
        >
          {item?.book?.image?.url ? (
          <Image
            src={item.book.image.url}
            width={200}
            height={300}
            alt={item.book.title}
          /> ) : (
            <span>{item.book.title}</span>
          )}
        </AboutMeParagraph>
        )
      )}
      </div>
    </>
  );
}