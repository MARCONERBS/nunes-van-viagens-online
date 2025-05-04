
import React from "react";
import { Link } from "react-router-dom";
import { Bus } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Bus size={24} className="text-amber-500" />
              <span className="text-xl font-bold logo">Nunes Van</span>
            </div>
            <p className="text-gray-300 text-sm">
              Oferecemos serviços de transporte de passageiros com conforto, 
              segurança e pontualidade. Conectando pessoas e destinos desde 2015.
            </p>
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

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/terms" className="hover:text-amber-400 transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-amber-400 transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-amber-400 transition-colors">
                  Política de Reembolso
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Telefone: (11) 9999-9999</li>
              <li>Email: contato@nunesvan.com</li>
              <li>Endereço: Av. Paulista, 1000 - São Paulo</li>
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
