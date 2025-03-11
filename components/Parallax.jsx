"use client"

import Image from "next/image";
import { motion } from 'framer-motion';
import styles from "./Parallax.module.css";

export default function Parallax(
    children,
) {
  return (
    <div 
        className={styles['parallax-container']}
    >
      {/* STATIC LAYERS*/}

      <div
        className={`${styles['static-layer']}`}
        style={{ backgroundImage: 'url(/pixelart/sky1.png)' }} // Adjust image paths
      />

      <div
        className={`${styles['static-layer']}`}
        style={{ backgroundImage: 'url(/pixelart/sky2.png)' }} // Adjust image paths
      />

      <div
        className={`${styles['static-layer']}`}
        style={{ backgroundImage: 'url(/pixelart/sky3.png)' }} // Adjust image paths
      />

      <div
        className={`${styles['static-layer']}`}
        style={{ backgroundImage: 'url(/pixelart/sun1.png)' }} // Adjust image paths
      />

      {/*DYNAMIC LAYERS*/}
      {/* You need to triple each motion.div so that the animation loops correctly. */}

      {/* CLOUD1 */}

      <motion.div
        className={`${styles['parallax-layer']} ${styles['cloud1']}`}
        style={{ backgroundImage: 'url(/pixelart/cloud1.png)' }}
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{
          repeat: Infinity,
          duration: 120, // Different speed for each layer
          ease: 'linear',
        }}
      >
        <div className={styles['parallax-layer']} style={{ backgroundImage: 'url(/pixelart/cloud1.png)' }} />
      </motion.div>

      <motion.div
        className={`${styles['parallax-layer']} ${styles['cloud1']}`}
        style={{ backgroundImage: 'url(/pixelart/cloud1.png)' }}
        initial={{ x: '0%' }}
        animate={{ x: '-200%' }}
        transition={{
          repeat: Infinity,
          duration: 120, // Different speed for each layer
          ease: 'linear',
        }}
      >
        <div className={styles['parallax-layer']} style={{ backgroundImage: 'url(/pixelart/cloud1.png)' }} />
      </motion.div>

      <motion.div
        className={`${styles['parallax-layer']} ${styles['cloud1']}`}
        style={{ backgroundImage: 'url(/pixelart/cloud1.png)' }}
        initial={{ x: '200%' }}
        animate={{ x: '0%' }}
        transition={{
          repeat: Infinity,
          duration: 120, // Different speed for each layer
          ease: 'linear',
        }}
      >
        <div className={styles['parallax-layer']} style={{ backgroundImage: 'url(/pixelart/cloud1.png)' }} />
      </motion.div>

      {/* CLOUD2 */}

      <motion.div
        className={`${styles['parallax-layer']} ${styles['cloud2']}`}
        style={{ backgroundImage: 'url(/pixelart/cloud2.png)' }}
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{
          repeat: Infinity,
          duration: 90, // Different speed for each layer
          ease: 'linear',
        }}
      >
        <div className={styles['parallax-layer']} style={{ backgroundImage: 'url(/pixelart/cloud2.png)' }} />
      </motion.div>

      <motion.div
        className={`${styles['parallax-layer']} ${styles['cloud2']}`}
        style={{ backgroundImage: 'url(/pixelart/cloud2.png)' }}
        initial={{ x: '0%' }}
        animate={{ x: '-200%' }}
        transition={{
          repeat: Infinity,
          duration: 90, // Different speed for each layer
          ease: 'linear',
        }}
      >
        <div className={styles['parallax-layer']} style={{ backgroundImage: 'url(/pixelart/cloud2.png)' }} />
      </motion.div>

      <motion.div
        className={`${styles['parallax-layer']} ${styles['cloud2']}`}
        style={{ backgroundImage: 'url(/pixelart/cloud2.png)' }}
        initial={{ x: '200%' }}
        animate={{ x: '0%' }}
        transition={{
          repeat: Infinity,
          duration: 90, // Different speed for each layer
          ease: 'linear',
        }}
      >
        <div className={styles['parallax-layer']} style={{ backgroundImage: 'url(/pixelart/cloud2.png)' }} />
      </motion.div>

      {/* CLOUD3 */}

      <motion.div
        className={`${styles['parallax-layer']} ${styles['cloud3']}`}
        style={{ backgroundImage: 'url(/pixelart/cloud3.png)' }}
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{
          repeat: Infinity,
          duration: 150, // Different speed for each layer
          ease: 'linear',
        }}
      >
        <div className={styles['parallax-layer']} style={{ backgroundImage: 'url(/pixelart/cloud3.png)' }} />
      </motion.div>

      <motion.div
        className={`${styles['parallax-layer']} ${styles['cloud3']}`}
        style={{ backgroundImage: 'url(/pixelart/cloud3.png)' }}
        initial={{ x: '0%' }}
        animate={{ x: '-200%' }}
        transition={{
          repeat: Infinity,
          duration: 150, // Different speed for each layer
          ease: 'linear',
        }}
      >
        <div className={styles['parallax-layer']} style={{ backgroundImage: 'url(/pixelart/cloud3.png)' }} />
      </motion.div>

      <motion.div
        className={`${styles['parallax-layer']} ${styles['cloud3']}`}
        style={{ backgroundImage: 'url(/pixelart/cloud3.png)' }}
        initial={{ x: '200%' }}
        animate={{ x: '0%' }}
        transition={{
          repeat: Infinity,
          duration: 150, // Different speed for each layer
          ease: 'linear',
        }}
      >
        <div className={styles['parallax-layer']} style={{ backgroundImage: 'url(/pixelart/cloud3.png)' }} />
      </motion.div>

      {/* MOUNTAIN */}

      <motion.div
        className={`${styles['parallax-layer']} ${styles['mountain']}`}
        style={{ backgroundImage: 'url(/pixelart/mountains.png)' }}
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{
          repeat: Infinity,
          duration: 240, // Different speed for each layer
          ease: 'linear',
        }}
      >
        <div className={styles['parallax-layer']} style={{ backgroundImage: 'url(/pixelart/mountains.png)' }} />
      </motion.div>

      <motion.div
        className={`${styles['parallax-layer']} ${styles['mountain']}`}
        style={{ backgroundImage: 'url(/pixelart/mountains.png)' }}
        initial={{ x: '0%' }}
        animate={{ x: '-200%' }}
        transition={{
          repeat: Infinity,
          duration: 240, // Different speed for each layer
          ease: 'linear',
        }}
      >
        <div className={styles['parallax-layer']} style={{ backgroundImage: 'url(/pixelart/mountains.png)' }} />
      </motion.div>

      <motion.div
        className={`${styles['parallax-layer']} ${styles['mountain']}`}
        style={{ backgroundImage: 'url(/pixelart/mountains.png)' }}
        initial={{ x: '200%' }}
        animate={{ x: '0%' }}
        transition={{
          repeat: Infinity,
          duration: 240, // Different speed for each layer
          ease: 'linear',
        }}
      >
        <div className={styles['parallax-layer']} style={{ backgroundImage: 'url(/pixelart/mountains.png)' }} />
      </motion.div>



    </div>
  );
}
