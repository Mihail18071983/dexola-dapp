import React from "react";
import { useAccount } from "wagmi";
import containerStyles from "../../Container.module.scss";
import styles from "./Page.module.scss";
import { Unregistered } from "../Unregistered/Unregistered";
import { Form } from "../Form/StakeForm";
import { useUserBalance } from "../../hooks/contracts-api";
import { formatted } from "../../shared/utils/formatUnits";
const StakePage = () => {
  const { isConnected } = useAccount();
  const { data: userTokenBalanceData } = useUserBalance();
  const userTokenBalance = formatted(userTokenBalanceData);

  return (
    <div className={`${containerStyles.container} ${styles.wrapper}`}>
      {!isConnected ? (
        <Unregistered />
      ) : (
        <Form
          struBalance={Number(userTokenBalance).toFixed(0)}
        />
      )}
    </div>
  );
};

export default StakePage;
