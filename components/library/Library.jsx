"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { raleway } from '@/components/Fonts';
import { AboutMeParagraph, DivAnimation } from '@/components/BoxAnimations';
import BookCard from '@/components/library/BookCard';
import Image from 'next/image';
import styles from './Library.module.css';

export default function ReadBooks() {
  const [bookCategory, setBookCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("read");
  const [listId, setListId] = useState(167772);
  const [hardcoverLists, setHardcoverLists] = useState([]);

  const categorySelectRead = clsx(
    styles['category-text'],
    (selectedCategory === "read") && styles['category-selected']);

  const categorySelectCurrentlyReading = clsx(
    styles['category-text'],
    (selectedCategory === "currentlyReading") && styles['category-selected']);

  const categoryNames = hardcoverLists.map(obj => Object.values(obj)[1]);

  const economicsCategory = {
    label: "Economics",
    subcategories: categoryNames
      .filter(cat => cat.startsWith("Economics"))
      .map(cat => cat.replace(/^Economics\s?/, '')) // remove "Economics " from the start
      .filter(sub => sub.length > 0) // remove blank entries
  };

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
          <AboutMeParagraph
            props={styles['category']}
          >
            Select category:
          </AboutMeParagraph>
          <ul
            className={styles['category-list']}
            style={{ fontFamily: raleway.style.fontFamily }}
          >
            <li>
              <button
                className={styles['category-button']}
                onClick={() => setSelectedCategory("read")}
              >
                <span
                  className={categorySelectRead}
                >
                  Read
                </span>
              </button>
            </li>
            <li>
            <button
              className={styles['category-button']}
              onClick={() => setSelectedCategory("currentlyReading")}
            >
              <span
                className={categorySelectCurrentlyReading}
              >
                Currently Reading
              </span>
            </button>
            </li>

            {/* Here's the plan of attack:
            
            1. We can get rid of the hardcoverLists.map code below. we will replace it as follows:
            2. make all the categories like economicCategories above.
            3. cycle through the categories, building buttons.
            4. rewrite onClick function to be setSelectedCategory("Economics" + item.name)

            */}

            {hardcoverLists && hardcoverLists.map((item, index) => (
              <li
                key={index}
              >
                <button
                  className={styles['category-button']}
                  onClick={() => {
                    setListId(item.id);
                    setSelectedCategory(item.name);
                }}>
                  <span
                    className={clsx(
                      styles['category-text'],
                      (selectedCategory === item.name) && styles['category-selected'])
                    }
                  >
                    {item.name}
                  </span>
                </button>
              </li>
            ))}

          </ul>
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