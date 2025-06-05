"use client";

import React, { useState, useEffect, useRef } from "react";
import Loader from "@/components/Loader";
import styles from "./Home.module.css";

const spritesheet = "/pixelart/spacesprites.png";
const spriteDataUrl = "/pixelart/spacesprites.json";

export default function AnimatedBackground({ children }) {
  const [frame, setFrame] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [spriteData, setSpriteData] = useState(null);
  const animationSpeed = 100; // Adjust for desired animation speed (milliseconds)
  const animationInterval = useRef(null);

  useEffect(() => {
    const preloadAssets = async () => {
      try {
        // Load image
        const img = new Image();
        img.src = spritesheet;
        // await img.decode(); // Ensure image is fully loaded, but doesn't work on Chrome Android for some reason?

      await new Promise((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = (err) => {
          console.error("Image failed to load:", err);
          reject(new Error("Image load failed"));
        };
      });

        // Load JSON
        const res = await fetch(spriteDataUrl);
        const data = await res.json();
        setSpriteData(data);

        // Mark as loaded
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load assets:", error);
      }
    };

    preloadAssets();
  }, []);

  useEffect(() => {
    if (!isLoaded || !spriteData) return;

    const frames = spriteData.frames;
    const frameCount = Object.keys(frames).length;
    let currentFrame = 0;

    animationInterval.current = setInterval(() => {
      setFrame(currentFrame);
      currentFrame = (currentFrame + 1) % frameCount;
    }, animationSpeed);

    return () => clearInterval(animationInterval.current);
  }, [isLoaded, spriteData]);

  if (!isLoaded || !spriteData) {
    return (
      <Loader />
    );
  }

  const frameData = spriteData.frames[Object.keys(spriteData.frames)[frame]].frame;

  const backgroundStyle = {
    backgroundImage: `url(${spritesheet})`,
    width: frameData.w,
    height: frameData.h,
    backgroundPosition: `-${frameData.x}px -${frameData.y}px`,
  };

  return (
    <div 
      className={styles['twinkle-background']}
      style={backgroundStyle}
    >
      {children}
    </div>
  );
};