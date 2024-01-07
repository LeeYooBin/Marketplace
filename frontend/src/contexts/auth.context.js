import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) setIsLogged(true);
      
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    if (!credentials.email || !credentials.password) {
      alert("Fill out the fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      setIsLogged(true);
      navigate("/home");
    }
    catch (e) {
      alert("Something went wrong.");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLogged(false);
    navigate("/login");
  };

  const register = async (credentials) => {
    if (!credentials.username || !credentials.email || !credentials.password) {
      alert("Fill out the fields");
      return;
    }

    try {
      await fetch("http://localhost:8080/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });
      
      login({ email: credentials.email, password: credentials.password });
    }
    catch (e) {
      alert("Something went wrong.");
    }
  };

  const updateUser = async (credentials) => {
    if (!credentials.username || !credentials.email || !credentials.password) {
      alert("Fill out the fields");
      return;
    }
  
    try {
      const authToken = user.token;
      const id = user.user._id;
  
      const response = await fetch(`http://localhost:8080/user/update/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: JSON.stringify(credentials)
      });
  
      const data = await response.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } 
    catch (error) {
      alert("Something went wrong.");
    }
  };

  const deleteUser = async () => {
    try {
      const authToken = user.token;
      const id = user.user._id;
  
      await fetch(`http://localhost:8080/user/delete/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
        }
      });
    }
    catch(e) {
      alert("Something went wrong.");
    }
  }

  if (loading) return <></>

  return (
    <AuthContext.Provider value={{ isLogged, login, register, deleteUser, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};