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
      setUser({ token }); // Aqui poderíamos decodificar JWT depois
    }
    setLoading(false);
  }, []);

  // Função de login
  const login = async (credentials) => {
    const data = await loginService(credentials);
    setUser({ token: data.access });
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/auth/login");
  };

  // Estado do contexto
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook customizado para usar o AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
