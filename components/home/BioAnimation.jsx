"use client"

import { TypeAnimation } from 'react-type-animation';
import { raleway } from '@/components/Fonts';
import styles from './Home.module.css';

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