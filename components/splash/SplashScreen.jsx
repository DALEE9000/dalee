"use client"

import React, { useState, useEffect, useContext } from 'react';
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Loader from "@/components/Loader";
import styles from './Splash.module.css';

// Dynamically import all components
const Parallax = dynamic(() => import("./Parallax"), { ssr: false });
const TitleAnimation = dynamic(() => import("./TitleAnimation"), { ssr: false });
const SplashButton = dynamic(() => import("@/components/Buttons"), { ssr: false });

export default function SplashScreen() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showTransition, setShowTransition] = useState(false);

    // Simulate preloading all components
    useEffect(() => {
        const preloadComponents = async () => {
        try {
            // Preload Parallax
            await import("./Parallax");
            
            // Preload TitleAnimation
            await import("./TitleAnimation");
            
            // Preload SplashButton
            await import("@/components/Buttons");

            // Simulate a small delay to ensure visual stability
            setTimeout(() => {
                setIsLoaded(true);
                setShowTransition(true); // Trigger the transition effect
            }, 250);
        } catch (error) {
            console.error("Error preloading components:", error);
        }
        };

        preloadComponents();
    }, []);

    if (!isLoaded) {
        return <Loader />;
    }


    return (
        showTransition && (
        <>
        {/* The motion.divs here animate the transition fade-in for each of the components */}
            <motion.div
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            >
                <Parallax />
            </motion.div>

            <motion.div
                className={styles['title-animation-div']}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            >
                    <TitleAnimation />
                    <SplashButton />
            </motion.div>
        </>
        )
    );
}