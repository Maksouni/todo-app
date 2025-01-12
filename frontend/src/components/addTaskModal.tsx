import axios from "../api/axios";
import { useState } from "react";
import { BACKEND_URL } from "../env";
import { showAlert } from "../managers/alertManager";
import Alert from "./Alert";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
   const [isDisabled, setIsDisabled] = useState(false);

  const handeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BACKEND_URL}/todos`, {
        title,
        description,
      });
      if (response.status == 201) {
        setIsDisabled(true)
        showAlert("Задача успешно добавлена", "success");
        // window.location.reload()
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch {
      alert("Something went wrong. Try again later.");
    }
  };

  if (!isOpen) return null;
  return (
    <form
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
      onSubmit={handeSubmit}
    >
      <div
        className="bg-surface-200 p-6 rounded-lg shadow-lg relative sm:w-1/2 2xl:w-1/3 flex flex-col "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-400"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-50">Add task</h2>
        </div>

        <div className="mt-5">
          <label className="block text-lg font-medium text-gray-200">
            Заголовок
          </label>
          <input
            type="text"
            id="title"
            value={title}
            placeholder="Введите заголовок"
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-50"
            required
            maxLength={100}
          />
        </div>
        <div className="mb-4 mt-4">
          <label className="block text-lg font-medium text-gray-200">
            Описание
          </label>
          <textarea
            id="description"
            value={description}
            placeholder="Введите описание"
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 min-h-[100px] max-h-[200px] block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-50"
            required
            maxLength={255}
          />
        </div>
        {/* {success && (
          <div className="text-secondary text-center">
            Задача успешно добавлена!
          </div>
        )} */}

        <button
          type="submit"
          className={`w-full bg-primary-200 text-white py-2 px-4 mt-3 rounded
            hover:bg-primary-300 hover:scale-105 transition-all ${isDisabled ? 'bg-primary-50 hover:bg-primary-50' : ''}`}
          disabled={isDisabled}
        >
          Добавить
        </button>
      </div>
      <Alert />
    </form>
  );
}
