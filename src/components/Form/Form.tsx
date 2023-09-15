import React, { useState } from "react";
import styles from "./Form.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { ColorRing } from "react-loader-spinner";
import { Button } from "../../shared/Button/Button";
import { Oval } from "react-loader-spinner";
import { ReactComponent as IconApproved } from "../../assets/svg/IconApproved.svg";
import { ReactComponent as IconRejected } from "../../assets/svg/IconRejected.svg";
import {
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
  useWaitForTransaction,
} from "wagmi";

import {
  starRunnerStakingContractConfig,
  starRunnerTokenContractConfig,
} from "../../shared/utils/contracts";

type FormData = {
  amount: string;
};

interface IProps {
  rewardRate: string;
  struBalance: string | undefined;
}

const CONTRACT_STAKING_ADDRESS = import.meta.env.VITE_CONTRACT_STAKING_ADDRESS;

export const Form = ({ rewardRate, struBalance }: IProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      amount: "",
    },
    mode: "onSubmit",
  });

  const [Amount, setAmount] = useState<number | null>(null);

  const amountVAlue = Number(watch("amount"));

  const { address } = useAccount();

  const { config: tokenConfig } = usePrepareContractWrite({
    ...starRunnerTokenContractConfig,
    functionName: "approve",
    args: [CONTRACT_STAKING_ADDRESS, BigInt(2000 * 1e18)],
  });

  const { writeAsync: writeToken } = useContractWrite(tokenConfig);

  const { config: stakingConfig } = usePrepareContractWrite({
    ...starRunnerStakingContractConfig,
    functionName: "stake",
    args: [BigInt(amountVAlue ? amountVAlue * 1e18 : "1000")],
  });

  const {
    data,
    write: writeStaking,
    error,
    isLoading,
    isError,
  } = useContractWrite(stakingConfig);

  const { isLoading: isPending, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const onSubmit: SubmitHandler<FormData> = async () => {
    try {
      if (!address) {
        console.error("User address not available.");
        return;
      }

      if (Number(struBalance) < amountVAlue) {
        return;
      }

      setAmount(amountVAlue);

      await writeToken?.();
      writeStaking?.();

      reset();
    } catch (error) {
      console.error("Error staking tokens:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formContent}>
          <h2 className={styles.heading}>
            <span className={styles.stake}>Stake</span>
            <div className={styles.rest}>
              <span className={styles.rewardsName}>Reward rate:</span>
              <span className={styles.rewardsValue}>{rewardRate}</span>
              <span className={styles.rewardUnities}>STRU/week</span>
            </div>
          </h2>
          <label className={styles.label} htmlFor="amount">
            <div className={styles.formLabelConteiner}>
              <input
                id="amount"
                className={styles.input}
                {...register("amount", {
                  required: true,
                })}
                type="number"
                placeholder="Enter stake amount"
              />
            </div>
          </label>
          <p className={styles.availableTotens}>
            <span>Available:</span>
            <span className={styles.availableTokenValue}>
              {struBalance ? struBalance : 0}STRU
            </span>
          </p>
        </div>
        <div className={styles.infomessageWrapper}>
          {isPending && (
            <div>
              <Oval
                width={32}
                height={32}
                strokeWidth={6}
                color="rgba(32, 254, 81, 1)"
                secondaryColor="rgba(110, 117, 139, 1)"
              />
              <p>Adding {Amount} STRU to Staking</p>
            </div>
          )}
          {isSuccess && (
            <div>
              <div className={styles.iconWrapper}>
                <IconApproved />
              </div>
              <p>
                <span>{Amount} STRU</span>
                <span>successfully added to Staking</span>
              </p>
            </div>
          )}
          {isError && (
            <div>
              <div className={`${styles.iconWrapper} ${styles.rejected}`}>
                <IconRejected />
              </div>
              <p>
                <span>Connection Error.</span>
                <span>Please try again</span>
              </p>
            </div>
          )}
          {Number(struBalance) < amountVAlue && (
            <div>
              <div className={`${styles.iconWrapper} ${styles.rejected}`}>
                <IconRejected />
              </div>
              <p>
                <span>You don't have enough tokens.</span>
                <span>Please try again</span>
              </p>
            </div>
          )}
        </div>

        <Button className={styles.btn} type="submit">
          {isSubmitting ? (
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
            <span className={styles.btnContent}>Stake</span>
          )}
        </Button>
      </form>
      <DevTool control={control} />
    </>
  );
};
