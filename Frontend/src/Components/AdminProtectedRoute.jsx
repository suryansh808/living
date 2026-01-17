import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import API from "../API";

const AdminProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("adminTkn");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      try {
        const response = await axios.post(`${API}/adminverifyToken`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        localStorage.removeItem("adminTkn");
        localStorage.setItem("WHY BRO", "BAD HABIT");
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // Prevent flash of content
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default AdminProtectedRoute;
