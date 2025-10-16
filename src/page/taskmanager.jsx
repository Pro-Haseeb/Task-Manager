import React, { useEffect, useRef, useState } from "react";
import "./taskmanager.css";

const Taskmanager = () => {
  const [text, setText] = useState("");
  const [task, setTask] = useState([]);
  const [filter, setFilter] = useState("All");
  const [startDate, setStarttDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showOverlay, setShowOverlay]= useState(false);
  const bgRef = useRef(null);

  useEffect(()=>{
   const gradient = [
    "linear-gradient(135deg, #0072ff, #ffffffff )", 
  "linear-gradient(135deg, #ffffffff, #0072ff)"
   ]

   let index =0;
    // bgRef.current.style.transition = "background 1.5s ease";
   const interval = setInterval(() => {
    // bgRef.current.style.transition = "background 1.5s ease";
    if(bgRef.current)
    bgRef.current.style.background = gradient[index];
    

    index = (index+1) % gradient.length;
   }, 3000);

   return ()=> clearInterval(interval);

  }, [])


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
    if(startDate<endDate){
    if (!text.trim()) return; 
    
    const newTask = { id: Date.now(), text, done: false, startDate, endDate };
    setTask([...task, newTask]);
    setText("");
    }
    else{
      alert("Date is not correct!!!")
    }
    
  
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
    return task;
  });

  const date = new Date().toISOString().split("T")[0];

  return (
    
    <>
    <div className="project-body" ref={bgRef}>
   
    <div className="task-container" >
      <h1>Task Manager</h1>

      <div className="task-controls">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <label htmlFor="startDate"> Start Date</label>
        <input type="date" min={date}  onChange={(e)=>(setStarttDate(e.target.value))} /> 
        <label htmlFor="endDate">End Date</label>
        <input type="date" min={date}  onChange={(e)=>(setEndDate(e.target.value))} />
        <br />
        <button className="add-btn" onClick={addTask}>
          Add Task
        </button>
        <button className="show-btn" onClick={(e)=>(setShowOverlay(true))}>show Task</button>
        </div>
      {showOverlay &&
      
      <div className="overlay">
        <div className="overlay-content">
        <button className="close-btn" onClick={(e)=>(setShowOverlay(false))}>x</button>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      

      <ul className="task-list">
        {filteredTasks.map((t) => (
          <li key={t.id} className={t.done ? "task done" : "task"}>
            <span>{t.text}</span>
           <span className="date">Start Date = {t.startDate}</span>
            <span className="date">End Date = {t.endDate}</span>
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
      </div>
}

    </div>
    </div>
    </>
    
  );
};

export default Taskmanager;
