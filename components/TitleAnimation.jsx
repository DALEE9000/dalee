import { TypeAnimation } from 'react-type-animation';
import { Jersey_15 } from 'next/font/google';

const jersey = Jersey_15({
    weight: "400",
    subsets: ['latin'],
})

export default function TitleAnimation(
    children
) {
    return(
    <>
    <span style={{ 
        fontSize: '4em',
        fontFamily: jersey.style.fontFamily,
        position: 'absolute',
        left: 0,
        marginTop: '0.5%',
        zIndex: 20,
    }}>&gt; </span>
        <TypeAnimation
        sequence={[
            // Same substring at the start will only be typed out once, initially
            500,
            'David A. Lee\'s Personal Webpage',
            500,
        ]}
        speed={50}
        style={{ fontSize: '4em',
            textAlign: 'left',
            alignItems: 'center',
            fontFamily: jersey.style.fontFamily,
            position: 'absolute',
            left: '28.45px',
            marginTop: '0.5%',
            zIndex: 20,
        }}
        repeat={1}
        />
    </>
    );
}