import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { raleway } from '@/components/Fonts';

const hobbies = [
  'abundance economics \u{1F3D7}',
  'causes of the second congo war',
  'shakespeare\'s histories',
  'weather intelligence and quantitative finance \u{1F30D}',
  'bell labs and institution-building',
  'phillip glass\'s score to koyaanisqatsi',
  'techno-industrial policy',
  'progress studies',
  'beethoven \u{1F525}',
  'anything you\'re really passionate about \u{1F600}',
];

export default function TextLoop() {

    // This function returns a random element to start the text cycle with each time :-)
    function getRandomElement(arr) {
        if (arr.length === 0) {
            return undefined;
        }
        return Math.floor(Math.random() * arr.length);
    }

    const [index, setIndex] = useState(getRandomElement(hobbies));
    const [visible, setVisible] = useState(true);

    useEffect(() => {
    const interval = setInterval(() => {
        setVisible(false); // start fade out
        setTimeout(() => {
        setIndex((i) => (i + 1) % hobbies.length);
        setVisible(true); // fade in new text
        }, 300); // match fade out duration
    }, 3000);
    return () => clearInterval(interval);
    }, []);

    return (
        <motion.span
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
            display: 'inline-block',
            fontFamily: raleway.style.fontFamily,
            }}
        >
            {hobbies[index]}
        </motion.span>
    );
}