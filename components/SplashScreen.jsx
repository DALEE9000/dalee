"use client"

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import TitleAnimation from '@/components/TitleAnimation';
import Parallax from '@/components/Parallax';


const SplashScreen = ({ finishLoading }) => {
    const [isButtonVisible, setIsButtonVisible] = useState(false);

            useEffect(() => {
                setTimeout(() => {
                    setIsButtonVisible(true);
                }, 3000); // Match text animation duration
            }, []);

    return (
        (
        <>
        <div className="h-screen w-screen flex items-center justify-center text-center -z-10"
        >
            <Parallax />
        </div>

        <div 
            className="h-screen w-screen flex items-center justify-center text-center relative z-10"
            style={{ transform: "translateY(-160%)",
                     zIndex: 10
             }}
        >
            <TitleAnimation />
        </div>
        {/*isButtonVisible && <button style={{fontSize: '2em'}} onClick={() => finishLoading()}>test button, fade appear after animation</button> */}
        </>
        )
    )
}

export default SplashScreen;