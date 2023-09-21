import React from "react";
import { useAccount } from "wagmi";
import containerStyles from "../../Container.module.scss";
import styles from "./Page.module.scss";
import { Form } from "../Form/ClaimRewardsForm";
import { formatted } from "../../shared/utils/formatUnits";
import { useReward } from "../../hooks/contracts-api";
import { Unregistered } from "../Unregistered/Unregistered";

const ClaimReawardsPage = () => {
  const { isConnected } = useAccount();


  const { data: rewardData } = useReward();
  const rewardsAvailable = formatted(rewardData).toFixed(0);

  return (
    <div className={`${containerStyles.container} ${styles.wrapper}`}>
      {!isConnected ? (
      <Unregistered/>
      ) : (
        <Form rewards={rewardsAvailable} />
      )}
    </div>
  );
};

export default ClaimReawardsPage