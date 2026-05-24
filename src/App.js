import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch("http://127.0.0.1:8000/api/tasks/")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  };

  const addTask = () => {
    fetch("http://127.0.0.1:8000/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        status: status,
      }),
    }).then(() => {
      setTitle("");
      setStatus("Pending");
      fetchTasks();
    });
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Complete">Complete</option>
        </select>

        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task ${
              task.status === "Complete" ? "done" : ""
            }`}
          >
            <span>{task.title}</span>

            <span className="status">
              {task.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;