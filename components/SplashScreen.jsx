"use client"

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import { Jersey_15 } from 'next/font/google';
import Parallax from '@/components/Parallax';

const jersey = Jersey_15({
    weight: "400",
    subsets: ['latin'],
})

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
            <h1
                className="text-2xl"
                style={{ fontFamily: jersey.style.fontFamily }}
            ></h1>
                    <span style={{ 
                        fontSize: '4em',
                        fontFamily: jersey.style.fontFamily,
                        position: 'relative',
                        zIndex: 20,
                    }}>&gt; </span>
                    <TypeAnimation
                        sequence={[
                            // Same substring at the start will only be typed out once, initially
                            500,
                            'David A. Lee\'s Personal Webpage',
                            500,
                        ]}
                        speed={50}
                        style={{ fontSize: '4em',
                            textAlign: 'center',
                            fontFamily: jersey.style.fontFamily,
                            position: 'relative',
                            zIndex: 20,
                        }}
                        repeat={1}
                    />
        </div>
        {/*isButtonVisible && <button style={{fontSize: '2em'}} onClick={() => finishLoading()}>test button, fade appear after animation</button> */}
        </>
        )
    )
}

export default SplashScreen;