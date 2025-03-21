"use client"

import React, { useState, Suspense } from "react";
/* import { Metadata } from 'next';*/
import { Jersey_15 } from 'next/font/google';
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";
import Transition from "@/components/Transition";
import Loader from "@/components/Loader";

const jersey = Jersey_15({
    variable: "--font-jersey-15",
    weight: "400",
    subsets: ['latin'],
})

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

/* the body here wraps the div in SplashScreen*/
/* need to ensure body has proper CSS definition to force the splashscreen div to center */

  return (
    <html lang="en" className={jersey.variable}>
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <title>David A. Lee</title>
    </head>
      <body
        className={`${jersey.variable} antialiased ${onSplash ? "splash-active" : "home-page"}`}
      >
        {onSplash ? (
        <Suspense fallback={<Loader />}>
          <SplashScreen 
            setOnSplash={() => setOnSplash(false)} 
          />
        </Suspense>) : (
          <>
          <Transition>
            {children}
          </Transition>
          </>
        )}
      </body>
    </html>
  );
}

/* 
Use switch statement to navigate through the following possibilities:

isLoading: True, onSplash: False -- Loader
isLoading: False, onSplash: True -- Splash
isLoading: False, onSplash: False -- Home

onSplash needs to be initialized with FALSE.
isLoading needs to be initialized with TRUE.

Also: need to figure out how to get the twinkle animation state into layout, so we don't render anything until that is loaded

EDIT: New problem: the title, parallax, and button loading states don't change to false because we can't even get to the point of the splash page being called. I think we need to re-engineer the structure such that the loader is INSIDE the splash-page component.

*/