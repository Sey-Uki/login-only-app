import { useForm } from "react-hook-form";
import styles from "./LoginForm.module.css";

interface IFormInput {
  login: string;
  password: string;
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {errors.login && (
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
                value === "steve.jobs@example.com" || `Пользователя ${value} не существует`,
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
          {errors.password && (
            <p className={styles.errorRequired}>{errors.password.message}</p>
          )}
        </div>
        <label className={styles.checkbox}>
          <input type="checkbox" />
          Запомнить пароль
        </label>
        <input type="submit" value="Войти" className={styles.button} />
      </form>
    </div>
  );
};
