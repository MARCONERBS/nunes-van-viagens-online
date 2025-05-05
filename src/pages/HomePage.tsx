
import React from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import SearchRouteForm from "../components/SearchRouteForm";
import { Calendar, Clock, MapPin, Shield, Star, Bus, Search, Users, Award, ThumbsUp, Laptop, Phone, Wifi, Headphones, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: { 
    transition: { 
      staggerChildren: 0.1 
    } 
  }
};

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Modern tech-focused hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/tech-pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Transporte executivo <span className="text-amber-400">digital</span> para Belém
              </h1>
              <p className="text-lg mb-6 text-blue-100">
                Viagens diárias com tecnologia de rastreamento em tempo real, Wi-Fi a bordo e sistema de reservas digital na rota Belém-São Caetano.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-8 py-6 h-auto rounded-full shadow-lg transition-all duration-300"
                >
                  <Link to="/routes">Ver horários</Link>
                </Button>
                <Button 
                  asChild
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white hover:text-blue-800 font-medium rounded-full px-8 py-6 h-auto transition-all duration-300"
                >
                  <Link to="/about">Sobre nós</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="/images/terminal-rodoviario-belem.jpg" 
                alt="Terminal Rodoviário de Belém" 
                className="rounded-lg shadow-2xl max-w-full h-auto border-4 border-white/20"
                style={{ maxHeight: "280px", objectFit: "cover" }}
              />
            </motion.div>
          </div>
          
          {/* Tech features badges */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mt-10"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {[
              { icon: Wifi, text: "Wi-Fi Grátis" },
              { icon: Clock, text: "Monitoramento em tempo real" },
              { icon: Laptop, text: "Reservas online" },
              { icon: Phone, text: "App móvel" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <item.icon className="text-amber-400 mr-2" size={18} />
                <span className="text-sm font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-gray-100 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-center -mt-16">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full"
            >
              <SearchRouteForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Belém Section - More focused on tech and innovation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-blue-900">
              Tecnologia para conectar Belém do Pará
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Revolucionando o transporte na região amazônica com soluções digitais e experiências premium
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img 
                  src="/images/ver-o-peso-belem.jpg"
                  alt="Mercado Ver-o-Peso em Belém do Pará" 
                  className="rounded-lg shadow-xl w-full h-auto"
                  style={{ maxHeight: "340px", objectFit: "cover" }}
                />
                <div className="absolute -bottom-5 -right-5 bg-blue-800 text-white p-4 rounded-lg shadow-lg">
                  <p className="text-lg font-bold">15+ anos</p>
                  <p className="text-sm">de excelência</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold mb-3 text-blue-800 flex items-center">
                  <CheckCircle className="mr-2 text-amber-500" size={20} /> Transporte inteligente
                </h3>
                <p className="text-gray-700">
                  Nossa frota conta com rastreamento GPS em tempo real, permitindo que você acompanhe sua van pelo aplicativo e receba notificações sobre horários de chegada.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-blue-800 flex items-center">
                  <CheckCircle className="mr-2 text-amber-500" size={20} /> Conectividade a bordo
                </h3>
                <p className="text-gray-700">
                  Wi-Fi gratuito de alta velocidade em todas as vans, permitindo que você trabalhe ou se entretenha durante o trajeto entre Belém e São Caetano.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-blue-800 flex items-center">
                  <CheckCircle className="mr-2 text-amber-500" size={20} /> Experiência digital
                </h3>
                <p className="text-gray-700">
                  Compre passagens online, escolha seu assento e receba seu bilhete digital. Nada de filas ou papel, tudo na palma da sua mão.
                </p>
              </div>
              
              <Button 
                asChild
                className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-full px-6"
              >
                <Link to="/about">Conheça nossa tecnologia</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Itinerários Principais Section - Enhanced with tech features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-blue-900">
              Principais Rotas Digitalizadas
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Rotas monitoradas em tempo real com sistema inteligente de previsão de horários
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Belém x São Caetano */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-600 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Bus className="text-blue-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-900">Belém → São Caetano</h3>
                  <p className="text-sm text-gray-500">Duração média: 1h15min</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <p className="text-gray-700 text-sm">Saindo do Terminal Rodoviário de Belém com paradas estratégicas na Av. Almirante Barroso, Ver-o-Peso e pontos conectados ao sistema digital de rastreamento.</p>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-700">Horários de partida:</p>
                  <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Monitorados em tempo real</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['07:00', '08:00', '10:00', '14:00', '16:30', '18:00'].map((hour) => (
                    <span key={hour} className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Clock size={14} className="mr-1" /> {hour}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Wifi size={16} className="text-blue-600" />
                  <span className="text-xs text-gray-500">Wi-Fi Grátis</span>
                </div>
                <Button 
                  asChild
                  size="sm"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-full"
                >
                  <Link to="/routes?origin=Belém&destination=São%20Caetano">Ver detalhes</Link>
                </Button>
              </div>
            </motion.div>
            
            {/* São Caetano x Belém */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-600 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Bus className="text-blue-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-900">São Caetano → Belém</h3>
                  <p className="text-sm text-gray-500">Duração média: 1h25min</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <p className="text-gray-700 text-sm">Retorno para Belém com chegada no Terminal Rodoviário e paradas estratégicas integradas ao sistema de monitoramento digital.</p>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-700">Horários de partida:</p>
                  <span className="text-xs bg-green-100 text-green-800 py-1 px-2 rounded-full">Monitorados em tempo real</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['04:00', '05:00', '10:20', '11:20', '13:20', '17:00'].map((hour) => (
                    <span key={hour} className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Clock size={14} className="mr-1" /> {hour}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Wifi size={16} className="text-blue-600" />
                  <span className="text-xs text-gray-500">Wi-Fi Grátis</span>
                </div>
                <Button 
                  asChild
                  size="sm"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-full"
                >
                  <Link to="/routes?origin=São%20Caetano&destination=Belém">Ver detalhes</Link>
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-8 bg-blue-50 p-4 rounded-lg inline-block mx-auto">
            <div className="flex items-center justify-center gap-2 text-blue-800">
              <Laptop size={18} />
              <p className="text-sm">Todas as viagens incluem sistema de entretenimento digital a bordo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - More high-tech */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-blue-900">
              Vantagens Tecnológicas da Nunes Van
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Combinamos conforto tradicional com tecnologias inovadoras para sua melhor experiência
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Clock className="text-blue-800 text-xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center text-blue-800">Precisão Digital</h3>
              <p className="text-gray-600 text-center">
                Sistema GPS com precisão de 98,7% para monitoramento em tempo real de todas as rotas, garantindo pontualidade.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Shield className="text-blue-800 text-xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center text-blue-800">Segurança Avançada</h3>
              <p className="text-gray-600 text-center">
                Câmeras de monitoramento e sensores de velocidade em toda a frota, com alertas em tempo real para o centro de controle.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Wifi className="text-blue-800 text-xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center text-blue-800">Conectividade Total</h3>
              <p className="text-gray-600 text-center">
                Wi-Fi de alta velocidade em todas as vans com link redundante, garantindo conectividade mesmo em áreas remotas.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all border border-gray-100"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Headphones className="text-blue-800 text-xl" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center text-blue-800">Entretenimento</h3>
              <p className="text-gray-600 text-center">
                Sistema de entretenimento digital com músicas, podcasts e informações turísticas sobre Belém e região.
              </p>
            </motion.div>
          </div>

          {/* Tech specs */}
          <div className="mt-16 bg-blue-50 p-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-6 text-blue-800 text-center">Especificações Técnicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h4 className="font-semibold text-blue-700 mb-3">Frota Digital</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span>Veículos 2023-2024</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span>Monitoramento remoto 24/7</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span>Manutenção preditiva</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h4 className="font-semibold text-blue-700 mb-3">Conectividade</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span>Wi-Fi 5G redundante</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span>Portas USB em cada assento</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span>Sistema de áudio Bluetooth</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h4 className="font-semibold text-blue-700 mb-3">Experiência Digital</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span>App dedicado para passageiros</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span>Sistema de pagamento sem contato</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-green-500 mr-2" size={16} />
                    <span>Bilhetes QR Code digitais</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - More professional looking */}
      <section className="py-16 bg-gray-50 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/map-dots.png')] bg-no-repeat bg-cover opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-blue-900">
              Experiências dos Nossos Clientes
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              O que nossos passageiros digitais estão dizendo sobre a nova experiência de viagem
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 relative"
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white text-2xl">"</div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="text-blue-800" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Maria Silva</h4>
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
                "O aplicativo da Nunes Van me permite rastrear a van em tempo real, o que é ótimo para planejar minha saída do Ver-o-Peso com precisão. O Wi-Fi a bordo me permite trabalhar durante todo o trajeto."
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs text-blue-700">Cliente desde 2022 • Via App Mobile</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 relative"
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white text-2xl">"</div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="text-blue-800" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">João Santos</h4>
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
                "As notificações automáticas do sistema me avisam quando a van está próxima, facilitando muito minha rotina. O sistema de pagamento via PIX e cartão direto no app é super prático."
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs text-blue-700">Cliente desde 2021 • Via Google</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 relative"
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white text-2xl">"</div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="text-blue-800" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Ana Oliveira</h4>
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
                "O sistema de entretenimento a bordo torna a viagem muito mais agradável. As informações turísticas sobre Belém que passam na tela são interessantes até para quem é da região."
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs text-blue-700">Cliente desde 2023 • Via App Mobile</span>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button 
              asChild
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <Link to="/testimonials">Ver mais avaliações</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - More tech-focused */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/circuit-pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-5">
              Transporte do futuro entre Belém e São Caetano
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              Cadastre-se para receber alertas digitais sobre novos horários, promoções exclusivas e atualizações sobre nosso sistema de transporte inteligente.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full"
              />
              <Button 
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-full px-8"
              >
                Cadastrar
              </Button>
            </div>
            
            <div className="flex justify-center mt-8 gap-6">
              <div className="flex items-center gap-2">
                <Shield className="text-amber-400" size={18} />
                <span className="text-sm">Dados protegidos</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-amber-400" size={18} />
                <span className="text-sm">Cancele quando quiser</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
