
import React from "react";
import RouteCard from "../RouteCard";
import { Route } from "../../types";

interface RouteListProps {
  routes: Route[];
}

const RouteList: React.FC<RouteListProps> = ({ routes }) => {
  if (routes.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Nenhuma rota encontrada para essa busca.
      </div>
    );
  }
  
  return (
    <div className="divide-y">
      {routes.map((route) => (
        <RouteCard key={route.id} route={route} />
      ))}
    </div>
  );
};

export default RouteList;
