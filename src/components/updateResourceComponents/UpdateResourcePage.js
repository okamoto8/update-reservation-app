import React, { useEffect, useState} from 'react'
import styles from './UpdateResourcePage.module.css'
import axios from 'axios';

function UpdateResourcePage() {
    const [resources,setResources] = useState([]);
    const [selectedResource,setSelectedResource] = useState('');
    const [resourceName,setResourceName] = useState('')

    const fetchResources = async() =>{
        try{
            const response = await axios.get('http://127.0.0.1:8000/resources');
            setResources(response.data)
        }catch(error){
            console.log('Error fetching resources:', error)
        }
    }

    
    useEffect(() => {
        fetchResources();
    },[]);
    

    const handleResourceChange = (event) =>{
        const resourceId = parseInt(event.target.value,10)
        setSelectedResource(resourceId);
    }


    const handleUpdateResource = async (e) =>{
        e.preventDefault();

        if(!selectedResource || !resourceName.trim()){
            alert('必須項目を入力してください')
            return
        }

        console.log(typeof(selectedResource))
        try{
            await axios.put(`http://127.0.0.1:8000/resources/${selectedResource}`,
                {resourceName : resourceName},
                {
                    headers:{
                        "Content-Type": "application/json",
                    }
                }
            );
            setResourceName('');
            setSelectedResource('');
            alert("予約表の名称変更が成功しました");
            fetchResources();
            window.dispatchEvent(new Event('resourceUpdated'))
            
        }catch(error){
            console.error("Error updating",error);
            alert("予約表の名称変更に失敗しました。もう一度お試しください。")
        }



    }

  return (
    <div className={styles.updateResourceContainer}>
      <h1>予約表の名称変更</h1>
      <select value={selectedResource}  onChange={handleResourceChange}>
        <option value="">--名称を変更する予約表を選択してください--</option>
        {resources.map((resource) => (
            <option key = {resource.resourceId} value={resource.resourceId}>
                {resource.resourceName}
            </option>
        ))}
      </select>
      <br />
      <input
          type='text'
          placeholder='変更したい名称を入力してください'
          id='resourceName'
          value={resourceName}
          onChange={(e) => setResourceName(e.target.value)}
          required
          className={styles.input}
          autoComplete='off'
          />
    <br />
      <button type='button' className={styles.button} onClick={handleUpdateResource}>
        変更する
        </button>
      
    </div>
  )
}

export default UpdateResourcePage
