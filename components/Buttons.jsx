import { useState } from 'react';
import Image from 'next/image';
import styles from './Splash.module.css';

export default function SplashButton ( { setOnSplash, setIsButtonLoading }) {
    const [imageSrc, setImageSrc] = useState("/pixelart/button1.png");

    function handleMouseEnter() {
        setImageSrc("/pixelart/button2.png");
    }

    function handleMouseExit() {
        setImageSrc("/pixelart/button1.png");
    }

    return (
        <>
        <button 
            onClick={() => setOnSplash()}
            className={`${styles['splash-button']}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseExit}
        >
            <Image
                src={imageSrc}
                width={200}
                height={100} /* try using window.innerHeight, tho it doesn't change immediately */
                alt="Splash Page Button"
            />
        </button>
        </>
    );
}