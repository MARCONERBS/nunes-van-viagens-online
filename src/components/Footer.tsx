
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About - Centered */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <div className="flex justify-center md:justify-start w-full">
              <img 
                src="/lovable-uploads/c66ed2c7-4584-49c8-89d7-6bf72d764a90.png" 
                alt="Nunes Van" 
                className="h-12"
              />
            </div>
            <p className="text-xs text-gray-400 text-center md:text-left">Soluções Premium em Transportes</p>
            <p className="text-gray-300 text-sm text-center md:text-left">
              Oferecemos serviços de transporte de passageiros entre Belém e São Caetano com conforto, 
              segurança e pontualidade. Conectando pessoas e destinos desde 2015.
            </p>
            <div className="flex space-x-4 pt-2 justify-center md:justify-start">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/routes" className="hover:text-amber-400 transition-colors">
                  Horários
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinos em Belém */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Pontos em Belém</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                Terminal Rodoviário de Belém
              </li>
              <li>
                Ver-o-Peso
              </li>
              <li>
                Shopping Pátio Belém
              </li>
              <li>
                Cidade Velha
              </li>
              <li>
                Estação das Docas
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-2">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <span>(91) 9999-9999</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <span>contato@nunesvan.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Terminal Rodoviário de Belém - Av. Almirante Barroso, Belém - PA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Nunes Van. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
