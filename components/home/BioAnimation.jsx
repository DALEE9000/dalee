"use client"

import { TypeAnimation } from 'react-type-animation';
import { Raleway } from 'next/font/google';
import styles from './Home.module.css';

const raleway = Raleway({
    weight: "400",
    subsets: ['latin'],
})

export default function BioAnimation() {

    return(
    <>
            <span
                className={styles['bio-animation']}
                style={{
                    fontFamily: raleway.style.fontFamily,
                }}
            >
                david a. lee is a...
            </span>
        
            <TypeAnimation
                className={styles['bio-animation']}
                preRenderFirstString={true}
                sequence={[
                    500,
                    'climate researcher',
                    1000,
                    'writer',
                    1000,
                    'policy expert',
                    1000,
                ]}
                speed={40}
                style={{
                    fontFamily: raleway.style.fontFamily,
                }}
                wrapper="span"
                repeat={Infinity}
            />
    </>
    );
}