
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import { Bus, Menu, User, X } from "lucide-react";

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-nunes-primary text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Bus size={28} className="text-nunes-accent" />
            <span className="text-xl font-bold logo">Nunes Van</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-nunes-accent transition-colors">
              Início
            </Link>
            <Link to="/routes" className="hover:text-nunes-accent transition-colors">
              Horários
            </Link>
            <Link to="/about" className="hover:text-nunes-accent transition-colors">
              Sobre Nós
            </Link>
            <Link to="/contact" className="hover:text-nunes-accent transition-colors">
              Contato
            </Link>
          </nav>

          {/* Auth & User Area */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to={user?.role === "admin" ? "/admin" : "/my-account"}
                  className="flex items-center space-x-2 hover:text-nunes-accent transition-colors"
                >
                  <User size={20} />
                  <span>{user?.name}</span>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="text-white border-white hover:bg-white hover:text-nunes-primary"
                >
                  Sair
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/login")} 
                  className="text-white border-white hover:bg-white hover:text-nunes-primary"
                >
                  Entrar
                </Button>
                <Button 
                  onClick={() => navigate("/register")}
                  className="bg-nunes-accent hover:bg-nunes-accent/90 text-white"
                >
                  Cadastrar
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-nunes-primary border-t border-nunes-primary/20 px-4 pt-2 pb-4">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="block py-2 hover:text-nunes-accent transition-colors"
              onClick={toggleMenu}
            >
              Início
            </Link>
            <Link 
              to="/routes" 
              className="block py-2 hover:text-nunes-accent transition-colors"
              onClick={toggleMenu}
            >
              Horários
            </Link>
            <Link 
              to="/about" 
              className="block py-2 hover:text-nunes-accent transition-colors"
              onClick={toggleMenu}
            >
              Sobre Nós
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 hover:text-nunes-accent transition-colors"
              onClick={toggleMenu}
            >
              Contato
            </Link>
            <hr className="border-nunes-primary/20" />
            {isAuthenticated ? (
              <>
                <Link 
                  to={user?.role === "admin" ? "/admin" : "/my-account"} 
                  className="block py-2 flex items-center space-x-2 hover:text-nunes-accent transition-colors"
                  onClick={toggleMenu}
                >
                  <User size={20} />
                  <span>{user?.name}</span>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    logout();
                    navigate("/");
                    toggleMenu();
                  }}
                  className="text-white border-white hover:bg-white hover:text-nunes-primary w-full"
                >
                  Sair
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    navigate("/login");
                    toggleMenu();
                  }}
                  className="text-white border-white hover:bg-white hover:text-nunes-primary w-full"
                >
                  Entrar
                </Button>
                <Button 
                  onClick={() => {
                    navigate("/register");
                    toggleMenu();
                  }}
                  className="bg-nunes-accent hover:bg-nunes-accent/90 text-white w-full"
                >
                  Cadastrar
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
