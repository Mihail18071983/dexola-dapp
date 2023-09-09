import React from "react";
import styles from "./Footer.module.scss";
import containerStyles from "../../Container.module.scss";

export const Footer = () => {
  return (
    <footer>
      <div className={`${containerStyles.container} ${styles.wrapper}`}>
        <p className={styles.content}>Designed by Dexola - 2023</p>
        <p className={styles.content}>© All rights reserved</p>
      </div>
    </footer>
  );
};
