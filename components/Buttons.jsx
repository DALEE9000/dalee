import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { SplashContext } from '@/components/Context';
import styles from './splash/Splash.module.css';

export default function SplashButton() {
    const [imageSrc, setImageSrc] = useState("/pixelart/enterbutton/button1.png");

    const context = useContext(SplashContext);

    // Warm the hover frame so the first mouseover doesn't flash while it loads
    useEffect(() => {
        const img = new window.Image();
        img.src = "/pixelart/enterbutton/button2.png";
    }, []);

    function handleMouseEnter() {
        setImageSrc("/pixelart/enterbutton/button2.png");
    }

    function handleMouseExit() {
        setImageSrc("/pixelart/enterbutton/button1.png");
    }

    return (
        <>
            <button 
                onClick={() => context.exitSplash()}
                className={styles['splash-button']}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseExit}
            >
                <Image
                    unoptimized
                    src={imageSrc}
                    width={200}
                    height={100}
                    alt="Splash Page Button"
                    className="desktop-splash-button"
                />
                <Image
                    unoptimized
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