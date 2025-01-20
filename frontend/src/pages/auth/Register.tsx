import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../env";

export default function Register() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password != repeatPassword) {
      setError("Пароли не совпадают");
    } else {
      try {
        const response = await axios.post(`${BACKEND_URL}/auth/register`, {
          email: identifier,
          username: identifier,
          password,
        });
        console.log(response.data)
        
        setError("");
      } catch {
        setError("Ошибка входа. Попробуйте позже");
      }
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <div className="mb-4 mt-5">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-200"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={identifier}
          placeholder="Введите email"
          onChange={(e) => setIdentifier(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-50"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-200"
        >
          Пароль
        </label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Введите пароль"
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-50"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-200"
        >
          Повторите пароль
        </label>
        <input
          type="password"
          id="password"
          value={repeatPassword}
          placeholder="Введите пароль"
          onChange={(e) => setRepeatPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-50"
          required
        />
      </div>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      <button
        type="submit"
        className="w-full bg-primary-200 text-white py-2 px-4 mt-3 rounded hover:bg-primary-300 hover:scale-105 transition-all"
      >
        Зарегистрироваться
      </button>
    </form>
  );
}
