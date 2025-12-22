import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import ServicoBanner from "../../assets/img/service-perucas.jpg";
import ServicoTratamento from "../../assets/img/service-perucas-tratamento.jpg";
import ServicoColoracao from "../../assets/img/service-perucas-coloracao.jpg";
import ServicoAplicacao from "../../assets/img/service-perucas-aplicacao.jpg";
import ServicoXoxo from "../../assets/img/service-perucas-xoxo.jpg";

export default function ServicoPerucas() {
  return (
    <>
      <title>Extensões e Perucas | Salão Mirashell</title>
      <Header />

      {/* Banner */}
      <section
        className="relative w-full h-96 md:h-160 flex items-center justify-center text-center text-white"
        style={{ backgroundImage: `url(${ServicoBanner})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/50"></div> {/* overlay */}
        <div className="relative z-10 px-4 md:px-8 max-w-3xl flex flex-col items-center justify-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-4">Extensões e Perucas</h3>
          <p className="text-lg md:text-xl mb-2">Transforme o Seu Visual com Estilo e Confiança</p>
          <p className="text-base md:text-lg max-w-2xl">
            Cuidado profissional, técnicas modernas e resultados que valorizam a sua beleza.
          </p>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Tratamento de Perucas */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={ServicoTratamento}
                alt="Tratamento de Perucas"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-[#A2672D] mb-2">Tratamento de Perucas</h2>
              <p>Hidratação + Mise: 10.000 Kz</p>
              <p>Só Aplicação: 25.000 Kz</p>
              <p>Peruca Completa: 12.000 Kz</p>
              <p>Peruca Extra Longa: 15.000 Kz</p>
              <Link
                to="/agendar"
                className="mt-auto inline-block text-center bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 transition-all duration-300"
              >
                Agendar Agora
              </Link>
            </div>
          </div>

          {/* Coloração de Perucas */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={ServicoColoracao}
                alt="Coloração de Perucas"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-[#A2672D] mb-2">Coloração de Perucas</h2>
              <p>Peruca Curta + Mise: 25.000 Kz</p>
              <p>Peruca Média + Mise: 30.000 Kz</p>
              <p>Peruca Completa: 45.000 Kz</p>
              <p>Peruca Extra Longa: 50.000 Kz</p>
              <p>Aplicação de Lace: 25.000 Kz</p>
              <Link
                to="/agendar"
                className="mt-auto inline-block text-center bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 transition-all duration-300"
              >
                Agendar Agora
              </Link>
            </div>
          </div>

          {/* Aplicação de Cabelo */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={ServicoAplicacao}
                alt="Aplicação de Cabelo"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-[#A2672D] mb-2">Aplicação de Cabelo</h2>
              <p>Costura + Mise: 25.000 Kz</p>
              <p>Nó Italiano + Mise: 30.000 Kz</p>
              <p>Lace Frontal + Brushing: 25.000 Kz</p>
              <p>Preparação de Queratina: 60.000 Kz</p>
              <Link
                to="/agendar"
                className="mt-auto inline-block text-center bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 transition-all duration-300"
              >
                Agendar Agora
              </Link>
            </div>
          </div>

          {/* Tranças XOXO */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={ServicoXoxo}
                alt="Tranças XOXO"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-[#A2672D] mb-2">Tranças XOXO</h2>
              <p>Curto: 15.000 Kz</p>
              <p>Médio: 20.000 Kz</p>
              <p>Comprido: 25.000 Kz</p>
              <Link
                to="/agendar"
                className="mt-auto inline-block text-center bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 transition-all duration-300"
              >
                Agendar Agora
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
