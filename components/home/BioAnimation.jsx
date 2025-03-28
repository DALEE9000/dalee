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
        <TypeAnimation
            className={`${styles['bio-animation']}`}
            preRenderFirstString={true}
            sequence={[
                500,
                'Hi! I\'m David, a researcher',
                1000,
                'Hi! I\'m David, a writer',
                1000,
                'Hi! I\'m David, a policy expert',
                1000,
            ]}
            speed={40}
            style={{
                fontFamily: jersey.style.fontFamily,
                minHeight: 200,
            }}
            repeat={Infinity}
        />

        <p
            className={`${styles['bio']}`}
            style={{
                fontFamily: raleway.style.fontFamily,
            }}
        >
            I'm David. I do cool things.
        </p>
    </>
    );
}