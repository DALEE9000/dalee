"use client";

import cc from "classcat";
import styles from "./ParallaxTakeTwo.module.css";

export default function ParallaxTakeTwo({/* props */}) {
  
  return (
    <div className={styles.wrapper}>
          <div className={cc(styles.imageHolder, styles.bg1)}></div>
          <div className={cc(styles.imageHolder, styles.bg2)}></div>
          <div className={cc(styles.imageHolder, styles.bg3)}></div>
      {/*<div className={styles.content}>{props.children}</div>*/}
    </div>
  );
}