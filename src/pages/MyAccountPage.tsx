
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTicket } from "../context/TicketContext";
import TicketCard from "../components/TicketCard";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast } from "../components/ui/use-toast";

const MyAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tickets } = useTicket();
  const [activeTab, setActiveTab] = useState("active");

  if (!user) {
    navigate("/login");
    toast({
      title: "Acesso negado",
      description: "Você precisa estar logado para acessar esta página",
      variant: "destructive",
    });
    return null;
  }

  const userTickets = tickets.filter(ticket => ticket.userId === user.id);
  const activeTickets = userTickets.filter(ticket => ticket.status === "active");
  const cancelledTickets = userTickets.filter(ticket => ticket.status === "cancelled");
  const usedTickets = userTickets.filter(ticket => ticket.status === "used");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Minha conta</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (User Info) */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Meus dados</CardTitle>
                <CardDescription>Informações pessoais</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nome</p>
                    <p>{user.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p>{user.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">ID do cliente</p>
                    <p>{user.id}</p>
                  </div>
                  
                  <Button className="w-full">Editar meus dados</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Ações rápidas</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate("/routes")}
                  >
                    Comprar passagem
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate("/contact")}
                  >
                    Contatar suporte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column (Tickets) */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Minhas passagens</CardTitle>
                <CardDescription>Gerencie suas passagens</CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="active" onValueChange={setActiveTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="active">
                      Ativas ({activeTickets.length})
                    </TabsTrigger>
                    <TabsTrigger value="cancelled">
                      Canceladas ({cancelledTickets.length})
                    </TabsTrigger>
                    <TabsTrigger value="used">
                      Utilizadas ({usedTickets.length})
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="active">
                    <div className="space-y-6">
                      {activeTickets.length > 0 ? (
                        activeTickets.map(ticket => (
                          <TicketCard key={ticket.id} ticket={ticket} />
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">Você não possui passagens ativas.</p>
                          <Button 
                            onClick={() => navigate("/routes")}
                            className="mt-4 bg-nunes-primary hover:bg-nunes-primary/90"
                          >
                            Comprar passagem
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="cancelled">
                    <div className="space-y-6">
                      {cancelledTickets.length > 0 ? (
                        cancelledTickets.map(ticket => (
                          <TicketCard key={ticket.id} ticket={ticket} showActions={false} />
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">Você não possui passagens canceladas.</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="used">
                    <div className="space-y-6">
                      {usedTickets.length > 0 ? (
                        usedTickets.map(ticket => (
                          <TicketCard key={ticket.id} ticket={ticket} showActions={false} />
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">Você não possui passagens utilizadas.</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
