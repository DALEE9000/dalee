"use client"

import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import styles from './Splash.module.css'; 

// Dynamically import all components
const Parallax = dynamic(() => import("./Parallax"), { ssr: false });
const TitleAnimation = dynamic(() => import("./TitleAnimation"), { ssr: false });
const SplashButton = dynamic(() => import("@/components/Buttons"), { ssr: false });

export default function SplashScreen({ setOnSplash }){
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
            }, 500);
        } catch (error) {
            console.error("Error preloading components:", error);
        }
        };

        preloadComponents();
    }, []);

    if (!isLoaded) {
        return <Loader />;  // Show the loader until all components are ready
    }


    return (
        showTransition && (
        <>
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
            <div>
                <Parallax />
            </div>
        </motion.div>

        <motion.div
          className={styles["title-animation-div"]}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
            <div 
                className={`${styles['title-animation-div']}`}
            >
                <TitleAnimation />
            </div>
        </motion.div>

        <motion.div
          className={styles["splash-button-div"]}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
            <div
                className={`${styles['splash-button-div']}`}
            >
                <SplashButton 
                    setOnSplash={setOnSplash} 
                />
            </div>
        </motion.div>
        </>
        )
    );
}