
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Route } from "../types";
import { ArrowRight, Clock } from "lucide-react";

interface RouteCardProps {
  route: Route;
}

const RouteCard: React.FC<RouteCardProps> = ({ route }) => {
  const navigate = useNavigate();
  
  // Formata o horário a partir da string de data
  const getTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const departureTime = getTime(route.departureTime);
  const seatsTextColor = route.seatsAvailable < 5 ? 'text-green-600' : 'text-green-600';

  return (
    <div className="py-5 px-4 border-b last:border-b-0 hover:bg-gray-50">
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
          <span className="text-base">{departureTime}</span>
        </div>
        
        {/* Available seats */}
        <div className={`${seatsTextColor} text-base flex-1`}>
          {route.seatsAvailable} {route.seatsAvailable === 1 ? 'assento disponível' : 'assentos disponíveis'}
        </div>
        
        {/* Price */}
        <div className="text-right mr-4">
          <div className="text-xs text-gray-500">Preço</div>
          <div className="text-lg font-bold text-blue-700">
            R$ {route.price.toFixed(0)},00
          </div>
        </div>
        
        {/* Button */}
        <Button 
          onClick={() => navigate(`/route/${route.id}`)}
          className="bg-blue-700 hover:bg-blue-800"
        >
          Selecionar
        </Button>
      </div>
    </div>
  );
};

export default RouteCard;
