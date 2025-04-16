"use client"

import { useClickAway} from "react-use";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sling as Hamburger } from "hamburger-react";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [isOpen, setOpen] = useState(false);
    const ref = useRef(null);

    useClickAway(ref, () => setOpen(false));

    return (
        <div className={styles["NavLinks"]} ref={ref}>
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
                        <li className="list-item">
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/research">Research</Link>
                        </li>
                        <li>
                            <Link href="/library">Library</Link>
                        </li>
                        <li>
                            <Link href="/writing">Writing</Link>
                        </li>
                        <li>
                            <Link href="/hire">Hire Me!</Link>
                        </li>
                    </ul>
                </nav>
                )}
        </div>
    );
}