import "./App.css";
import Header from "./components/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth/Auth";
import Login from "./pages/auth/Login";
import { AuthProvider } from "./context/auth/AuthProvider";

// type Todo = {
//   id: string;
//   title: string;
//   description: string;
//   completed: boolean;
// };

function App() {
  // const [todos, setTodos] = useState<Todo[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`${BACKEND_URL}/todos`);
  //       setTodos(response.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="min-h-screen ">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/auth" element={<AuthPage />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<div></div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
