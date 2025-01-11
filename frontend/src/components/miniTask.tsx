import axios from "../api/axios";
import { useState } from "react";
import { BACKEND_URL } from "../env";

type MiniTaskProps = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
};

export default function MiniTask({
  id,
  title,
  description,
  isCompleted,
}: MiniTaskProps) {
  const [completed, setCompleted] = useState(isCompleted);

  const handleToggle = () => {
    setCompleted((prev) => {
      const newCompleted = !prev;
      const updateData = async () => {
        try {
          await axios.patch(`${BACKEND_URL}/todos/${id}`, { completed: newCompleted });
        } catch (error) {
          console.error(error);
          alert("Error! Try again later.")
        }
      };
      updateData();
      return newCompleted;
    });
  };

  return (
    <div
      className="container mt-10 max-w-7xl mx-auto py-10 px-10 bg-surface-200 rounded-3xl 
        flex items-center justify-between"
    >
      <div className="container flex flex-col gap-3 font-roboto-mono">
        <h2 className="text-2xl text-primary-50 font-bold">{title}</h2>
        <p className="text-xl text-onSurface">{description}</p>
      </div>

      <div className="flex items-center">
        <input
          id={`checkbox-${id}`} // Уникальный id для каждого таска
          type="checkbox"
          className="peer hidden"
          checked={completed}
          onChange={handleToggle}
        />
        <label
          htmlFor={`checkbox-${id}`} // Соответствующий htmlFor с уникальным id
          className="px-2 py-2 bg-transparent text-white text-center
                        border border-surface-300 border-2 rounded-full cursor-pointer 
                        peer-checked:bg-secondary peer-checked:border-secondary peer-checked:scale-105 peer-checked:text-black
                        transition-all duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </label>
      </div>
    </div>
  );
}
