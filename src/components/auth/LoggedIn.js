import React from "react";
import styles from "./LoggedIn.module.css";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function LoggedIn() {
  const { logout } = useAuth();
  const navigate =useNavigate(); 

  const handleLogout = () => {
    logout();
    navigate('/settings/login')
  };

  return (
    <div>
      <button type="button" className={styles.button} onClick={handleLogout}>
        ログアウト
      </button>
      <div className={styles.loggedInContainer}>
        <h1>ログイン完了</h1>
        <h2>設定機能が利用可能になりました</h2>
      </div>
    </div>
  );
}

export default LoggedIn;
