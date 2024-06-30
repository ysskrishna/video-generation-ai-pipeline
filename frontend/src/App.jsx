import React, { useState, useEffect } from 'react';
import config from './config';
import axios from 'axios';
import useWebSocket from 'react-use-websocket';
import Table from './components/Table';
import Upload from './components/Upload';


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
    <div className="max-w-6xl mx-auto p-6 my-2">
      <section class="bg-white dark:bg-gray-900">
        <div class="px-4 mx-auto max-w-screen-xl text-center">
            <h1 class="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl">Image to Video Generator</h1>
            <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-16">Transform your images into stunning  videos in just a few clicks. Start creating your video now and share your story with the world.</p>
        </div>
      </section>

      <div class="flex flex-col items-center justify-center w-full">
        <Upload file={file} handleFileChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!file || uploading} class="w-[100%] disabled:opacity-50 disabled:cursor-not-allowed my-2 cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
          <span class="w-[100%] relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Generate Video
          </span>
        </button>
      </div> 
      
      <Table data={tasks} />
    </div>
  );
};

export default App;