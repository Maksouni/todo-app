import "./App.css";
import Header from "./components/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth/Auth";

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
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/auth" element={<AuthPage />}>
          <Route path="login" element={<div></div>}/>
          <Route path="register" element={<div></div>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
