import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import ServicoBanner from "../../assets/img/service-trancas.jpg";
import ServicoLimpeza from "../../assets/img/service-trancas-limpeza.jpg";
import ServicoMaquiagem from "../../assets/img/service-trancas-maquiagem.jpg";
import ServicoTranca from "../../assets/img/service-trancas.jpg";

export default function ServicoTrancas() {
  return (
    <>
      <title>Tranças e Penteados | Salão Mirashell</title>
      <Header />

      {/* Banner */}
      <section
        className="relative w-full h-96 md:h-160 flex items-center justify-center text-center text-white"
        style={{ backgroundImage: `url(${ServicoBanner})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/50"></div> {/* overlay */}
        <div className="relative z-10 px-4 md:px-8 max-w-3xl flex flex-col items-center justify-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-4">Tranças e Penteados</h3>
          <p className="text-lg md:text-xl mb-2">Transforme o Seu Visual com Estilo e Confiança</p>
          <p className="text-base md:text-lg max-w-2xl">
            Cuidado profissional, técnicas modernas e resultados que valorizam a sua beleza.
          </p>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Limpeza Facial */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={ServicoLimpeza}
                alt="Limpeza Facial"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-[#A2672D] mb-2">Limpeza Facial</h2>
              <p>Hidro Facial: 25.000 Kz</p>
              <p>Limpeza Normal: 15.000 Kz</p>
              <p>Limpeza Profunda: 20.000 Kz</p>
              <p>Microblading: 35.000 Kz</p>
              <p>Micro Pigmentação: 30.000 Kz</p>
              <Link
                to="/agendar"
                className="mt-auto inline-block text-center bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 transition-all duration-300"
              >
                Agendar Agora
              </Link>
            </div>
          </div>

          {/* Maquiagem */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={ServicoMaquiagem}
                alt="Maquiagem"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-[#A2672D] mb-2">Maquiagem</h2>
              <p>Maquiagem de Noiva: 20.000 Kz</p>
              <p>Maquiagem Normal: 15.000 Kz</p>
              <p>Pintura de Henna: 3.000 Kz</p>
              <p>Aplicação de Cílios Normal: 10.000 Kz</p>
              <Link
                to="/agendar"
                className="mt-auto inline-block text-center bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 transition-all duration-300"
              >
                Agendar Agora
              </Link>
            </div>
          </div>

          {/* Cordoletes e Bobis */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={ServicoTranca}
                alt="Cordoletes e Bobis"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-[#A2672D] mb-2">Cordoletes e Bobis</h2>
              <p>Americano (Grossas): 15.000 Kz</p>
              <p>Americano (Médias): 20.000 Kz</p>
              <p>Americano (Finas): 25.000 Kz</p>
              <p>Bobi de Crianças (Grossas): 7.000 Kz</p>
              <p>Bobi de Crianças (Finas): 10.000 Kz</p>
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
