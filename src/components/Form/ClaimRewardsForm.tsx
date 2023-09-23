import React, { useState } from "react";
import styles from "./Form.module.scss";
import { Button } from "../../shared/Button/Button";

import { toast } from "react-toastify";
import { CustomLoader } from "../../shared/CustomLoader/CustomLoader";
import { Msg } from "../../shared/ErrorMsg/Msg";
import { ReactComponent as IconApproved } from "../../assets/svg/iconApproved.svg";
import { ReactComponent as IconRejected } from "../../assets/svg/iconRejected.svg";
import { useAccount, useWaitForTransaction } from "wagmi";

import { useClaimRewards } from "../../hooks/contracts-api";

interface IProps {
  rewards: string | undefined;
}

export const Form = ({ rewards }: IProps) => {
  const { address } = useAccount();

  const { claim, data, isWaitingRewardsWritten } = useClaimRewards();

  const [Rewards, setRewards] = useState<number | null>(null);

  const successMsg = () =>
    toast(
      <Msg
        approved
        text1={`${Rewards} STRU`}
        text2="successfully added to the user's account"
        Component={IconApproved}
      />
    );

  const { isLoading: isWaitingRewards } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      successMsg();
    },
  });

  const onSubmit = async () => {
    try {
      if (!address) {
        console.error("User address not available.");
        return;
      }
      if (Number(rewards) === 0) return;
      if (Number(rewards) !== 0) setRewards(Number(rewards));
      claim?.();
    } catch (error) {
      toast(
        <Msg
          text1="Connection Error"
          text2="Please try again"
          Component={IconRejected}
        />
      );
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.formContent}>
        <h2 className={styles.heading}>
          <span className={styles.stake}>Claim rewards</span>
        </h2>
        <p className={styles.availableTotens}>
          <span className={styles.available}>Available:</span>
          <span className={styles.availableTokenValue}>
            {rewards ? rewards : 0}
          </span>
          <span className={styles.availableTokenUnit}>STRU</span>
        </p>
      </div>

      <div className={styles.additionalWrapper}>
        <Button
          onClick={onSubmit}
          disabled={Number(rewards) === 0}
          className={styles.btn}
          type="button"
        >
          <span className={styles.btnContent}>
            {isWaitingRewards ? "Processing..." : "Claim rewards"}
          </span>
          {isWaitingRewards ||isWaitingRewardsWritten && <CustomLoader width={32} height={32} />}
        </Button>
      </div>
    </div>
  );
};
