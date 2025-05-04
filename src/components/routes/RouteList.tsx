
import React from "react";
import RouteCard from "../RouteCard";
import { Route } from "../../types";

interface RouteListProps {
  routes: Route[];
}

const RouteList: React.FC<RouteListProps> = ({ routes }) => {
  if (routes.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 bg-white rounded-lg shadow-sm">
        <p>Nenhuma rota encontrada para essa busca.</p>
        <p className="mt-2 text-sm">Tente outras datas ou destinos.</p>
      </div>
    );
  }
  
  return (
    <div className="divide-y bg-white rounded-lg shadow-sm overflow-hidden">
      {routes.map((route) => (
        <RouteCard key={route.id} route={route} />
      ))}
    </div>
  );
};

export default RouteList;
