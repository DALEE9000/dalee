"use client"

import { useState, createContext } from "react";

const SplashContext = createContext();
const StargazerContext = createContext();
const LibraryContext = createContext();

function SplashProvider(props) {
    const [onSplash, setOnSplash] = useState(true);

    function offSplash() {
        setOnSplash(false);
    }

    const value = {
        onSplash: onSplash,
        offSplash: offSplash,
    }

    return (
        <SplashContext.Provider value={value}>
            {props.children}
        </SplashContext.Provider>
    )
}

function StargazerProvider(props) {
    const [stargazer, setStargazer] = useState(false);

    function toggleStargazer() {
        if (stargazer === true) {
            setStargazer(false)
        } else {
            setStargazer(true)
        }
    }

    function deactivateStargazer() {
        setStargazer(false);
    }

    const value = {
        stargazer: stargazer,
        toggleStargazer: toggleStargazer,
        deactivateStargazer: deactivateStargazer,
    }

    return (
        <StargazerContext.Provider value={value}>
            {props.children}
        </StargazerContext.Provider>
    );
};

function LibraryProvider(props) {
    const [displayLibrary, setDisplayLibrary] = useState(true);

    function activateBookProfile() {
        setDisplayLibrary(false);
    }

    function deactivateBookProfile() {
        setDisplayLibrary(true);
    }

    const value = {
        displayLibrary: displayLibrary,
        activateBookProfile: activateBookProfile,
        deactivateBookProfile: deactivateBookProfile,
    }

    return (
        <LibraryContext.Provider value={value}>
            {props.children}
        </LibraryContext.Provider>
    );
}

export { SplashContext, SplashProvider, StargazerContext, StargazerProvider, LibraryContext, LibraryProvider };