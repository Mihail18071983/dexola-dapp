import React from "react";
import { useAccount, useConnect } from "wagmi";
import containerStyles from "../../Container.module.scss";
import styles from "./Withdraw.module.scss";
import { Oval } from "react-loader-spinner";
import { ReactComponent as WalletCraditCard } from "../../assets/svg/walletCreditCardIcon.svg";
import { ReactComponent as CrossIcon } from "../../assets/svg/cross.svg";
import { SubTitle } from "../SubTitle/SubTitle";
import { Button } from "../../shared/Button/Button";
import { Form } from "../Form/WithdrawForm";
import { connectWallet } from "../../shared/utils/connectWallet";
import { useStakedBalance } from "../../hooks/contracts-api";
import { formatted } from "../../shared/utils/formatUnits";

export const WithdrawPage = () => {
  const { isConnected, isConnecting } = useAccount();
  const { connect, error } = useConnect();

  const { data: stakedBalanceData } = useStakedBalance();
  const stakedBalance = formatted(stakedBalanceData).toFixed(0);

  return (
    <div className={`${containerStyles.container} ${styles.stakeWrapper}`}>
      {!isConnected ? (
        <>
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
            disabled={isConnecting}
            className={styles.btn}
            onClick={() => connectWallet({ connect, error })}
            type="button"
          >
            {" "}
            Connect Wallet
            {isConnecting && (
              <Oval
                ariaLabel="loading-indicator"
                height={32}
                width={32}
                strokeWidth={2}
                strokeWidthSecondary={1}
                color="blue"
                secondaryColor="white"
              />
            )}
          </Button>
        </>
      ) : (
        <Form stakedBalance={stakedBalance} />
      )}
    </div>
  );
};
