import React from "react";
import styles from "./Footer.module.scss";
import containerStyles from "../../Container.module.scss";
import { Link } from "react-router-dom";
import { Facebook } from "../../shared/svgComponents/Facebook";
import { Instagram } from "../../shared/svgComponents/Instagram";
import { Telegram } from "../../shared/svgComponents/Telegram";
import { Discord } from "../../shared/svgComponents/Discord";
import { Content } from "../../shared/Content/Content";

interface IProps {
  isShown: boolean;
}
export const Footer = ({ isShown }: IProps) => {
  return (
    <footer className={styles.footer}>
      <div className={`${containerStyles.container} ${styles.wrapper}`}>
        <div className={styles.socialWrapper}>
          <Link className={styles.link} to="#">
            <Facebook width="32" height="32" className={styles.icon} />
          </Link>
          <Link className={styles.link} to="#">
            <Instagram width="32" height="32" className={styles.icon} />
          </Link>
          <Link className={styles.link} to="#">
            <Discord width="32" height="32" className={styles.icon} />
          </Link>
          <Link className={styles.link} to="#">
            <Telegram width="32" height="32" className={styles.icon} />
          </Link>
        </div>

        {isShown ? (
          <>
            <Content
              className={`${styles.content} ${styles.right}`}
              text="Designed by Dexola - 2023"
            />
            <Content
              className={`${styles.content} ${styles.left}`}
              text="© All rights reserved"
            />
          </>
        ) : (
          <div className={styles.contentWrapper}>
            <Content
              className={`${styles.content} ${styles.right}`}
              text="Designed by Dexola - 2023"
            />
            <Content
              className={`${styles.content} ${styles.left}`}
              text="© All rights reserved"
            />
          </div>
        )}
      </div>
    </footer>
  );
};
