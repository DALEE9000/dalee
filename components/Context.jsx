"use client"

import { useState, createContext } from "react";

const StargazerContext = createContext();
const LibraryContext = createContext();

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

export { StargazerContext, StargazerProvider, LibraryContext, LibraryProvider };