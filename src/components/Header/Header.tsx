import React, { FC } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useBalance } from "wagmi";
import { useContractRead } from "wagmi";
import { formatUnits } from "viem/utils";
import { connectWallet } from "../../shared/utils/connectWallet";

import styles from "./Header.module.scss";
import containerStyles from "../../Container.module.scss";

import { Logo } from "../../shared/svgComponents/Logo";
import { Button } from "../../shared/Button/Button";
import { Title } from "../Title/Title";
import { Help } from "../../shared/svgComponents/Help";

import stakingABI from "../../stakingABI.json";

export const Header: FC = () => {
  const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
  const CONTRACT_ERC_TOKEN = import.meta.env.VITE_CONTRACT_ERC_TOKEN;
  const DAY_Duration = 24 * 60 * 60;
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();


  const { data: userTokenData } = useBalance({
    address,
    token: CONTRACT_ERC_TOKEN,
    formatUnits: "ether",
  });

  const { data: userEtherData } = useBalance({
    address,
    watch: true,
    formatUnits: "ether",
  });

  const { data: stakedBalanceData } = useContractRead({
    address: isConnected ? CONTRACT_ADDRESS : 0,
    abi: stakingABI,
    functionName: "balanceOf",
    args: [address],
  });

  const { data: NumberRewordsForPeriodData } = useContractRead({
    address: isConnected ? CONTRACT_ADDRESS : 0,
    abi: stakingABI,
    functionName: "getRewardForDuration",
  });

  const { data: totalStakeUsersData } = useContractRead({
    address: isConnected ? CONTRACT_ADDRESS : 0,
    abi: stakingABI,
    functionName: "totalSupply",
  });

  const { data: periodFinishData } = useContractRead({
    address: isConnected ? CONTRACT_ADDRESS : 0,
    abi: stakingABI,
    functionName: "periodFinish",
  });

  const { data: rewardData } = useContractRead({
    address: isConnected ? CONTRACT_ADDRESS : 0,
    abi: stakingABI,
    functionName: "earned",
    args: [address],
  });

  const stakedBalance = stakedBalanceData
    ? formatUnits(stakedBalanceData as bigint, 6)
    : 0;

  const totalRewordForPeriod = NumberRewordsForPeriodData
    ? +formatUnits(NumberRewordsForPeriodData as bigint, 6)
    : 0;

  const totalStakeUsers = totalStakeUsersData
    ? +formatUnits(totalStakeUsersData as bigint, 6)
    : 0;

  const periodFinish = periodFinishData
    ? +formatUnits(periodFinishData as bigint, 6)
    : 0;

  const rewardsAvailable =
    rewardData !== undefined ? formatUnits(rewardData as bigint, 6) : 0;

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
            <Button onClick={()=>(connectWallet({connect, error, isConnected}))} type="button">
              Connect Wallet
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
