import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styles from './DeleteResourcePage.module.css'

function DeleteResourcePage() {
    const [resources,setResources] = useState([]);
    const [selectedResource, setSelectedResource] = useState('');


    const fetchResources = async() =>{
        try{
          const response = await axios.get('http://127.0.0.1:8000/resources');
           setResources(response.data)
        }catch(error){
          console.error('Error fetching resources:',error)
        }
      }
    
    const deleteResource = async() =>{
        if (!setResources){
            alert('予約表を選択してください')
            return;
        }
        try{
            await axios.delete(`http://127.0.0.1:8000/resources/${selectedResource}`)
            alert('予約表が正常に削除されました。');
            fetchResources();
            setSelectedResource(''); 
            window.dispatchEvent(new Event("resourceDeleted"))
        }catch (error){
            console.error('予約表の削除中にエラーが発生しました:', error);
            alert('予約表の削除中にエラーが発生しました。');
        }
    }

    useEffect (() => {
        fetchResources();
    },[]);
    
    const handleResourceChange = (event) =>{
        setSelectedResource(parseInt(event.target.value,10))
    }

  return (
    <div className={styles.deleteResourceContainer}>
      <h1>予約表の削除</h1>
      <select value={selectedResource} onChange={handleResourceChange} >
        <option value="">--予約表を選択してください--</option>
        {resources.map((resource) => (
            <option key = {resource.resourceId} value={resource.resourceId}>
                {resource.resourceName}
            </option>
        ))}
      </select>
      <br />
      <button type='button' className={styles.button} onClick={deleteResource}>
        削除
        </button>
      
    </div>
  )
}

export default DeleteResourcePage
