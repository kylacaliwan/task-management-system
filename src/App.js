import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch("https://kylacaliwan30.pythonanywhere.com/api/tasks/")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  };

  const addTask = () => {
    if (!title.trim()) return;

    fetch("http://127.0.0.1:8000/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    }).then(() => {
      setTitle("");
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

        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task ${
              task.status === "completed" ? "done" : ""
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