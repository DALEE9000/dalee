"use client"

import React, { useContext, Suspense } from "react";
import "./globals.css";
import SplashScreen from "@/components/splash/SplashScreen";
import Transition from "@/components/Transition";
import Loader from "@/components/Loader";
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SplashContext } from '@/components/Context';
import { SplashProvider, StargazerProvider, LibraryProvider } from '@/components/Context';
import spaceSpriteData from '@/public/pixelart/space/spacesprites.json';
import { motion } from 'framer-motion';

export default function LayoutClient({
    children,
    spriteSheetURL,
}: { children: React.ReactNode,
     spriteSheetURL: string,
    }
    ) {
    return (
        <>
            <SplashProvider>
            <StargazerProvider>
                <LibraryProvider>
                <RootLayoutContent spriteSheetURL={spriteSheetURL}>
                    {children}
                </RootLayoutContent>
                </LibraryProvider>
            </StargazerProvider>
            </SplashProvider>
        </>
    );
}

function RootLayoutContent({
  children,
  spriteSheetURL,
}: {
  children: React.ReactNode;
  spriteSheetURL: string;
}) {
  const context = useContext(SplashContext);

  return (
    <div className={`home-page ${context.onSplash ? 'home-page-scroll' : ''}`}>
      {context.onSplash ? (
        <motion.div
          className="splash-exit-wrapper"
          animate={{ opacity: context.isExiting ? 0 : 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Suspense fallback={<Loader />}>
            <SplashScreen />
          </Suspense>
        </motion.div>
      ) : (
        <Transition>
          <AnimatedBackground spriteSheetURL={spriteSheetURL} spriteData={spaceSpriteData} aspectRatio={1.33} zIndex={-1}>
            {/* Flex shell keeps the footer at the viewport bottom on pages
                with short content (e.g. /mathematics) */}
            <div className="page-shell">
              <Navbar />
              <main>{children}</main>
              <Footer />
            </div>
          </AnimatedBackground>
        </Transition>
      )}
    </div>
  );
}