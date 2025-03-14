"use client"

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import TitleAnimation from '@/components/TitleAnimation';
import Parallax from '@/components/Parallax';
import SplashButton from '@/components/Buttons';

const SplashScreen = ({ finishLoading }) => {

    return (
        (
        <>
        <div className="h-screen w-screen flex items-center justify-center text-center -z-10"
        >
            <Parallax />
        </div>

        <div 
            className=""
            style={{ 
                     width: '100vw',
                     transform: 'translateY(-25vh)',
                     zIndex: 10,
             }}
        >
            <TitleAnimation />
        </div>
        <div
            className=""
            style={{
                width: '100%',
                position: 'absolute',
                transform: 'translateY(+18vh)',
                zIndex: 10,
            }}>
            <SplashButton finishLoading={finishLoading} />
        </div>
        </>
        )
    )
}

export default SplashScreen;