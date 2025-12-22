import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import ServicoBanner from "../../assets/img/service-estetica.jpg";
import ServicoEsteticas from "../../assets/img/service-estetica.jpg";
import ServicoRadio from "../../assets/img/service-estetica-radio.jpg";
import ServicoDrenagem from "../../assets/img/service-estetica-drenagem.jpg";
import ServicoHidro from "../../assets/img/service-estetica-hidro.jpg";
import ServicoCorporal from "../../assets/img/service-estetica-corporal.jpg";

export default function ServicoEstetica() {
  return (
    <>
      <title>Estética | Salão Mirashell</title>
      <Header />

      {/* Banner */}
      <section
        className="relative w-full h-96 md:h-160 flex items-center justify-center text-center text-white"
        style={{ backgroundImage: `url(${ServicoBanner})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/50"></div> {/* overlay */}
        <div className="relative z-10 px-4 md:px-8 max-w-3xl flex flex-col items-center justify-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-4">Tratamentos Estéticos</h3>
          <p className="text-lg md:text-xl mb-2">Realce sua beleza com técnicas modernas e resultados profissionais.</p>
          <p className="text-base md:text-lg max-w-2xl">Cuidado especializado para corpo e rosto.</p>
        </div>
      </section>

      {/* Serviços */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Radiofrequência */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={ServicoRadio}
                alt="Radiofrequência"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-[#A2672D] mb-2">Radiofrequência</h2>
              <p>8.000 Kz</p>
              <Link
                to="/agendar"
                className="mt-auto inline-block text-center bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 transition-all duration-300"
              >
                Agendar Agora
              </Link>
            </div>
          </div>

          {/* Drenagem Linfática Infantil */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={ServicoDrenagem}
                alt="Drenagem Linfática Infantil"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-[#A2672D] mb-2">Drenagem Linfática Infantil</h2>
              <p>20.000 Kz</p>
              <Link
                to="/agendar"
                className="mt-auto inline-block text-center bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 transition-all duration-300"
              >
                Agendar Agora
              </Link>
            </div>
          </div>

          {/* Hidrofacial */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={ServicoHidro}
                alt="Hidrofacial"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-[#A2672D] mb-2">Hidrofacial</h2>
              <p>25.000 Kz</p>
              <Link
                to="/agendar"
                className="mt-auto inline-block text-center bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 transition-all duration-300"
              >
                Agendar Agora
              </Link>
            </div>
          </div>

          {/* Corrente Russa */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={ServicoEsteticas}
                alt="Corrente Russa"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-[#A2672D] mb-2">Corrente Russa</h2>
              <p>8.000 Kz</p>
              <Link
                to="/agendar"
                className="mt-auto inline-block text-center bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 transition-all duration-300"
              >
                Agendar Agora
              </Link>
            </div>
          </div>

          {/* Desintoxicação Corporal */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
            <div className="h-64 w-full overflow-hidden">
              <img
                src={ServicoCorporal}
                alt="Desintoxicação Corporal"
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-semibold text-[#A2672D] mb-2">Desintoxicação Corporal</h2>
              <p>25.000 Kz</p>
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
