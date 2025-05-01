
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
