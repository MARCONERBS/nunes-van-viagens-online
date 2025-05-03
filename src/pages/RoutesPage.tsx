
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchRouteForm from "../components/SearchRouteForm";
import RouteCard from "../components/RouteCard";
import { useTicket } from "../context/TicketContext";
import { format, parseISO, isValid } from "date-fns";

const RoutesPage: React.FC = () => {
  const { routes } = useTicket();
  const [searchParams] = useSearchParams();
  const [filteredRoutes, setFilteredRoutes] = useState(routes);

  const origin = searchParams.get("origin");
  const destination = searchParams.get("destination");
  const dateParam = searchParams.get("date");
  
  // Check if it's one of our main routes
  const isMainRoute = (origin === "Belém" && destination === "São Caetano") || 
                      (origin === "São Caetano" && destination === "Belém");

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Form */}
      <section className="bg-nunes-primary py-10">
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
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {filteredRoutes.length > 0 
                ? `${filteredRoutes.length} ${filteredRoutes.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}`
                : isMainRoute ? 'Horários Disponíveis' : 'Nenhum resultado encontrado'}
            </h2>
            
            {origin && destination && (
              <div className="text-gray-600">
                Busca: {origin} → {destination} 
                {dateParam && isValid(new Date(dateParam)) && (
                  <span> | {format(new Date(dateParam), "dd/MM/yyyy")}</span>
                )}
              </div>
            )}
          </div>

          {/* Either show filtered routes or a message */}
          {filteredRoutes.length > 0 ? (
            <div className="space-y-4">
              {filteredRoutes.map((route) => (
                <RouteCard key={route.id} route={route} />
              ))}
            </div>
          ) : (
            <>
              {/* For main routes (Belém x São Caetano), show schedule info */}
              {isMainRoute && (
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                  <h3 className="text-lg font-semibold mb-4">Horários de partida disponíveis</h3>
                  
                  {origin === "Belém" && destination === "São Caetano" && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Belém → São Caetano (todos os dias)</h4>
                      <div className="flex flex-wrap gap-3 mb-2">
                        {['07:00', '08:00', '10:00', '14:00', '16:30', '18:00'].map((time) => (
                          <span key={time} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200">
                            {time}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Escolha uma data para ver a disponibilidade específica.
                      </p>
                    </div>
                  )}
                  
                  {origin === "São Caetano" && destination === "Belém" && (
                    <div>
                      <h4 className="font-medium mb-2">São Caetano → Belém (todos os dias)</h4>
                      <div className="flex flex-wrap gap-3 mb-2">
                        {['04:00', '05:00', '10:20', '11:20', '13:20', '17:00'].map((time) => (
                          <span key={time} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200">
                            {time}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Escolha uma data para ver a disponibilidade específica.
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {/* For non-main routes without results */}
              {!isMainRoute && (
                <div className="bg-white p-8 rounded-lg shadow text-center">
                  <h3 className="text-lg font-semibold mb-2">Nenhuma rota encontrada</h3>
                  <p className="text-gray-600 mb-4">
                    Tente ajustar seus critérios de busca ou escolher datas diferentes.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default RoutesPage;
