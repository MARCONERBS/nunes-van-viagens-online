
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

  return (
    <Card className="overflow-hidden border-gray-200 hover:border-gray-300 transition-all">
      <div className="p-6 flex flex-col md:flex-row justify-between items-start gap-4">
        {/* Left side - Route information */}
        <div className="flex-1">
          {/* Origin to Destination */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-xl font-semibold">{route.origin}</span>
            <ArrowRight className="text-orange-500" />
            <span className="text-xl font-semibold">{route.destination}</span>
          </div>
          
          {/* Date and time */}
          <div className="flex flex-col sm:flex-row gap-4 mb-3">
            <div className="flex items-center">
              <Calendar size={18} className="mr-2 text-gray-500" />
              <span className="text-gray-700">{departure.date}</span>
            </div>
            <div className="flex items-center">
              <Clock size={18} className="mr-2 text-gray-500" />
              <span className="text-gray-700">
                Saída: {departure.time} | Chegada: {arrival.time}
              </span>
            </div>
          </div>
          
          {/* Available seats */}
          <div className={`${seatsTextColor} font-medium`}>
            {route.seatsAvailable} {route.seatsAvailable === 1 ? 'assento disponível' : 'assentos disponíveis'}
          </div>
        </div>
        
        {/* Right side - Price and action */}
        <div className="flex flex-col items-end gap-4">
          <div className="text-right">
            <div className="text-sm text-gray-500">A partir de</div>
            <div className="text-2xl font-bold text-blue-700">
              R$ {route.price.toFixed(2).replace(".", ",")}
            </div>
          </div>
          
          <Button 
            onClick={() => navigate(`/route/${route.id}`)}
            className="bg-blue-700 hover:bg-blue-800"
          >
            Selecionar
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default RouteCard;
