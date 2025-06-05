"use client";
import { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { jersey, raleway } from '@/components/Fonts';
import { AboutMeParagraph, BookBounce, LightUpText } from '@/components/BoxAnimations';
import { LibraryContext } from '@/components/Context';
import BookCard from '@/components/library/BookCard';
import BookSummary from '@/components/library/BookSummary';
import styles from '@/components/library/Library.module.css';
import bookStyles from "@/components/library/ThreeDBook.module.css";
import ThreeDBook from "@/components/library/ThreeDBook";

export default function ReadBooks() {

  // Establishing category from which to load books on library grid
  const [bookCategory, setBookCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("read");

  // Establishing API route for list
  const [listId, setListId] = useState(167772);

  // Building object of book list
  const [hardcoverLists, setHardcoverLists] = useState([]);

  // Establishing highlighted category
  const [openCategory, setOpenCategory] = useState(null);

  // Establishing current page on library grid
  const [currentPage, setCurrentPage] = useState(1);

  // Total number of books per page
  const booksPerPage = 30;

  // Establishing book data to load book profile
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [bookCover, setBookCover] = useState('');
  const [desc, setDesc] = useState('');
  const [pages, setPages] = useState(0);

  // BookSummary context
  const context = useContext(LibraryContext);

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
          onClick={() => {
            toggleCategory(prefix);
            scrollToId("scroll");
          }}
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
                      context.deactivateBookProfile();
                      scrollToId("scroll");
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

  // Scroll checkpoint

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pull authors
  function concatenateAuthors(arr) {
    return arr
      .map(obj => obj.author.name)
      .join(', ');
  }

  return (
    <div id="scroll" className={styles['library-page']}>
      <div>
        <AboutMeParagraph props={styles['category']}>
          Select category:
        </AboutMeParagraph>
        <ul className={styles['category-list']} style={{ fontFamily: raleway.style.fontFamily }}>
          <li>
            <button 
              className={styles['category-button']} 
              onClick={() => { 
                setSelectedCategory("read"); 
                setOpenCategory(null);
                context.deactivateBookProfile();
                scrollToId("scroll");
              }}
            >
              <span className={categorySelectRead}>Books I've Read</span>
            </button>
          </li>
          <li>
            <button 
              className={styles['category-button']} 
              onClick={() => { 
                setSelectedCategory("currentlyReading"); 
                setOpenCategory(null);
                context.deactivateBookProfile();
                scrollToId("scroll");
              }}
            >
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
                  context.deactivateBookProfile();
                  scrollToId("scroll");
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

      <div className={styles['library-second-col']}>
        <div className={clsx(
          styles['library-grid'],
          !context.displayLibrary && styles['dismount'])}
        >
          <AnimatePresence mode="wait">
            {currentBooks.map((item, index) => (
              <BookBounce key={`${item.book.title}-${currentPage}-${index}`} delayIndex={index}>
                {item?.book?.image?.url ? (
                  <div className={styles['book-image']}>
                    <button
                      className={clsx(styles['category-button'], bookStyles['book-container'])}
                      onClick={() => {
                        context.activateBookProfile();
                        setTitle(item.book.title);
                        setAuthor(concatenateAuthors(item.book.contributions))
                        setBookCover(item.book.image.url);
                        setDesc(item.book.description);
                        setPages(item.book.pages);
                        scrollToId("scroll");
                      }}
                    >
                      <ThreeDBook image={item.book.image.url} alt={item.book.title} />
                    </button>
                  </div>
                ) : (
                  <button
                    className={styles['category-button']}
                  >
                    <BookCard title={item.book.title} />
                  </button>
                )}
              </BookBounce>
            ))}
          </AnimatePresence>
        </div>

        <div className={clsx(
          styles['pagination'],
          !context.displayLibrary && styles['dismount'])}
        >
          <button
            className={styles['category-button']}
            onClick={() => {
              setCurrentPage(prev => Math.max(prev - 1, 1));
              scrollToId("scroll");
            }}
            disabled={currentPage === 1}
          >
            {(currentPage === 1) ? 
              <span className={clsx(styles['page-button'], styles['disabled'])} style={{ fontFamily: jersey.style.fontFamily }}>Prev</span> 
              : <LightUpText props={styles['page-button']} style={{ fontFamily: jersey.style.fontFamily }}>Prev</LightUpText>}
          </button>
              <span className={styles['page-button']} style={{ fontFamily: jersey.style.fontFamily }}> {currentPage} / {totalPages} </span>
          <button
            className={styles['category-button']}
            onClick={() => {
              setCurrentPage(prev => Math.min(prev + 1, totalPages));
              scrollToId("scroll");
            }} 
            disabled={currentPage === totalPages}
          >
            {(currentPage === totalPages) ?
              <span className={clsx(styles['page-button'], styles['disabled'])} style={{ fontFamily: jersey.style.fontFamily }}>Next</span>
              : <LightUpText props={styles['page-button']} style={{ fontFamily: jersey.style.fontFamily }}>Next</LightUpText>}
            {/* make sure text DOESN'T light up at end of pagination */}
          </button>
        </div>

        {!context.displayLibrary && <BookSummary title={title} author={author} bookCover={bookCover} desc={desc} pages={pages} />}

      </div>

    </div>
  );
}