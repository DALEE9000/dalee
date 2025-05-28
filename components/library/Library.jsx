"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (categoryName) => {
    setOpenCategory(prev => prev === categoryName ? null : categoryName);
  };

  const categorySelectRead = clsx(
    styles['category-text'],
    (selectedCategory === "read") && styles['category-selected']);

  const categorySelectCurrentlyReading = clsx(
    styles['category-text'],
    (selectedCategory === "currentlyReading") && styles['category-selected']);

  function createCategory(category) {
    return {
      label: category,
      subcategories: hardcoverLists
        .filter(obj => obj.name && obj.name.startsWith(category))
        .map(obj => ({
          id: obj.id,
          name: obj.name.replace(new RegExp(`^${category}\\s?`), '')
        }))
        .filter(obj => obj.name.length > 0)
    };
  }
  const economicsCategory = createCategory("Economics");
  const historyCategory = createCategory("History");
  const politicsCategory = createCategory("Politics");
  const philosophyCategory = createCategory("Philosophy");
  const lawCategory = createCategory("Law");
  const literatureCategory = createCategory("Literature");

  const otherCategory = {
    label: "Other",
    subcategories: hardcoverLists
      .filter(obj =>
        obj.name && // guard against undefined
        !/^(Economics|History|Law|Literature|Philosophy|Politics)\b/.test(obj.name) // exclude categories that start with those
      )
      .map(obj => ({
        id: obj.id,
        name: obj.name
      }))
  };

  function renderCategoryItems(categoryObj, prefix) {
    return (
      <li key={prefix}>
        <button
          className={styles['category-button']}
          onClick={() => toggleCategory(prefix)}
        >
          <span
            className={clsx(
              styles['category-text'],
              selectedCategory.startsWith(prefix) && styles['category-selected']
            )}
          >
            {prefix}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {openCategory === prefix && (
            <motion.ul
              className={styles['subcategory-list']}
              style={{ fontFamily: raleway.style.fontFamily }}
              variants={listVariant}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {categoryObj.subcategories.map((item, index) => (
                <motion.li key={index} variants={itemVariant}>
                  <button
                    className={styles['category-button']}
                    onClick={() => {
                      setListId(item.id);
                      setSelectedCategory(`${prefix} ${item.name}`);
                    }}
                  >
                    <span
                      className={clsx(
                        styles['category-text'],
                        selectedCategory === `${prefix} ${item.name}` &&
                          styles['category-selected']
                      )}
                    >
                      {item.name}
                    </span>
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
    );
  }

  const theCategories = [
    {"object": economicsCategory, "name": "Economics"},
    {"object": historyCategory, "name": "History"},
    {"object": politicsCategory, "name": "Politics"},
    {"object": lawCategory, "name": "Law"},
    {"object": philosophyCategory, "name": "Philosophy"},
    {"object": literatureCategory, "name": "Literature"}
  ]

  const listVariant = {
    hidden: {
      height: 0,
      opacity: 0,
      overflow: 'hidden',
      transition: {
        when: "afterChildren",
        duration: 0.05
      },
    },
    visible: {
      height: "auto",
      opacity: 1,
      overflow: "hidden",
      transition: {
        when: "beforeChildren",
        duration: 0.05,
        staggerChildren: 0.03,
      },
    },
  };

const itemVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
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
      setHardcoverLists([...me.myListsPart1, ...me.myListsPart2])
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
                onClick={() => {
                  setSelectedCategory("read");
                  setOpenCategory(null);
                }}
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
              onClick={() => {
                setSelectedCategory("currentlyReading");
                setOpenCategory(null);
              }}
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

            {hardcoverLists && theCategories.map(cat =>
              renderCategoryItems(cat.object, cat.name)
            )}

            {hardcoverLists && otherCategory.subcategories.map((item, index) => (
              <li
                key={index}
              >
                <button
                  className={styles['category-button']}
                  onClick={() => {
                    setListId(item.id);
                    setSelectedCategory(item.name);
                    setOpenCategory(null);
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