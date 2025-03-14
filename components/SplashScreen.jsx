"use client"

import React, { useState, useEffect } from "react";
import TitleAnimation from '@/components/TitleAnimation';
import Parallax from '@/components/Parallax';
import SplashButton from '@/components/Buttons';
import styles from './Splash.module.css';

const SplashScreen = ({ finishLoading }) => {

    return (
        (
        <>
            <div className=""
            >
                <Parallax />
            </div>

            <div 
                className={`${styles['title-animation-div']}`}
            >
                <TitleAnimation />
            </div>
            <div
                className={`${styles['splash-button-div']}`}
            >
                <SplashButton finishLoading={finishLoading} />
            </div>
        </>
        )
    )
}

export default SplashScreen;