"use client"

import { useState, createContext } from "react";

const StargazerContext = createContext();

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

export { StargazerContext, StargazerProvider };