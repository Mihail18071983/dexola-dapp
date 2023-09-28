import React, { useState, useEffect } from "react";
import styles from "./Form.module.scss";
import { toast } from "react-toastify";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { CustomLoader } from "../../shared/CustomLoader/CustomLoader";
import { Button } from "../../shared/Button/Button";
import { ReactComponent as IconApproved } from "../../assets/svg/iconApproved.svg";
import { ReactComponent as IconRejected } from "../../assets/svg/iconRejected.svg";

import {
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
  useWaitForTransaction,
} from "wagmi";

import { formatted } from "../../shared/utils/formatUnits";
import { currentTimeStamp } from "../../shared/utils/currentTimeStamp";

import { Msg } from "../../shared/Notification/Msg";
import { ErrorMsg } from "./ClaimRewardsForm";

import {
  useUserBalance,
  useRewardRate,
  useTotalStake,
  useStakedBalance,
  usePeriodFinish,
} from "../../hooks/contracts-api";

import {
  starRunnerStakingContractConfig,
  starRunnerTokenContractConfig,
} from "../../shared/utils/contracts";

type FormData = {
  amount: string;
};

interface IProps {
  struBalance: string | undefined;
}

const CONTRACT_STAKING_ADDRESS = import.meta.env.VITE_CONTRACT_STAKING_ADDRESS;

export const Form = ({ struBalance }: IProps) => {
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

  const { data: userTokenBalanceData } = useUserBalance();

  const [Amount, setAmount] = useState<number | null>(null);
  const [_rate, setRate] = useState<string | null>(null);

  const successMsg = () =>
    toast(
      <Msg
        approved
        text1={`${Amount} STRU`}
        text2="successfully added to Staking"
        Component={IconApproved}
      />
    );

  const { data: rewardRateData } = useRewardRate();
  const { data: totalStakeData } = useTotalStake();
  const { data: stakedBalanceData } = useStakedBalance();
  const { data: periodFinish } = usePeriodFinish();

  const amountVAlue = Number(watch("amount"));
  const totalStake = formatted(totalStakeData);
  const stakedBalance = formatted(stakedBalanceData);
  const rewardRate = formatted(rewardRateData);
  const remaining = Number(periodFinish) - currentTimeStamp;
  const available = remaining * rewardRate;

  useEffect(() => {
    const rate = (
      (stakedBalance * available) / totalStake +
      amountVAlue
    ).toFixed(2);
    setRate(rate);
  }, [amountVAlue, available, stakedBalance, totalStake]);

  const { address } = useAccount();

  const { config: tokenConfig } = usePrepareContractWrite({
    ...starRunnerTokenContractConfig,
    functionName: "approve",
    args: [
      CONTRACT_STAKING_ADDRESS,
      userTokenBalanceData ?? BigInt(20000 * 1e18),
    ],
  });

  const { writeAsync: approveTokenAmount, isLoading: isWatingForApprove } =
    useContractWrite(tokenConfig);

  const {
    data,
    write: writeStaking,
    isLoading: isWaitingForStaking,
  } = useContractWrite({
    ...starRunnerStakingContractConfig,
    functionName: "stake",
    args: [BigInt(Math.round(amountVAlue * 1e18)) || 0n],
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

      await approveTokenAmount?.();
      writeStaking?.();

      reset();
    } catch (error) {
      ErrorMsg();
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
              <span className={styles.rewardsValue}>{_rate}</span>
              <span className={styles.rewardUnities}>STRU/week</span>
            </div>
          </h2>
          <label className={styles.label} htmlFor="amount">
            <Controller
              name="amount"
              control={control}
              defaultValue=""
              rules={{
                required: "This field is required",
                pattern: {
                  value: /^\d+(\.\d{1,18})?$/,
                  message:
                    "Must be a positive number with up to 18 decimal places",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Enter stake amount"
                  className={styles.input}
                />
              )}
            />
            {errors.amount && (
              <p className={styles.errMessage}>{errors.amount.message}</p>
            )}
          </label>

          <p className={styles.availableTotens}>
            <span className={styles.available}>Available:</span>
            <span className={styles.availableTokenValue}>
              {struBalance ? struBalance : 0}
            </span>
            <span className={styles.availableTokenUnit}>STRU</span>
          </p>
        </div>
        <div className={styles.additionalWrapper}>
          <div className={styles.infomessageWrapper}>
            {isWaitingForTransaction && (
              <>
                <CustomLoader width={32} height={32} />
                <p className={styles.pendingMSg}>
                  Adding{" "}
                  <span className={styles.tokenAmout}>{Amount} STRU</span> to
                  Staking
                </p>
              </>
            )}

            {Number(struBalance) < amountVAlue && (
              <Msg
                text1="You don't have enough tokens."
                text2="Please try again"
                Component={IconRejected}
              />
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
              isWatingForApprove ||
              isWaitingForStaking
                ? "Staking..."
                : "Stake"}
            </span>
            {isSubmitting ||
              isWaitingForTransaction ||
              isWatingForApprove ||
              (isWaitingForStaking && <CustomLoader width={32} height={32} />)}
          </Button>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
};
