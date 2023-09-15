import React, { FC } from "react";
import { useAccount, useConnect } from "wagmi";
import { connectWallet } from "../../shared/utils/connectWallet";
import { formatted } from "../../shared/utils/formatUnits";
import { currentTimeStamp } from "../../shared/utils/currentTimeStamp";

import {
  useStakedBalance,
  useTotalStake,
  usePeriodFinish,
  useReward,
  useRewardForPeriod,
  useUserBalance,
  useUserEther,
} from "../../hooks/contracts-api";
import styles from "./Header.module.scss";
import containerStyles from "../../Container.module.scss";
import { Oval } from "react-loader-spinner";
import { Logo } from "../../shared/svgComponents/Logo";
import { Button } from "../../shared/Button/Button";
import { Title } from "../Title/Title";
import { Help } from "../../shared/svgComponents/Help";

export const Header: FC = () => {
  const DAY_Duration = 24 * 60 * 60;
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, error } = useConnect();
  const { data: stakedBalanceData } = useStakedBalance();
  const { data: totalStakeUsersData } = useTotalStake();
  const { data: periodFinish } = usePeriodFinish();
  const { data: rewardData } = useReward();
  const { data: numberRewordsForPeriodData } = useRewardForPeriod();
  const { data: userTokenBalanceData } = useUserBalance();
  const { data: userEtherBalance } = useUserEther();

  const tokenBalanceValue = formatted(userTokenBalanceData);
  const stakedBalance = formatted(stakedBalanceData).toFixed(0);
  const totalRewardForPeriod = formatted(numberRewordsForPeriodData);
  const totalStakeUsers = formatted(totalStakeUsersData);
  const rewardsAvailable = formatted(rewardData).toFixed(0);

  const Days = (
    (Number(periodFinish) - currentTimeStamp) /
    DAY_Duration
  ).toFixed(0);

  const APR = ((totalRewardForPeriod * 100) / totalStakeUsers).toFixed(0);

  return (
    <header className={styles.header}>
      <div className={containerStyles.container}>
        <div className={styles.menuWrapper}>
          <button className={styles.logo}>
            <Logo className={styles.icon} width="34" height="20" />
          </button>
          {!isConnected ? (
            <Button
              disabled={isConnecting}
              onClick={() => connectWallet({ connect, error })}
              type="button"
            >
              Connect Wallet{" "}
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
          ) : (
            <>
              <p>Balance: {Number(tokenBalanceValue).toFixed(0)} STRU</p>
              <div className={styles.clienInfo}>
                <p>
                  <span>{Number(userEtherBalance?.formatted).toFixed(2)}</span>
                  <span>ETH</span>
                </p>
                <p>{address}</p>
              </div>
            </>
          )}
        </div>
        {isConnected && (
          <div className={styles.infoWrapper}>
            <Title text="StarRunner Token staking" />
            <p>
              <span>{stakedBalance} STRU</span>
              <span className={styles.stakedBalanceName}>
                Staked balance
                <Help width="24" heigth="24" />
              </span>
            </p>
            <p>
              <span>≈{APR}%</span> <span>APR</span>
            </p>
            <p>
              <span>{Days}</span>
              <span>DAYS</span>
            </p>
            <p>
              <span>{rewardsAvailable}</span>
              <span>STRU</span>
              <span>Rewards</span>
            </p>
          </div>
        )}
      </div>
    </header>
  );
};
