
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTicket } from "../context/TicketContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Bus, Calendar, Clock, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { toast } from "../components/ui/use-toast";

const RouteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { routes, purchaseTicket } = useTicket();
  const { user, isAuthenticated } = useAuth();
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);

  const route = routes.find(r => r.id === id);

  if (!route) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Rota não encontrada</h1>
          <p className="mb-4">A rota que você está procurando não existe ou foi removida.</p>
          <Button onClick={() => navigate("/routes")}>Voltar às rotas</Button>
        </div>
      </div>
    );
  }

  const departureDate = parseISO(route.departureTime);
  const arrivalDate = parseISO(route.arrivalTime);

  const formatDateTime = (date: Date) => {
    return {
      date: format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
      time: format(date, "HH:mm", { locale: ptBR }),
      full: format(date, "PPPp", { locale: ptBR }),
    };
  };

  const departure = formatDateTime(departureDate);
  const arrival = formatDateTime(arrivalDate);

  // Calculate travel duration in hours and minutes
  const durationInMinutes = Math.round((arrivalDate.getTime() - departureDate.getTime()) / (1000 * 60));
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  // Generate available seats
  const availableSeats = Array.from({ length: route.seatsAvailable }, (_, i) => i + 1);

  const handlePurchaseTicket = () => {
    if (!isAuthenticated) {
      toast({
        title: "É necessário fazer login",
        description: "Para comprar passagens, você precisa estar logado.",
      });
      navigate("/login", { state: { redirectTo: `/route/${route.id}` } });
      return;
    }

    if (selectedSeat === null) {
      toast({
        title: "Selecione um assento",
        description: "Você precisa selecionar um assento para continuar.",
        variant: "destructive",
      });
      return;
    }

    purchaseTicket(route.id, selectedSeat);
    navigate("/my-account");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            Voltar
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">Detalhes da Viagem</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="bg-nunes-primary text-white">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>{route.origin}</span>
                    <ArrowRight size={20} />
                    <span>{route.destination}</span>
                  </div>
                  <div>
                    <span className="text-sm">ID: {route.id}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="flex flex-col space-y-6">
                  {/* Route Header */}
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{route.origin} para {route.destination}</h2>
                      <p className="text-gray-500">{departure.date}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="text-sm text-gray-500">Duração</span>
                      <p className="font-medium">{hours}h {minutes > 0 ? `${minutes}min` : ""}</p>
                    </div>
                  </div>

                  {/* Itinerary */}
                  <div className="border-t border-b py-6 space-y-6">
                    {/* Departure */}
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="w-8 h-8 bg-nunes-primary text-white rounded-full flex items-center justify-center">
                          <Clock size={16} />
                        </div>
                        <div className="h-16 w-0.5 bg-gray-300 my-1"></div>
                      </div>
                      <div>
                        <p className="font-bold">{departure.time} - Partida</p>
                        <p className="text-lg">{route.origin}</p>
                        <div className="flex items-center mt-1 text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          <span>{departure.date}</span>
                        </div>
                        <div className="flex items-center mt-1 text-gray-500">
                          <MapPin size={14} className="mr-1" />
                          <span>Terminal Rodoviário</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrival */}
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="w-8 h-8 bg-nunes-accent text-white rounded-full flex items-center justify-center">
                          <MapPin size={16} />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold">{arrival.time} - Chegada</p>
                        <p className="text-lg">{route.destination}</p>
                        <div className="flex items-center mt-1 text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          <span>{arrival.date}</span>
                        </div>
                        <div className="flex items-center mt-1 text-gray-500">
                          <MapPin size={14} className="mr-1" />
                          <span>Terminal Rodoviário</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Informações adicionais</h3>
                    <div className="bg-gray-50 p-4 rounded">
                      <div className="flex items-start">
                        <Bus size={20} className="text-nunes-primary mr-2 mt-1" />
                        <div>
                          <p className="font-medium">Veículo</p>
                          <p className="text-gray-600">Van executiva com ar condicionado, Wi-Fi e assentos reclináveis.</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">
                        * Recomendamos chegar com 30 minutos de antecedência.
                      </p>
                      <p className="text-gray-500 text-sm">
                        * Cada passageiro tem direito a uma bagagem de até 20kg.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Reserve sua passagem</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  {/* Price */}
                  <div>
                    <p className="text-gray-500">Valor da passagem</p>
                    <p className="text-2xl font-bold text-nunes-primary">
                      R$ {route.price.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  
                  {/* Available seats */}
                  <div>
                    <p className="text-gray-500 mb-2">
                      {route.seatsAvailable} {route.seatsAvailable === 1 ? 'assento disponível' : 'assentos disponíveis'}
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="seat">Selecione seu assento</Label>
                      <Select value={selectedSeat?.toString()} onValueChange={(value) => setSelectedSeat(Number(value))}>
                        <SelectTrigger id="seat">
                          <SelectValue placeholder="Selecione um assento" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableSeats.map((seat) => (
                            <SelectItem key={seat} value={seat.toString()}>
                              Assento {seat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex-col space-y-4">
                <Button 
                  onClick={handlePurchaseTicket} 
                  className="w-full bg-nunes-primary hover:bg-nunes-primary/90"
                  disabled={route.seatsAvailable === 0 || selectedSeat === null}
                >
                  {route.seatsAvailable === 0 ? "Esgotado" : "Comprar passagem"}
                </Button>
                
                {!isAuthenticated && (
                  <p className="text-sm text-gray-500 text-center">
                    É necessário estar logado para comprar passagens.
                  </p>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteDetailPage;
