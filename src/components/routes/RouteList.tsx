
import React from "react";
import RouteCard from "../RouteCard";
import { Route } from "../../types";
import { MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";

interface RouteListProps {
  routes: Route[];
}

const RouteList: React.FC<RouteListProps> = ({ routes }) => {
  if (routes.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-4">
          <img 
            src="/lovable-uploads/2fa13a56-4412-400f-b5ec-6e48744d5d64.png" 
            alt="Nunes Van" 
            className="h-16 mb-2"
          />
        </div>
        <p className="text-lg font-medium text-gray-700">Nenhuma rota encontrada para essa busca.</p>
        <p className="mt-2 text-gray-500">Tente outras datas ou destinos entre Belém e São Caetano.</p>
        <div className="flex justify-center mt-6">
          <div className="bg-blue-50 p-5 max-w-md rounded-lg border border-blue-100">
            <div className="flex items-start gap-3">
              <Search className="text-blue-700 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-800">Dica de pesquisa</h3>
                <p className="text-sm text-gray-600">Nossa rota principal é entre Belém e São Caetano. Experimente buscar por esses destinos para melhores resultados.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="divide-y bg-white rounded-lg shadow-md overflow-hidden"
    >
      {routes.map((route, index) => (
        <motion.div
          key={route.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <RouteCard route={route} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default RouteList;
