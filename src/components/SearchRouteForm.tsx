
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "../lib/utils";
import { CalendarIcon, Search } from "lucide-react";

// Updated list of cities including Belém and São Caetano
const cities = [
  "Belém", 
  "São Caetano",
  "São Paulo", 
  "Rio de Janeiro", 
  "Belo Horizonte", 
  "Curitiba", 
  "Porto Alegre",
  "Brasília",
  "Salvador",
  "Recife"
];

const SearchRouteForm: React.FC = () => {
  const navigate = useNavigate();
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!origin || !destination || !date) {
      return;
    }

    // Navigate to routes page with search params
    navigate(`/routes?origin=${origin}&destination=${destination}&date=${format(date, "yyyy-MM-dd")}`);
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Origin */}
        <div className="space-y-2">
          <Label htmlFor="origin">Origem</Label>
          <Select value={origin} onValueChange={setOrigin}>
            <SelectTrigger id="origin" className="w-full">
              <SelectValue placeholder="Selecione a origem" />
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

        {/* Destination */}
        <div className="space-y-2">
          <Label htmlFor="destination">Destino</Label>
          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger id="destination" className="w-full">
              <SelectValue placeholder="Selecione o destino" />
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

        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date">Data</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP", { locale: ptBR })
                ) : (
                  <span>Selecione uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                locale={ptBR}
                fromDate={new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button 
            type="submit" 
            className="w-full bg-blue-700 hover:bg-blue-800 h-10 flex items-center justify-center"
            disabled={!origin || !destination || !date}
          >
            <Search size={18} className="mr-2" />
            Buscar Passagens
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchRouteForm;
