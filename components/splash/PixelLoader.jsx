"use client"

import { useState, useEffect } from 'react';
import { jersey } from '@/components/Fonts';
import styles from './Splash.module.css';

export default function PixelLoader({ complete, onDone }) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  // Simulate progress while waiting for weather data
  useEffect(() => {
    if (complete) return;
    const timers = [
      setTimeout(() => setProgress(22), 150),
      setTimeout(() => setProgress(41), 500),
      setTimeout(() => setProgress(57), 1100),
      setTimeout(() => setProgress(69), 2000),
      setTimeout(() => setProgress(77), 3200),
      setTimeout(() => setProgress(82), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [complete]);

  // When complete, jump to 100% then fade out
  useEffect(() => {
    if (!complete) return;
    setProgress(100);
    const t = setTimeout(() => setFading(true), 350);
    return () => clearTimeout(t);
  }, [complete]);

  // Safety valve — dismiss after 9s even if onReady never fires
  useEffect(() => {
    const t = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setFading(true), 350);
    }, 9000);
    return () => clearTimeout(t);
  }, []);

  // After CSS fade finishes, unmount
  useEffect(() => {
    if (!fading) return;
    const t = setTimeout(() => onDone?.(), 600);
    return () => clearTimeout(t);
  }, [fading, onDone]);

  return (
    <div className={`${styles['pixel-loader']} ${fading ? styles['pixel-loader-fading'] : ''}`}>
      <p className={styles['pixel-loader-text']} style={{ fontFamily: jersey.style.fontFamily }}>
        loading...
      </p>

      <div className={styles['pixel-loader-bar-outer']}>
        <div
          className={`${styles['pixel-loader-bar-fill']} ${complete ? styles['pixel-loader-bar-complete'] : ''}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className={styles['pixel-loader-percent']} style={{ fontFamily: jersey.style.fontFamily }}>
        {Math.round(progress)}%
      </p>

      <p className={styles['pixel-loader-subtext']} style={{ fontFamily: jersey.style.fontFamily }}>
        fetching weather data...
      </p>
    </div>
  );
}
