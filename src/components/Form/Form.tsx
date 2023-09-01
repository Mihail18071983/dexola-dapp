import React, { useState } from "react";
import styles from "./Form.module.scss";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { ColorRing } from "react-loader-spinner";
import InputMask from "react-input-mask";
import { ReactComponent as EyeClosed } from "../../assets/svg/eyeClosed.svg";
import { ReactComponent as EyeOpen } from "../../assets/svg/eyeOpened.svg";
import { ReactComponent as Flag } from "../../assets/svg/flag.svg";
import { ReactComponent as Arrow } from "../../assets/svg/arrowUp.svg";
import { Button } from "../../shared/Button/Button";

const defaultPhoneNumber = "+38(0__) ___ __ __";

type FormData = {
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

export const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      email: "",
      phoneNumber: defaultPhoneNumber,
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    console.log(data);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label className={styles.label} htmlFor="email">
          <div
            className={`${styles.formLabelPasswordConteiner} ${styles.wrapper}`}
          >
            <div className={styles.asterix}>*</div>
            <input
              id="email"
              className={styles.input}
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Is not valid email",
                },
              })}
              type="text"
              placeholder="Enter email"
              defaultValue=""
            />
          </div>

          {errors.email && (
            <p className={styles.errMessage}>{errors.email.message}</p>
          )}
        </label>

        <label htmlFor="phoneNumder" className={styles.label}>
          <div
            className={styles.formLabelPasswordConteiner}
          >
            <Arrow className={styles.arrow} />
            <Flag className={styles.flagIcon} />
            <Controller
              control={control}
              defaultValue={defaultPhoneNumber}
              name="phoneNumber"
              rules={{
                required: true,
                pattern: {
                  value: /^\+38\(\d{3}\) \d{3}-\d{4}$/,
                  message: "Please complete this field",
                },
              }}
              render={({ field: { onChange, onBlur, ref, value } }) => (
                <InputMask
                  id="phoneNumber"
                  className={`${styles.input} ${styles.phone}`}
                  alwaysShowMask
                  mask="+38(099) 999-9999"
                  onBlur={onBlur}
                  onChange={onChange}
                  inputRef={ref}
                  value={value}
                />
              )}
            />
          </div>
          {errors.phoneNumber && (
            <p className={styles.errMessage}>{errors.phoneNumber.message}</p>
          )}
        </label>

        <label className={styles.label} htmlFor="password">
          <div
            className={styles.formLabelPasswordConteiner}
          >
            <div className={styles.asterix}>*</div>
            <input
              id="password"
              className={styles.input}
              {...register("password", {
                required: "Please complete this field",
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <button aria-label="show/hide password"
              className={styles.showPasswordButton}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeClosed className={styles.passwordIcon} />
              ) : (
                <EyeOpen className={styles.passwordIcon} />
              )}
            </button>
          </div>
          {errors.password && (
            <p className={styles.errMessage}>{errors.password.message}</p>
          )}
        </label>

        <label className={styles.label} htmlFor="confirmPassword">
          <div
            className={styles.formLabelPasswordConteiner}
          >
            <div className={styles.asterix}>*</div>
            <input
              id="confirmPassword"
              className={styles.input}
              {...register("confirmPassword", {
                required: "Please complete this field",
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
            />
            <button aria-label="show/hide password"
              className={styles.showPasswordButton}
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeClosed className={styles.passwordIcon} />
              ) : (
                <EyeOpen className={styles.passwordIcon} />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className={styles.errMessage}>
              {errors.confirmPassword.message}
            </p>
          )}
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
            <span className={styles.btnContent}>Send it</span>
          )}
        </Button>
      </form>
      <DevTool control={control} />
    </>
  );
};
