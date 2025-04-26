"use client"

import React, { useState, Suspense } from "react";
/* import { Metadata } from 'next';*/
import "./globals.css";
import SplashScreen from "@/components/splash/SplashScreen";
import Transition from "@/components/Transition";
import Loader from "@/components/Loader";
import TwinkleStar from '@/components/home/TwinkleStar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/*export const metadata: Metadata = {
  title: "David A. Lee",
  description: "Personal website of David A. Lee",
};*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [onSplash, setOnSplash] = useState(true);

  return (
    <html 
      lang="en"
      className={`${onSplash ? 'home-page-scroll' : ''}`}
    >
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <title>David A. Lee</title>
    </head>
      <body
        className={`home-page ${onSplash ? 'home-page-scroll' : ''}`}
      >
        {onSplash ? (
        <Suspense fallback={<Loader />}>
          <SplashScreen 
            setOnSplash={() => setOnSplash(false)} 
          />
        </Suspense>) : (
          <>
            <Transition>
              <div id="page-wrapper">
                  <TwinkleStar>
                      <Navbar />
                      {children}
                      <Footer />
                  </TwinkleStar>
              </div>
            </Transition>
          </>
        )}
      </body>
    </html>
  );
}