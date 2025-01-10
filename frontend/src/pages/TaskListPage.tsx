import axios from "../api/axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../env";
import MiniTask from "../components/miniTask";
import { useAuth } from "../context/auth/useAuth";

type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

export default function TaskListPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { userId } = useAuth();

  useEffect(() => {
    if (userId > 0) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${BACKEND_URL}/todos/user/${userId}`
          );
          setTodos(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [userId]);

  return (
    <div className="min-w-screen">
      <ul>
        {todos.length != 0 ? (
          todos.map((todo) => (
            <li key={todo.id}>
              <MiniTask
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
