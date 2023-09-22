import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./Form.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { ColorRing } from "react-loader-spinner";
import { Button } from "../../shared/Button/Button";
import { Oval } from "react-loader-spinner";
import { ReactComponent as IconApproved } from "../../assets/svg/iconApproved.svg";
import { ReactComponent as IconRejected } from "../../assets/svg/iconRejected.svg";
import { Msg } from "../../shared/ErrorMsg/Msg";
import {
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
  useWaitForTransaction,
} from "wagmi";

import { useStakedBalance } from "../../hooks/contracts-api";
import { formatted } from "../../shared/utils/formatUnits";

import {
  starRunnerStakingContractConfig,
  starRunnerTokenContractConfig,
} from "../../shared/utils/contracts";

type FormData = {
  amount: string;
};

const CONTRACT_STAKING_ADDRESS = import.meta.env.VITE_CONTRACT_STAKING_ADDRESS;

export const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      amount: "",
    },
    mode: "onBlur",
  });

  const { data: stakedBalanceData } = useStakedBalance();
  const stakedBalance = formatted(stakedBalanceData).toFixed(0);

  const [Amount, setAmount] = useState<number | null>(null);

  const successMsg = () =>
    toast(
      <Msg
        approved
        text1={`${Amount} STRU`}
        text2="successfully added to account"
        Component={IconApproved}
      />
    );

  const amountVAlue = Number(watch("amount"));

  const { address } = useAccount();

  const { config: tokenConfig } = usePrepareContractWrite({
    ...starRunnerTokenContractConfig,
    functionName: "approve",
    args: [CONTRACT_STAKING_ADDRESS, stakedBalanceData || BigInt(2000 * 1e18)],
  });

  const { writeAsync: writeToken } = useContractWrite(tokenConfig);

  const { config: stakingConfig } = usePrepareContractWrite({
    ...starRunnerStakingContractConfig,
    functionName: "withdraw",
    args: [BigInt(amountVAlue ? amountVAlue * 1e18 : "1000")],
  });

  const {
    data,
    write: writeWithdraw,
  } = useContractWrite(stakingConfig);

  const { isLoading: isPending } = useWaitForTransaction({
    hash: data?.hash,
     onSuccess() {
      successMsg();
    },
  });

  const onSubmit: SubmitHandler<FormData> = async () => {
    try {
      if (!address) {
        console.error("User address not available.");
        return;
      }

      if (Number(stakedBalance) < amountVAlue) {
        return;
      }

      setAmount(amountVAlue);

      await writeToken?.();
      writeWithdraw?.();

      reset();
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
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formContent}>
          <h2 className={styles.heading}>
            <span className={styles.stake}>Withdraw</span>
          </h2>
          <label className={styles.label} htmlFor="amount">
            <input
              id="amount"
              className={styles.input}
              {...register("amount", {
                required: true,
                validate: (value) =>
                  Number(value) > 0 || "Must be a positive number",
              })}
              type="number"
              placeholder="Enter withdraw amount"
            />
            {errors.amount && (
              <p className={styles.errMessage}>{errors.amount.message}</p>
            )}
          </label>

          <p className={styles.availableTotens}>
            <span className={styles.available}>Available:</span>
            <span className={styles.availableTokenValue}>
              {stakedBalance ? stakedBalance : 0}
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
                <p>Withdrawing {Amount} STRU to the account</p>
              </>
            )}
           
            {Number(stakedBalance) < amountVAlue && (
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

          <Button
            className={`${styles.btn} ${styles.withdrawBtn}`}
            type="submit"
          >
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
              <span className={styles.btnContent}>Withdraw</span>
            )}
          </Button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
};
