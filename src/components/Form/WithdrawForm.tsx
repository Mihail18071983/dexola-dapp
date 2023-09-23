import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./Form.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { CustomLoader } from "../../shared/CustomLoader/CustomLoader";
import { Button } from "../../shared/Button/Button";
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
    enabled: false,
  });

  const { writeAsync: approveTokenAmount, isLoading: isWaitingForApprove } =
    useContractWrite(tokenConfig);

  const { config: withdrawConfig } = usePrepareContractWrite({
    ...starRunnerStakingContractConfig,
    functionName: "withdraw",
    args: [BigInt(amountVAlue * 1e18)],
    enabled: false,
  });

  const {
    data,
    write: writeWithdraw,
    isLoading: isWaitingForWithdrawing,
  } = useContractWrite(withdrawConfig);

  const { isLoading: isWaitingForTransaction } = useWaitForTransaction({
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

      await approveTokenAmount?.();
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
            {isWaitingForTransaction && (
              <>
                <CustomLoader width={32} height={32} />
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
            disabled={!writeWithdraw || isWaitingForTransaction}
            className={styles.btn}
            type="submit"
          >
            <span className={styles.btnContent}>
              {isSubmitting ||
              isWaitingForTransaction ||
              isWaitingForApprove ||
              isWaitingForWithdrawing
                ? "Withdrawing..."
                : "Withdraw"}
            </span>
            {isSubmitting ||
              isWaitingForTransaction ||
              isWaitingForApprove ||
              (isWaitingForWithdrawing && (
                <CustomLoader width={32} height={32} />
              ))}
          </Button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
};
