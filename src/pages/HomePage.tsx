
import React from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import SearchRouteForm from "../components/SearchRouteForm";
import { Calendar, Clock, MapPin, Shield, Star } from "lucide-react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-nunes-primary to-nunes-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Viaje com conforto e segurança
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Reserve sua passagem online com a Nunes Van e garanta sua viagem para os melhores destinos.
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
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop" 
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
                Respeitamos seu tempo com horários sempre pontuais de saída e chegada.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-nunes-light rounded-full flex items-center justify-center mb-4">
                <Shield className="text-nunes-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Segurança</h3>
              <p className="text-gray-600">
                Veículos modernos e motoristas profissionais para sua tranquilidade.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-nunes-light rounded-full flex items-center justify-center mb-4">
                <Star className="text-nunes-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Conforto</h3>
              <p className="text-gray-600">
                Vans espaçosas e bem equipadas para uma viagem agradável.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-nunes-light rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-nunes-primary text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Destinos</h3>
              <p className="text-gray-600">
                Conectamos você aos principais destinos com rotas estratégicas.
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
            <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1564510182789-972d396e8fdb?q=80&w=1932&auto=format&fit=crop" 
                alt="São Paulo para Rio de Janeiro" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">São Paulo → Rio de Janeiro</h3>
                <p className="text-gray-600 mb-4">Viagem diária com várias opções de horários</p>
                <div className="flex justify-between items-center">
                  <span className="text-nunes-primary font-bold">A partir de R$ 120,00</span>
                  <Button asChild size="sm" className="bg-nunes-secondary hover:bg-nunes-secondary/90">
                    <Link to="/routes?origin=São%20Paulo&destination=Rio%20de%20Janeiro">Ver horários</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1584646098378-0874589d76b1?q=80&w=1935&auto=format&fit=crop" 
                alt="São Paulo para Belo Horizonte" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">São Paulo → Belo Horizonte</h3>
                <p className="text-gray-600 mb-4">Viagens confortáveis diretas</p>
                <div className="flex justify-between items-center">
                  <span className="text-nunes-primary font-bold">A partir de R$ 100,00</span>
                  <Button asChild size="sm" className="bg-nunes-secondary hover:bg-nunes-secondary/90">
                    <Link to="/routes?origin=São%20Paulo&destination=Belo%20Horizonte">Ver horários</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1593702288056-7e302356173f?q=80&w=2070&auto=format&fit=crop" 
                alt="Belo Horizonte para São Paulo" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Belo Horizonte → São Paulo</h3>
                <p className="text-gray-600 mb-4">Opções de manhã e noite</p>
                <div className="flex justify-between items-center">
                  <span className="text-nunes-primary font-bold">A partir de R$ 100,00</span>
                  <Button asChild size="sm" className="bg-nunes-secondary hover:bg-nunes-secondary/90">
                    <Link to="/routes?origin=Belo%20Horizonte&destination=São%20Paulo">Ver horários</Link>
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
            Pronto para viajar com a Nunes Van?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Faça seu cadastro agora para garantir as melhores ofertas e facilitar suas próximas reservas.
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
