import React from "react";
import styles from "./Subtitle.module.scss";

interface IProps {
  text: string;
}

export const SubTitle = ({ text }: IProps) => {
  return <h3 className={styles.subTitle}>{text}</h3>;
};
