"use client";
import { useEffect, useState } from "react";
import { DivAnimation } from '@/components/BoxAnimations';
import BookCard from '@/components/library/BookCard';
import Image from 'next/image';
import styles from './Library.module.css';

export default function Library() {
  const [books, setBooks] = useState([]);
  const [bookCategory, setBookCategory] = useState([]);
  const [listId, setListId] = useState(167772);

  useEffect(() => {
    async function fetchBooks() {
    try {
      const res = await fetch(`/api/hardcover?listId=${listId}`);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();

      const me = data?.data?.me[0];
      const meCategory = data?.data?.me[0]?.category[0]?.list_books;
      if (!me) throw new Error("Missing `me` in response");

      setBooks(me);
      setBookCategory(meCategory);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

    fetchBooks();
  }, [listId]);

  console.log("look here", bookCategory)

  return (
    <>
      <div
        className={styles['library-page']}
      >
        <div
        >
          <p>Select category:</p>
          <button onClick={() => setBookCategory(books.read)}>Reading</button>
          <button onClick={() => setBookCategory(books.currentlyReading)}>Currently Reading</button>
          <button onClick={() => setListId(167784)}>Central Banking</button>
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