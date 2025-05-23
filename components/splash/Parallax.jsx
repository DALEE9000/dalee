"use client"

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

export default function Parallax() {

  return (
    <>
    <div 
        className={styles['parallax-container']}
    >
      {/* STATIC LAYERS*/}
      {staticImages.map((bg) => (
        <div
          key={bg}
          className={styles['static-layer']}
          style={{ backgroundImage: `url(/pixelart/${bg}.png)` }}
        />
      ))}

      {/*DYNAMIC LAYERS*/}

      {elements.map(({ element, duration }) =>
        animateparam.map((layer, index) => (
          <motion.div
            key={`${element}-${index}`}
            className={styles["parallax-layer"]}
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
};