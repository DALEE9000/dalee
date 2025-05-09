"use client";

import { motion } from "framer-motion";
import { raleway } from "./Fonts";

const boxVariants = {
hidden: { opacity: 0, scale: 0.8 },
visible: { opacity: 1, scale: 1, transition: { duration: 1, type: "spring", bounce: 0.5 } },
};

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