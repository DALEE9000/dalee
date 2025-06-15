"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedBackground from '@/components/AnimatedBackground';
import { getWeather } from '@/components/Weather';
import styles from "./Splash.module.css";

// Paths
const rainySkySpriteSheet = '/pixelart/rain/rainy-sky-day.png';
const rainySkySpriteSheetData = '/pixelart/rain/rainy-sky-day.json';

const stormySkySpriteSheet = '/pixelart/storm/stormy-sky-day.png';
const stormySkySpriteSheetData = '/pixelart/storm/stormy-sky-day.json';

const nightSkySpriteSheet = '/pixelart/night/night-sky.png';
const nightSkySpriteSheetData = '/pixelart/night/night-sky.json';

// Function for converting to 24 hr
function to24Hour(timeStr) {
  const [time, modifier] = timeStr.trim().split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier.toLowerCase() === "pm" && hours !== 12) {
    hours += 12;
  }
  if (modifier.toLowerCase() === "am" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
}

// Function for day/night cycle
function isDaytime(sunriseStr, sunsetStr) {
  const now = new Date();
  const today = new Date().toLocaleDateString('en-CA');

  const sunrise24 = to24Hour(sunriseStr); // Convert to 24-hour format
  const sunset24 = to24Hour(sunsetStr);

  const sunrise = new Date(`${today}T${sunrise24}`);
  const sunset = new Date(`${today}T${sunset24}`);

  console.log('is the sun up?', now >= sunrise && now <= sunset)
  console.log('date:', today)
  console.log('sunrise:', sunrise)
  console.log('sunset:', sunset)

  return now >= sunrise && now <= sunset;
}

export default function Parallax() {

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getWeather().then(setWeather);
  }, []);

  if (!weather) return null;

  // Defining variables from API paths
  var precipitation = weather.current.current.precip_mm;
  var cloudCover = weather.current.current.cloud;
  var sunrise = weather.astronomy.astronomy.astro.sunrise;
  var sunset = weather.astronomy.astronomy.astro.sunset;
  var sunUp = isDaytime(sunrise, sunset);
  // precipitation = 0;
  // cloudCover = 0;
  // sunUp = false;

  // Add static layers here
  const staticImages = [
    ...(sunUp ? ["day/sky1"] : []), 
    ...(sunUp ? ["day/sky2"] : []), 
    ...(sunUp ? ["day/sky3"] : []), 
    ...((((precipitation > 0 || cloudCover > 50) || (!sunUp))) ? [] : ["landscape/sun1"]),
    ...(!sunUp ? ["night/moon"] : []),
  ];

  // Add dynamic layers here
  const elements = [
    ...((sunUp) ? [{ element: "clouds/cloud1", duration: 120 }] : []),
    ...((sunUp) ? [{ element: "clouds/cloud2", duration: 90 }] : []),
    ...((sunUp) ? [{ element: "clouds/cloud3", duration: 150 }] : []),
    ...((!sunUp) ? [{ element: "night/cloud1", duration: 120 }] : []),
    ...((!sunUp) ? [{ element: "night/cloud2", duration: 90 }] : []),
    ...((!sunUp) ? [{ element: "night/cloud3", duration: 150 }] : []),
    ...((sunUp) ? [{ element: "landscape/mountains", duration: 240 }] : [{ element: "night/mountains-night", duration: 240 }]), // MOUNTAINS
  ];

  // This ensures a seamless horizontal wrap for dynamic layers
  const animateparam = [
    { initialX: '100%', animateX: '-100%' },
    { initialX: '0%', animateX: '-200%' },
    { initialX: '200%', animateX: '0%' },
  ];

  // Add masks here
  const masks = [
    ...((precipitation > 0 && precipitation < 8) || (cloudCover > 50 && cloudCover < 80) ? ["landscape/muggymask-day"] : []), // RAINY / CLOUDY DAY
    ...((precipitation >= 8) || (cloudCover >= 80) ? ["landscape/muggymask-day-stormy"] : []), // STORMY / VERY CLOUDY DAY
  ]

  // Add precipitation here
  const precip = [
    ...((precipitation < 8 && precipitation > 0) ? [{ image: rainySkySpriteSheet, sprite: rainySkySpriteSheetData }] : []), // RAIN
    ...((precipitation >= 8) ? [{ image: stormySkySpriteSheet, sprite: stormySkySpriteSheetData }] : [])
  ]

  let image, sprite;

  if (precipitation > 0 && precip.length > 0) {
    ({ image, sprite } = precip[0]);
  }

  console.log('location:', weather.current.location.name, 'region:', weather.current.location.region, 'lat:', weather.current.location.lat, 'lon:', weather.current.location.lon, 'precipitation:', precipitation, 'cloud cover:', cloudCover, 'sun up?', sunUp)

  return (
    <>
    <div 
        className={styles['parallax-container']}
    >
      {/* PRECIPITATION ANIMATION */}
      {(precipitation > 0) &&
      <AnimatedBackground 
        spriteSheetURL={image}
        spriteDataURL={sprite}
        aspectRatio={1.8125}
        zIndex={15}
      />}

      {/* NIGHT ANIMATION */}
      {!sunUp &&
      <AnimatedBackground 
        spriteSheetURL={nightSkySpriteSheet}
        spriteDataURL={nightSkySpriteSheetData}
        aspectRatio={1.8125}
        zIndex={1}
      />}

      {/* MASKS */}
      {((precipitation > 0) || (cloudCover > 50)) &&
      <div
        className={styles['static-layer']}
        style={{ 
          backgroundImage: `url(/pixelart/${masks[0]}.png)`,
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