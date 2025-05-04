
import React from "react";
import { format, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";

interface RouteHeaderProps {
  origin: string | null;
  destination: string | null;
  dateParam: string | null;
}

const RouteHeader: React.FC<RouteHeaderProps> = ({ origin, destination, dateParam }) => {
  const getFormattedDateString = () => {
    if (dateParam && isValid(new Date(dateParam))) {
      return format(new Date(dateParam), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    }
    return "";
  };
  
  return (
    <div className="p-4 border-b">
      <h2 className="text-xl font-semibold">
        Horários Disponíveis
      </h2>
      {origin && destination && (
        <div className="text-gray-600 mt-1">
          Busca: {origin} para {destination} 
          {dateParam && isValid(new Date(dateParam)) && (
            <span className="ml-1">| {getFormattedDateString()}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default RouteHeader;
