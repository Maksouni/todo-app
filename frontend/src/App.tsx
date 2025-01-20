import "./App.css";
import Header from "./components/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth/Auth";
import Login from "./pages/auth/Login";
import { AuthProvider } from "./context/auth/AuthProvider";
import TaskListPage from "./pages/TaskListPage";
import Register from "./pages/auth/Register";


function App() {

  return (
    <div className="min-h-screen">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<TaskListPage />} />
            <Route path="/auth" element={<AuthPage />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;

