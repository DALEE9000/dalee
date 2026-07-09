import React, { useEffect, useState, useRef } from 'react';
import clsx from "clsx";
import { StargazerAnimation } from "@/components/TextAnimations";
import styles from "@/components/home/Home.module.css";

const Stargazer = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [musicOn, setMusicOn] = useState(false);

    const stargazerBox = clsx({
        [styles['stargazer-box']]: true,
        [styles['stargazer-box-visible']]: isVisible,
        [styles['stargazer-box-hidden']]: !isVisible,
    })

    const [isDragging, setDragging] = useState(false);
    const block = useRef(null);
    const frameID = useRef(0);
    const lastX = useRef(0);
    const lastY = useRef(0);
    const dragX = useRef(0);
    const dragY = useRef(0);

    const hasDragged = useRef(false);

    useEffect(() => {
        const centerBlock = () => {
            if (!block.current) return;

            const el = block.current;

            // Wait until fonts are loaded and layout is stable
            requestAnimationFrame(() => {
            const rect = el.getBoundingClientRect();
            const scrollX = window.scrollX || window.pageXOffset;
            const scrollY = window.scrollY || window.pageYOffset;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            dragX.current = scrollX + (windowWidth - rect.width) / 2;
            dragY.current = scrollY + (windowHeight - rect.height) / 2;

            el.style.transform = `translate3d(${dragX.current}px, ${dragY.current}px, 0)`;
            });
        };

        centerBlock();

        // Re-center on resize (unless the user has dragged it somewhere) so
        // the box can't end up stranded outside the viewport
        const onResize = () => {
            if (!hasDragged.current) centerBlock();
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);


    const handleMove = (e) => {
        if (!isDragging) {
            return;
        }

        const deltaX = lastX.current - e.pageX;
        const deltaY = lastY.current - e.pageY;
        lastX.current = e.pageX;
        lastY.current = e.pageY;
        dragX.current -= deltaX;
        dragY.current -= deltaY;

        cancelAnimationFrame(frameID.current);

        frameID.current = requestAnimationFrame(() => {
            block.current.style.transform = `translate3d(${dragX.current}px, ${dragY.current}px, 0)`;
        });
    };

    const handleMouseDown = (e) => {
        lastX.current = e.pageX;
        lastY.current = e.pageY;
        hasDragged.current = true;
        setDragging(true);
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    useEffect(() => {
        // Only listen while actually dragging — no document-wide mousemove
        // work the rest of the time
        if (!isDragging) return;

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
    <>
        <div
            className={stargazerBox}
            ref={block}
            onMouseDown={handleMouseDown}
            onClick={() => {
                setIsVisible(false)
                setMusicOn(true)
            }}
        >
            <StargazerAnimation />
        </div>

        {musicOn && <audio src="/Holst-_venus.ogg" autoPlay loop preload="auto" />}
    </>
    );
};

export default Stargazer;