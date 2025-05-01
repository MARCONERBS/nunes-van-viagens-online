
import React, { createContext, useContext, useState, useEffect } from "react";
import { Ticket, Route } from "../types";
import { tickets as mockTickets, routes as mockRoutes } from "../mockData";
import { useAuth } from "./AuthContext";
import { toast } from "../components/ui/use-toast";

interface TicketContextType {
  tickets: Ticket[];
  routes: Route[];
  purchaseTicket: (routeId: string, seatNumber: number) => void;
  cancelTicket: (ticketId: string) => void;
  addRoute: (route: Omit<Route, "id">) => void;
  updateRoute: (route: Route) => void;
  deleteRoute: (routeId: string) => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [routes, setRoutes] = useState<Route[]>(mockRoutes);
  const { user } = useAuth();

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedTickets = localStorage.getItem("tickets");
    const storedRoutes = localStorage.getItem("routes");
    
    if (storedTickets) setTickets(JSON.parse(storedTickets));
    if (storedRoutes) setRoutes(JSON.parse(storedRoutes));
  }, []);

  // Update localStorage when tickets or routes change
  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);
  
  useEffect(() => {
    localStorage.setItem("routes", JSON.stringify(routes));
  }, [routes]);

  const purchaseTicket = (routeId: string, seatNumber: number) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para comprar passagens",
        variant: "destructive",
      });
      return;
    }

    const selectedRoute = routes.find(r => r.id === routeId);
    
    if (!selectedRoute) {
      toast({
        title: "Erro",
        description: "Rota não encontrada",
        variant: "destructive",
      });
      return;
    }

    if (selectedRoute.seatsAvailable <= 0) {
      toast({
        title: "Erro",
        description: "Não há assentos disponíveis para esta rota",
        variant: "destructive",
      });
      return;
    }

    // Generate new ticket ID
    const newTicketId = `${tickets.length + 1}`;
    
    // Create new ticket
    const newTicket: Ticket = {
      id: newTicketId,
      userId: user.id,
      routeId,
      purchaseDate: new Date().toISOString(),
      status: "active",
      seatNumber,
      qrCode: `ticket-qrcode-${newTicketId}`,
      route: selectedRoute,
    };

    // Update available seats
    const updatedRoutes = routes.map(route => 
      route.id === routeId 
        ? { ...route, seatsAvailable: route.seatsAvailable - 1 } 
        : route
    );

    setTickets(prev => [...prev, newTicket]);
    setRoutes(updatedRoutes);
    
    toast({
      title: "Passagem comprada com sucesso",
      description: `Sua viagem de ${selectedRoute.origin} para ${selectedRoute.destination} está confirmada.`,
    });
  };

  const cancelTicket = (ticketId: string) => {
    const ticketToCancel = tickets.find(t => t.id === ticketId);
    
    if (!ticketToCancel) {
      toast({
        title: "Erro",
        description: "Passagem não encontrada",
        variant: "destructive",
      });
      return;
    }

    // Update ticket status
    const updatedTickets = tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: "cancelled" as const } : ticket
    );

    // Restore available seat
    const updatedRoutes = routes.map(route => 
      route.id === ticketToCancel.routeId 
        ? { ...route, seatsAvailable: route.seatsAvailable + 1 } 
        : route
    );

    setTickets(updatedTickets);
    setRoutes(updatedRoutes);
    
    toast({
      title: "Passagem cancelada",
      description: "Seu cancelamento foi processado com sucesso.",
    });
  };

  const addRoute = (route: Omit<Route, "id">) => {
    const newRouteId = `${routes.length + 1}`;
    const newRoute: Route = {
      id: newRouteId,
      ...route,
    };

    setRoutes(prev => [...prev, newRoute]);
    
    toast({
      title: "Rota adicionada",
      description: `Nova rota de ${route.origin} para ${route.destination} adicionada com sucesso.`,
    });
  };

  const updateRoute = (updatedRoute: Route) => {
    const routeExists = routes.some(r => r.id === updatedRoute.id);
    
    if (!routeExists) {
      toast({
        title: "Erro",
        description: "Rota não encontrada",
        variant: "destructive",
      });
      return;
    }

    setRoutes(prev => 
      prev.map(route => route.id === updatedRoute.id ? updatedRoute : route)
    );
    
    toast({
      title: "Rota atualizada",
      description: `A rota ${updatedRoute.origin} para ${updatedRoute.destination} foi atualizada.`,
    });
  };

  const deleteRoute = (routeId: string) => {
    // Check if there are active tickets for this route
    const hasActiveTickets = tickets.some(
      t => t.routeId === routeId && t.status === "active"
    );

    if (hasActiveTickets) {
      toast({
        title: "Erro",
        description: "Não é possível excluir uma rota com passagens ativas",
        variant: "destructive",
      });
      return;
    }

    setRoutes(prev => prev.filter(route => route.id !== routeId));
    
    toast({
      title: "Rota removida",
      description: "A rota foi removida com sucesso.",
    });
  };

  const value = {
    tickets,
    routes,
    purchaseTicket,
    cancelTicket,
    addRoute,
    updateRoute,
    deleteRoute,
  };

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = (): TicketContextType => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error("useTicket must be used within a TicketProvider");
  }
  return context;
};
