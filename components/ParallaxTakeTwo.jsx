"use client";

import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import parallaxAnimation from "@/public/pixelart/sky.json"; // Your Lottie JSON file

export default function ParallaxTakeTwo() {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.8); // Adjust speed if needed
    }
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <Lottie
        lottieRef={lottieRef}
        animationData={parallaxAnimation}
        loop
        autoplay
        className="w-full h-full object-cover"
      />
    </div>
  );
}