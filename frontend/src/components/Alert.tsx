import { useEffect, useState } from 'react';
import { setAlertCallback } from '../managers/alertManager';

const Alert = () => {
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  useEffect(() => {
    setAlertCallback((message, type) => {
      setAlert({ message, type });
      setTimeout(() => setAlert(null), 3000); // Автоматическое закрытие через 3 секунды
    });
  }, []);

  if (!alert) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 border-l-4 rounded shadow
        ${alert.type === 'success' ? 'bg-green-100 text-green-800 border-green-300' : ''}
        ${alert.type === 'error' ? 'bg-red-100 text-red-800 border-red-300' : ''}
        ${alert.type === 'info' ? 'bg-blue-100 text-blue-800 border-blue-300' : ''}
      `}
    >
      <div className="flex items-center justify-between">
        <span>{alert.message}</span>
        <button className="ml-4 text-gray-600 hover:text-gray-900" onClick={() => setAlert(null)}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;
