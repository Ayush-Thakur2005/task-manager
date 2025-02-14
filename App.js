import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((response) => setTasks(response.data));
  }, []);

  const addTask = () => {
    axios.post(API_URL, { text: newTask }).then((response) => {
      setTasks([...tasks, response.data]);
      setNewTask("");
    });
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setTasks(tasks.filter((task) => task._id !== id));
    });
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.text} <button onClick={() => deleteTask(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
