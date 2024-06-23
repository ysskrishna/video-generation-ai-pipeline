import React, { useState, useEffect } from 'react';
import config from './config';
import axios from 'axios';
import useWebSocket from 'react-use-websocket';


const App = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${config?.baseUrl}/user/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks: ', error);
      }
    };
    fetchTasks();
  }, []);

  const { sendMessage, lastMessage, readyState } = useWebSocket(config?.websocketBaseUrl, {
    onOpen: () => console.log('WebSocket connection opened!'),
    onClose: () => console.log('WebSocket connection closed!'),
    onError: (event) => console.error('WebSocket error:', event),
    onMessage: (event) => {
      const updatedTask = JSON.parse(event.data);
      setTasks((prevTasks) => {
        const taskIndex = prevTasks.findIndex(task => task.task_id === updatedTask.task_id);
        if (taskIndex !== -1) {
          const updatedTasks = [...prevTasks];
          updatedTasks[taskIndex] = updatedTask;
          return updatedTasks;
        }
        return [...prevTasks, updatedTask];
      });
    },
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', "title");

      const response = await axios.post(`${config?.baseUrl}/user/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const task_id = response.data.task_id;
      console.log(`Upload successful, Task ID: ${task_id}`);

    } catch (error) {
      console.error('Error uploading file: ', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Image to Video Converter</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || uploading}>
        Upload
      </button>
      
      <br />
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task?.task_id}>
            Task ID: {task?.task_id}, Image URL: {config?.baseUrl}/{task?.image_url}, Status: {task?.status}, Progress: {task?.progress}%
            {task.status === 'success' && (
              <a href={`${task?.video_url}`} target="_blank" rel="noopener noreferrer">View Video</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;