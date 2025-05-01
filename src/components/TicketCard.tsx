
import React from "react";
import { Ticket } from "../types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useTicket } from "../context/TicketContext";
import { QrCode, ArrowRight, Calendar, Clock } from "lucide-react";
import { toast } from "./ui/use-toast";

interface TicketCardProps {
  ticket: Ticket;
  showActions?: boolean;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, showActions = true }) => {
  const { cancelTicket } = useTicket();

  if (!ticket.route) {
    return <div>Erro ao carregar informações da passagem.</div>;
  }

  const handleViewQRCode = () => {
    // In a real app, this would show a modal with the QR code
    toast({
      title: "Código QR",
      description: "Seu código QR foi exibido",
    });
  };

  const handleCancelTicket = () => {
    if (window.confirm("Tem certeza que deseja cancelar esta passagem?")) {
      cancelTicket(ticket.id);
    }
  };

  const formatDateTime = (dateTimeStr: string) => {
    const date = parseISO(dateTimeStr);
    return {
      date: format(date, "dd/MM/yyyy", { locale: ptBR }),
      time: format(date, "HH:mm", { locale: ptBR }),
    };
  };

  const departure = formatDateTime(ticket.route.departureTime);
  const arrival = formatDateTime(ticket.route.arrivalTime);
  const purchaseDate = formatDateTime(ticket.purchaseDate);

  const getStatusColor = () => {
    switch (ticket.status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "used":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = () => {
    switch (ticket.status) {
      case "active":
        return "Ativa";
      case "used":
        return "Utilizada";
      case "cancelled":
        return "Cancelada";
      default:
        return "Desconhecido";
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-nunes-primary text-white">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-lg">Passagem #{ticket.id}</span>
          </div>
          <Badge className={getStatusColor()}>{getStatusText()}</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          {/* Route Info */}
          <div>
            <h3 className="text-lg font-semibold flex items-center mb-2">
              {ticket.route.origin}
              <ArrowRight className="mx-2 text-nunes-accent" />
              {ticket.route.destination}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-nunes-primary" />
                <span>{departure.date}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-nunes-primary" />
                <span>Saída: {departure.time}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="ml-5">Assento: {ticket.seatNumber}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-nunes-primary" />
                <span>Chegada: {arrival.time}</span>
              </div>
            </div>
          </div>
          
          {/* Purchase Info */}
          <div className="bg-gray-50 p-3 rounded text-sm">
            <p>Comprado em: {purchaseDate.date} às {purchaseDate.time}</p>
            <p>Valor: R$ {ticket.route.price.toFixed(2).replace(".", ",")}</p>
          </div>
        </div>
      </CardContent>
      
      {showActions && ticket.status === "active" && (
        <CardFooter className="bg-gray-100 flex justify-end space-x-2 p-4">
          <Button 
            variant="outline"
            onClick={handleViewQRCode}
            className="flex items-center"
          >
            <QrCode size={16} className="mr-1" />
            QR Code
          </Button>
          <Button 
            variant="destructive"
            onClick={handleCancelTicket}
          >
            Cancelar Passagem
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default TicketCard;
