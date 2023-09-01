import React, { FC, MutableRefObject } from "react";
import styles from "./Header.module.scss";
import containerStyles from "../../Container.module.scss";
import { Logo } from "../../shared/svgComponents/Logo";
import { Link } from "react-router-dom";
import { Button } from "../../shared/Button/Button";

interface HeaderProps {
  headerRef: MutableRefObject<HTMLElement | null>;
  scrollToJoinUs: () => void;
}

export const Header: FC<HeaderProps> = ({ headerRef, scrollToJoinUs }) => {
  return (
    <header ref={headerRef} className={styles.header}>
      <div className={containerStyles.container}>
        <div className={styles.nav}>
          <Link to="https://dexola.com" className={styles.header_logo}>
            <Logo width="35" height="20" className={styles.icon} />
          </Link>
          <Button
            type="button"
            className={styles.link}
            onClick={scrollToJoinUs}
          >
            Join Now
          </Button>
        </div>
      </div>
    </header>
  );
};
