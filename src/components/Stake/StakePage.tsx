import React from "react";
import { useAccount, useConnect } from "wagmi";
import containerStyles from "../../Container.module.scss";
import styles from "./Stake.module.scss";
import { ReactComponent as WalletCraditCard } from "../../assets/svg/walletCreditCardIcon.svg";
import { ReactComponent as CrossIcon } from "../../assets/svg/cross.svg";
import { SubTitle } from "../SubTitle/SubTitle";
import { Button } from "../../shared/Button/Button";
import { Form } from "../Form/Form";
import { connectWallet } from "../../shared/utils/connectWallet";
import {
  usePeriodFinish,
  useRewardRate,
  useTotalStake,
  useStakedBalance,
} from "../../hooks/contracts-api";
import { formatted } from "../../shared/utils/formatUnits";
export const StakePage = () => {
  const { isConnected, isConnecting } = useAccount();
  const { connect, error } = useConnect();
  const { data: periodFinishData } = usePeriodFinish();
  const { data: rewardRateData } = useRewardRate();
  const { data: totalStakeData } = useTotalStake();
  const { data: stakedBalanceData } = useStakedBalance();

  const currentTimestamp = Math.floor(Date.now() / 1000);

  const periodFinish = formatted(periodFinishData);
  const rewardRate = formatted(rewardRateData);
  const totalStake = formatted(totalStakeData);
  const stakedBalance = formatted(stakedBalanceData);
  const remaining = periodFinish - currentTimestamp;
  const available = remaining * rewardRate;

  const rate = (stakedBalance * available) / totalStake + stakedBalance;

  return (
    <div className={containerStyles.container}>
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
          </Button>
        </>
      ) : (
        <div className={styles.mainContent}>
          <Form rewardRate={rate} />
        </div>
      )}
    </div>
  );
};
