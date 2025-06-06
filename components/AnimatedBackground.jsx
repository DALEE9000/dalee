"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import { SplashContext } from '@/components/Context';

// Starry night: aspect ratio is 1.33, zIndex is -1
// Splash page: aspect ratio is 1.8125, zIndex is 15

export default function AnimatedBackground({ 
  children,
  spriteSheetURL,
  spriteDataURL,
  aspectRatio,
  zIndex
 }) {
  const canvasRef = useRef(null);
  const spriteSheetRef = useRef(null);
  const spriteDataRef = useRef(null);
  const frameRef = useRef(0);
  const animationRef = useRef(null);

  const [isReady, setIsReady] = useState(false);

  const context = useContext(SplashContext);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const img = new Image();
        img.src = spriteSheetURL;
        img.crossOrigin = "anonymous";
        await new Promise((res, rej) => {
          img.onload = res;
          img.onerror = rej;
        });
        spriteSheetRef.current = img;

        const res = await fetch(spriteDataURL);
        const json = await res.json();
        spriteDataRef.current = json;

        setIsReady(true);
      } catch (e) {
        console.error("Asset loading error:", e);
      }
    };

    loadAssets();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const sheet = spriteSheetRef.current;
    const data = spriteDataRef.current;

    if (!ctx || !sheet || !data) return;

    const frameKeys = Object.keys(data.frames);
    const frameCount = frameKeys.length;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = context.onSplash ? window.innerHeight : width / aspectRatio;
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas(); // Initial sizing
    window.addEventListener("resize", resizeCanvas);

    ctx.imageSmoothingEnabled = false;

    const draw = () => {
      const key = frameKeys[frameRef.current];
      const frame = data.frames[key].frame;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        sheet, // Image source
        frame.x, frame.y, // Top-left corner starting point of crop
        frame.w, frame.h, // Area to crop
        0, 0, // Where to place cropped image
        canvas.width, canvas.height // How the cropped image should resize
      );

      frameRef.current = (frameRef.current + 1) % frameCount;
    };

    animationRef.current = setInterval(draw, 100); // 10 FPS

    return () => {
      clearInterval(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isReady, context.onSplash, aspectRatio]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "0px" }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "auto",
          zIndex: zIndex,
        }}
      />
      {children}
    </div>
  );
}