import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import styles from "./Login.module.css";  
import { useNavigate } from "react-router-dom";

function Login() {
  const { login ,isAuthenticated} = useAuth();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error,setError]= useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(password);
    if (!success){
      setError("パスワードが間違っています。")
      alert("パスワードが間違っています")
    }else{
      setError("")
    }
  };


  useEffect(()=>{
    if (isAuthenticated){
        navigate("/settings/logged-in")
        console.log('ログインが完了しました')
    }
  },[isAuthenticated,navigate])

  return (
    <div className={styles.loginContainer}>
      <h1>ログイン</h1>
      <h2>設定機能を使用するにはログインが必要です</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワードを入力してください"
          required
        />
        <br />
        <button type="button" className={styles.button} onClick={handleSubmit}>
            Login
        </button>
      </form>
    </div>
  );
}

export default Login;
