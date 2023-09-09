import React, { FC } from "react";
import { useAccount, useConnect } from "wagmi";
import { connectWallet } from "../../shared/utils/connectWallet";
import { formatted } from "../../shared/utils/formatUnits";
import {
  useStakedBalance,
  useTotalStake,
  usePeriodFinish,
  useReward,
  useRewardForPeriod,
  useUserBalance,
  useUserEther
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
  const { data: periodFinishData } = usePeriodFinish();
  const { data: rewardData } = useReward();
  const { data: numberRewordsForPeriodData } = useRewardForPeriod();
  const { data: userTokenData } = useUserBalance();
  const { data: userEtherData } =useUserEther();

  const stakedBalance = formatted(stakedBalanceData);
  const totalRewordForPeriod = formatted(numberRewordsForPeriodData);
  const totalStakeUsers = formatted(totalStakeUsersData);
  const periodFinish = formatted(periodFinishData);
  const rewardsAvailable = formatted(rewardData);

  const Days = periodFinish / DAY_Duration;

  const APR = (totalRewordForPeriod * 100) / totalStakeUsers;

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
              <p>Balance: {userTokenData?.formatted} STRU</p>
              <div className={styles.clienInfo}>
                <p>
                  {userEtherData?.formatted} {userEtherData?.symbol}
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
