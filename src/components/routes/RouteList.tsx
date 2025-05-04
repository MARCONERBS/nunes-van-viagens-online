
import React from "react";
import RouteCard from "../RouteCard";
import { Route } from "../../types";
import { MapPin } from "lucide-react";

interface RouteListProps {
  routes: Route[];
}

const RouteList: React.FC<RouteListProps> = ({ routes }) => {
  if (routes.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 bg-white rounded-lg shadow-sm">
        <div className="flex justify-center mb-4">
          <img 
            src="/lovable-uploads/2fa13a56-4412-400f-b5ec-6e48744d5d64.png" 
            alt="Nunes Van" 
            className="h-12 mb-2"
          />
        </div>
        <p>Nenhuma rota encontrada para essa busca.</p>
        <p className="mt-2 text-sm">Tente outras datas ou destinos entre Belém e São Caetano.</p>
        <div className="flex justify-center mt-4">
          <div className="bg-blue-50 p-4 max-w-md rounded-lg">
            <div className="flex items-start gap-3">
              <MapPin className="text-blue-700 mt-1 flex-shrink-0" />
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
    <div className="divide-y bg-white rounded-lg shadow-sm overflow-hidden">
      {routes.map((route) => (
        <RouteCard key={route.id} route={route} />
      ))}
    </div>
  );
};

export default RouteList;
