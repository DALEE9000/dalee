"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { raleway } from '@/components/Fonts';
import { AboutMeParagraph, BookBounce } from '@/components/BoxAnimations';
import BookCard from '@/components/library/BookCard';
import Image from 'next/image';
import styles from './Library.module.css';

export default function ReadBooks() {
  const [bookCategory, setBookCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("read");
  const [listId, setListId] = useState(167772);
  const [hardcoverLists, setHardcoverLists] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 18;

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

  const categories = [
    { label: "Economics", object: createCategory("Economics") },
    { label: "History", object: createCategory("History") },
    { label: "Politics", object: createCategory("Politics") },
    { label: "Law", object: createCategory("Law") },
    { label: "Philosophy", object: createCategory("Philosophy") },
    { label: "Literature", object: createCategory("Literature") },
  ];

  const otherCategory = {
    label: "Other",
    subcategories: hardcoverLists
      .filter(obj =>
        obj.name &&
        !/^(Economics|History|Law|Literature|Philosophy|Politics)\b/.test(obj.name)
      )
      .map(obj => ({ id: obj.id, name: obj.name }))
  };

  function renderCategoryItems(categoryObj, prefix) {
    return (
      <li key={prefix}>
        <button
          className={styles['category-button']}
          onClick={() => toggleCategory(prefix)}
        >
          <span className={clsx(
            styles['category-text'],
            selectedCategory.startsWith(prefix) && styles['category-selected']
          )}>
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
                    <span className={clsx(
                      styles['category-text'],
                      selectedCategory === `${prefix} ${item.name}` && styles['category-selected']
                    )}>
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

  const listVariant = {
    hidden: {
      height: 0,
      opacity: 0,
      overflow: 'hidden',
      transition: { when: "afterChildren", duration: 0.05 },
    },
    visible: {
      height: "auto",
      opacity: 1,
      overflow: "hidden",
      transition: { when: "beforeChildren", duration: 0.05, staggerChildren: 0.03 },
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
        setHardcoverLists([...me.myListsPart1, ...me.myListsPart2]);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchBooks();
  }, [listId, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, listId]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = bookCategory.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(bookCategory.length / booksPerPage);

  return (
    <div className={styles['library-page']}>
      <div>
        <AboutMeParagraph props={styles['category']}>
          Select category:
        </AboutMeParagraph>
        <ul className={styles['category-list']} style={{ fontFamily: raleway.style.fontFamily }}>
          <li>
            <button className={styles['category-button']} onClick={() => { setSelectedCategory("read"); setOpenCategory(null); }}>
              <span className={categorySelectRead}>Read</span>
            </button>
          </li>
          <li>
            <button className={styles['category-button']} onClick={() => { setSelectedCategory("currentlyReading"); setOpenCategory(null); }}>
              <span className={categorySelectCurrentlyReading}>Currently Reading</span>
            </button>
          </li>

          {hardcoverLists && categories.map(cat => renderCategoryItems(cat.object, cat.label))}

          {hardcoverLists && otherCategory.subcategories.map((item, index) => (
            <li key={index}>
              <button
                className={styles['category-button']}
                onClick={() => {
                  setListId(item.id);
                  setSelectedCategory(item.name);
                  setOpenCategory(null);
                }}>
                <span className={clsx(
                  styles['category-text'],
                  selectedCategory === item.name && styles['category-selected']
                )}>
                  {item.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles['library-grid']}>
        <AnimatePresence mode="wait">
          {currentBooks.map((item, index) => (
            <BookBounce key={`${item.book.title}-${currentPage}`} delayIndex={index}>
              {item?.book?.image?.url ? (
                <div className={styles['book-image']}>
                  <Image 
                    src={item.book.image.url} 
                    fill={true} 
                    alt={item.book.title} 
                  />
                </div>
              ) : (
                <BookCard title={item.book.title} />
              )}
            </BookBounce>
          ))}
        </AnimatePresence>
      </div>

      <div className={styles['pagination']}>
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}
