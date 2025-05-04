
import React from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import SearchRouteForm from "../components/SearchRouteForm";
import { Calendar, Clock, MapPin, Shield, Star, Caravan, Bus, Search, Users, Award, ThumbsUp } from "lucide-react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Viagens em van com conforto e agilidade
              </h1>
              <p className="text-lg md:text-xl mb-8">
                A Nunes Van oferece transporte executivo entre Belém e São Caetano com flexibilidade e segurança para suas viagens. Reserve online e aproveite nossa frota moderna de vans.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-black font-medium"
                >
                  <Link to="/routes">Ver horários</Link>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white hover:text-blue-800 font-medium"
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

      {/* About Belém Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Conheça Belém - A Cidade das Mangueiras
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=1935&auto=format&fit=crop"
                alt="Belém do Pará" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                Belém, capital do Pará, é conhecida como a "Cidade das Mangueiras" devido às árvores que embelezam suas avenidas. Com mais de 400 anos de história, a cidade possui um rico patrimônio cultural e gastronômico.
              </p>
              <p className="text-gray-700">
                Do famoso Ver-o-Peso, maior feira livre da América Latina, às delícias do açaí e tacacá, Belém encanta visitantes com sua culinária e cultura ribeirinha.
              </p>
              <p className="text-gray-700">
                A Nunes Van facilita seu transporte pela região, conectando Belém e São Caetano com segurança e pontualidade.
              </p>
              <Button 
                asChild
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium mt-4"
              >
                <Link to="/about">Saiba mais sobre a região</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerários Principais Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Itinerários Principais
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Belém x São Caetano */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <Bus className="text-blue-800" />
                <h3 className="text-xl font-semibold">Belém → São Caetano</h3>
              </div>
              <div className="space-y-2 mb-4">
                <p className="font-medium text-gray-700">Horários de partida:</p>
                <div className="flex flex-wrap gap-2">
                  {['07:00', '08:00', '10:00', '14:00', '16:30', '18:00'].map((hour) => (
                    <span key={hour} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {hour}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <Button 
                  asChild
                  size="sm"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-medium"
                >
                  <Link to="/routes?origin=Belém&destination=São%20Caetano">Ver detalhes</Link>
                </Button>
              </div>
            </div>
            
            {/* São Caetano x Belém */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <Bus className="text-blue-800" />
                <h3 className="text-xl font-semibold">São Caetano → Belém</h3>
              </div>
              <div className="space-y-2 mb-4">
                <p className="font-medium text-gray-700">Horários de partida:</p>
                <div className="flex flex-wrap gap-2">
                  {['04:00', '05:00', '10:20', '11:20', '13:20', '17:00'].map((hour) => (
                    <span key={hour} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {hour}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <Button 
                  asChild
                  size="sm"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-medium"
                >
                  <Link to="/routes?origin=São%20Caetano&destination=Belém">Ver detalhes</Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 text-gray-500">
            <p>Viagens disponíveis todos os dias da semana, incluindo feriados</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Por que escolher a Nunes Van?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="text-blue-800 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pontualidade</h3>
              <p className="text-gray-600">
                Viagens com horários flexíveis e sempre pontuais entre Belém e São Caetano para sua comodidade.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-blue-800 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Segurança</h3>
              <p className="text-gray-600">
                Vans modernas e motoristas profissionais para sua total tranquilidade nas viagens pela região.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Star className="text-blue-800 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Conforto</h3>
              <p className="text-gray-600">
                Vans executivas com poltronas confortáveis e ar-condicionado para viagens agradáveis no clima de Belém.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-blue-800 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexibilidade</h3>
              <p className="text-gray-600">
                Paradas em pontos estratégicos em Belém e São Caetano para sua conveniência.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            O que nossos clientes dizem
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="text-blue-800" />
                </div>
                <div>
                  <h4 className="font-semibold">Maria Silva</h4>
                  <div className="flex text-amber-400">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Uso a Nunes Van toda semana para ir de Belém a São Caetano. O serviço é pontual e os motoristas são muito atenciosos. Recomendo!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="text-blue-800" />
                </div>
                <div>
                  <h4 className="font-semibold">João Santos</h4>
                  <div className="flex text-amber-400">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Viajo frequentemente entre São Caetano e Belém e a Nunes Van é sempre minha escolha. Veículos limpos e confortáveis, mesmo com o calor da região."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="text-blue-800" />
                </div>
                <div>
                  <h4 className="font-semibold">Ana Oliveira</h4>
                  <div className="flex text-amber-400">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} />
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Ótimo custo-benefício para quem precisa se deslocar entre Belém e São Caetano. Reservar online é muito prático e sempre tem horários disponíveis."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Rotas Populares
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Updated first popular route */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1564510182789-972d396e8fdb?q=80&w=1932&auto=format&fit=crop" 
                alt="Belém para São Caetano" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Belém → São Caetano</h3>
                <p className="text-gray-600 mb-4">Viagem executiva em van com WiFi e tomadas USB. Partindo do centro de Belém.</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-800 font-bold">A partir de R$ 25,00</span>
                  <Button asChild size="sm" className="bg-blue-700 hover:bg-blue-800 text-white font-medium">
                    <Link to="/routes?origin=Belém&destination=São%20Caetano">Ver horários</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Updated second popular route */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1584646098378-0874589d76b1?q=80&w=1935&auto=format&fit=crop" 
                alt="São Caetano para Belém" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">São Caetano → Belém</h3>
                <p className="text-gray-600 mb-4">Van executiva com paradas estratégicas em São Caetano e Belém.</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-800 font-bold">A partir de R$ 25,00</span>
                  <Button asChild size="sm" className="bg-blue-700 hover:bg-blue-800 text-white font-medium">
                    <Link to="/routes?origin=São%20Caetano&destination=Belém">Ver horários</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Special route for tourists */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1596423840906-a6f943383917?q=80&w=2070&auto=format&fit=crop" 
                alt="Pontos Turísticos de Belém" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Pontos Turísticos - Belém</h3>
                <p className="text-gray-600 mb-4">Conheça os principais pontos turísticos de Belém com nosso roteiro especial</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-800 font-bold">A partir de R$ 40,00</span>
                  <Button asChild size="sm" className="bg-blue-700 hover:bg-blue-800 text-white font-medium">
                    <Link to="/routes?tour=belem">Ver detalhes</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild
              size="lg"
              className="bg-blue-800 hover:bg-blue-900 text-white font-medium"
            >
              <Link to="/routes">Ver todas as rotas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Transporte executivo em van com a Nunes Van
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Cadastre-se para receber ofertas exclusivas nas rotas entre Belém e São Caetano e facilitar suas futuras reservas de viagens.
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-black font-medium"
          >
            <Link to="/register">Cadastre-se gratuitamente</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
