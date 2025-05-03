
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Route } from "../types";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface RouteCardProps {
  route: Route;
}

const RouteCard: React.FC<RouteCardProps> = ({ route }) => {
  const navigate = useNavigate();
  
  const formatDateTime = (dateTimeStr: string) => {
    const date = parseISO(dateTimeStr);
    return {
      date: format(date, "dd/MM/yyyy", { locale: ptBR }),
      time: format(date, "HH:mm", { locale: ptBR }),
    };
  };

  const departure = formatDateTime(route.departureTime);
  const arrival = formatDateTime(route.arrivalTime);

  const seatsTextColor = route.seatsAvailable < 5 ? 'text-red-500' : 'text-green-600';
  const isMainRoute = (route.origin === "Belém" && route.destination === "São Caetano") || 
                      (route.origin === "São Caetano" && route.destination === "Belém");

  return (
    <div className="p-4 transition-all hover:bg-gray-50 border-b last:border-b-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Left side - Route information */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
          {/* Origin to Destination */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold">{route.origin}</span>
            <ArrowRight className="text-gray-400" size={18} />
            <span className="text-lg font-semibold">{route.destination}</span>
          </div>
          
          {/* Time */}
          <div className="flex items-center text-gray-700">
            <Clock size={16} className="mr-2 text-gray-500" />
            <span>
              {departure.time}
            </span>
          </div>
          
          {/* Available seats */}
          <div className={`${seatsTextColor} font-medium text-sm hidden md:block`}>
            {route.seatsAvailable} {route.seatsAvailable === 1 ? 'assento disponível' : 'assentos disponíveis'}
          </div>
        </div>
        
        {/* Right side - Price and action */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="text-right mr-2">
            <div className="text-sm text-gray-500">Preço</div>
            <div className="text-lg font-bold text-blue-700">
              R$ {route.price.toFixed(2).replace(".", ",")}
            </div>
          </div>
          
          <Button 
            onClick={() => navigate(`/route/${route.id}`)}
            className="bg-blue-700 hover:bg-blue-800"
            size="sm"
          >
            Selecionar
          </Button>
        </div>
      </div>
      
      {/* Mobile-only seats display */}
      <div className={`${seatsTextColor} font-medium text-sm md:hidden mt-2`}>
        {route.seatsAvailable} {route.seatsAvailable === 1 ? 'assento disponível' : 'assentos disponíveis'}
      </div>
    </div>
  );
};

export default RouteCard;
