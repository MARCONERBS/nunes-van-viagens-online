
import React from "react";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

interface PredefinedRoute {
  origin: string;
  destination: string;
  time: string;
  seats: number;
  price: number;
}

interface PredefinedRoutesProps {
  routes: PredefinedRoute[];
  onSelectRoute: (from: string, to: string, time: string) => void;
}

const PredefinedRoutes: React.FC<PredefinedRoutesProps> = ({ routes, onSelectRoute }) => {
  return (
    <div className="mb-8">
      <div className="divide-y">
        {routes.map((route, index) => (
          <div key={index} className="py-5 px-4 hover:bg-gray-50">
            <div className="flex flex-row items-center justify-between">
              {/* Origin/Destination */}
              <div className="flex items-center gap-2 min-w-[250px]">
                <span className="text-base font-medium">{route.origin}</span>
                <ArrowRight className="text-gray-400" size={16} />
                <span className="text-base font-medium">{route.destination}</span>
              </div>
              
              {/* Time */}
              <div className="flex items-center">
                <Clock size={18} className="text-gray-500 mr-1" />
                <span className="text-base">{route.time}</span>
              </div>
              
              {/* Available seats */}
              <div className="text-green-600 text-base flex-1">
                {route.seats} assentos disponíveis
              </div>
              
              {/* Price */}
              <div className="text-right mr-4">
                <div className="text-xs text-gray-500">Preço</div>
                <div className="text-lg font-bold text-blue-700">
                  R$ {route.price},00
                </div>
              </div>
              
              {/* Button */}
              <Button 
                onClick={() => onSelectRoute(route.origin, route.destination, route.time)}
                className="bg-blue-700 hover:bg-blue-800"
              >
                Selecionar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredefinedRoutes;
