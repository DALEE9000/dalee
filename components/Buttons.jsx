import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function SplashButton ( { finishLoading }) {
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [imageSrc, setImageSrc] = useState("/pixelart/button1.png");

        useEffect(() => {
            setTimeout(() => {
                setIsButtonVisible(true);
            }, 3000); // Match text animation duration
        }, []);

        function handleMouseEnter() {
            setImageSrc("/pixelart/button2.png");
        }

        function handleMouseExit() {
            setImageSrc("/pixelart/button1.png");
        }

        return (
            <>
            {isButtonVisible && 
            <button 
                onClick={() => { finishLoading(); handleMouseEnter(); }}
                className="fixed right-0 bottom-0 p-0 bg-transparent border-none outline-none cursor-pointer"
                style={{
                    all: 'unset', // Remove all default button styles (including margin, padding, etc.)
                    width: 'auto', // Ensure the button takes the image size
                    height: 'auto',
                    cursor: 'pointer',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseExit}
            >
                <Image
                    src={imageSrc}
                    width={200}
                    height={100}
                    alt="Splash Page Button"
                    className="cursor-pointer"
                />
            </button>}
            </>
        );
}