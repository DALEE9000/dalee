"use client";
import { useEffect, useState } from "react";
import { DivAnimation, AboutMeParagraph } from '@/components/BoxAnimations';

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
      {books.map((item, index) => (
        <AboutMeParagraph
          key={index}
        >
          {item.book.title}
        </AboutMeParagraph>
        )
      )}
    </>
  );
}