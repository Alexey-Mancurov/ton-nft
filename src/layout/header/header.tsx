import styles from "@/layout/header/header.module.css";
import { useAuth } from "@/utils/contexts/authContenxt";

export const Header = () => {
  const { logout } = useAuth();

  return (
    <div className={styles.header}>
      <button className={styles.logout} onClick={logout}>Logout</button>
    </div>
  );
};
