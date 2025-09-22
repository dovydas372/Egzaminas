import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useAuthContext } from "./hooks/useAuthContext";
//pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import ConsoleDescription from "./pages/ConsoleDescription";

function App() {
  // const { user } = useAuthContext();
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main />} />
        <Route path="/console/:id" element={<ConsoleDescription />} />
      </Routes>
    </Router>
  );
}

export default App;
