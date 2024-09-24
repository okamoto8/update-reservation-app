import React, { useState } from 'react'
import styles from'./AddReservationTable.module.css'
import axios from 'axios';

function AddReservationTable() {
  const [resourceName,setResourceName] =useState('');
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!resourceName.trim()){
      alert("予約表名を入力してください")
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // APIリクエストを送信
      const response = await axios.post(
        "http://127.0.0.1:8000/resources",
        { resourceName: resourceName },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

    console.log('新規予約表名:', resourceName);
    setResourceName('');

    console.log("API Response:", response.data);
      alert("予約表が正常に登録されました");
      setResourceName(''); // 入力フィールドをクリア

      window.dispatchEvent(new Event('resourceAdded'))

    } catch (error) {
      console.error("Error submitting:", error);
      setError("予約表の登録に失敗しました。もう一度お試しください。");
    } finally {
      setIsLoading(false); // ローディング状態を終了
    }
  };


  return (
    <div className={styles.addReservationContainer}>
      <h1>新規予約表の追加</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
          type='text'
          placeholder='新規で登録する予約表名を入力してください'
          id='resourceName'
          value={resourceName}
          onChange={(e) => setResourceName(e.target.value)}
          required
          className={styles.input}
          disabled={isLoading}
          autoComplete='off'
          />
        </div>
      
      <button type='submit' className={styles.button} disabled={isLoading}>
        {isLoading ? '登録中...' : '追加'}
        </button>
    </form>
    {error && <p className={styles.sheet}>{error}</p>}
    </div>
  )
}

export default AddReservationTable
