import React from "react";
import { Control, Controller, FieldErrors, useForm } from "react-hook-form";
import styles from "./CustomInput.module.scss";

interface IProps {
  placeholder: string;
  control: Control<{
    amount: string;
  }>
  errors:FieldErrors<{
    amount: string;
}>
}

export const CustomInput = ({placeholder, control}:IProps) => {
  const {
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: "",
    },
    mode: "onChange",
  });
  return (
    <>
      <Controller
        name="amount"
        control={control}
        defaultValue=""
        rules={{
          required: "This field is required",
          pattern: {
            value: /^\d+(\.\d{1,18})?$/,
            message: "Must be a positive number with up to 18 decimal places",
          },
        }}
        render={({ field }) => (
          <input
            {...field}
            type="number"
            placeholder={placeholder}
            className={styles.input}
          />
        )}
      />
      {errors.amount && (
        <p className={styles.errMessage}>{errors.amount.message}</p>
      )}
    </>
  );
};
