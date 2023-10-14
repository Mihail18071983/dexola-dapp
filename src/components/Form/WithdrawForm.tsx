import React, { useState } from "react";
import { useAppContextValue } from "../../hooks/useContexValue";
import { toast } from "react-toastify";
import styles from "./Form.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { CustomLoader } from "../../shared/CustomLoader/CustomLoader";
import { Button } from "../../shared/Button/Button";
import { ReactComponent as IconApproved } from "../../assets/svg/iconApproved.svg";
import { ReactComponent as IconRejected } from "../../assets/svg/iconRejected.svg";
import { Msg } from "../../shared/Notification/Msg";
import { ErrorMsg } from "./ClaimRewardsForm";
import { CustomInput } from "../../shared/CustomInput/CustomInput";
import { CONTRACT_STAKING_ADDRESS } from "../../Project_constants";

import {
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
  useWaitForTransaction,
} from "wagmi";

import { useStakedBalance, useCheckAllowance } from "../../hooks/contracts-api";
import { formatted } from "../../shared/utils/formatUnits";

import {
  starRunnerStakingContractConfig,
  starRunnerTokenContractConfig,
} from "../../shared/utils/contracts";

type FormData = {
  amount: string;
};

export const Form = () => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      amount: "",
    },
    mode: "onChange",
  });

  const { rewardsAvailable } = useAppContextValue();
  const { data: allowance } = useCheckAllowance();

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
    args: [CONTRACT_STAKING_ADDRESS, stakedBalanceData!],
  });

  const { writeAsync: approveTokenAmount, isLoading: isWaitingForApprove } =
    useContractWrite(tokenConfig);

  const {
    data,
    write: writeWithdraw,
    isLoading: isWaitingForWithdrawing,
  } = useContractWrite({
    ...starRunnerStakingContractConfig,
    functionName: "withdraw",
    args: [BigInt(Math.round(amountVAlue * 1e18)) || 0n],
    onError() {
      ErrorMsg();
    },
  });

  const {
    data: withdrawAllData,
    writeAsync: withdrawAll,
    isLoading: isWaitingForAllWithdrawing,
  } = useContractWrite({
    ...starRunnerStakingContractConfig,
    functionName: "exit",
    onError() {
      ErrorMsg();
    },
  });

  const { isLoading: isWaitingForTransaction } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      successMsg();
    },
    onError() {
      ErrorMsg();
    },
  });

  const { isLoading: isWaitingForTransactionAll } = useWaitForTransaction({
    hash: withdrawAllData?.hash,
    onSuccess() {
      successMsg();
    },
    onError() {
      ErrorMsg();
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

      if (allowance < amountVAlue) {
        await approveTokenAmount?.();
      } else {
        writeWithdraw?.();
      }

      reset();
    } catch (error) {
      ErrorMsg();
    }
  };

  const withdrawAllAndClaim = async () => {
    if (Number(stakedBalance) !== 0 || Number(rewardsAvailable) !== 0) {
      try {
        setAmount(Number(rewardsAvailable));
        await withdrawAll?.();
      } catch (error) {
        ErrorMsg();
      }
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
            <CustomInput
              control={control}
              errors={errors}
              placeholder="Enter withdraw amount"
              _rules={{
                validate: (value) =>
                  Number(value) > 0 || "Must be a positive number",
              }}
            />
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
            disabled={!amountVAlue || isWaitingForTransaction}
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

          <Button
            disabled={
              (Number(stakedBalance) == 0 && Number(rewardsAvailable) == 0) ||
              isWaitingForTransactionAll ||
              isWaitingForAllWithdrawing
            }
            onClick={withdrawAllAndClaim}
            className={`${styles.btn} ${styles.additionalBtn}`}
            type="button"
          >
            <span className={styles.btnContent}>
              {isWaitingForTransactionAll || isWaitingForAllWithdrawing
                ? "Processing..."
                : "withdraw all & Claim rewards"}
            </span>
            {(isWaitingForTransactionAll || isWaitingForAllWithdrawing) && (
              <CustomLoader width={32} height={32} />
            )}
          </Button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
};
