import { useState } from 'react';
import Image from 'next/image';
import styles from './splash/Splash.module.css';

export default function SplashButton ( { setOnSplash }) {
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
                className={styles['splash-button']}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseExit}
            >
                <Image
                    src={imageSrc}
                    width={200}
                    height={100}
                    alt="Splash Page Button"
                    className="desktop-splash-button"
                />
                <Image
                    src={imageSrc}
                    width={100}
                    height={50}
                    alt="Splash Page Button"
                    className="mobile-splash-button"
                />
                <style jsx global>{`
                    .mobile-splash-button {
                        display: none;
                    }

                    @media (max-width: 800px) {
                        .desktop-splash-button {
                            display: none;
                        }

                        .mobile-splash-button {
                            display: block;
                        }
                    }
                `}</style>
            </button>
        </>
    );
}