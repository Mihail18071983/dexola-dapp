import React from "react";
import styles from "./Promt.module.scss";
import { ReactComponent as Pointer } from "../../assets/svg/pointer.svg";

interface IProps {
    text: string;
    className?: string;
}

export const Promt = ({ text, className}: IProps) => {
  return (
    <div className={`${styles.textWrapper} ${className}`}>
      <p className={styles.content}>{text}</p>
      <Pointer className={styles.pointer} />
    </div>
  );
};
