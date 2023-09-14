import React from "react";
import { useAccount, useConnect } from "wagmi";
import containerStyles from "../../Container.module.scss";
import styles from "./Stake.module.scss";
import { Oval } from "react-loader-spinner";
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
  useUserBalance,
} from "../../hooks/contracts-api";
import { formatted } from "../../shared/utils/formatUnits";
import { currentTimeStamp } from "../../shared/utils/currentTimeStamp";
export const StakePage = () => {
  const { isConnected, isConnecting } = useAccount();
  const { connect, error } = useConnect();
  const { data: periodFinish } = usePeriodFinish();
  const { data: rewardRateData } = useRewardRate();
  const { data: totalStakeData } = useTotalStake();
  const { data: stakedBalanceData } = useStakedBalance();
  const { data: userTokenBalanceData } = useUserBalance();



  const rewardRate = formatted(rewardRateData);
  const totalStake = formatted(totalStakeData);
  const stakedBalance = formatted(stakedBalanceData);
  const userTokenBalance = formatted(userTokenBalanceData);

  const remaining = Number(periodFinish) - currentTimeStamp;
  const available = remaining * rewardRate;

  const rate = ((stakedBalance * available) / (totalStake + stakedBalance)).toFixed(2);
 

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
        <Form rewardRate={rate} struBalance={Number(userTokenBalance).toFixed(0)} />
      )}
    </div>
  );
};
