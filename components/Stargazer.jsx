import React, { useEffect, useState, useRef } from 'react';
import { jersey } from "@/components/Fonts";
import { StargazerAnimation } from "@/components/TextAnimations";
import styles from "@/components/home/Home.module.css";

const requestAnimationFrame = window.requestAnimationFrame;
const cancelAnimationFrame = window.cancelAnimationFrame;

const Stargazer = () => {
    const [isDragging, setDragging] = useState(false);
    const block = useRef(null);
    const frameID = useRef(0);
    const lastX = useRef(0);
    const lastY = useRef(0);
    const dragX = useRef(0);
    const dragY = useRef(0);

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
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  /**
   *
   */
  useEffect(() => {
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
        className={styles['stargazer-box']}
        ref={block}
        onMouseDown={handleMouseDown}
        style={{ fontFamily: jersey.style.fontFamily }}
    >
        <StargazerAnimation />
    </div>
  );
};

export default Stargazer;