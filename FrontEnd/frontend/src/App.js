import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { PR } from "./components/PrivateRoute";
//pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import ConsoleDescription from "./pages/ConsoleDescription";
import MyReservations from "./pages/MyReservations";
import Reservations from "./pages/Reservations";
import CreateConsole from "./pages/CreateConsole";
import EditConsole from "./pages/EditConsole";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
    <Route path="*" element={<Navigate to="/main" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/main"
          element={
            <PR>
              <Main />
            </PR>
          }
        />
        <Route
          path="/myReservations"
          element={
            <PR>
              <MyReservations />
            </PR>
          }
        />
        <Route
          path="/reservations"
          element={
            <PR role="admin">
              <Reservations />
            </PR>
          }
        />
        <Route
          path="/console/:id"
          element={
            <PR>
              <ConsoleDescription />
            </PR>
          }
        />
        <Route
          path="/createConsole"
          element={
            <PR role="admin">
              <CreateConsole />
            </PR>
          }
        />
        <Route
          path="/createConsole/:id/edit"
          element={
            <PR role="admin">
              <EditConsole />
            </PR>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
