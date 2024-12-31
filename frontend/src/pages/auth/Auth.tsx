import { NavLink, Outlet } from "react-router-dom";

export default function AuthPage() {
  return (
    <div
      className="min-h-screen min-w-full fixed inset-0
        flex items-center justify-center
        bg-background"
    >
      <div
        className="bg-surface-200 p-8 rounded-[15px] shadow-lg 
        w-full max-w-md m-5 box-border
        flex flex-col items-center justify-center"
      >
        <h1 className="text-primary-50 font-bold text-2xl md:text-3xl mb-2">todo-app</h1>
        <h2 className="text-onSurface font-bold mb-5">Добро пожаловать!</h2>
        <div className="flex justify-center gap-4">
            <NavLink
              to="login"
              className={({ isActive }) =>
                `px-4 py-2 rounded ${isActive ? 'bg-primary-50 text-onPrimary' : 'bg-button-default text-gray-300 hover:bg-black'
                }`
              }
            >
              Вход
            </NavLink>
            <NavLink
              to="register"
              className={({ isActive }) =>
                `px-4 py-2 rounded ${isActive ? 'bg-primary-50 text-onPrimary' : 'bg-button-default text-gray-300 hover:bg-black'
                }`
              }
            >
              Регистрация
            </NavLink>
          </div>
          <Outlet />
          <NavLink to={"/"} className="mt-5">
              <p className='text-primary-50 underline underline-offset-2'>
                На главную
              </p>
            
          </NavLink>
      </div>
    </div>
  );
}
