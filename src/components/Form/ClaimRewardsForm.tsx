import React, {useState} from "react";
import styles from "./Form.module.scss";
import { ColorRing } from "react-loader-spinner";
import { Button } from "../../shared/Button/Button";
import { Oval } from "react-loader-spinner";
import { ReactComponent as IconApproved } from "../../assets/svg/iconApproved.svg";
import { ReactComponent as IconRejected } from "../../assets/svg/iconRejected.svg";
import { useAccount, useWaitForTransaction } from "wagmi";

import { useClaimRewards } from "../../hooks/contracts-api";

interface IProps {
  rewards: string | undefined;
}

export const Form = ({ rewards }: IProps) => {
  const { address } = useAccount();

  const { claim, data } = useClaimRewards();

  const [Rewards, setRewards] = useState<number | null>(null);

  const {
    isLoading: isPending,
    isError,
    isSuccess,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  const onSubmit = async () => {
    try {
      if (!address) {
        console.error("User address not available.");
        return;
      }
      if (Number(rewards) === 0) return;
     if (Number(rewards)!==0) setRewards(Number(rewards));
      claim?.();
    } catch (error) {
      console.error("Error staking tokens:", error);
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
        <div className={styles.infomessageWrapper}>
          {isPending && (
            <>
              <Oval
                width={32}
                height={32}
                strokeWidth={6}
                color="rgba(32, 254, 81, 1)"
                secondaryColor="rgba(110, 117, 139, 1)"
              />
              <p>Adding rewards to the user's account</p>
            </>
          )}
          {isSuccess  && (
            <>
              <div className={styles.iconWrapper}>
                <IconApproved />
              </div>
              <p className={styles.successfullMessage}>
                <span className={styles.struQuantity}>{Rewards} STRU</span>
                <span> successfully added to the user's account</span>
              </p>
            </>
          )}
          {isError && (
            <>
              <div className={`${styles.iconWrapper} ${styles.rejected}`}>
                <IconRejected />
              </div>
              <p>
                <span>Connection Error.</span>
                <span>Please try again</span>
              </p>
            </>
          )}
        </div>

        <Button onClick={onSubmit} className={`${styles.btn}`} type="button">
          {isPending ? (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          ) : (
            <span className={styles.btnContent}>Claim rewards</span>
          )}
        </Button>
      </div>
    </div>
  );
};
