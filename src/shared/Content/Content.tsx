import React from "react";
import styles from "./Content.module.scss";

interface IProps {
  text: string;
  className?: string;
}

export const Content = ({ text, className }: IProps) => {
  return <p className={`${styles.content} ${className}`}>{text}</p>;
};
