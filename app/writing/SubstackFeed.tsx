"use client";

import { useEffect, useRef, useState } from "react";
import { jersey, raleway } from "@/components/Fonts";
import Pagination from "@/components/Pagination";
import styles from "./Writing.module.css";

const PER_PAGE = 8;

interface Post {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  image: string | null;
}

function formatDate(pubDate: string): string {
  const d = new Date(pubDate);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function SubstackFeed() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [page, setPage] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/substack")
      .then((r) => (r.ok ? r.json() : { posts: [] }))
      .then((d) => {
        if (!cancelled) setPosts(d.posts ?? []);
      })
      .catch(() => {
        if (!cancelled) setPosts([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Bring the top of the list back into view when flipping pages
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  if (posts === null) {
    return (
      <p className={styles["feed-status"]} style={{ fontFamily: jersey.style.fontFamily }}>
        loading articles...
      </p>
    );
  }

  if (posts.length === 0) {
    // Feed unavailable — the intro paragraph above already links to Substack
    return null;
  }

  const pageCount = Math.ceil(posts.length / PER_PAGE);
  const visible = posts.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <div ref={listRef} className={styles["feed"]}>
      {visible.map((post) => (
        <a
          key={post.link}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles["feed-card"]}
        >
          {post.image && (
            // Substack CDN images; plain img keeps it simple and lazy
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.image}
              alt=""
              loading="lazy"
              decoding="async"
              className={styles["feed-card-image"]}
            />
          )}
          <div className={styles["feed-card-body"]}>
            <div className={styles["feed-card-title"]} style={{ fontFamily: raleway.style.fontFamily }}>
              {post.title}
            </div>
            {post.description && (
              <div className={styles["feed-card-desc"]} style={{ fontFamily: raleway.style.fontFamily }}>
                {post.description}
              </div>
            )}
            <div className={styles["feed-card-date"]} style={{ fontFamily: jersey.style.fontFamily }}>
              {formatDate(post.pubDate)}
            </div>
          </div>
        </a>
      ))}

      <Pagination
        page={page + 1}
        pageCount={pageCount}
        onPrev={() => setPage((p) => Math.max(0, p - 1))}
        onNext={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
        className={styles["feed-pagination"]}
      />
    </div>
  );
}
