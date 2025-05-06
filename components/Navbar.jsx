"use client"

import { useClickAway} from "react-use";
import { useState, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { Sling as Hamburger } from "hamburger-react";
import { jersey } from '@/components/Fonts';
import { StargazerContext } from '@/components/Context';
import clsx from 'clsx';
import Link from "next/link";
import Socials from "@/components/Socials";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const context = useContext(StargazerContext);

    const [isOpen, setOpen] = useState(false);
    const ref = useRef(null);

    const links = [
        { href: "/", route: "Home" },
        { href: "/about", route: "About" },
        { href: "/research", route: "Research" },
        { href: "/library", route: "Library" },
        { href: "/writing", route: "Writing" },
        { href: "/hireme", route: "Hire Me!" }
    ]

    const burger = clsx({
        [styles["NavLinks"]]: true,
        [styles["menu-on"]]: isOpen,
    });

    const linkStyles = clsx({
        [styles["link-props"]]: true,
        [jersey.className]: true,
    })

    const thenavbar = clsx({
        [styles["NavBar"]]: isOpen,
    })

    useClickAway(ref, () => setOpen(false));

    const navContainer = {
        visible: {
            opacity: 1,
            transition: {
            staggerChildren: 0.03,
            delayChildren: 0.03,
            },
        },
        hidden: {
            opacity: 1,
        },
    };

    const itemVariant = {
        visible: { opacity: 1, y: 0, transition: { duration: 0.1 } },
        hidden: { opacity: 0, y: -20, transition: { duration: 0.1 } },
    };

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
                <motion.nav
                    initial="hidden"
                    animate={isOpen ? "visible" : "hidden" }
                    exit="hidden"
                    variants={navContainer}
                >
                    <ul 
                        id={thenavbar}
                    >
                        {links.map(({ href, route }) => (
                            <motion.li 
                                key={href}
                                className={isOpen ? styles["list-item"] : styles["list-item-hidden"]}
                                variants={itemVariant}
                            >
                                <Link 
                                    href={href} 
                                    className={linkStyles}
                                    onClick={() => {
                                        setOpen(false)
                                        context.deactivateStargazer()
                                    }}
                                >
                                    <motion.span
                                        className={linkStyles}
                                        whileHover={{
                                        textShadow: '0 0 8px #cbcb85, 0 0 16px #cbcb85',
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {route}
                                    </motion.span>
                                </Link>
                            </motion.li>
                        ))
                        }

                        <motion.li 
                            className={isOpen? styles["list-item"] : styles["list-item-hidden"]}
                            variants={itemVariant}
                        >
                            <button
                                onClick={() => {
                                    context.toggleStargazer();
                                    setOpen(false);
                                }}
                                className={styles['stargazer-button']}
                            >
                                <motion.span
                                    className={linkStyles}
                                    whileHover={{
                                    textShadow: '0 0 8px #cbcb85, 0 0 16px #cbcb85',
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    Stargazer
                                </motion.span>
                            </button>
                        </motion.li>

                        <motion.li 
                            className={isOpen? styles["list-item"] : styles["list-item-hidden"]}
                            variants={itemVariant}
                        >
                            <Socials />
                        </motion.li>
                    </ul>
                </motion.nav>
                
        </div>
    );
}