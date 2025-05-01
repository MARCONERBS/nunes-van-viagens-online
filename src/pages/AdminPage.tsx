import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTicket } from "../context/TicketContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { toast } from "../components/ui/use-toast";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Edit, QrCode, Trash, Plus, ArrowRight } from "lucide-react";
import { Route, Ticket } from "../types";
import AdminSidebar from "../components/AdminSidebar";
import { SidebarInset } from "../components/ui/sidebar";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { routes, tickets, addRoute, updateRoute, deleteRoute } = useTicket();
  const [activeTab, setActiveTab] = useState("routes");
  const [isAddRouteDialogOpen, setIsAddRouteDialogOpen] = useState(false);
  const [isEditRouteDialogOpen, setIsEditRouteDialogOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);
  const [searchTicket, setSearchTicket] = useState("");
  const [searchedTicket, setSearchedTicket] = useState<Ticket | null>(null);

  const cities = [
    "São Paulo", 
    "Rio de Janeiro", 
    "Belo Horizonte", 
    "Curitiba", 
    "Porto Alegre",
    "Brasília",
    "Salvador",
    "Recife"
  ];

  // Check if user is admin
  if (!user || user.role !== "admin") {
    navigate("/login");
    toast({
      title: "Acesso negado",
      description: "Você não tem permissão para acessar esta página",
      variant: "destructive",
    });
    return null;
  }

  // Initialize new route state
  const emptyRoute = {
    origin: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    price: 0,
    seatsAvailable: 0,
  };

  const [newRoute, setNewRoute] = useState<Omit<Route, "id">>(emptyRoute);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);

  const handleAddRoute = () => {
    // Validate form
    if (!newRoute.origin || !newRoute.destination || !newRoute.departureTime || !newRoute.arrivalTime || !newRoute.price || !newRoute.seatsAvailable) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    if (newRoute.origin === newRoute.destination) {
      toast({
        title: "Erro",
        description: "Origem e destino não podem ser iguais",
        variant: "destructive",
      });
      return;
    }

    if (parseISO(newRoute.departureTime) >= parseISO(newRoute.arrivalTime)) {
      toast({
        title: "Erro",
        description: "A data/hora de partida deve ser anterior à data/hora de chegada",
        variant: "destructive",
      });
      return;
    }

    // Add route
    addRoute(newRoute);
    setNewRoute(emptyRoute);
    setIsAddRouteDialogOpen(false);
  };

  const handleEditRoute = () => {
    if (!editingRoute) return;

    // Validate form
    if (!editingRoute.origin || !editingRoute.destination || !editingRoute.departureTime || !editingRoute.arrivalTime || !editingRoute.price || !editingRoute.seatsAvailable) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    if (editingRoute.origin === editingRoute.destination) {
      toast({
        title: "Erro",
        description: "Origem e destino não podem ser iguais",
        variant: "destructive",
      });
      return;
    }

    if (parseISO(editingRoute.departureTime) >= parseISO(editingRoute.arrivalTime)) {
      toast({
        title: "Erro",
        description: "A data/hora de partida deve ser anterior à data/hora de chegada",
        variant: "destructive",
      });
      return;
    }

    // Update route
    updateRoute(editingRoute);
    setEditingRoute(null);
    setIsEditRouteDialogOpen(false);
  };

  const handleDeleteRoute = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta rota?")) {
      deleteRoute(id);
    }
  };

  const handleOpenEditDialog = (route: Route) => {
    setEditingRoute({...route});
    setIsEditRouteDialogOpen(true);
  };

  const handleSearchTicket = () => {
    const ticket = tickets.find(t => t.id === searchTicket);
    setSearchedTicket(ticket || null);
    
    if (!ticket) {
      toast({
        title: "Passagem não encontrada",
        description: "Verifique o número da passagem e tente novamente",
        variant: "destructive",
      });
    }
  };

  const formatDateTime = (dateStr: string) => {
    try {
      const date = parseISO(dateStr);
      return format(date, "dd/MM/yyyy HH:mm", { locale: ptBR });
    } catch (error) {
      return "Data inválida";
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <SidebarInset className="bg-gray-50 p-0">
        <div className="p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Painel do Administrador</h1>
          
          <div className="grid grid-cols-1 gap-8">
            {/* Dashboard Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total de Rotas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{routes.length}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total de Passagens</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{tickets.length}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Passagens Ativas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{tickets.filter(t => t.status === "active").length}</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento</CardTitle>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="routes" onValueChange={setActiveTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="routes">
                      Rotas
                    </TabsTrigger>
                    <TabsTrigger value="tickets">
                      Passagens
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Routes Tab */}
                  <TabsContent value="routes">
                    <div className="flex justify-end mb-4">
                      <Dialog open={isAddRouteDialogOpen} onOpenChange={setIsAddRouteDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-nunes-primary hover:bg-nunes-primary/90">
                            <Plus size={16} className="mr-2" />
                            Adicionar Rota
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Adicionar Nova Rota</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="origin">Origem</Label>
                                <Select 
                                  value={newRoute.origin} 
                                  onValueChange={(value) => setNewRoute({ ...newRoute, origin: value })}
                                >
                                  <SelectTrigger id="origin">
                                    <SelectValue placeholder="Selecione" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {cities.map((city) => (
                                      <SelectItem key={city} value={city}>
                                        {city}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor="destination">Destino</Label>
                                <Select 
                                  value={newRoute.destination} 
                                  onValueChange={(value) => setNewRoute({ ...newRoute, destination: value })}
                                >
                                  <SelectTrigger id="destination">
                                    <SelectValue placeholder="Selecione" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {cities.map((city) => (
                                      <SelectItem key={city} value={city}>
                                        {city}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="departureTime">Data/Hora de Partida</Label>
                                <Input 
                                  id="departureTime" 
                                  type="datetime-local" 
                                  value={newRoute.departureTime}
                                  onChange={(e) => setNewRoute({ ...newRoute, departureTime: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label htmlFor="arrivalTime">Data/Hora de Chegada</Label>
                                <Input 
                                  id="arrivalTime" 
                                  type="datetime-local" 
                                  value={newRoute.arrivalTime}
                                  onChange={(e) => setNewRoute({ ...newRoute, arrivalTime: e.target.value })}
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="price">Preço (R$)</Label>
                                <Input 
                                  id="price" 
                                  type="number"
                                  min="0"
                                  step="0.01" 
                                  value={newRoute.price || ""}
                                  onChange={(e) => setNewRoute({ ...newRoute, price: Number(e.target.value) })}
                                />
                              </div>
                              <div>
                                <Label htmlFor="seats">Assentos Disponíveis</Label>
                                <Input 
                                  id="seats" 
                                  type="number"
                                  min="1" 
                                  value={newRoute.seatsAvailable || ""}
                                  onChange={(e) => setNewRoute({ ...newRoute, seatsAvailable: Number(e.target.value) })}
                                />
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button 
                              variant="outline" 
                              onClick={() => setIsAddRouteDialogOpen(false)}
                            >
                              Cancelar
                            </Button>
                            <Button 
                              onClick={handleAddRoute}
                              className="bg-nunes-primary hover:bg-nunes-primary/90"
                            >
                              Adicionar
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Origem</TableHead>
                            <TableHead>Destino</TableHead>
                            <TableHead>Partida</TableHead>
                            <TableHead>Chegada</TableHead>
                            <TableHead>Preço</TableHead>
                            <TableHead>Assentos</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {routes.map((route) => (
                            <TableRow key={route.id}>
                              <TableCell>{route.id}</TableCell>
                              <TableCell>{route.origin}</TableCell>
                              <TableCell>{route.destination}</TableCell>
                              <TableCell>{formatDateTime(route.departureTime)}</TableCell>
                              <TableCell>{formatDateTime(route.arrivalTime)}</TableCell>
                              <TableCell>R$ {route.price.toFixed(2).replace(".", ",")}</TableCell>
                              <TableCell>{route.seatsAvailable}</TableCell>
                              <TableCell className="text-right space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleOpenEditDialog(route)}
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleDeleteRoute(route.id)}
                                >
                                  <Trash size={16} />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  {/* Tickets Tab */}
                  <TabsContent value="tickets">
                    <div className="space-y-6">
                      {/* Ticket Search */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Validar Passagem</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-end gap-4">
                            <div className="flex-1">
                              <Label htmlFor="ticketId">Número da Passagem</Label>
                              <Input 
                                id="ticketId" 
                                placeholder="Digite o número da passagem" 
                                value={searchTicket}
                                onChange={(e) => setSearchTicket(e.target.value)}
                              />
                            </div>
                            <Button 
                              onClick={handleSearchTicket}
                              className="bg-nunes-primary hover:bg-nunes-primary/90"
                            >
                              <QrCode size={16} className="mr-2" />
                              Verificar
                            </Button>
                          </div>

                          {searchedTicket && (
                            <div className="mt-6 p-4 border rounded-lg">
                              <h3 className="text-lg font-semibold mb-4">Informações da Passagem #{searchedTicket.id}</h3>
                              
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <p className={`font-medium ${searchedTicket.status === "active" ? "text-green-600" : searchedTicket.status === "cancelled" ? "text-red-600" : "text-gray-600"}`}>
                                      {searchedTicket.status === "active" ? "Ativa" : searchedTicket.status === "cancelled" ? "Cancelada" : "Utilizada"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Assento</p>
                                    <p className="font-medium">{searchedTicket.seatNumber}</p>
                                  </div>
                                </div>

                                {searchedTicket.route && (
                                  <div>
                                    <p className="text-sm text-gray-500">Rota</p>
                                    <p className="font-medium flex items-center">
                                      {searchedTicket.route.origin} 
                                      <ArrowRight size={14} className="mx-1" /> 
                                      {searchedTicket.route.destination}
                                    </p>
                                  </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-500">Data de compra</p>
                                    <p className="font-medium">{formatDateTime(searchedTicket.purchaseDate)}</p>
                                  </div>
                                  {searchedTicket.route && (
                                    <div>
                                      <p className="text-sm text-gray-500">Data de partida</p>
                                      <p className="font-medium">{formatDateTime(searchedTicket.route.departureTime)}</p>
                                    </div>
                                  )}
                                </div>
                                
                                {searchedTicket.status === "active" && (
                                  <div className="flex justify-end">
                                    <Button 
                                      className="bg-nunes-secondary hover:bg-nunes-secondary/90"
                                    >
                                      Marcar como utilizado
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Ticket List */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Últimas Passagens</h3>
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Origem</TableHead>
                                <TableHead>Destino</TableHead>
                                <TableHead>Data da Viagem</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Assento</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {tickets.slice(0, 5).map((ticket) => {
                                const route = routes.find(r => r.id === ticket.routeId);
                                return (
                                  <TableRow key={ticket.id}>
                                    <TableCell>{ticket.id}</TableCell>
                                    <TableCell>{ticket.userId}</TableCell>
                                    <TableCell>{route?.origin}</TableCell>
                                    <TableCell>{route?.destination}</TableCell>
                                    <TableCell>{route ? formatDateTime(route.departureTime) : "N/A"}</TableCell>
                                    <TableCell>
                                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        ticket.status === "active" 
                                          ? "bg-green-100 text-green-800" 
                                          : ticket.status === "cancelled" 
                                            ? "bg-red-100 text-red-800" 
                                            : "bg-gray-100 text-gray-800"
                                      }`}>
                                        {ticket.status === "active" ? "Ativa" : ticket.status === "cancelled" ? "Cancelada" : "Utilizada"}
                                      </span>
                                    </TableCell>
                                    <TableCell>{ticket.seatNumber}</TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>

      {/* Edit Route Dialog */}
      <Dialog open={isEditRouteDialogOpen} onOpenChange={setIsEditRouteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Rota</DialogTitle>
          </DialogHeader>
          {editingRoute && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-origin">Origem</Label>
                  <Select 
                    value={editingRoute.origin} 
                    onValueChange={(value) => setEditingRoute({ ...editingRoute, origin: value })}
                  >
                    <SelectTrigger id="edit-origin">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-destination">Destino</Label>
                  <Select 
                    value={editingRoute.destination} 
                    onValueChange={(value) => setEditingRoute({ ...editingRoute, destination: value })}
                  >
                    <SelectTrigger id="edit-destination">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-departureTime">Data/Hora de Partida</Label>
                  <Input 
                    id="edit-departureTime" 
                    type="datetime-local" 
                    value={editingRoute.departureTime}
                    onChange={(e) => setEditingRoute({ ...editingRoute, departureTime: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-arrivalTime">Data/Hora de Chegada</Label>
                  <Input 
                    id="edit-arrivalTime" 
                    type="datetime-local" 
                    value={editingRoute.arrivalTime}
                    onChange={(e) => setEditingRoute({ ...editingRoute, arrivalTime: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-price">Preço (R$)</Label>
                  <Input 
                    id="edit-price" 
                    type="number"
                    min="0"
                    step="0.01" 
                    value={editingRoute.price}
                    onChange={(e) => setEditingRoute({ ...editingRoute, price: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-seats">Assentos Disponíveis</Label>
                  <Input 
                    id="edit-seats" 
                    type="number"
                    min="1" 
                    value={editingRoute.seatsAvailable}
                    onChange={(e) => setEditingRoute({ ...editingRoute, seatsAvailable: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditRouteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleEditRoute}
              className="bg-nunes-primary hover:bg-nunes-primary/90"
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
