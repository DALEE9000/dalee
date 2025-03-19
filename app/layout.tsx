"use client"

import React, { useState, useEffect } from "react";
/* import { Metadata } from 'next';*/
import { usePathname } from "next/navigation";
import { Jersey_15 } from 'next/font/google';
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";
import Transition from "@/components/Transition";

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
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isLoading, setIsLoading] = useState(isHome)

  useEffect(() => {
    if (isLoading) return
  }, [isLoading])


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
        className={`${jersey.variable} antialiased ${isLoading ? "splash-active" : "home-page"}`}
      >
        {/* NOTE THAT LAYOUT MAINTAINS STATE. Once we finish loading the splash page and go to the home page, it won't show up unless the user refreshes */}
        {isLoading && isHome ? (
          <SplashScreen finishLoading={() => setIsLoading(false)} />
        ) : (
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