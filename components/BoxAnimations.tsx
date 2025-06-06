"use client";

import { motion } from "framer-motion";
import { raleway } from "./Fonts";

const boxVariants = {
hidden: { opacity: 0, scale: 0.8 },
visible: { opacity: 1, scale: 1, transition: { duration: 1, type: "spring", bounce: 0.5 } },
};

export function LightUpText({
  children, props, style
}: {
  children: string;
  props?: string;
  style?: React.CSSProperties;
}) {

    return (
      <motion.span
        className={props}
        style={style}
        whileHover={{
        textShadow: '0 0 8px #cbcb85, 0 0 16px #cbcb85',
        }}
        transition={{ duration: 0.3 }}
      >
          {children}
      </motion.span>
    );
}

export function DivAnimation({
  children, props
}: {
  children: React.ReactNode;
  props: string;
}) {

  return (
    <motion.div
        className={props}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={boxVariants}
        exit={{ opacity: 0, y: -20 }}
    >
      {children}
    </motion.div>
  );
}

export function AboutMeParagraph({
    children, props
}: {
    children: React.ReactNode;
    props: string;
}) {

    return (
        <motion.p
          className={props}
          style={{
              fontFamily: raleway.style.fontFamily,
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={boxVariants}
        >
            {children}
        </motion.p>
    )
}

export function BookBounce({
  delayIndex,
  children 
}: {
  delayIndex: number;
  children: React.ReactNode;
}) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.1, delay: delayIndex * 0.03}}
    >
      {children}
    </motion.div>
  )
}