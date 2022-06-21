import { Link } from "react-router-dom";
import styles from "./Profile.module.css";

interface IProps {
  userName: string;
}
export const Profile = ({ userName }: IProps) => {
  return (
    <div className={styles.profile}>
      <div className={styles.text}>
        Здравствуйте, <span>{userName}</span>
      </div>
      <Link to="/login">
        <button className={styles.button}>Выйти</button>
      </Link>
    </div>
  );
};
