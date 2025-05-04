
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchRouteForm from "../components/SearchRouteForm";
import { useTicket } from "../context/TicketContext";
import { format, parseISO, isValid } from "date-fns";
import RouteList from "../components/routes/RouteList";
import PredefinedRoutes from "../components/routes/PredefinedRoutes";
import RouteHeader from "../components/routes/RouteHeader";
import { predefinedRoutes } from "../data/predefinedRoutes";

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
            <RouteHeader 
              origin={origin} 
              destination={destination} 
              dateParam={dateParam} 
            />

            {/* Show filtered routes if available */}
            {filteredRoutes.length > 0 ? (
              <RouteList routes={filteredRoutes} />
            ) : (
              <div className="p-6">
                <PredefinedRoutes 
                  routes={predefinedRoutes}
                  onSelectRoute={handleSelectRoute}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoutesPage;
