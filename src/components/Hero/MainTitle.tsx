import React, {memo} from "react";
import styles from "./MainTitle.module.scss";
import { animated, useSpring } from "@react-spring/web";


interface IProps {
  text: string;
}

export const MainTitle = memo(({ text }: IProps) => {

  const spring = useSpring({
    from: { transform: "translateX(100vw)" },
    to: { transform: "translateX(-100vw)" },
    config: { duration: 10000,},
    reset: true,
    loop: true
  });
  
  return (
      <animated.h1 style={{...spring}} className={styles.title}>
        {text}
      </animated.h1>
  );
});
