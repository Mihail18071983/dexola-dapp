import React from "react";
import { useAccount, useConnect } from "wagmi";
import containerStyles from "../../Container.module.scss";
import styles from "./Stake.module.scss";
import { ReactComponent as WalletCraditCard } from "../../assets/svg/walletCreditCardIcon.svg";
import { ReactComponent as CrossIcon } from "../../assets/svg/cross.svg";
import { SubTitle } from "../SubTitle/SubTitle";
import { Button } from "../../shared/Button/Button";
import { connectWallet } from "../../shared/utils/connectWallet";
export const StakePage = () => {
  const { isConnected } = useAccount();
  const { connect, error } =
    useConnect();
  return (
    <div className={containerStyles.container}>
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
      <Button className={styles.btn} onClick={()=>connectWallet({connect, error, isConnected,})} type="button"> Connect Wallet</Button>
    </div>
  );
};
