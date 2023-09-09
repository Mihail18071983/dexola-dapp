import React, { ReactNode } from "react";

import styles from "./Button.module.scss";

interface IProps {
  type: "submit" | "reset" | "button";
  children: ReactNode;
  url?: string;
  className?: string;
  style?: { [key: string]: string };
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  type = "button",
  children,
  className,
  onClick,
  disabled,
}: IProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} ${className}`}
      type={type}
    >
      {children}
    </button>
  );
};
