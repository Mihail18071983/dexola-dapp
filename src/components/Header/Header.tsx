import React from "react";
import styles from "./Header.module.scss";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { formatted } from "../../shared/utils/formatUnits";
import { currentTimeStamp } from "../../shared/utils/currentTimeStamp";
import { truncateAddress } from "../../shared/utils/truncateAddress";
import { Promt } from "../../shared/Promt/Promt";
import { AiFillWarning } from "react-icons/ai";
import { Button } from "../../shared/Button/Button";
import { ErrorMsg } from "../Form/ClaimRewardsForm";
import { CustomLoader } from "../../shared/CustomLoader/CustomLoader";

import {
  useTotalStake,
  usePeriodFinish,
  useReward,
  useRewardForPeriod,
  useUserBalance,
  useUserEther,
} from "../../hooks/contracts-api";

import { useAppContextValue } from "../../hooks/useContexValue";
import containerStyles from "../../Container.module.scss";
import { Logo } from "../../shared/svgComponents/Logo";
import { Title } from "../Title/Title";
import earthImage from "../../assets/images/earth.jpg";
import { ReactComponent as CryptoCurrency } from "../../assets/svg/cryptocurrency.svg";
import { ConnectionButton } from "../../shared/ConnectionButton/ConnectionButton";
import { Msg } from "../../shared/Notification/Msg";

interface IProps {
  onOpenModal: (content: string) => void;
}

export const Header = ({ onOpenModal }: IProps) => {
  const DAY_Duration = 24 * 60 * 60;
  const { address, isConnected } = useAccount();
  const { data: totalStakeUsersData } = useTotalStake();
  const { data: periodFinish } = usePeriodFinish();
  const { data: rewardData } = useReward();
  const { data: numberRewordsForPeriodData } = useRewardForPeriod();
  const { data: userTokenBalanceData } = useUserBalance();
  const { data: userEtherBalance } = useUserEther();
  const { stakedBalanceData } = useAppContextValue();
  const { chain } = useNetwork();
  const { isLoading, switchNetwork } = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
    onError() {
      ErrorMsg();
    },
  });

  const tokenBalanceValue = formatted(userTokenBalanceData);
  const stakedBalance = formatted(stakedBalanceData).toFixed(2);
  const totalRewardForPeriod = formatted(numberRewordsForPeriodData);
  const totalStakeUsers = formatted(
    totalStakeUsersData ? totalStakeUsersData : 0
  );
  const rewardsAvailable = formatted(rewardData).toFixed(0);

  const trancatedAdress = address ? truncateAddress(address) : "";

  const Days =
    chain?.id === 11155111
      ? ((Number(periodFinish) - currentTimeStamp) / DAY_Duration).toFixed(0)
      : 0;

  const APR =
    chain?.id === 11155111
      ? ((totalRewardForPeriod * 100) / totalStakeUsers).toFixed(0) || 0
      : 0;

  return (
    <header className={styles.header}>
      <div className={containerStyles.container}>
        <div className={styles.menuWrapper}>
          <button aria-label="logo" className={styles.logo}>
            <Logo className={styles.icon} width="34" height="20" />
          </button>
          {!isConnected ? (
            <ConnectionButton />
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
        <div className={styles.add_wrapper}>
<div className={styles.infoWrapper}>
          <Title className={styles.title} text="StarRunner Token staking" />
          <div className={styles.userValueInfoWrapper}>
            <div
              onTouchStart={() => {
                onOpenModal("content1");
              }}
              className={styles.userStakedBalanceWrapper}
            >
              <p className={styles.userStakedBalance}>
                <span className={styles.stakedBalanceValue}>
                  {stakedBalance}
                </span>{" "}
                <span className={styles.stakedBalanceUnit}>STRU</span>
                <span className={styles.stakedBalanceName}>Staked balance</span>
              </p>
              <Promt
                className={styles.promt}
                text="Staking rewards get allocated on this sum"
              />
            </div>
            <div
              onTouchStart={() => {
                onOpenModal("content2");
              }}
              className={styles.aprWrapper}
            >
              <p className={styles.apr}>
                <span className={styles.aprValue}>≈{APR}%</span>
                <span className={styles.aprUnit}>APR</span>
              </p>
              <Promt
                className={styles.promt}
                text="Displays the average for APR.
                Interest rate is calculated for each amount of tokens."
              />
            </div>
            <p className={styles.days}>
              <span className={styles.daysValue}>{Days}</span>
              <span className={styles.daysUnit}>DAYS</span>
            </p>
            <div
              onTouchStart={() => {
                onOpenModal("content3");
              }}
              className={styles.availableRewardsWrapper}
            >
              <p className={styles.avilableReawards}>
                <span className={styles.rewardsValue}>{rewardsAvailable}</span>{" "}
                <span className={styles.rewardsUnit}>STRU</span>
                <span className={styles.rewardsName}>Rewards</span>
              </p>
              <Promt
                className={styles.promt}
                text="Rewards get allocated every second"
              />
            </div>
          </div>
        </div>
        {chain?.id !== 11155111 && (
          <div className={styles.switchWrapper}>
            <Button
              className={styles.btn}
              type="button"
              onClick={() => switchNetwork!(11155111)}
            >
              <span className={styles.btnContent}>
                {isLoading ? "switing" : "switch"} to the Sepolia
              </span>
              {isLoading && <CustomLoader width={32} height={32} />}
            </Button>
            <Msg
              Component={AiFillWarning }
              text1="Unsupported network."
              text2="Please, switch to Sepolia"
            />
          </div>
        )}
        </div>
        
      </div>
    </header>
  );
};
