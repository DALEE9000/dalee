"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import { SplashContext } from '@/components/Context';
import styles from './AnimatedBackground.module.css';

// Starry night: aspect ratio is 1.33, zIndex is -1
// Splash page: aspect ratio is 1.8125, zIndex is 15

// Slice one frame of the sprite sheet into its own bitmap. The sheets can be
// wider than the GPU's maximum texture size (the rain sheet is 29000px), which
// forces drawImage onto a slow software path when drawing from the full sheet.
// Per-frame bitmaps stay under the limit, and slicing here also means the
// giant sheet can be released after load. Frames are downscaled to what the
// device can actually display, so a phone holds ~3MB of bitmaps instead of ~185MB.
async function sliceFrame(img, frame, scale) {
  const w = Math.max(1, Math.round(frame.w * scale));
  const h = Math.max(1, Math.round(frame.h * scale));

  if (typeof createImageBitmap === "function") {
    try {
      return await createImageBitmap(img, frame.x, frame.y, frame.w, frame.h, {
        resizeWidth: w,
        resizeHeight: h,
        resizeQuality: "pixelated",
      });
    } catch (_) {
      // Older Safari: createImageBitmap without resize options
      try {
        return await createImageBitmap(img, frame.x, frame.y, frame.w, frame.h);
      } catch (_) {}
    }
  }

  // Fallback: copy the frame through an offscreen canvas
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const cctx = c.getContext("2d");
  cctx.imageSmoothingEnabled = false;
  cctx.drawImage(img, frame.x, frame.y, frame.w, frame.h, 0, 0, w, h);
  return c;
}

export default function AnimatedBackground({
  children,
  spriteSheetURL,
  spriteData,
  aspectRatio,
  zIndex,
  onReady = undefined,
  // CSS-only twinkling stars shown until the sprite sheet is decoded
  // (used by the starfield background, which has no loader in front of it)
  showPlaceholder = false,
 }) {
  const canvasRef = useRef(null);
  const framesRef = useRef(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  const [isReady, setIsReady] = useState(false);
  const [placeholderGone, setPlaceholderGone] = useState(false);

  const context = useContext(SplashContext);

  // Unmount the placeholder once its fade-out finishes
  useEffect(() => {
    if (!isReady || !showPlaceholder) return;
    const t = setTimeout(() => setPlaceholderGone(true), 1400);
    return () => clearTimeout(t);
  }, [isReady, showPlaceholder]);

  useEffect(() => {
    let cancelled = false;

    const loadAssets = async () => {
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = spriteSheetURL;
        // decode() waits for fetch AND full decode, so the first drawImage
        // doesn't stall the main thread on a synchronous decode
        await img.decode();

        const frames = Object.values(spriteData.frames);
        const nativeW = frames[0].frame.w;
        // Cap bitmaps at the largest size this device can display
        const maxW = Math.ceil(
          (window.screen.width || 1920) * (window.devicePixelRatio || 1)
        );
        const scale = Math.min(1, maxW / nativeW);

        const bitmaps = await Promise.all(
          frames.map(({ frame }) => sliceFrame(img, frame, scale))
        );

        if (cancelled) {
          bitmaps.forEach((b) => b.close?.());
          return;
        }

        framesRef.current = {
          bitmaps,
          durations: frames.map((f) => f.duration || 100),
        };
        setIsReady(true);
        onReadyRef.current?.();
      } catch (e) {
        console.error("Asset loading error:", e);
      }
    };

    loadAssets();

    return () => {
      cancelled = true;
      framesRef.current?.bitmaps.forEach((b) => b.close?.());
      framesRef.current = null;
    };
  }, [spriteSheetURL, spriteData]);

  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { bitmaps, durations } = framesRef.current || {};

    if (!ctx || !bitmaps?.length) return;

    let frame = 0;
    let rafId = 0;
    let last = performance.now();
    let elapsed = 0;
    let needsDraw = true;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = context.onSplash ? window.innerHeight : width / aspectRatio;
      canvas.width = width;
      canvas.height = Math.round(height);
      ctx.imageSmoothingEnabled = false; // reset whenever the canvas resizes
      needsDraw = true;
    };

    resizeCanvas(); // Initial sizing
    window.addEventListener("resize", resizeCanvas);

    // rAF stays in sync with the display's refresh and pauses automatically
    // in background tabs, unlike setInterval
    const tick = (now) => {
      rafId = requestAnimationFrame(tick);

      elapsed += now - last;
      last = now;

      if (elapsed >= durations[frame]) {
        elapsed %= durations[frame]; // no fast-forward burst after tab throttling
        frame = (frame + 1) % bitmaps.length;
        needsDraw = true;
      }

      if (needsDraw) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bitmaps[frame], 0, 0, canvas.width, canvas.height);
        needsDraw = false;
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isReady, context.onSplash, aspectRatio]);

  return (
    <div style={{ position: "relative", width: "100vw", height: "0px" }}>
      {showPlaceholder && !placeholderGone && (
        <div
          className={`${styles['star-placeholder']} ${isReady ? styles['star-placeholder-hidden'] : ''}`}
          style={{ zIndex: zIndex }}
          aria-hidden="true"
        />
      )}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "auto",
          zIndex: zIndex,
          // Cross-fade in over the placeholder stars
          opacity: showPlaceholder && !isReady ? 0 : 1,
          transition: showPlaceholder ? "opacity 1.2s ease" : undefined,
        }}
      />
      {children}
    </div>
  );
}
