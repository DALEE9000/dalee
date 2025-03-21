"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from "./Splash.module.css";

{/* This ensures a seamless horizontal wrap */}
const animateparam = [
  { initialX: '100%', animateX: '-100%' },
  { initialX: '0%', animateX: '-200%' },
  { initialX: '200%', animateX: '0%' },
];

{/* Add dynamic layers here */}
const elements = [
  { element: "cloud1", duration: 120 },
  { element: "cloud2", duration: 90 },
  { element: "cloud3", duration: 150 },
  { element: "mountains", duration: 240 }
];

{/* Add static layers here */}
const staticImages = ["sky1", "sky2", "sky3", "sun1"];

export default React.memo(function Parallax() {

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      try {
        const imageUrls = [
          ...staticImages.map((bg) => `/pixelart/${bg}.png`),
          ...elements.map((el) => `/pixelart/${el.element}.png`),
        ];

        const imagePromises = imageUrls.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        });

        await Promise.all(imagePromises); // Wait for all images to load
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load images:", error);
      }
    };

    preloadImages();
  }, []);


  return (
    <>
    <div 
        className={styles['parallax-container']}
    >
      {/* STATIC LAYERS*/}
      {staticImages.map((bg) => (
        <div
          key={bg}
          className={`${styles['static-layer']}`}
          style={{ backgroundImage: `url(/pixelart/${bg}.png)` }}
        />
      ))}

      {/*DYNAMIC LAYERS*/}
      {/* You need to triple each motion.div so that the animation loops correctly. */}

      {elements.map(({ element, duration }) =>
        animateparam.map((layer, index) => (
          <motion.div
            key={`${element}-${index}`}
            className={`${styles["parallax-layer"]} ${styles[element]}`}
            style={{ 
              backgroundImage: `url(/pixelart/${element}.png)`,
            }}
            initial={{ x: layer.initialX }}
            animate={{ x: layer.animateX }}
            transition={{
              repeat: Infinity,
              duration,
              ease: "linear",
            }}
          >
          </motion.div>
        ))
      )}
    </div>
    </>
  );
});