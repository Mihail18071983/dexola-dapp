import React from "react"
import styles from "./SectionTitle.module.scss"

interface IProps {
    part1: string;
    part2: string;
}

export const SectionTitle = ({ part1, part2 }:IProps) => {
  return (
    <h1 className={styles.title}>
      <span>{part1}</span>
      <span>{part2}</span>
    </h1>
  );
};
