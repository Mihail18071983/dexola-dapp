import React, { Fragment } from "react";
import styles from "./Msg.module.scss";

interface IProps {
  text1: string;
  text2: string;
  Component?: React.FC;
  approved?: boolean;
}

export const Msg = ({
  text1,
  text2,
  Component = Fragment,
  approved,
}: IProps) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.iconWrapper} ${!approved ? styles.rejected : ""}`}
      >
        <Component />
      </div>
      <p className={styles.textContent}>
        <span className={styles.part1}>{text1}</span>
        <span className={styles.part2}>{text2}</span>
      </p>
    </div>
  );
};
