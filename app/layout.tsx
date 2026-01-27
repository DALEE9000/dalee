"use client"

import Head from 'next/head';
import React, { useContext, Suspense } from "react";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";
import SplashScreen from "@/components/splash/SplashScreen";
import Transition from "@/components/Transition";
import Loader from "@/components/Loader";
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SplashContext } from '@/components/Context';
import { SplashProvider, StargazerProvider, LibraryProvider } from '@/components/Context';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const spriteSheetURL = "/pixelart/space/spacesprites.png";
  const spriteDataURL = "/pixelart/space/spacesprites.json";

  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <title>
          David A. Lee – Independent Researcher
        </title>
        <meta
          name="description"
          content="Researcher in physical oceanography, political economy, and applied statistics."
        />
        <meta 
          name="keywords" 
          content="researcher, physics, oceanography, economics, statistics, NYC" 
        />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta property="og:title" content="David Lee – Independent Researcher" />
        <meta property="og:description" content="Researcher in physical oceanography, political economy, and applied statistics." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://davidalee.dev" />
        <meta property="og:site_name" content="David Lee – Independent Researcher" />
        <meta property="og:locale" content="en_US" />
      </Head>
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
      <GoogleAnalytics gaId="G-SY4QB2DS8Q" />
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