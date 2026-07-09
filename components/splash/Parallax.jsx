"use client"

import { useState, useEffect, useMemo, useRef } from 'react';
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

// Used when the weather fetch fails, so the splash still renders (clear day)
const FALLBACK_WEATHER = {
  current: { current: { precip_mm: 0, cloud: 0 } },
  astronomy: { astronomy: { astro: { sunrise: '6:00 AM', sunset: '8:00 PM' } } },
};

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

// CSS animation class per copy (a/b/c correspond to the three phase-offset keyframes)
const layerClasses = ['parallax-layer-a', 'parallax-layer-b', 'parallax-layer-c'];

// Fetch AND decode an image so the reveal doesn't pop layers in one by one.
// Never rejects — a single missing asset shouldn't hold the page hostage.
const preloadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.decode().then(resolve, resolve);
  });

export default function Parallax({ onReady }) {

  // Initialize synchronously from sessionStorage — no flash on cached visits
  const [weather, setWeather] = useState(() => getCachedWeather());
  const [layersReady, setLayersReady] = useState(false);
  const [spritesReady, setSpritesReady] = useState(0);

  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    if (weather) return;
    let cancelled = false;
    getWeather().then(data => {
      if (!cancelled) setWeather(data || FALLBACK_WEATHER);
    });
    return () => { cancelled = true; };
  }, []);

  // Build the scene (which layers, masks, and sprite animations to show)
  const scene = useMemo(() => {
    if (!weather) return null;

    const precipitation = weather.current.current.precip_mm;
    const cloudCover = weather.current.current.cloud;
    const sunrise = weather.astronomy.astronomy.astro.sunrise;
    const sunset = weather.astronomy.astronomy.astro.sunset;
    const sunUp = isDaytime(sunrise, sunset);

    // Add static layers here
    const staticImages = [
      ...(sunUp ? ["day/sky1", "day/sky2", "day/sky3"] : []),
      ...((((precipitation > 0 || cloudCover > 50) || (!sunUp))) ? [] : ["landscape/sun1"]),
      ...(!sunUp ? ["night/moon"] : []),
    ];

    // Add dynamic layers here
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

    // Add masks here
    const mask =
      ((precipitation > 0 && precipitation < 8) || (cloudCover > 50 && cloudCover < 80 && sunUp))
        ? "landscape/muggymask-day" // RAINY / CLOUDY DAY
        : ((precipitation >= 8) || (cloudCover >= 80 && sunUp))
          ? "landscape/muggymask-day-stormy" // STORMY / VERY CLOUDY DAY
          : null;

    // Add precipitation here
    const precipSprite =
      precipitation >= 8
        ? { image: stormySkySpriteSheet, spriteData: stormySkySpriteData }
        : precipitation > 0
          ? { image: rainySkySpriteSheet, spriteData: rainySkySpriteData }
          : null;

    return { sunUp, staticImages, elements, mask, precipSprite };
  }, [weather]);

  // Preload + decode every CSS background layer before revealing the scene
  useEffect(() => {
    if (!scene) return;
    let cancelled = false;

    const urls = [
      ...scene.staticImages,
      ...scene.elements.map(({ element }) => element),
      ...(scene.mask ? [scene.mask] : []),
    ].map((name) => `/pixelart/${name}.png`);

    Promise.all(urls.map(preloadImage)).then(() => {
      if (!cancelled) setLayersReady(true);
    });

    return () => { cancelled = true; };
  }, [scene]);

  // Signal ready once the CSS layers are decoded and every sprite animation
  // (rain/storm and/or night sky) has produced its first frame
  const spritesNeeded = scene
    ? (scene.precipSprite ? 1 : 0) + (!scene.sunUp ? 1 : 0)
    : 0;
  const ready = !!scene && layersReady && spritesReady >= spritesNeeded;

  useEffect(() => {
    if (ready) onReadyRef.current?.();
  }, [ready]);

  if (!scene) return null;

  const handleSpriteReady = () => setSpritesReady((n) => n + 1);

  return (
    <div className={styles['parallax-container']}>
      {/* PRECIPITATION ANIMATION */}
      {scene.precipSprite &&
      <AnimatedBackground
        spriteSheetURL={scene.precipSprite.image}
        spriteData={scene.precipSprite.spriteData}
        aspectRatio={1.8125}
        zIndex={15}
        onReady={handleSpriteReady}
      />}

      {/* NIGHT ANIMATION */}
      {!scene.sunUp &&
      <AnimatedBackground
        spriteSheetURL={nightSkySpriteSheet}
        spriteData={nightSkySpriteData}
        aspectRatio={1.8125}
        zIndex={1}
        onReady={handleSpriteReady}
      />}

      {/* MASKS */}
      {scene.mask &&
      <div
        className={styles['static-layer']}
        style={{
          backgroundImage: `url(/pixelart/${scene.mask}.png)`,
          zIndex: 13,
        }}
      />}

      {/* STATIC LAYERS*/}
      {scene.staticImages.map((bg) => (
        <div
          key={bg}
          className={styles['static-layer']}
          style={{ backgroundImage: `url(/pixelart/${bg}.png)` }}
        />
      ))}

      {/*DYNAMIC LAYERS*/}
      {scene.elements.map(({ element, duration }) =>
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
  );
};
