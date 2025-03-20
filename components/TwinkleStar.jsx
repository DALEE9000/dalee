"use client";

import React, { useState, useEffect, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Loader from "@/components/Loader";

const spritesheet = "/pixelart/spacesprites.png";
const spriteDataUrl = "/pixelart/spacesprites.json";

const AnimatedBackground = React.memo(({ children }) => {
  const [frame, setFrame] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [spriteData, setSpriteData] = useState(null);
  const animationSpeed = 100; // Adjust for desired animation speed (milliseconds)
  const animationInterval = useRef(null);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  };

  useEffect(() => {
    const preloadAssets = async () => {
      try {
        // Load image
        const img = new Image();
        img.src = spritesheet;
        await img.decode(); // Ensure image is fully loaded

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
    animation: "none", // Disable CSS animation
  };

  return (
    <div className="m-0 p-0 w-full h-full" style={backgroundStyle}>
      {children}
    </div>
  );
});

export default AnimatedBackground;
