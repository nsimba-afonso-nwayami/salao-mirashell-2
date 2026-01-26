import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser as loginService } from "../services/loginService";

// Criar o contexto
const AuthContext = createContext({});

// Provider
export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Inicialização: verifica se existe token no localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      setUser({ token });
    }

    setLoading(false);
  }, []);

  // Função de login
  const login = async (credentials) => {
    const data = await loginService(credentials);

    // guardar tokens
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);

    setUser({ token: data.access });
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/auth/login");
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook customizado
export function useAuth() {
  return useContext(AuthContext);
}
