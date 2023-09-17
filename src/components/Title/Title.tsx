import React from "react"
import styles from "./Title.module.scss"

interface IProps {
  text: string;
  className?: string;
}

export const Title = ({ text, className }:IProps) => {
  return (
    <h1 className={`${styles.title} ${className}`}>
     {text}
    </h1>
  );
};
