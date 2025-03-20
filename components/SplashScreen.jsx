"use client"

import TitleAnimation from '@/components/TitleAnimation';
import Parallax from '@/components/Parallax';
import SplashButton from '@/components/Buttons';
import styles from './Splash.module.css';

export default function SplashScreen({ setOnSplash }){

    return (
        (
        <>
            <div className=""
            >
                <Parallax 
                />
            </div>

            <div 
                className={`${styles['title-animation-div']}`}
            >
                <TitleAnimation 
                />
            </div>
            <div
                className={`${styles['splash-button-div']}`}
            >
                <SplashButton 
                    setOnSplash={setOnSplash} 
                />
            </div>
        </>
        )
    )
}