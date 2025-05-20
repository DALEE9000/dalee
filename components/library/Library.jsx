"use client";
import { useEffect, useState } from "react";
import { DivAnimation } from '@/components/BoxAnimations';
import BookCard from '@/components/library/BookCard';
import Image from 'next/image';
import styles from './Library.module.css';

export default function Library() {
  const [bookCategory, setBookCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("read");
  const [listId, setListId] = useState(167772);
  const [hardcoverLists, setHardcoverLists] = useState([]);

  useEffect(() => {
  async function fetchBooks() {
    try {
      const res = await fetch(`/api/hardcover?listId=${listId}`);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();

      const me = data?.data?.me?.[0];
      if (!me) throw new Error("Missing `me` in response");

      function extractBooks(me, selectedCategory) {
        if (selectedCategory === "read" || selectedCategory === "currentlyReading") {
          return me[selectedCategory] || [];
        }
        return me.category?.find(cat => cat.name === selectedCategory)?.list_books || [];
      }

      setBookCategory(extractBooks(me, selectedCategory));
      setHardcoverLists(me.myLists)
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

    fetchBooks();
  }, [listId, selectedCategory]);

  return (
    <>
      <div
        className={styles['library-page']}
      >
        <div
        >
          <p>Select category:</p>
          <button onClick={() => setSelectedCategory("read")}>Reading</button>
          <button onClick={() => setSelectedCategory("currentlyReading")}>Currently Reading</button>

          {hardcoverLists && hardcoverLists.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setListId(item.id);
                setSelectedCategory(item.name);
            }}>
              {item.name}
            </button>
          ))}

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