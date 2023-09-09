import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Main.module.scss";
import containerStyles from "../../Container.module.scss";
import { AppRoutes } from "../AppRoutes";

export const Main: FC = () => {
  return (
    <main className={styles.main}>
      <div className={containerStyles.container}>
        <nav className={styles.stakeMenu}>
          <NavLink className={styles.link} to="/">
            Stake
          </NavLink>
          <NavLink className={styles.link} to="/withdraw">
            Withdraw
          </NavLink>
          <NavLink className={styles.link} to="/claimrewards">
            Claim rewards
          </NavLink>
        </nav>
      </div>
      <AppRoutes/>
    </main>
  );
};
