import React from "react";
import { useAccount} from "wagmi";
import containerStyles from "../../Container.module.scss";
import styles from "./Page.module.scss";
import { Form } from "../Form/WithdrawForm";
import { Unregistered } from "../Unregistered/Unregistered";

 const WithdrawPage = () => {
  const { isConnected} = useAccount();


  return (
    <div className={`${containerStyles.container} ${styles.wrapper}`}>
      {!isConnected ? (
       <Unregistered/>
      ) : (
        <Form  />
      )}
    </div>
  );
};

export default WithdrawPage;
