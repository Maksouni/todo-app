import axios from "../api/axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../env";
import MiniTask from "../components/miniTask";
import { useAuth } from "../context/auth/useAuth";
import { useNavigate } from "react-router-dom";

type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export default function TaskListPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId > 0) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${BACKEND_URL}/todos/user/${userId}`
          );
          const sortedTodos = response.data.sort(
            (a: Todo, b: Todo) => a.id - b.id
          ); // Сортировка по id
          setTodos(sortedTodos);
        } catch (error) {
          console.error("Error fetching data:", error);
          alert("Error! Try later.")
        }
      };
      fetchData();
    } else {
      navigate("/auth/login");
    }
  }, [navigate, userId]);

  return (
    <div className="min-w-screen">
      <ul>
        {todos.length != 0 ? (
          todos.map((todo) => (
            <li key={todo.id}>
              <MiniTask
                id={todo.id}
                title={todo.title}
                description={todo.description}
                isCompleted={todo.completed}
              />
            </li>
          ))
        ) : (
          <p>Ошибка</p>
        )}
      </ul>
    </div>
  );
}
