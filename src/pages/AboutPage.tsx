import React from "react";
import { CheckCircle, Award, Users, Wifi, Clock, Shield } from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 text-center">Sobre a Nunes Van</h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl mx-auto">
          A Nunes Van é referência em transporte executivo digital na região amazônica, conectando Belém e São Caetano com conforto, segurança e tecnologia de ponta. Nossa missão é transformar a experiência de viagem dos nossos clientes, oferecendo soluções inovadoras, rastreamento em tempo real, Wi-Fi a bordo e atendimento premium.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-3 flex items-center"><CheckCircle className="mr-2 text-amber-500" /> Missão</h2>
            <p className="text-gray-600 mb-4">Proporcionar mobilidade eficiente, segura e digital, conectando pessoas e destinos com excelência em serviço.</p>
            <h2 className="text-xl font-semibold text-blue-800 mb-3 flex items-center"><Award className="mr-2 text-amber-500" /> Visão</h2>
            <p className="text-gray-600 mb-4">Ser reconhecida como a empresa de transporte mais inovadora e confiável do Norte do Brasil.</p>
            <h2 className="text-xl font-semibold text-blue-800 mb-3 flex items-center"><Users className="mr-2 text-amber-500" /> Valores</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Compromisso com o cliente</li>
              <li>Inovação e tecnologia</li>
              <li>Segurança em primeiro lugar</li>
              <li>Transparência e ética</li>
              <li>Sustentabilidade</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Diferenciais Tecnológicos</h3>
            <ul className="space-y-3 w-full">
              <li className="flex items-center text-blue-800"><Wifi className="mr-2 text-amber-500" /> Wi-Fi de alta velocidade a bordo</li>
              <li className="flex items-center text-blue-800"><Clock className="mr-2 text-amber-500" /> Rastreamento em tempo real</li>
              <li className="flex items-center text-blue-800"><Shield className="mr-2 text-amber-500" /> Frota monitorada e segura</li>
              <li className="flex items-center text-blue-800"><CheckCircle className="mr-2 text-amber-500" /> Reserva digital e bilhete QR Code</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Desde 2015, a Nunes Van conecta pessoas, negócios e sonhos, sempre com foco em inovação, conforto e segurança. Venha viver a experiência do transporte executivo digital!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 