import { TypeAnimation } from 'react-type-animation';
import { Jersey_15 } from 'next/font/google';
import styles from './Splash.module.css';

const jersey = Jersey_15({
    weight: "400",
    subsets: ['latin'],
})

export default function TitleAnimation() {

    return(
    <>
        <div
            className=""
        >
            <span 
                className={`${styles['arrow-cursor']}`}
                style={{
                    fontFamily: jersey.style.fontFamily,
                }}
            >
                &gt; 
            </span>
        </div>

        <div
            className=""
        >
            <TypeAnimation
                className={`${styles['type-animation']}`}
                sequence={[
                    // Same substring at the start will only be typed out once, initially
                    500,
                    'David A. Lee\'s Personal Webpage',
                    500,
                ]}
                speed={50}
                style={{ 
                    left: 0,
                    fontFamily: jersey.style.fontFamily,
                }}
                repeat={1}
            />
        </div>
    </>
    );
}