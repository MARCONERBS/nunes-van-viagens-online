import React from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import SearchRouteForm from "../components/SearchRouteForm";
import { Calendar, Clock, MapPin, Shield, Star, Caravan, Bus } from "lucide-react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-nunes-primary to-nunes-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Viagens em van com conforto e agilidade
              </h1>
              <p className="text-lg md:text-xl mb-8">
                A Nunes Van oferece transporte executivo com flexibilidade para suas viagens. Reserve online e aproveite nossa frota moderna de vans.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="bg-nunes-accent hover:bg-nunes-accent/90 text-white"
                >
                  <Link to="/routes">Ver horários</Link>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white hover:text-nunes-primary"
                >
                  <Link to="/about">Sobre nós</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1622959952836-c04455ab6c9e?q=80&w=2070&auto=format&fit=crop" 
                alt="Nunes Van" 
                className="rounded-lg shadow-xl max-w-full h-auto"
                style={{ maxHeight: "400px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-center -mt-16">
            <SearchRouteForm />
          </div>
        </div>
      </section>

      {/* Itinerários Principais Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Itinerários Principais
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Belém x São Caetano */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <Bus className="text-nunes-primary" />
                <h3 className="text-xl font-semibold">Belém → São Caetano</h3>
              </div>
              <div className="space-y-2 mb-4">
                <p className="font-medium text-gray-700">Horários de partida:</p>
                <div className="flex flex-wrap gap-2">
                  {['07:00', '08:00', '10:00', '14:00', '16:30', '18:00'].map((hour) => (
                    <span key={hour} className="bg-nunes-light text-nunes-primary px-3 py-1 rounded-full text-sm">
                      {hour}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <Button 
                  asChild
                  size="sm"
                  className="bg-nunes-secondary hover:bg-nunes-secondary/90"
                >
                  <Link to="/routes?origin=Belém&destination=São%20Caetano">Ver detalhes</Link>
                </Button>
              </div>
            </div>
            
            {/* São Caetano x Belém */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <Bus className="text-nunes-primary" />
                <h3 className="text-xl font-semibold">São Caetano → Belém</h3>
              </div>
              <div className="space-y-2 mb-4">
                <p className="font-medium text-gray-700">Horários de partida:</p>
                <div className="flex flex-wrap gap-2">
                  {['04:00', '05:00', '10:20', '11:20', '13:20', '17:00'].map((hour) => (
                    <span key={hour} className="bg-nunes-light text-nunes-primary px-3 py-1 rounded-full text-sm">
                      {hour}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <Button 
                  asChild
                  size="sm"
                  className="bg-nunes-secondary hover:bg-nunes-secondary/90"
                >
                  <Link to="/routes?origin=São%20Caetano&destination=Belém">Ver detalhes</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 text-gray-500">
            <p>Viagens disponíveis todos os dias da semana</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Por que escolher a Nunes Van?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-nunes-light rounded-full flex items-center justify-center mb-4">
                <Clock className="text-nunes-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pontualidade</h3>
              <p className="text-gray-600">
                Viagens com horários flexíveis e sempre pontuais para sua comodidade.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-nunes-light rounded-full flex items-center justify-center mb-4">
                <Shield className="text-nunes-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Segurança</h3>
              <p className="text-gray-600">
                Vans modernas e motoristas profissionais para sua total tranquilidade.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-nunes-light rounded-full flex items-center justify-center mb-4">
                <Star className="text-nunes-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Conforto</h3>
              <p className="text-gray-600">
                Vans executivas com poltronas confortáveis e ar-condicionado.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-nunes-light rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-nunes-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexibilidade</h3>
              <p className="text-gray-600">
                Rotas personalizadas e paradas em pontos estratégicos para sua conveniência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Rotas Populares
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Updated first popular route */}
            <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1564510182789-972d396e8fdb?q=80&w=1932&auto=format&fit=crop" 
                alt="Belém para São Caetano" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Belém → São Caetano</h3>
                <p className="text-gray-600 mb-4">Viagem executiva em van com WiFi e tomadas USB</p>
                <div className="flex justify-between items-center">
                  <span className="text-nunes-primary font-bold">A partir de R$ 25,00</span>
                  <Button asChild size="sm" className="bg-nunes-secondary hover:bg-nunes-secondary/90">
                    <Link to="/routes?origin=Belém&destination=São%20Caetano">Ver horários</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Updated second popular route */}
            <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1584646098378-0874589d76b1?q=80&w=1935&auto=format&fit=crop" 
                alt="São Caetano para Belém" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">São Caetano → Belém</h3>
                <p className="text-gray-600 mb-4">Van executiva com paradas em pontos estratégicos</p>
                <div className="flex justify-between items-center">
                  <span className="text-nunes-primary font-bold">A partir de R$ 25,00</span>
                  <Button asChild size="sm" className="bg-nunes-secondary hover:bg-nunes-secondary/90">
                    <Link to="/routes?origin=São%20Caetano&destination=Belém">Ver horários</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Keep the third route */}
            <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop" 
                alt="Outras Rotas" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Outras Rotas</h3>
                <p className="text-gray-600 mb-4">Conheça todas as nossas opções de destinos</p>
                <div className="flex justify-between items-center">
                  <span className="text-nunes-primary font-bold">Diversos valores</span>
                  <Button asChild size="sm" className="bg-nunes-secondary hover:bg-nunes-secondary/90">
                    <Link to="/routes">Ver todas</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild
              size="lg"
              className="bg-nunes-primary hover:bg-nunes-primary/90"
            >
              <Link to="/routes">Ver todas as rotas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-nunes-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Transporte executivo em van com a Nunes Van
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Cadastre-se para receber ofertas exclusivas e facilitar suas futuras reservas de viagens.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-nunes-accent hover:bg-nunes-accent/90 text-white"
          >
            <Link to="/register">Cadastre-se gratuitamente</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
