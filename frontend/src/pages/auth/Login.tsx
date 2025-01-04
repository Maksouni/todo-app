import { useState } from "react";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};

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
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-50"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary-200 text-white py-2 px-4 rounded hover:bg-primary-300 hover:scale-105 transition-all"
      >
        Войти
      </button>
    </form>
  );
}
