import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header";
import MiniTask from "./components/miniTask";
import axios from "axios";
import { BACKEND_URL } from "./env";

type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/todos`);
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen ">
      <Header />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <MiniTask
              title={todo.title}
              description={todo.description}
              isCompleted={todo.completed}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
