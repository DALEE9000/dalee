"use client"

import '../globals.css';
import clsx from 'clsx';
import Image from 'next/image';
import { raleway } from '@/components/Fonts';
import { AboutMeAnimation } from '@/components/TextAnimations';
import styles from "@/components/home/Home.module.css";
import { motion } from "framer-motion";

const box1 = clsx(styles['twinkle-box'], styles['about-box1'])
const box2 = clsx(styles['twinkle-box'], styles['about-box2'])

const boxVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1, type: "spring", bounce: 0.5 } },
};

export default function About() {
  return (
    <>
      <section id={styles['about']}>
        <Image
          className={styles['portrait']}
          src="/images/portrait.jpeg"
          width={300}
          height={300}
          alt="David A. Lee Portrait"
        />

        <div 
          className={box1}
        >
          <AboutMeAnimation />

          <motion.p
            className={styles['about-text']}
            style={{
                fontFamily: raleway.style.fontFamily,
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={boxVariants}
          >
            I am an independent researcher, with investigative endeavors ranging between atmospheric and ocean physics, legal institutionalism and political economy, and applied statistics in the physical and social sciences. 
          </motion.p>
          <motion.p
            className={styles['about-text']}
            style={{
                fontFamily: raleway.style.fontFamily,
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={boxVariants}
          >
            Currently, I work as a Research Staff Assistant in the Ocean Transport group at Columbia University&apos;s Lamont Doherty Earth Observatory. I also moonlight as a political consultant for Democratic Party candidates running for office in New York City.
          </motion.p>
          <motion.p
            className={styles['about-text']}
            style={{
                fontFamily: raleway.style.fontFamily,
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={boxVariants}
          >
            Most recently, I was an Adjunct Professor of Economics at the Adelphi University Robert B. Willumstad School of Business. 
            </motion.p>

            <motion.p
              className={styles['about-text']}
              style={{
                  fontFamily: raleway.style.fontFamily,
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={boxVariants}
            >
            In past lives, I held roles as eclectic as Legislative Director to New York State Assemblymember Ron Kim, Research Intern at the NASA Goddard Institute for Space Studies, and a Teaching Artist at the New York Philharmonic.
          </motion.p>
          <motion.p
            className={styles['about-text']}
            style={{
                fontFamily: raleway.style.fontFamily,
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={boxVariants}
          >
            My work in New York State government and politics has been featured in national and local journalism outlets such as The American Prospect, The Guardian, New York Focus, The Christian Science Monitor, and Singtao Daily. 
            </motion.p>
            <motion.p
              className={styles['about-text']}
              style={{
                  fontFamily: raleway.style.fontFamily,
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={boxVariants}
            >
            Additionally, I have presented original legal and science research at venues like Yale Law School, the American Bar Association Section on Labor and Employment Law, and the Microsoft Technology Center in New York City. 
            </motion.p>
            <motion.p
              className={styles['about-text']}
              style={{
                  fontFamily: raleway.style.fontFamily,
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={boxVariants}
            >
            My media appearances include the Netflix-acclaimed documentary Knock Down The House (2019) and For Whom the Alarm Sounds (2022).
          </motion.p>
          <motion.p
            className={styles['about-text']}
            style={{
                fontFamily: raleway.style.fontFamily,
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={boxVariants}
          >
            I am based in Queens, New York, where I happily enjoy collecting LEGO® minifigures, reading vintage books, and cooking.
          </motion.p>
        </div>

        <motion.div 
          className={box2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={boxVariants}
        >
          <p
            className={styles['about-text']}
            style={{
                fontFamily: raleway.style.fontFamily,
            }}
          >
            Curriculum Vitae
          </p>
        </motion.div>
      </section>
    </>
  );
}