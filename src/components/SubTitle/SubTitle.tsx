import React from "react";

import styles from "./SubTitle.module.scss";

interface IProps {
  text: string;
  className?: string;
}

export const SubTitle = ({ text, className }: IProps) => {
  return <h2 className={`${styles.subTitle} ${className}`}>{text}</h2>;
};
