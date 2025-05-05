import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";
import { Menu, User, X } from "lucide-react";
import { Drawer, DrawerContent, DrawerClose } from "./ui/drawer";

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

          {/* Mobile menu button + Drawer */}
          <div className="md:hidden flex items-center">
            <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <button 
                className="text-white"
                onClick={toggleMenu}
                aria-label="Abrir menu"
                type="button"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <DrawerContent className="fixed left-0 top-0 bottom-0 w-64 max-w-full bg-blue-900 text-white z-50 flex flex-col p-0 rounded-none border-none">
                <div className="flex items-center justify-between px-4 py-4 border-b border-blue-800">
                  <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
                    <img src="/lovable-uploads/c66ed2c7-4584-49c8-89d7-6bf72d764a90.png" alt="Nunes Van" className="h-8" />
                  </Link>
                  <DrawerClose asChild>
                    <button onClick={toggleMenu} aria-label="Fechar menu"><X size={24} /></button>
                  </DrawerClose>
                </div>
                <nav className="flex flex-col space-y-2 px-4 py-6 flex-1">
                  <Link to="/" className="py-2 hover:text-amber-400 transition-colors font-medium" onClick={toggleMenu}>Início</Link>
                  <Link to="/routes" className="py-2 hover:text-amber-400 transition-colors font-medium" onClick={toggleMenu}>Horários</Link>
                  <Link to="/about" className="py-2 hover:text-amber-400 transition-colors font-medium" onClick={toggleMenu}>Sobre Nós</Link>
                  <Link to="/contact" className="py-2 hover:text-amber-400 transition-colors font-medium" onClick={toggleMenu}>Contato</Link>
                  <hr className="border-blue-800 my-2" />
                  {isAuthenticated ? (
                    <>
                      <Link 
                        to={user?.role === "admin" ? "/admin" : "/my-account"} 
                        className="py-2 flex items-center space-x-2 hover:text-amber-400 transition-colors font-medium"
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
                          setIsMenuOpen(false);
                        }}
                        className="text-blue-800 border-white hover:bg-white hover:text-blue-900 font-medium w-full mt-2"
                      >
                        Sair
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col space-y-2 mt-2">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          navigate("/login");
                          setIsMenuOpen(false);
                        }}
                        className="text-blue-800 border-white hover:bg-white hover:text-blue-900 font-medium w-full"
                      >
                        Entrar
                      </Button>
                      <Button 
                        onClick={() => {
                          navigate("/register");
                          setIsMenuOpen(false);
                        }}
                        className="bg-amber-500 hover:bg-amber-600 text-black font-medium w-full"
                      >
                        Cadastrar
                      </Button>
                    </div>
                  )}
                </nav>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
