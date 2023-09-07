import React, { ReactNode } from "react";

import styles from "./Button.module.scss";

interface IProps {
  type: "submit" | "reset" | "button";
  children: ReactNode;
  url?: string;
  className?: string;
  style?: { [key: string]: string };
  onClick?:() => void;
}

export const Button = ({ type = "button", children, className, onClick }: IProps) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${className}`} type={type}>
      {children}
    </button>
  );
};
