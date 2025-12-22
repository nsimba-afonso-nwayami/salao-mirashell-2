import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import VisitBg from "../../assets/img/visit.png";

export default function Agendar() {
  return (
    <>
      <title>Agendar | Salão Mirashell</title>
      <Header />

      <section
        className="visit relative pt-32 pb-20 bg-cover bg-center w-full"
        id="agendar"
        style={{ backgroundImage: `url(${VisitBg})` }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-center mb-12 text-[#A2672D]">
          Agendar Serviço
        </h1>

        <div className="relative z-10 flex flex-col md:flex-row flex-wrap w-full max-w-7xl mx-auto gap-8 px-4 md:px-8 justify-center">
          <form className="flex-1 w-full md:min-w-160 border border-[#A2672D] p-8 md:p-10 flex flex-col">
            <h3 className="text-2xl md:text-3xl text-center text-[#A2672D] pb-4 uppercase">
              Preencha os Dados do Agendamento
            </h3>

            <div className="flex flex-col gap-6 mt-8 mb-8 w-full">
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A2672D] bg-white"
              />

              <input
                type="email"
                placeholder="exemplo@gmail.com"
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A2672D] bg-white"
              />

              <select
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A2672D] bg-white"
              >
                <option value="">Selecione o serviço</option>
                <option value="cabeleireiro">Cabeleireiro</option>
                <option value="perucas">Extensões e Perucas</option>
                <option value="trancas">Tranças e Penteados</option>
                <option value="estetica">Estética</option>
              </select>

              <input
                type="date"
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A2672D] bg-white"
              />

              <input
                type="time"
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A2672D] bg-white"
              />

              <textarea
                placeholder="Observações"
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A2672D] resize-none bg-white h-37.5"
              />
            </div>

            <button
              type="button"
              className="w-full cursor-pointer bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Agendar Agora
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
