import React from "react";
import { useAccount} from "wagmi";
import containerStyles from "../../Container.module.scss";
import styles from "./Page.module.scss";
import { Form } from "../Form/WithdrawForm";
import { useStakedBalance } from "../../hooks/contracts-api";
import { formatted } from "../../shared/utils/formatUnits";
import { Unregistered } from "../Unregistered/Unregistered";

 const WithdrawPage = () => {
  const { isConnected} = useAccount();

  const { data: stakedBalanceData } = useStakedBalance();
  const stakedBalance = formatted(stakedBalanceData).toFixed(0);

  return (
    <div className={`${containerStyles.container} ${styles.wrapper}`}>
      {!isConnected ? (
       <Unregistered/>
      ) : (
        <Form stakedBalance={stakedBalance} />
      )}
    </div>
  );
};

export default WithdrawPage;
