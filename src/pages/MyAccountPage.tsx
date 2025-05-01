
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTicket } from "../context/TicketContext";
import CustomerSidebar from "../components/CustomerSidebar";
import { SidebarInset } from "../components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { toast } from "../components/ui/use-toast";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Caravan, ArrowRight } from "lucide-react";

const MyAccountPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { tickets, routes, cancelTicket } = useTicket();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    toast({
      title: "Acesso negado",
      description: "Você precisa estar logado para acessar esta página",
      variant: "destructive",
    });
    return null;
  }
  
  // Get user tickets
  const userTickets = tickets.filter(ticket => ticket.userId === user?.id);
  
  // Format date
  const formatDateTime = (dateStr: string) => {
    try {
      const date = parseISO(dateStr);
      return format(date, "dd/MM/yyyy HH:mm", { locale: ptBR });
    } catch (error) {
      return "Data inválida";
    }
  };
  
  // Handle ticket cancellation
  const handleCancelTicket = (ticketId: string) => {
    const confirmed = window.confirm("Tem certeza que deseja cancelar esta passagem?");
    if (confirmed) {
      cancelTicket(ticketId);
      toast({
        title: "Passagem cancelada",
        description: "Sua passagem foi cancelada com sucesso",
      });
    }
  };
  
  return (
    <div className="flex min-h-screen">
      <CustomerSidebar />
      <SidebarInset className="bg-gray-50 p-0">
        <div className="p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Minha Conta</h1>
          
          <div className="grid grid-cols-1 gap-8">
            {/* User Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Nome</p>
                    <p className="font-medium">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Tickets */}
            <Card>
              <CardHeader>
                <CardTitle>Minhas Passagens</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active">
                  <TabsList className="mb-6">
                    <TabsTrigger value="active">Ativas</TabsTrigger>
                    <TabsTrigger value="all">Todas</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="active">
                    {userTickets.filter(t => t.status === "active").length === 0 ? (
                      <div className="text-center py-8">
                        <Caravan className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium">Nenhuma passagem ativa</h3>
                        <p className="mt-1 text-gray-500">Você não possui passagens ativas no momento.</p>
                        <div className="mt-6">
                          <Button onClick={() => navigate("/routes")}>
                            Procurar rotas
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userTickets
                          .filter(t => t.status === "active")
                          .map(ticket => {
                            const route = routes.find(r => r.id === ticket.routeId);
                            return (
                              <div key={ticket.id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center gap-2 font-medium">
                                      {route?.origin}
                                      <ArrowRight size={16} />
                                      {route?.destination}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                      {route && formatDateTime(route.departureTime)}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <div className="bg-green-100 text-green-800 rounded-full px-2 py-0.5 text-xs font-medium">
                                      Ativa
                                    </div>
                                    <p className="text-sm mt-1">Assento: {ticket.seatNumber}</p>
                                  </div>
                                </div>
                                <div className="mt-4 flex justify-between items-center">
                                  <p className="text-sm">
                                    Código: <span className="font-medium">{ticket.id}</span>
                                  </p>
                                  <Button 
                                    variant="destructive" 
                                    size="sm" 
                                    onClick={() => handleCancelTicket(ticket.id)}
                                  >
                                    Cancelar
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="all">
                    {userTickets.length === 0 ? (
                      <div className="text-center py-8">
                        <Caravan className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium">Nenhuma passagem</h3>
                        <p className="mt-1 text-gray-500">Você ainda não comprou passagens.</p>
                        <div className="mt-6">
                          <Button onClick={() => navigate("/routes")}>
                            Procurar rotas
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userTickets.map(ticket => {
                          const route = routes.find(r => r.id === ticket.routeId);
                          return (
                            <div key={ticket.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2 font-medium">
                                    {route?.origin}
                                    <ArrowRight size={16} />
                                    {route?.destination}
                                  </div>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {route && formatDateTime(route.departureTime)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className={`rounded-full px-2 py-0.5 text-xs font-medium 
                                    ${ticket.status === 'active' 
                                      ? 'bg-green-100 text-green-800' 
                                      : ticket.status === 'cancelled' 
                                        ? 'bg-red-100 text-red-800' 
                                        : 'bg-gray-100 text-gray-800'}`}
                                  >
                                    {ticket.status === 'active' ? 'Ativa' : ticket.status === 'cancelled' ? 'Cancelada' : 'Utilizada'}
                                  </div>
                                  <p className="text-sm mt-1">Assento: {ticket.seatNumber}</p>
                                </div>
                              </div>
                              <div className="mt-4 flex justify-between items-center">
                                <p className="text-sm">
                                  Código: <span className="font-medium">{ticket.id}</span>
                                </p>
                                {ticket.status === 'active' && (
                                  <Button 
                                    variant="destructive" 
                                    size="sm" 
                                    onClick={() => handleCancelTicket(ticket.id)}
                                  >
                                    Cancelar
                                  </Button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </div>
  );
};

export default MyAccountPage;
