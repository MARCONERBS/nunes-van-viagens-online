
import React from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import SearchRouteForm from "../components/SearchRouteForm";
import { Calendar, Clock, MapPin, Shield, Star, Bus, Search, Users, Award, ThumbsUp } from "lucide-react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - More compact with local-focused content */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Transporte executivo entre Belém e São Caetano
              </h1>
              <p className="text-lg mb-6">
                Viagens diárias com conforto, segurança e pontualidade na rota Belém-São Caetano. Vans modernas com ar-condicionado e Wi-Fi para sua melhor experiência.
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
                src="/images/terminal-rodoviario-belem.jpg" 
                alt="Terminal Rodoviário de Belém" 
                className="rounded-lg shadow-xl max-w-full h-auto"
                style={{ maxHeight: "280px", objectFit: "cover" }}
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

      {/* About Belém Section - More focused on local details */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Explorando Belém do Pará
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="/images/ver-o-peso-belem.jpg"
                alt="Mercado Ver-o-Peso em Belém do Pará" 
                className="rounded-lg shadow-lg w-full h-auto"
                style={{ maxHeight: "260px", objectFit: "cover" }}
              />
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                Belém, capital do estado do Pará, é conhecida como a "Porta de Entrada da Amazônia". Rica em história e cultura, a cidade encanta os visitantes com seus marcos históricos como o Ver-o-Peso, maior feira livre da América Latina, e a Estação das Docas.
              </p>
              <p className="text-gray-700">
                A gastronomia paraense é um destaque à parte, com sabores únicos como o açaí, o tacacá, o pato no tucupi e a maniçoba, considerados patrimônios culturais da região amazônica.
              </p>
              <p className="text-gray-700">
                A Nunes Van facilita suas viagens pela região, conectando o centro de Belém a São Caetano com rapidez, conforto e segurança.
              </p>
              <Button 
                asChild
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium mt-2"
              >
                <Link to="/about">Conheça mais sobre Belém</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerários Principais Section - Enhanced local information */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Principais Rotas da Nunes Van
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Belém x São Caetano */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <Bus className="text-blue-800" />
                <h3 className="text-xl font-semibold">Belém → São Caetano</h3>
              </div>
              <p className="text-gray-600 mb-3">Saindo do Terminal Rodoviário de Belém com paradas na Av. Almirante Barroso e Ver-o-Peso.</p>
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
              <p className="text-gray-600 mb-3">Retorno para Belém com chegada no Terminal Rodoviário e paradas estratégicas pela cidade.</p>
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
          
          <div className="text-center mt-6 text-gray-500">
            <p>Todas as viagens incluem ar-condicionado, Wi-Fi e poltronas confortáveis</p>
          </div>
        </div>
      </section>

      {/* Features Section - More specific about the company */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Por que escolher a Nunes Van?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-5 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="text-blue-800 text-xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Pontualidade</h3>
              <p className="text-gray-600">
                Saídas pontuais do Terminal Rodoviário de Belém e dos pontos em São Caetano, respeitando seu tempo.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-5 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-blue-800 text-xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Segurança</h3>
              <p className="text-gray-600">
                Frota moderna e regularizada, com motoristas experientes nas rotas específicas de Belém e região.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-5 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Star className="text-blue-800 text-xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Conforto</h3>
              <p className="text-gray-600">
                Vans executivas climatizadas, ideais para o clima quente e úmido de Belém, com poltronas reclináveis.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-5 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-blue-800 text-xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Acessibilidade</h3>
              <p className="text-gray-600">
                Pontos de embarque estratégicos em Belém, incluindo Ver-o-Peso, Estação das Docas e shoppings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - More authentic local testimonials */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            O que nossos passageiros dizem
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
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
                "Sempre uso a Nunes Van para ir do Ver-o-Peso até São Caetano. O serviço é pontual mesmo em dias de chuva forte em Belém, e os motoristas conhecem bem as rotas alternativas."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
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
                "Trabalho na feira do Ver-o-Peso e preciso chegar cedo. A van das 4h da manhã de São Caetano é perfeita para mim, sempre pontual e com preço justo."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
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
                "Faço compras na Estação das Docas e a Nunes Van tem ponto de embarque bem próximo, facilitando muito meu retorno para São Caetano com as sacolas."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes Section - More focused on actual destinations */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            Destinos em Belém
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
              <img 
                src="/images/terminal-rodoviario-belem.jpg" 
                alt="Terminal Rodoviário de Belém" 
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">Terminal Rodoviário</h3>
                <p className="text-gray-600 mb-3">Ponto principal de embarque e desembarque em Belém, com saídas frequentes para São Caetano.</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-800 font-bold">R$ 25,00</span>
                  <Button asChild size="sm" className="bg-blue-700 hover:bg-blue-800 text-white">
                    <Link to="/routes?origin=Belém&destination=São%20Caetano">Horários</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
              <img 
                src="/images/ver-o-peso-belem.jpg" 
                alt="Ver-o-Peso em Belém" 
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">Ver-o-Peso</h3>
                <p className="text-gray-600 mb-3">Ponto de embarque próximo à maior feira livre da América Latina, com fácil acesso ao comércio local.</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-800 font-bold">R$ 25,00</span>
                  <Button asChild size="sm" className="bg-blue-700 hover:bg-blue-800 text-white">
                    <Link to="/routes?origin=Belém&destination=São%20Caetano">Horários</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
              <img 
                src="/images/estacao-das-docas-belem.jpg" 
                alt="Estação das Docas em Belém" 
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">Estação das Docas</h3>
                <p className="text-gray-600 mb-3">Complexo turístico às margens da Baía do Guajará, com restaurantes e lojas. Ponto de embarque conveniente.</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-800 font-bold">R$ 25,00</span>
                  <Button asChild size="sm" className="bg-blue-700 hover:bg-blue-800 text-white">
                    <Link to="/routes?origin=Belém&destination=São%20Caetano">Horários</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
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

      {/* CTA Section - More local specific */}
      <section className="py-12 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-5">
            Viaje com conforto entre Belém e São Caetano
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Cadastre-se para receber alertas sobre novos horários, promoções especiais e informações sobre as rotas de Belém incluindo Ver-o-Peso e Estação das Docas.
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
