import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import LoginPage from "../LoginPage";
import RegisterPage from "../RegisterPage";
import Home from "../Home";
import User from "../User";
import Cart from "../Cart";

const ProtectedRoute = ({ children }) => {
  const { isLogged } = useAuth();

  return isLogged ? children : <Navigate to="/login" />;
};

const Layouts = () => {
  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/" />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
        } 
      />
      <Route path="/user" element={
        <ProtectedRoute>
          <User />
        </ProtectedRoute>
      } />
      <Route path="/cart" element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      } />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default Layouts;
