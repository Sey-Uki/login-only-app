import { Link } from "react-router-dom";
import styles from "./Profile.module.css";
export const Profile = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.text}>
        Здравствуйте, <span>steve.jobs@example.com</span>
      </div>
      <Link to="/">
        <button className={styles.button}>Выйти</button>
      </Link>
    </div>
  );
};
