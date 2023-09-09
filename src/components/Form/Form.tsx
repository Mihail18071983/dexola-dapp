import React from "react";
import styles from "./Form.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { ColorRing } from "react-loader-spinner";
import { Button } from "../../shared/Button/Button";

type FormData = {
  amount: string;
};

interface IProps {
  rewardRate:number;
}

export const Form = ({ rewardRate }: IProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      amount: "",
    },
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2 className={styles.heading}>
          <span className={styles.stake}>Stake</span>
          <div className={styles.rest}>
            <span className={styles.rewardsName}>Reward rate:</span>
            <span className={styles.rewardsValue}>{rewardRate}</span>
            <span className={styles.rewardUnities}>STRU/week</span>
          </div>
        </h2>
        <label className={styles.label} htmlFor="amount">
          <div
            className={`${styles.formLabelPasswordConteiner} ${styles.wrapper}`}
          >
            <input
              id="amount"
              className={styles.input}
              {...register("amount", {
                required: true,
              })}
              type="number"
              placeholder="Enter stake amount"
              defaultValue=""
            />
          </div>
        </label>
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
