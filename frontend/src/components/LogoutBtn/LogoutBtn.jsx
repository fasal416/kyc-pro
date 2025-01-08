import { useDispatch } from "react-redux";
import styles from "./LogoutBtn.module.css";
import { logout } from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";

export const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <button onClick={handleLogout} className={styles.logoutBtn}>
      Log Out
    </button>
  );
};
