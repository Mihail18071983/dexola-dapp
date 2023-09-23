import React from "react";
import styles from "./Unregistered.module.scss";
import { ReactComponent as WalletCraditCard } from "../../assets/svg/walletCreditCardIcon.svg";
import { ReactComponent as CrossIcon } from "../../assets/svg/cross.svg";
import { SubTitle } from "../SubTitle/SubTitle";
import { ConnectionButton } from "../../shared/ConnectionButton/ConnectionButton";

export const Unregistered = () => {
  return (
    <div className={styles.stakeWrapper}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <WalletCraditCard />
          <CrossIcon className={styles.icon} />
        </div>
        <SubTitle
          className={styles.subTitle}
          text="To start staking you need to connect you wallet first"
        />
      </div>
      <ConnectionButton className={styles.button } />
    </div>
  );
};
