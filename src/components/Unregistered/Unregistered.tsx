import React from "react";
import { useAccount, useConnect } from "wagmi";
import styles from "./Unregistered.module.scss";
import { ReactComponent as WalletCraditCard } from "../../assets/svg/walletCreditCardIcon.svg";
import { ReactComponent as CrossIcon } from "../../assets/svg/cross.svg";
import { SubTitle } from "../SubTitle/SubTitle";
import { Button } from "../../shared/Button/Button";
import { Oval } from "react-loader-spinner";
import { connectWallet } from "../../shared/utils/connectWallet";


export const Unregistered = () => {
    const { isConnecting } = useAccount();
    const { connect, error } = useConnect();
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
      <Button
        className={styles.button}
        disabled={isConnecting}
        onClick={() => connectWallet({ connect, error })}
        type="button"
      >
        {isConnecting ? (
          <Oval
            ariaLabel="loading-indicator"
            height={32}
            width={32}
            strokeWidth={2}
            strokeWidthSecondary={1}
            color="blue"
            secondaryColor="white"
          />
        ) : (
          <span>Connect Wallet</span>
        )}
      </Button>
    </div>
  );
};
