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
          <input
            {...register("login", {
              required: true,
              validate: (value) =>
                value === "steve.jobs@example.com" ||
                `Пользователя ${value} не существует`,
            })}
            className={styles.input}
          />
          {errors?.login?.type === "required" && (
            <p className={styles.errorRequired}>Обязательное поле</p>
          )}
        </div>
        <label className={styles.label}>Пароль</label>
        <div className={styles.inputWrapper}>
          <input
            type="password"
            {...register("password", {
              required: true,
              validate: (value) => value === "password" || "Неверный пароль",
            })}
            className={styles.input}
          />
          {errors?.password?.type === "required" && (
            <p className={styles.errorRequired}>Обязательное поле</p>
          )}
          {!isLoading && errors.password && (
            <p className={styles.errorRequired}>{errors.password.message}</p>
          )}
        </div>
        <label className={styles.checkbox}>
          <input type="checkbox" />
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
