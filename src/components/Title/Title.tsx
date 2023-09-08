import React from "react"
import styles from "./Title.module.scss"

interface IProps {
    text: string
}

export const Title = ({ text }:IProps) => {
  return (
    <h1 className={styles.title}>
     {text}
    </h1>
  );
};
