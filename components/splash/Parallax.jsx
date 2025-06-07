"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
import { getWeather } from '@/components/Weather';
import styles from "./Splash.module.css";
import { preconnect } from 'react-dom';

// This ensures a seamless horizontal wrap
const animateparam = [
  { initialX: '100%', animateX: '-100%' },
  { initialX: '0%', animateX: '-200%' },
  { initialX: '200%', animateX: '0%' },
];

// Add dynamic layers here
const elements = [
  { element: "cloud1", duration: 120 },
  { element: "cloud2", duration: 90 },
  { element: "cloud3", duration: 150 },
  { element: "mountains", duration: 240 }
];

// Paths
const rainySkySpriteSheet = '/pixelart/rainy-sky-day.png';
const rainySkySpriteSheetData = '/pixelart/rainy-sky-day.json';

const stormySkySpriteSheet = '/pixelart/stormy-sky-day.png';
const stormySkySpriteSheetData = '/pixelart/stormy-sky-day.json';

export default function Parallax() {

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getWeather().then(setWeather);
  }, []);

  if (!weather) return null;

  var precipitation = weather.current.current.precip_mm;
  precipitation = 9;

  // Add static layers here
  const staticImages = [
    "sky1", 
    "sky2", 
    "sky3", 
    ...(precipitation > 0 ? [] : ["sun1"])
  ];

  console.log(weather.current.location.name, weather.current.location.region, weather.current.current.precip_mm)

  return (
    <>
    <div 
        className={styles['parallax-container']}
    >
      {/* RAIN ANIMATION */}
      {(precipitation < 8 && precipitation > 0) &&
      <AnimatedBackground 
        spriteSheetURL={rainySkySpriteSheet}
        spriteDataURL={rainySkySpriteSheetData}
        aspectRatio={1.8125}
        zIndex={15}
      />}

      {/* STORMY ANIMATION */}
      {(precipitation >= 8) &&
      <AnimatedBackground 
        spriteSheetURL={stormySkySpriteSheet}
        spriteDataURL={stormySkySpriteSheetData}
        aspectRatio={1.8125}
        zIndex={15}
      />}

      {/* RAINY DAY MASK */}
      {(precipitation > 0 && precipitation < 8) && <div
        className={styles['static-layer']}
        style={{ 
          backgroundImage: `url(/pixelart/muggymask-day.png)`,
          zIndex: 13,
        }}
      />}

      {/* STORMY DAY MASK */}
      {(precipitation >= 8) && <div
        className={styles['static-layer']}
        style={{ 
          backgroundImage: `url(/pixelart/muggymask-day-stormy.png)`,
          zIndex: 13,
        }}
      />}

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