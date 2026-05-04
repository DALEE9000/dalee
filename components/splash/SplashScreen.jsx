"use client"

import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import PixelLoader from "./PixelLoader";
import styles from './Splash.module.css';

const Parallax = dynamic(() => import("./Parallax"), { ssr: false });
const TitleAnimation = dynamic(() => import("./TitleAnimation"), { ssr: false });
const SplashButton = dynamic(() => import("@/components/Buttons"), { ssr: false });

export default function SplashScreen() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [parallaxReady, setParallaxReady] = useState(false);
    const [loaderVisible, setLoaderVisible] = useState(true);

    useEffect(() => {
        const preloadComponents = async () => {
            try {
                await Promise.all([
                    import("./Parallax"),
                    import("./TitleAnimation"),
                    import("@/components/Buttons"),
                ]);
                setIsLoaded(true);
            } catch (error) {
                console.error("Error preloading components:", error);
            }
        };

        preloadComponents();
    }, []);

    return (
        <>
            {/* Pixel loader overlays everything until Parallax signals ready */}
            {loaderVisible && (
                <PixelLoader
                    complete={parallaxReady}
                    onDone={() => setLoaderVisible(false)}
                />
            )}

            {/* Parallax renders behind the loader — no fade-in, loader handles the reveal */}
            {isLoaded && (
                <>
                    <Parallax onReady={() => setParallaxReady(true)} />

                    {/* Title and button fade in after the loader is gone */}
                    {!loaderVisible && (
                        <motion.div
                            className={styles['title-animation-div']}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        >
                            <TitleAnimation />
                            <SplashButton />
                        </motion.div>
                    )}
                </>
            )}
        </>
    );
}
