import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Main.module.scss";
import containerStyles from "../../Container.module.scss";
import { AppRoutes } from "../AppRoutes";

export const Main: FC = () => {
  return (
    <main className={styles.main}>
        <nav className={` ${containerStyles.container} ${styles.stakeMenu} `}>
          <NavLink
            className={styles.link}
            to="/"
          >
            Stake
          </NavLink>
          <NavLink className={styles.link} to="/withdraw">
            Withdraw
          </NavLink>
          <NavLink className={styles.link} to="/claimrewards">
            Claim rewards
          </NavLink>
        </nav>
      <AppRoutes />
    </main>
  );
};
