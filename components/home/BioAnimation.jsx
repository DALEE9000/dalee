"use client"

import { TypeAnimation } from 'react-type-animation';
import { Jersey_15 } from 'next/font/google';
import { Raleway } from 'next/font/google';
import styles from './Home.module.css';

const jersey = Jersey_15({
    weight: "400",
    subsets: ['latin'],
})

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
                '...researcher',
                1000,
                '...writer',
                1000,
                '...policy expert',
                1000,
            ]}
            speed={40}
            style={{
                fontFamily: raleway.style.fontFamily,
            }}
            repeat={Infinity}
        />

        <p
            className={`${styles['bio']}`}
            style={{
                fontFamily: raleway.style.fontFamily,
            }}
        >
            I'm David. I do cool things. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </>
    );
}