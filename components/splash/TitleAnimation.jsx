import { TypeAnimation } from 'react-type-animation';
import { jersey } from '@/components/Fonts';
import styles from './Splash.module.css';

export default function TitleAnimation() {
    return(
    <>
        <span 
            className={styles['arrow-cursor']}
            style={{
                fontFamily: jersey.style.fontFamily,
            }}
        >
            &gt; 
        </span>

        <TypeAnimation
            className={styles['type-animation']}
            sequence={[
                // Same substring at the start will only be typed out once, initially
                500,
                'David A. Lee\'s Personal Webpage',
                500,
            ]}
            speed={50}
            style={{ 
                fontFamily: jersey.style.fontFamily,
            }}
            wrapper="span"
            repeat={1}
        />
    </>
    );
}