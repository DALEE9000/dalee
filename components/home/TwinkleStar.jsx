"use client";

import React, { useRef, useEffect, useState } from "react";

const spritesheetUrl = "/pixelart/spacesprites.png";
const spriteDataUrl = "/pixelart/spacesprites.json";

export default function AnimatedBackground({ children }) {
  const canvasRef = useRef(null);
  const spriteSheetRef = useRef(null);
  const spriteDataRef = useRef(null);
  const frameRef = useRef(0);
  const animationRef = useRef(null);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const img = new Image();
        img.src = spritesheetUrl;
        img.crossOrigin = "anonymous";
        await new Promise((res, rej) => {
          img.onload = res;
          img.onerror = rej;
        });
        spriteSheetRef.current = img;

        const res = await fetch(spriteDataUrl);
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

    const width = window.innerWidth;
    const height = width / 1.33;
    canvas.width = width;
    canvas.height = height;

    ctx.imageSmoothingEnabled = false;

    const draw = () => {
      const key = frameKeys[frameRef.current];
      const frame = data.frames[key].frame;

      ctx.drawImage(
        sheet, // Image source
        frame.x, frame.y, // Top left corner to crop from
        frame.w, frame.h, // Section to crop (i.e. each frame)
        0, 0, // where to place cropped section
        width, height // size of the cropped section
      );

      frameRef.current = (frameRef.current + 1) % frameCount;
    };

    animationRef.current = setInterval(draw, 100); // 10 FPS
    return () => clearInterval(animationRef.current);
  }, [isReady]);

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
          zIndex: -1,
        }}
      />
      {children}
    </div>
  );
}
