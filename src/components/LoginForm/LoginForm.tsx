import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import styles from "./LoginForm.module.css";

interface IFormInput {
  login: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormInput>();

  const startSubmitting = (callback?: () => void) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (callback) callback();
    }, 2000);
  };

  const onSubmit = () => {
    startSubmitting(() => navigate("/profile"));
  };

  const onError = () => {
    const loginValue = getValues("login");
    const passwordValue = getValues("password");

    if (loginValue && passwordValue) {
      startSubmitting();
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit, onError)}>
        {!isLoading && errors?.login?.type !== "required" && errors.login && (
          <div className={styles.errorLogin}>
            <span>!</span>
            {errors.login.message}
          </div>
        )}
        <label className={styles.label}>Логин</label>
        <div className={styles.inputWrapper}>
          <InputForm
            {...register("login", {
              required: true,
              validate: (value) =>
                value === "steve.jobs@example.com" ||
                `Пользователя ${value} не существует`,
            })}
            isError={errors?.login?.type}
            className={styles.input}
          />
          {errors?.login?.type === "required" && (
            <p className={styles.errorRequired}>Обязательное поле</p>
          )}
        </div>
        <label className={styles.label}>Пароль</label>
        <div className={styles.inputWrapper}>
          <InputForm
            type="password"
            {...register("password", {
              required: true,
              validate: (value) => value === "password" || "Неверный пароль",
            })}
            className={styles.input}
            isError={errors?.password?.type}
          />
          {errors?.password?.type === "required" && (
            <p className={styles.errorRequired}>Обязательное поле</p>
          )}
          {!isLoading && errors.password && (
            <p className={styles.errorRequired}>{errors.password.message}</p>
          )}
        </div>
        <label className={styles.checkbox}>
          <input type="checkbox"/>
          <div className={styles.customCheckbox} onClick={handleCheckboxChange}><CustomCheckbox isChecked={isChecked}/></div>
          Запомнить пароль
        </label>
        <SubmitButton disabled={isLoading} type="submit" isLoading={isLoading}>
          Войти
        </SubmitButton>
      </form>
    </div>
  );
};

const SubmitButton = styled.button<{ isLoading: boolean }>`
  background-color: ${(props) => (props.isLoading ? "#99A9FF" : "#4A67FF")};
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: #ffffff;
  height: 60px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin-top: 40px;
  width: 100%;
`;

const InputForm = styled.input<{ isError: any }>`
  color: ${(props) => (props.isError === "required" ? "#E26F6F" : "#232323")};
  border: ${(props) => (props.isError === "required" ? "1px solid #E26F6F" : "none")};
  background: #f5f5f5;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  height: 60px;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
`;

const CustomCheckbox = styled.div<{isChecked: boolean}>`
  background-color: ${(props) => (props.isChecked ? "#4A67FF" : "#ffffff")};
  width: 100%;
  height: 100%;
  border-radius: 2px;
`
