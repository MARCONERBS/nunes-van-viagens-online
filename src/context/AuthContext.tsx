import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";
import { toast } from "../components/ui/use-toast";
import { supabase } from '../lib/supabaseClient';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) {
      toast({
        title: "Falha no login",
        description: "Email ou senha incorretos",
        variant: "destructive",
      });
      return false;
    }
    // Buscar dados extras do usuário se necessário
    setUser({
      id: data.user.id,
      name: data.user.user_metadata?.name || data.user.email,
      email: data.user.email!,
      role: data.user.user_metadata?.role || 'customer',
    });
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify({
      id: data.user.id,
      name: data.user.user_metadata?.name || data.user.email,
      email: data.user.email!,
      role: data.user.user_metadata?.role || 'customer',
    }));
    toast({
      title: "Login realizado com sucesso",
      description: `Bem-vindo, ${data.user.user_metadata?.name || data.user.email}!`,
    });
    return true;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role: 'customer' }
      }
    });
    if (error || !data.user) {
      toast({
        title: "Erro ao cadastrar",
        description: error?.message || "Não foi possível criar a conta.",
        variant: "destructive",
      });
      return false;
    }
    toast({
      title: "Cadastro realizado",
      description: "Verifique seu e-mail para confirmar o cadastro.",
    });
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
