
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchRouteForm from "../components/SearchRouteForm";
import RouteCard from "../components/RouteCard";
import { useTicket } from "../context/TicketContext";
import { format, parseISO, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";

const RoutesPage: React.FC = () => {
  const { routes } = useTicket();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filteredRoutes, setFilteredRoutes] = useState(routes);

  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const dateParam = searchParams.get("date");

  // Check if it's one of our main routes
  const isMainRoute = (origin === "Belém" && destination === "São Caetano") || 
                    (origin === "São Caetano" && destination === "Belém") ||
                    (origin === "São Paulo" && destination === "Rio de Janeiro") ||
                    (origin === "Rio de Janeiro" && destination === "São Paulo") ||
                    (origin === "São Paulo" && destination === "Belo Horizonte") ||
                    (origin === "Belo Horizonte" && destination === "São Paulo");

  useEffect(() => {
    let filtered = [...routes];

    if (origin) {
      filtered = filtered.filter(route => route.origin === origin);
    }

    if (destination) {
      filtered = filtered.filter(route => route.destination === destination);
    }

    if (dateParam) {
      const searchDate = new Date(dateParam);
      
      if (isValid(searchDate)) {
        filtered = filtered.filter(route => {
          const routeDate = parseISO(route.departureTime);
          return format(routeDate, "yyyy-MM-dd") === format(searchDate, "yyyy-MM-dd");
        });
      }
    }

    setFilteredRoutes(filtered);
  }, [routes, origin, destination, dateParam]);

  const getFormattedDateString = () => {
    if (dateParam && isValid(new Date(dateParam))) {
      return format(new Date(dateParam), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    }
    return "";
  };

  // Rotas predefinidas para serem exibidas no formato da imagem
  const predefinedRoutes = [
    {
      origin: "São Paulo",
      destination: "Rio de Janeiro",
      time: "08:00",
      seats: 15,
      price: 120
    },
    {
      origin: "Rio de Janeiro",
      destination: "São Paulo", 
      time: "16:00",
      seats: 10,
      price: 120
    },
    {
      origin: "São Paulo",
      destination: "Belo Horizonte",
      time: "09:30",
      seats: 12,
      price: 100
    },
    {
      origin: "Belo Horizonte",
      destination: "São Paulo",
      time: "10:00",
      seats: 8,
      price: 100
    }
  ];

  const handleSelectRoute = (from: string, to: string, time: string) => {
    // Find a matching route based on origin, destination, and time
    const matchingRoute = routes.find(route => {
      const routeOrigin = route.origin;
      const routeDestination = route.destination;
      const routeTime = new Date(route.departureTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      
      return (
        routeOrigin === from &&
        routeDestination === to &&
        routeTime === time
      );
    });
    
    if (matchingRoute) {
      navigate(`/route/${matchingRoute.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Form */}
      <section className="bg-nunes-primary py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-6 text-center">
            Encontre sua passagem
          </h1>
          <div className="flex justify-center">
            <SearchRouteForm />
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow">
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

            {/* Show filtered routes if available */}
            {filteredRoutes.length > 0 ? (
              <div className="divide-y">
                {filteredRoutes.map((route) => (
                  <RouteCard key={route.id} route={route} />
                ))}
              </div>
            ) : (
              <div className="p-6">
                {/* Display routes list in the new format */}
                <div className="mb-8">
                  <div className="divide-y">
                    {predefinedRoutes.map((route, index) => (
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
                            onClick={() => handleSelectRoute(route.origin, route.destination, route.time)}
                            className="bg-blue-700 hover:bg-blue-800"
                          >
                            Selecionar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoutesPage;
