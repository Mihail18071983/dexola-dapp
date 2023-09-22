import React from "react";
import { useAccount} from "wagmi";
import containerStyles from "../../Container.module.scss";
import styles from "./Page.module.scss";
import { Unregistered } from "../Unregistered/Unregistered";
import { Form } from "../Form/StakeForm";
import {
  usePeriodFinish,
  useRewardRate,
  useTotalStake,
  useStakedBalance,
  useUserBalance,
} from "../../hooks/contracts-api";
import { formatted } from "../../shared/utils/formatUnits";
import { currentTimeStamp } from "../../shared/utils/currentTimeStamp";
const StakePage = () => {
  const { isConnected } = useAccount();
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

  const rate = (
    (stakedBalance * available) /
    totalStake + stakedBalance
  ).toFixed(2);

  return (
    <div className={`${containerStyles.container} ${styles.wrapper}`}>
      {!isConnected ? (
        <Unregistered />
      ) : (
        <Form
          rewardRate={rate}
          struBalance={Number(userTokenBalance).toFixed(0)}
        />
      )}
    </div>
  );
};

export default StakePage
