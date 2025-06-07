"use client"

import React, { useContext, Suspense } from "react";
/* import { Metadata } from 'next';*/
import "./globals.css";
import SplashScreen from "@/components/splash/SplashScreen";
import Transition from "@/components/Transition";
import Loader from "@/components/Loader";
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SplashContext } from '@/components/Context';
import { SplashProvider, StargazerProvider, LibraryProvider } from '@/components/Context';

/*export const metadata: Metadata = {
  title: "David A. Lee",
  description: "Personal website of David A. Lee",
};*/

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const spriteSheetURL = "/pixelart/spacesprites.png";
  const spriteDataURL = "/pixelart/spacesprites.json";

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <title>David A. Lee</title>
      </head>
      <body className="home-page">
        <SplashProvider>
          <StargazerProvider>
            <LibraryProvider>
              <RootLayoutContent spriteSheetURL={spriteSheetURL} spriteDataURL={spriteDataURL}>
                {children}
              </RootLayoutContent>
            </LibraryProvider>
          </StargazerProvider>
        </SplashProvider>
      </body>
    </html>
  );
}

function RootLayoutContent({
  children,
  spriteSheetURL,
  spriteDataURL
}: {
  children: React.ReactNode;
  spriteSheetURL: string;
  spriteDataURL: string;
}) {
  const context = useContext(SplashContext);

  return (
    <div className={`home-page ${context.onSplash ? 'home-page-scroll' : ''}`}>
      {context.onSplash ? (
        <Suspense fallback={<Loader />}>
          <SplashScreen />
        </Suspense>
      ) : (
        <Transition>
          <AnimatedBackground spriteSheetURL={spriteSheetURL} spriteDataURL={spriteDataURL} aspectRatio={1.33} zIndex={-1}>
            <Navbar />
            {children}
            <Footer />
          </AnimatedBackground>
        </Transition>
      )}
    </div>
  );
}