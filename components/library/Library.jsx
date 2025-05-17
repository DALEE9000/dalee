"use client";
import { useEffect, useState } from "react";
import { DivAnimation } from '@/components/BoxAnimations';
import BookCard from '@/components/library/BookCard';
import Image from 'next/image';
import styles from './Library.module.css';

export default function Library() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch("/api/hardcover");
      const data = await res.json();
      const pathway = data["data"]["me"][0];
      setBooks(pathway);
      setBookCategory(pathway["read"]);
    };

    fetchBooks();
  }, []);

  const [bookCategory, setBookCategory] = useState(books["read"]);

  return (
    <>
      <div
        className={styles['library-page']}
      >
        <div
        >
          <p>This is going to be the menu</p>
          <button onClick={() => setBookCategory(books["read"])}>Reading</button>
          <button onClick={() => setBookCategory(books["currentlyReading"])}>Currently Reading</button>
        </div>
        <div
          className={styles['library-grid']}
        >
        {bookCategory && bookCategory.map((item, index) => (
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
              <BookCard title={item.book.title} />
            )}
          </DivAnimation>
          )
        )}
        </div>
      </div>
    </>
  );
}