
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "./ui/card";
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

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          {/* Route Info */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="text-xl font-semibold">{route.origin}</div>
            <ArrowRight className="text-nunes-accent" />
            <div className="text-xl font-semibold">{route.destination}</div>
          </div>
          
          {/* Price */}
          <div className="bg-nunes-light px-4 py-2 rounded-full">
            <span className="text-sm text-nunes-dark">A partir de</span>
            <span className="text-xl font-bold text-nunes-primary ml-1">
              R$ {route.price.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>

        {/* Time & Date Info */}
        <div className="flex flex-col md:flex-row gap-6 text-gray-600 mb-2">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-nunes-primary" />
            <span>{departure.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-nunes-primary" />
            <span>Saída: {departure.time}</span>
            <span>|</span>
            <span>Chegada: {arrival.time}</span>
          </div>
        </div>
        
        {/* Available Seats */}
        <div className="text-sm mt-2">
          <span className={`font-medium ${route.seatsAvailable < 5 ? 'text-red-500' : 'text-green-600'}`}>
            {route.seatsAvailable} {route.seatsAvailable === 1 ? 'assento disponível' : 'assentos disponíveis'}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 p-4 flex justify-end">
        <Button 
          onClick={() => navigate(`/route/${route.id}`)}
          className="bg-nunes-secondary hover:bg-nunes-secondary/90"
        >
          Selecionar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RouteCard;
