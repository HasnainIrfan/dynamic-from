import React from "react";
import Styles from "../styles/input.module.css";

const Input = (props) => {
  const {
    type,
    placeholder,
    label,
    check,
    errors,
    value,
    register,
    onChange,
    name,
    onClick,
    disabled,
    style,
  } = props;
  return (
    <>
      <input
        {...(register ? register(label, check) : {})}
        className={`${Styles.input} + ${
          errors && errors[label] && Styles.inputActive
        }`}
        type={type}
        value={value}
        onClick={onClick}
        placeholder={placeholder}
        disabled={disabled}
        style={style}
      />

      {errors && errors[label] && (
        <span className={Styles.inputError}>{errors[label]?.message}</span>
      )}
      {/* Pattern */}
      {label === "firstName_EN" && errors[label]?.type === "pattern" && (
        <p className={Styles.inputError}>First Name Must Be Alphabate</p>
      )}
      {label === "lastName_EN" && errors[label]?.type === "pattern" && (
        <p className={Styles.inputError}>Last Name Must Be Alphabate</p>
      )}
      {label === "email" && errors[label]?.type === "pattern" && (
        <p className={Styles.inputError}>Please Enter A Valid Email </p>
      )}
      {/* Min or Max Length */}
      {errors && errors[label]?.type === "minLength" && (
        <p className={Styles.inputError}>
          {name} Must Be Of {check.minLength} Digit
        </p>
      )}
    </>
  );
};

export default Input;