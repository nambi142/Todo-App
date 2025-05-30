import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';



export const StoreContext = React.createContext();
const Store = ({ children }) => {
  //States
    const BASE_URL = "https://json-server-6r7i.onrender.com";
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState("");

    // GET: Fetch tasks on component mount
  useEffect(() => {
    axios
      .get(`${BASE_URL}/Todolist`)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  // POST: Add new task
  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const newTaskObj = { text: newTask, completed: false };
    axios
      .post(`${BASE_URL}/Todolist`, newTaskObj)
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTask("");
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  // PUT: Toggle completed
  const handleToggleTask = (index) => {
    const updatedTask = {
      ...tasks[index],
      completed: !tasks[index].completed,
    };
    axios
      .put(`${`${BASE_URL}/Todolist`}/${updatedTask.id}`, updatedTask)
      .then(() => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = updatedTask;
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error toggling task:", error));
  };

  // PUT: Edit and Save task
  const handleSaveEdit = (index) => {
    if (editText.trim() === "") return;
    const updatedTask = { ...tasks[index], text: editText };
    axios
      .put(`${`${BASE_URL}/Todolist`}/${updatedTask.id}`, updatedTask)
      .then(() => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = updatedTask;
        setTasks(updatedTasks);
        setEditIndex(null);
      })
      .catch((error) => console.error("Error editing task:", error));
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  // DELETE: Remove task
  const handleDeleteTask = (index) => {
    const taskToDelete = tasks[index];
    axios
      .delete(`${`${BASE_URL}/Todolist`}/${taskToDelete.id}`)
      .then(() => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
   <StoreContext.Provider
    value={{
      tasks,
      newTask,
      setNewTask,
      editIndex,
      setEditIndex,
      editText,
      setEditText,
      handleAddTask,
      handleToggleTask,
      handleSaveEdit,
      handleEditTask,
      handleDeleteTask
    }}
   >
      {children}
   </StoreContext.Provider>
  )
}

export default Store
