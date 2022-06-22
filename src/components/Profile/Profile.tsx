import styles from "./Profile.module.css";

interface IProps {
  userName: string;
  logOut: () => void;
}
export const Profile = ({ userName, logOut }: IProps) => {
  return (
    <div className={styles.profile}>
      <div className={styles.text}>
        Здравствуйте, <span>{userName}</span>
      </div>
      <button onClick={logOut} className={styles.button}>
        Выйти
      </button>
    </div>
  );
};
