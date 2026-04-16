"use client"

import { useState, useEffect } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import { getWeather, getCachedWeather } from '@/components/Weather';
import styles from "./Splash.module.css";

// Sprite sheet image paths
const rainySkySpriteSheet = '/pixelart/rain/rainy-sky-day.png';
const stormySkySpriteSheet = '/pixelart/storm/stormy-sky-day.png';
const nightSkySpriteSheet = '/pixelart/night/night-sky.png';

// Sprite data imported directly (eliminates runtime fetch)
import rainySkySpriteData from '@/public/pixelart/rain/rainy-sky-day.json';
import stormySkySpriteData from '@/public/pixelart/storm/stormy-sky-day.json';
import nightSkySpriteData from '@/public/pixelart/night/night-sky.json';

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

  const sunrise24 = to24Hour(sunriseStr);
  const sunset24 = to24Hour(sunsetStr);

  const sunrise = new Date(`${today}T${sunrise24}`);
  const sunset = new Date(`${today}T${sunset24}`);

  return now >= sunrise && now <= sunset;
}

export default function Parallax() {

  // Initialize synchronously from sessionStorage — no flash on cached visits
  const [weather, setWeather] = useState(() => getCachedWeather());

  useEffect(() => {
    if (weather) return; // cache hit, skip the API calls
    getWeather().then(setWeather);
  }, []);

  if (!weather) return null;

  // Defining variables from API paths
  var precipitation = weather.current.current.precip_mm;
  var cloudCover = weather.current.current.cloud;
  var sunrise = weather.astronomy.astronomy.astro.sunrise;
  var sunset = weather.astronomy.astronomy.astro.sunset;
  var sunUp = isDaytime(sunrise, sunset);
  // Test variables for dev mode
  // var sunset = false;
  // precipitation = 0;
  //cloudCover = 0;
  // sunUp = false;

  // Add static layers here
  const staticImages = [
    ...(sunUp ? ["day/sky1", "day/sky2", "day/sky3"] : []),
    ...((((precipitation > 0 || cloudCover > 50) || (!sunUp))) ? [] : ["landscape/sun1"]),
    ...(!sunUp ? ["night/moon"] : []),
    // ...((sunUp && sunset) ? ["sunset/sky1"] : []),
    // ...((sunUp && sunset) ? ["sunset/sky2"] : []),
    // ...((sunUp && sunset) ? ["sunset/sky3"] : []),
    // ...((sunUp && sunset) ? ["sunset/sun1"] : []),
  ];

  // Add dynamic layers here
  // Cloud assets and durations here
  const clouds = [
  { name: "cloud1", duration: 120 },
  { name: "cloud2", duration: 90 },
  { name: "cloud3", duration: 150 },
  ];

  const withPrefix = (prefix, items) =>
    items.map(({ name, duration }) => ({
      element: `${prefix}/${name}`,
      duration,
    }));

  const elements = [
    ...(sunUp
      ? withPrefix("clouds", clouds)
      : withPrefix("night", clouds)),
    {
      element: sunUp
        ? "landscape/mountains"
        : "night/mountains-night",
      duration: 240, // Adjust mountain parallax duration here
    },
  ];

  // CSS animation class per copy (a/b/c correspond to the three phase-offset keyframes)
  const layerClasses = ['parallax-layer-a', 'parallax-layer-b', 'parallax-layer-c'];

  // Add masks here
  const masks = [
    ...(((precipitation > 0 && precipitation < 8) || (cloudCover > 50 && cloudCover < 80) && sunUp)? ["landscape/muggymask-day"] : []), // RAINY / CLOUDY DAY
    ...(((precipitation >= 8) || (cloudCover >= 80) && sunUp)? ["landscape/muggymask-day-stormy"] : []), // STORMY / VERY CLOUDY DAY
  ]

  // Add precipitation here
  const precip = [
    ...((precipitation < 8 && precipitation > 0) ? [{ image: rainySkySpriteSheet, spriteData: rainySkySpriteData }] : []), // RAIN
    ...((precipitation >= 8) ? [{ image: stormySkySpriteSheet, spriteData: stormySkySpriteData }] : [])
  ]

  let image, spriteData;

  if (precipitation > 0 && precip.length > 0) {
    ({ image, spriteData } = precip[0]);
  }


  return (
    <>
    <div
        className={styles['parallax-container']}
    >
      {/* PRECIPITATION ANIMATION */}
      {(precipitation > 0) &&
      <AnimatedBackground
        spriteSheetURL={image}
        spriteData={spriteData}
        aspectRatio={1.8125}
        zIndex={15}
      />}

      {/* NIGHT ANIMATION */}
      {!sunUp &&
      <AnimatedBackground
        spriteSheetURL={nightSkySpriteSheet}
        spriteData={nightSkySpriteData}
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
        layerClasses.map((cls, index) => (
          <div
            key={`${element}-${index}`}
            className={`${styles["parallax-layer"]} ${styles[cls]}`}
            style={{
              backgroundImage: `url(/pixelart/${element}.png)`,
              '--scroll-duration': `${duration}s`,
            }}
          />
        ))
      )}
    </div>
    </>
  );
};