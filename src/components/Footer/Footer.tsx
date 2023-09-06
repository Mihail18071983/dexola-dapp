import React from "react";
import styles from "./Footer.module.scss";
import containerStyles from "../../Container.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={containerStyles.container}>
      Footer
      </div>
    </footer>
  );
};
