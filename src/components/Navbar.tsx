import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import { Menu, User, X } from "lucide-react";

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Centered on mobile */}
          <Link to="/" className="flex items-center justify-center mx-auto md:mx-0">
            <img 
              src="/lovable-uploads/c66ed2c7-4584-49c8-89d7-6bf72d764a90.png" 
              alt="Nunes Van" 
              className="h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-amber-400 transition-colors font-medium">
              Início
            </Link>
            <Link to="/routes" className="hover:text-amber-400 transition-colors font-medium">
              Horários
            </Link>
            <Link to="/about" className="hover:text-amber-400 transition-colors font-medium">
              Sobre Nós
            </Link>
            <Link to="/contact" className="hover:text-amber-400 transition-colors font-medium">
              Contato
            </Link>
          </nav>

          {/* Auth & User Area */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to={user?.role === "admin" ? "/admin" : "/my-account"}
                  className="flex items-center space-x-2 hover:text-amber-400 transition-colors"
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
                  className="text-blue-800 border-white hover:bg-white hover:text-blue-900 font-medium"
                >
                  Sair
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/login")} 
                  className="text-blue-800 border-white hover:bg-white hover:text-blue-900 font-medium"
                >
                  Entrar
                </Button>
                <Button 
                  onClick={() => navigate("/register")}
                  className="bg-amber-500 hover:bg-amber-600 text-black font-medium"
                >
                  Cadastrar
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white absolute right-4"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-900 border-t border-blue-800 px-4 pt-2 pb-4">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="block py-2 hover:text-amber-400 transition-colors"
              onClick={toggleMenu}
            >
              Início
            </Link>
            <Link 
              to="/routes" 
              className="block py-2 hover:text-amber-400 transition-colors"
              onClick={toggleMenu}
            >
              Horários
            </Link>
            <Link 
              to="/about" 
              className="block py-2 hover:text-amber-400 transition-colors"
              onClick={toggleMenu}
            >
              Sobre Nós
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 hover:text-amber-400 transition-colors"
              onClick={toggleMenu}
            >
              Contato
            </Link>
            <hr className="border-blue-800" />
            {isAuthenticated ? (
              <>
                <Link 
                  to={user?.role === "admin" ? "/admin" : "/my-account"} 
                  className="block py-2 flex items-center space-x-2 hover:text-amber-400 transition-colors"
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
                  className="text-blue-800 border-white hover:bg-white hover:text-blue-900 font-medium w-full"
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
                  className="text-blue-800 border-white hover:bg-white hover:text-blue-900 font-medium w-full"
                >
                  Entrar
                </Button>
                <Button 
                  onClick={() => {
                    navigate("/register");
                    toggleMenu();
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-black font-medium w-full"
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
