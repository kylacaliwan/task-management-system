import "./App.css";
import { useState, useEffect } from "react";

const API_URL = "https://kylacaliwan30.pythonanywhere.com/api/tasks/";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add new task
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
        }),
      });

      setTitle("");
      fetchTasks();

    } catch (error) {
      console.error("Error adding task:", error);
    }
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

        <button onClick={addTask}>
          Add
        </button>
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