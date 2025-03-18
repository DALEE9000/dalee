"use client"

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const spritesheet = '/pixelart/spacesprites.png';
const res = await fetch('/pixelart/spacesprites.json');
const spriteData = await res.json();

const AnimatedBackground = ({ children }) => {
  const [frame, setFrame] = useState(0);
  const animationSpeed = 100; // Adjust for desired animation speed (milliseconds)
  const animationInterval = useRef(null);

  useEffect(() => {
    const frames = spriteData.frames;
    const frameCount = Object.keys(frames).length;
    let currentFrame = 0;

    animationInterval.current = setInterval(() => {
      setFrame(currentFrame);
      currentFrame = (currentFrame + 1) % frameCount;
    }, animationSpeed);

    return () => clearInterval(animationInterval.current); // Clean up interval on unmount
  }, []);

  const frameData = spriteData.frames[Object.keys(spriteData.frames)[frame]].frame;

  const backgroundStyle = {
    backgroundImage: `url(${spritesheet})`,
    width: frameData.w,
    height: frameData.h,
    backgroundPosition: `-${frameData.x}px -${frameData.y}px`,
    animation: 'none', // Disable CSS animation
  };

  return <div 
            className="m-0 p-0 w-full h-full"
            style={backgroundStyle}
        >
            {children}
        </div>;
};

export default AnimatedBackground;