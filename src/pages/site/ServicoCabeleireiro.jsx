import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import ServicoBanner from "../../assets/img/service-hair.jpg";
import ServicoTranca from "../../assets/img/service-hair-trancas.jpg";
import ServicoJuba from "../../assets/img/service-hair-juba.jpg";
import ServicoDesfriso from "../../assets/img/service-hair-desfriso.jpg";
import ServicoHidratacao from "../../assets/img/service-hair-hidratacao.jpg";
import ServicoVirada from "../../assets/img/service-hair-virada.jpg";
import ServicoMise from "../../assets/img/service-hair-mise.jpg";

export default function ServicoCabeleireiro() {
  return (
    <>
      <title>Cabeleireiro | Salão Mirashell</title>
      <Header />

      {/* Banner */}
      <section
        className="relative w-full h-96 md:h-160 flex items-center justify-center text-center text-white"
        style={{ backgroundImage: `url(${ServicoBanner})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/50"></div> {/* overlay */}
        <div className="relative z-10 px-4 md:px-8 max-w-3xl flex flex-col items-center justify-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-4">Cabeleireiro</h3>
          <p className="text-lg md:text-xl mb-2">Transforme o Seu Visual com Estilo e Confiança</p>
          <p className="text-base md:text-lg max-w-2xl">
            Cuidado profissional, técnicas modernas e resultados que valorizam a sua beleza.
          </p>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Tranças */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={ServicoTranca}
                alt="Tranças"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-[#A2672D] mb-2">Tranças</h2>
              <p>Manutenção: 8.000 Kz</p>
              <p>Tranças Grossas: 20.000 Kz</p>
              <p>Tranças Médias: 25.000 Kz</p>
              <p>Tranças Finas: 30.000 Kz</p>
              <Link
                to="/agendar"
                className="mt-auto inline-block text-center bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 transition-all duration-300"
              >
                Agendar Agora
              </Link>
            </div>
          </div>

          {/* Croche Juba */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={ServicoJuba}
                alt="Croche Juba"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-[#A2672D] mb-2">Croche Juba</h2>
              <p>Croche Juba: 25.000 Kz</p>
              <p>Tranças Mãos Finas: 28.000 Kz</p>
              <p>Tranças Mãos Finas: 18.000 Kz</p>
              <Link
                to="/agendar"
                className="mt-auto inline-block text-center bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 transition-all duration-300"
              >
                Agendar Agora
              </Link>
            </div>
          </div>

          {/* Todo Tipo de Apanhado */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={ServicoDesfriso}
                alt="Desfriso"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-[#A2672D] mb-2">Todo Tipo de Apanhado</h2>
              <p>Coque: 25.000 Kz</p>
              <p>Pochinho: 15.000 Kz</p>
              <Link
                to="/agendar"
                className="mt-auto inline-block text-center bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 transition-all duration-300"
              >
                Agendar Agora
              </Link>
            </div>
          </div>

          {/* Desfriso e Afro */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={ServicoDesfriso}
                alt="Desfriso e Afro"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-[#A2672D] mb-2">Desfriso e Afro</h2>
              <p>Cabelo Curto: 20.000 Kz</p>
              <p>Cabelo Pescoso: 25.000 Kz</p>
              <p>Cabelo Médio (Ombro): 30.000 Kz</p>
              <p>Cabelo Médio (Meia-Costa): 35.000 Kz</p>
              <p>Cabelo Comprido (Cintura): 45.000 Kz</p>
              <Link
                to="/agendar"
                className="mt-auto inline-block text-center bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 transition-all duration-300"
              >
                Agendar Agora
              </Link>
            </div>
          </div>

          {/* Hidratação e Reconstrução */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={ServicoHidratacao}
                alt="Hidratação e Reconstrução"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-[#A2672D] mb-2">Hidratação e Reconstrução (Cabelo Crespo)</h2>
              <p>Cabelo Curto: 15.000 Kz</p>
              <p>Cabelo Médio: 20.000 Kz</p>
              <p>Cabelo Comprido: 25.000 Kz</p>
              <p>Extra Longo: 30.000 Kz</p>
              <Link
                to="/agendar"
                className="mt-auto inline-block text-center bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 transition-all duration-300"
              >
                Agendar Agora
              </Link>
            </div>
          </div>

          {/* Viradas Americanas */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={ServicoVirada}
                alt="Viradas Americanas"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-[#A2672D] mb-2">Viradas Americanas</h2>
              <p>Grossas: 15.000 Kz</p>
              <p>Médias: 20.000 Kz</p>
              <p>Finas: 25.000 Kz</p>
              <Link
                to="/agendar"
                className="mt-auto inline-block text-center bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 transition-all duration-300"
              >
                Agendar Agora
              </Link>
            </div>
          </div>

          {/* Mise e Brushing */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={ServicoMise}
                alt="Mise e Brushing"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-[#A2672D] mb-2">Mise e Brushing</h2>
              <p>Cabelo Curto Nuca: 5.000 Kz</p>
              <p>Cabelo Médio (Pescoço): 6.000 Kz</p>
              <p>Cabelo Médio (Ombro): 8.000 Kz</p>
              <p>Cabelo Médio (Baixo-Ombro): 10.000 Kz</p>
              <p>Cabelo Comprido (Meia-Costa): 12.000 Kz</p>
              <p>Extra Longo: 15.000 Kz</p>
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
