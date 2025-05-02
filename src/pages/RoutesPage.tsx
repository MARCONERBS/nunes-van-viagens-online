
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
  
  // Destacar os itinerários principais
  const isMainRoute = origin === "Belém" && destination === "São Caetano" || 
                      origin === "São Caetano" && destination === "Belém";

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
                : 'Nenhum resultado encontrado'}
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

          {/* Itinerários Principais Belém x São Caetano */}
          {isMainRoute && (
            <div className="mb-8 bg-nunes-light p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Horários Disponíveis</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {origin === "Belém" && destination === "São Caetano" && (
                  <div>
                    <h4 className="font-medium mb-2">Belém → São Caetano (todos os dias)</h4>
                    <div className="flex flex-wrap gap-2">
                      {['07:00', '08:00', '10:00', '14:00', '16:30', '18:00'].map((hour) => (
                        <span key={hour} className="bg-white border border-nunes-primary text-nunes-primary px-3 py-1 rounded-full text-sm">
                          {hour}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {origin === "São Caetano" && destination === "Belém" && (
                  <div>
                    <h4 className="font-medium mb-2">São Caetano → Belém (todos os dias)</h4>
                    <div className="flex flex-wrap gap-2">
                      {['04:00', '05:00', '10:20', '11:20', '13:20', '17:00'].map((hour) => (
                        <span key={hour} className="bg-white border border-nunes-primary text-nunes-primary px-3 py-1 rounded-full text-sm">
                          {hour}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>As passagens podem ser compradas diretamente com o motorista ou reservadas online.</p>
              </div>
            </div>
          )}

          {filteredRoutes.length > 0 ? (
            <div className="grid gap-6">
              {filteredRoutes.map((route) => (
                <RouteCard key={route.id} route={route} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold mb-2">Nenhuma rota encontrada</h3>
              <p className="text-gray-600 mb-4">
                Tente ajustar seus critérios de busca ou escolher datas diferentes.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RoutesPage;
