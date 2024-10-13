import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des tâches:", error)
      );
  }, []);

  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Veuillez saisir une tâche");
      return;
    } // Ne pas ajouter si la tâche est vide
    axios
      .post("http://localhost:8080/api/tasks", {
        description: newTask,
        completed: false,
      })
      .then((response) => {
        setTasks([...tasks, response.data]);
        setNewTask(""); // Vider l'input après l'ajout de la tâche
      })
      .catch((error) =>
        console.error("Erreur lors de l'ajout de la tâche:", error)
      );
  };
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:8080/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((error) =>
        console.error("Erreur lors de la suppression de la tâche:", error)
      );
  };

  return (
    <div className='App'>
      <h1>To-Do List</h1>
      <input
        type='text'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Ajouter</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.description}
            <button onClick={() => deleteTask(task.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
