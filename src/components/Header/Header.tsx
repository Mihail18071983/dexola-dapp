import React, { FC } from "react";
import styles from "./Header.module.scss";
import containerStyles from "../../Container.module.scss";



export const Header: FC = () => {
  return (
    <header  className={styles.header}>
      <div className={containerStyles.container}>
      Header
      </div>
    </header>
  );
};
