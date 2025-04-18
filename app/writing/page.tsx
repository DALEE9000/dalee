"use client"

import '../globals.css';
import { useEffect } from 'react';
import clsx from 'clsx';
import { raleway } from '@/components/Fonts';
import styles from "@/components/home/Home.module.css";

const box1 = clsx(styles['twinkle-box'], styles['about-box1'])

declare global {
  interface Window {
    SubstackFeedWidget?: {
      substackUrl: string;
      posts?: number;
      colors?: {
        primary?: string;
        secondary?: string;
        background?: string;
      };
    };
  }
}

export default function Writing() {
  useEffect(() => {
    // Set up the widget configuration
    window.SubstackFeedWidget = {
      substackUrl: "alphabetagency.substack.com",
      posts: 5,
      colors: {
        primary: "#FFFFFF",
        secondary: "#FFFFFF",
        background: "#29465B",
      },
    };

    // Dynamically load the Substack feed script
    const script = document.createElement("script");
    script.src = "https://substackapi.com/embeds/feed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up if needed
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <section id={styles['about']}>
        <div className={box1}>
          <p
            className={styles['about-text']}
            style={{
              fontFamily: raleway.style.fontFamily,
            }}
          >
            I write a Substack named Alphabet Agency. 
          </p>

          <div 
            id='substack-feed-embed' 
            className={styles['substack-post-embed']}
          />

        </div>
      </section>
    </>
  );
}