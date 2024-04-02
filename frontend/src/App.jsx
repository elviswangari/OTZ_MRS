import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RocDashboard from "./components/Roc/RocDashboard";
import HcwDashboard from "./components/Hcw/HcwDashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [token, setToken] = useState(null);

  // Retrieve JWT token from local storage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  // Define a function to check if the user is authenticated
  const isAuthenticated = () => {
    // Implement your authentication logic here
    return token !== null;
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login setToken={setToken} />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route
          exact
          path="/roc"
          element={
            isAuthenticated() ? <RocDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          exact
          path="/hcw"
          element={
            isAuthenticated() ? <HcwDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated() ? <Navigate to="/" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
