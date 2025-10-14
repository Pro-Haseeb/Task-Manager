import React, { useEffect, useState } from "react";
import "./taskmanager.css";

const Taskmanager = () => {
  const [text, setText] = useState("");
  const [task, setTask] = useState([]);
  const [filter, setFilter] = useState("All");


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTask(saved);
  }, []);

  
  useEffect(() => {
    if(task.length>0){
    localStorage.setItem("tasks", JSON.stringify(task));
    }
  }, [task]);

  const addTask = () => {
    if (!text.trim()) return; 
    const newTask = { id: Date.now(), text, done: false };
    setTask([...task, newTask]);
    setText("");
  };

  const deleteTask = (id) => {
    setTask(task.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTask(
      task.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const filteredTasks = task.filter((t) => {
    if (filter === "Completed") return t.done;
    if (filter === "Pending") return !t.done;
    return true;
  });

  return (
    <div className="task-container">
      <h1>Task Manager</h1>

      <div className="task-controls">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="add-btn" onClick={addTask}>
          Add Task
        </button>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <ul className="task-list">
        {filteredTasks.map((t) => (
          <li key={t.id} className={t.done ? "task done" : "task"}>
            <span>{t.text}</span>
            <div className="btn-group">
              <button
                className="delete-btn"
                onClick={() => deleteTask(t.id)}
              >
                Delete
              </button>
              <button
                className="status-btn"
                onClick={() => toggleComplete(t.id)}
              >
                {t.done ? "Mark as Pending" : "Mark as Done"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Taskmanager;
