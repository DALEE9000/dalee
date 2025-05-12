"use client"

import { TypeAnimation } from 'react-type-animation';
import { jersey } from '@/components/Fonts';
import { raleway } from '@/components/Fonts';
import stylesHome from './home/Home.module.css';

export function BioAnimation() {

    return(
    <>
        <span
            className={stylesHome['bio-animation']}
            style={{
                fontFamily: raleway.style.fontFamily,
            }}
        >
            david a. lee is a...
        </span>
    
        <TypeAnimation
            className={stylesHome['bio-animation']}
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

export function AboutMeAnimation() {

    return(
        <TypeAnimation
            className={stylesHome['aboutme-animation']}
            sequence={[
                'About Me',
            ]}
            speed={40}
            style={{
                fontFamily: jersey.style.fontFamily,
            }}
            wrapper="span"
            repeat={0}
        />
    );
}

export function WritingAnimation() {

    return(
        <TypeAnimation
            className={stylesHome['writing-animation']}
            sequence={[
                'Writing',
            ]}
            speed={40}
            style={{
                fontFamily: jersey.style.fontFamily,
            }}
            wrapper="span"
            repeat={0}
        />
    );
}

export function ResearchAnimation() {

    return(
        <TypeAnimation
            className={stylesHome['research-animation']}
            sequence={[
                'Research',
            ]}
            speed={40}
            style={{
                fontFamily: jersey.style.fontFamily,
            }}
            wrapper="span"
            repeat={0}
        />
    );
}

export function LibraryAnimation() {

    return(
        <TypeAnimation
            className={stylesHome['library-animation']}
            sequence={[
                'Library',
            ]}
            speed={40}
            style={{
                fontFamily: jersey.style.fontFamily,
            }}
            wrapper="span"
            repeat={0}
        />
    );
}
export function StargazerAnimation() {

    return(
        <TypeAnimation
            sequence={[
                `You've opened Stargazer mode!\n\nI love making pixel art animations.\nPlease enjoy my handcrafted animated background!\n\nStargazer mode features the 'Venus' movement from Holst's 'The Planets' suite.\n\n(click anywhere in this window to close)`
            ]}
            speed={99}
            style={{
                fontFamily: jersey.style.fontFamily,
                whiteSpace: 'pre-line',
                width: '100%',
                height: '80%'
            }}
            wrapper="div"
            repeat={0}
        >

        </TypeAnimation>
    )
}