"use client"

import { useClickAway} from "react-use";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sling as Hamburger } from "hamburger-react";
import { Jersey_15 } from 'next/font/google';
import clsx from 'clsx';
import Link from "next/link";
import styles from "./Navbar.module.css";

const jersey = Jersey_15({
    variable: "--font-jersey-15",
    weight: "400",
    subsets: ['latin'],
})

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
                    <ul id={styles["NavBar"]}>
                        <li className={styles["list-item"]}>
                            <Link 
                                href="/" 
                                className={linkStyles}
                                onClick={() => setOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li className={styles["list-item"]} >
                            <Link 
                                href="/about" 
                                className={linkStyles}
                                onClick={() => setOpen(false)}
                            >
                                About
                            </Link>
                        </li>
                        <li className={styles["list-item"]}>
                            <Link 
                                href="/research" 
                                className={linkStyles}
                                onClick={() => setOpen(false)}
                            >
                                Research
                            </Link>
                        </li>
                        <li className={styles["list-item"]}>
                            <Link 
                                href="/library" 
                                className={linkStyles}
                                onClick={() => setOpen(false)}
                            >
                                Library
                            </Link>
                        </li>
                        <li className={styles["list-item"]}>
                            <Link 
                                href="/writing" 
                                className={linkStyles}
                                onClick={() => setOpen(false)}
                            >
                                Writing
                            </Link>
                        </li>
                        <li className={styles["list-item"]}>
                            <Link 
                                href="/hireme" 
                                className={linkStyles}
                                onClick={() => setOpen(false)}
                            >
                                Hire Me!
                            </Link>
                        </li>
                        <li className={styles["list-item"]}>
                            <span className={linkStyles}>Stargazer</span>
                        </li>
                    </ul>
                </nav>
                )}
        </div>
    );
}