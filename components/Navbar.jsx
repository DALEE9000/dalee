"use client"

import { useClickAway} from "react-use";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Sling as Hamburger } from "hamburger-react";
import { jersey } from '@/components/Fonts';
import clsx from 'clsx';
import Link from "next/link";
import Socials from "@/components/Socials";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [isOpen, setOpen] = useState(false);
    const ref = useRef(null);

    const burger = clsx({
        [styles["NavLinks"]]: true,
        [styles["menu-on"]]: isOpen,
    });

    const linkStyles = clsx({
        [styles["link-props"]]: true,
        [jersey.className]: true,
    })

    useClickAway(ref, () => setOpen(false));

    return (
        <div className={burger} ref={ref}>
            <div 
                className={styles["Hamburger"]}
            >
                <Hamburger
                    toggled={isOpen} 
                    size={50} 
                    toggle={setOpen}
                />
            </div>
                {isOpen && (
                <nav>
                    <ul 
                        id={styles["NavBar"]}
                    >
                        <li className={styles["list-item"]}>
                            <Link 
                                href="/" 
                                className={linkStyles}
                                onClick={() => setOpen(false)}
                            >
                                <motion.span
                                    className={linkStyles}
                                    whileHover={{
                                    textShadow: '0 0 8px #cbcb85, 0 0 16px #cbcb85',
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    Home
                                </motion.span>
                            </Link>
                        </li>
                        <li className={styles["list-item"]} >
                            <Link 
                                href="/about" 
                                className={linkStyles}
                                onClick={() => setOpen(false)}
                            >
                                <motion.span
                                    className={linkStyles}
                                    whileHover={{
                                    textShadow: '0 0 8px #cbcb85, 0 0 16px #cbcb85',
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    About
                                </motion.span>
                            </Link>
                        </li>
                        <li className={styles["list-item"]}>
                            <Link 
                                href="/research" 
                                className={linkStyles}
                                onClick={() => setOpen(false)}
                            >
                                <motion.span
                                    className={linkStyles}
                                    whileHover={{
                                    textShadow: '0 0 8px #cbcb85, 0 0 16px #cbcb85',
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    Research
                                </motion.span>
                            </Link>
                        </li>
                        <li className={styles["list-item"]}>
                            <Link 
                                href="/library" 
                                className={linkStyles}
                                onClick={() => setOpen(false)}
                            >
                                <motion.span
                                    className={linkStyles}
                                    whileHover={{
                                    textShadow: '0 0 8px #cbcb85, 0 0 16px #cbcb85',
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    Library
                                </motion.span>
                            </Link>
                        </li>
                        <li className={styles["list-item"]}>
                            <Link 
                                href="/writing" 
                                className={linkStyles}
                                onClick={() => setOpen(false)}
                            >
                                <motion.span
                                    className={linkStyles}
                                    whileHover={{
                                    textShadow: '0 0 8px #cbcb85, 0 0 16px #cbcb85',
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    Writing
                                </motion.span>
                            </Link>
                        </li>
                        <li className={styles["list-item"]}>
                            <Link 
                                href="/hireme" 
                                className={linkStyles}
                                onClick={() => setOpen(false)}
                            >
                                <motion.span
                                    className={linkStyles}
                                    whileHover={{
                                    textShadow: '0 0 8px #cbcb85, 0 0 16px #cbcb85',
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    Hire Me!
                                </motion.span>
                            </Link>
                        </li>
                        <li className={styles["list-item"]}>
                                <motion.span
                                    className={linkStyles}
                                    whileHover={{
                                    textShadow: '0 0 8px #cbcb85, 0 0 16px #cbcb85',
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    Stargazer
                                </motion.span>
                        </li>
                        <li className={styles["list-item"]}>
                            <Socials />
                        </li>
                    </ul>
                </nav>
                )}
        </div>
    );
}