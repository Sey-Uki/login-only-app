import styles from "./LoginForm.module.css";

export const LoginForm = () => {
  return (
    <div className={styles.formWrapper}>
      <form className={styles.form}>
        <label className={styles.label}>Логин</label>
        <input className={styles.input} />
        <label className={styles.label}>Пароль</label>
        <input type="password" className={styles.input} />
        <label className={styles.checkbox}>
          <input type="checkbox" />
          Запомнить пароль
        </label>
        <input type="submit" value="Войти" className={styles.button} />
      </form>
    </div>
  );
};
