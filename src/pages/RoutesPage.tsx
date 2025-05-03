
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchRouteForm from "../components/SearchRouteForm";
import RouteCard from "../components/RouteCard";
import { useTicket } from "../context/TicketContext";
import { format, parseISO, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock } from "lucide-react";

const RoutesPage: React.FC = () => {
  const { routes } = useTicket();
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
                <h3 className="text-lg font-semibold mb-4">Horários de partida disponíveis</h3>
                
                {/* For main routes, show schedule info */}
                {isMainRoute && (
                  <div>
                    {origin === "Belém" && destination === "São Caetano" && (
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Belém → São Caetano (todos os dias)</h4>
                        <div className="flex flex-wrap gap-3 mb-3">
                          {['07:00', '08:00', '10:00', '14:00', '16:30', '18:00'].map((time) => (
                            <div key={time} className="bg-blue-50 text-blue-700 px-5 py-2 rounded-full border border-blue-200 flex items-center">
                              <Clock size={16} className="mr-2" />
                              {time}
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-3">
                          Escolha uma data para ver a disponibilidade específica.
                        </p>
                      </div>
                    )}
                    
                    {origin === "São Caetano" && destination === "Belém" && (
                      <div>
                        <h4 className="font-medium mb-3">São Caetano → Belém (todos os dias)</h4>
                        <div className="flex flex-wrap gap-3 mb-3">
                          {['04:00', '05:00', '10:20', '11:20', '13:20', '17:00'].map((time) => (
                            <div key={time} className="bg-blue-50 text-blue-700 px-5 py-2 rounded-full border border-blue-200 flex items-center">
                              <Clock size={16} className="mr-2" />
                              {time}
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-3">
                          Escolha uma data para ver a disponibilidade específica.
                        </p>
                      </div>
                    )}

                    {origin === "São Paulo" && destination === "Rio de Janeiro" && (
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">São Paulo → Rio de Janeiro (todos os dias)</h4>
                        <div className="flex flex-wrap gap-3 mb-3">
                          {['08:00'].map((time) => (
                            <div key={time} className="bg-blue-50 text-blue-700 px-5 py-2 rounded-full border border-blue-200 flex items-center">
                              <Clock size={16} className="mr-2" />
                              {time}
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-3">
                          Escolha uma data para ver a disponibilidade específica.
                        </p>
                      </div>
                    )}
                    
                    {origin === "Rio de Janeiro" && destination === "São Paulo" && (
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Rio de Janeiro → São Paulo (todos os dias)</h4>
                        <div className="flex flex-wrap gap-3 mb-3">
                          {['16:00'].map((time) => (
                            <div key={time} className="bg-blue-50 text-blue-700 px-5 py-2 rounded-full border border-blue-200 flex items-center">
                              <Clock size={16} className="mr-2" />
                              {time}
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-3">
                          Escolha uma data para ver a disponibilidade específica.
                        </p>
                      </div>
                    )}
                    
                    {origin === "São Paulo" && destination === "Belo Horizonte" && (
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">São Paulo → Belo Horizonte (todos os dias)</h4>
                        <div className="flex flex-wrap gap-3 mb-3">
                          {['09:30'].map((time) => (
                            <div key={time} className="bg-blue-50 text-blue-700 px-5 py-2 rounded-full border border-blue-200 flex items-center">
                              <Clock size={16} className="mr-2" />
                              {time}
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-3">
                          Escolha uma data para ver a disponibilidade específica.
                        </p>
                      </div>
                    )}
                    
                    {origin === "Belo Horizonte" && destination === "São Paulo" && (
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Belo Horizonte → São Paulo (todos os dias)</h4>
                        <div className="flex flex-wrap gap-3 mb-3">
                          {['10:00'].map((time) => (
                            <div key={time} className="bg-blue-50 text-blue-700 px-5 py-2 rounded-full border border-blue-200 flex items-center">
                              <Clock size={16} className="mr-2" />
                              {time}
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-3">
                          Escolha uma data para ver a disponibilidade específica.
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* For non-main routes without results */}
                {!isMainRoute && (
                  <div className="text-center py-4">
                    <h3 className="text-lg font-semibold mb-2">Nenhuma rota encontrada</h3>
                    <p className="text-gray-600 mb-4">
                      Tente ajustar seus critérios de busca ou escolher datas diferentes.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoutesPage;
