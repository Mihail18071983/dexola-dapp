import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  RegisterOptions,
} from "react-hook-form";
import styles from "./CustomInput.module.scss";

interface IProps {
  placeholder: string;
  control: Control<{
    amount: string;
  }>;
  errors: FieldErrors<{
    amount: string;
  }>;
  _rules?:
    | Omit<
        RegisterOptions<
          {
            amount: string;
          },
          "amount"
        >,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
}

export const CustomInput = ({ placeholder, control, _rules, errors }: IProps) => {
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
          validate: (value) => Number(value) >= 0 || "Must be a positive number",
          ..._rules
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
