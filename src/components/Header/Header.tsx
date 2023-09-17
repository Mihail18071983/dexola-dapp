import React, { FC } from "react";
import { useAccount, useConnect } from "wagmi";
import { connectWallet } from "../../shared/utils/connectWallet";
import { formatted } from "../../shared/utils/formatUnits";
import { currentTimeStamp } from "../../shared/utils/currentTimeStamp";
import { truncateAddress } from "../../shared/utils/truncateAddress";

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
import earthImage from "../../assets/images/earth.jpg";
import { ReactComponent as CryptoCurrency } from "../../assets/svg/cryptocurrency.svg";

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
  const totalStakeUsers = formatted(
    totalStakeUsersData ? totalStakeUsersData : 0
  );
  const rewardsAvailable = formatted(rewardData).toFixed(0);

  const trancatedAdress = address ? truncateAddress(address) : "";

  const Days = (
    (Number(periodFinish) - currentTimeStamp) /
    DAY_Duration
  ).toFixed(0);

  const APR = ((totalRewardForPeriod * 100) / totalStakeUsers).toFixed(0) || 0;

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
            <div className={styles.clientInfoWrapper}>
              <div className={styles.balanceWrapper}>
                <img
                  className={styles.balanceImg}
                  width={32}
                  height={32}
                  src={earthImage}
                  alt="earthIcon"
                />
                <p className={styles.balance}>
                  {Number(tokenBalanceValue).toFixed(0)} STRU
                </p>
              </div>

              <div className={styles.clientInfo}>
                <p className={styles.currency}>
                  <CryptoCurrency />
                  <span>
                    {Number(userEtherBalance?.formatted).toFixed(2)} ETH
                  </span>
                </p>
                <p className={styles.userAddress}>{trancatedAdress}</p>
              </div>
            </div>
          )}
        </div>
        {isConnected && (
          <div className={styles.infoWrapper}>
            <Title className={styles.title} text="StarRunner Token staking" />
            <div className={styles.userValueInfoWrapper}>
              <p className={styles.userStakedBalance}>
                <span className={styles.stakedBalanceValue}>
                  {stakedBalance}
                </span>{" "}
                <span className={styles.stakedBalanceUnit}>STRU</span>
                <span className={styles.stakedBalanceName}>Staked balance</span>
              </p>
              <p className={styles.apr}>
                <span className={styles.aprValue}>≈{APR}%</span>
                <span className={styles.aprUnit}>APR</span>
              </p>
              <p className={styles.days}>
                <span className={styles.daysValue}>{Days}</span>
                <span className={styles.daysUnit}>DAYS</span>
              </p>
              <p className={styles.avilableReawards}>
                <span className={styles.rewardsValue}>{rewardsAvailable}</span>{" "}
                <span className={styles.rewardsUnit}>STRU</span>
                <span className={styles.rewardsName}>Rewards</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
