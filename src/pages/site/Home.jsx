import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import mirachelVideo from "../../assets/video/mirachel_full.mp4";
import AboutImg from "../../assets/img/about.jpg";
import AboutIconImg1 from "../../assets/img/about-icon-1.png";
import AboutIconImg2 from "../../assets/img/about-icon-2.png";
import AboutIconImg3 from "../../assets/img/about-icon-3.png";
import ServiceHair from "../../assets/img/service-hair.jpg";
import ServicoPeruca from "../../assets/img/service-perucas.jpg";
import ServicoTrancas from "../../assets/img/service-trancas.jpg";
import ServicoEstetica from "../../assets/img/service-estetica.jpg";
import GaleriaBg from "../../assets/img/gallery.jpg";
import GaleriaImg1 from "../../assets/img/galeria1.jpg";
import GaleriaImg2 from "../../assets/img/galeria2.jpg";
import GaleriaImg3 from "../../assets/img/galeria3.jpg";
import GaleriaImg4 from "../../assets/img/galeria4.jpg";
import GaleriaImg5 from "../../assets/img/galeria5.jpg";
import GaleriaImg6 from "../../assets/img/galeria6.jpg";
import VisitBg from "../../assets/img/visit.png";

import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";

export default function Home() {
  return (
    <>
      <title>Salão Mirashell</title>
      <Header />

      {/* Home */}
      <section
        id="home"
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        <video
          src={mirachelVideo}
          loop
          autoPlay
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
          type="video/mp4"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-black/50 via-black/25 to-black/50" />
        <div className="relative z-10 text-center px-4 md:px-8 max-w-3xl text-white flex flex-col items-center gap-6 w-full">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Beleza que Inspira Confiança
          </h1>
          <p className="text-lg md:text-xl">
            Tratamentos exclusivos para realçar o melhor de você, todos os dias.
          </p>
          <Link
            to="/agendar"
            className="inline-block bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow-lg 
              hover:bg-[#5a4d3e] hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Agendar Agora
          </Link>
        </div>
      </section>

      {/* About */}
      <section id="sobre" className="py-20 bg-white w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#A2672D]">
          Sobre nós
        </h1>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row w-full items-center gap-10 px-4 md:px-8">
          <div className="flex-1 w-full">
            <img
              src={AboutImg}
              alt="Sobre nós"
              className="rounded-xl shadow-lg object-cover w-full h-full"
            />
          </div>
          <div className="flex-1 w-full flex flex-col gap-6">
            <h3 className="text-2xl font-semibold text-[#5a4d3e]">
              Somos um salão elegante
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Somos um salão dedicado a realçar a sua beleza com serviços profissionais, técnicas modernas e um atendimento focado em resultados naturais, seguros e de qualidade. Aqui, cada detalhe importa para que você se sinta confiante e valorizada.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4 w-full">
              <div className="flex flex-col items-center text-center gap-2">
                <img src={AboutIconImg1} alt="Ferramentas Profissionais" className="h-16 w-16 object-contain" />
                <h3 className="font-medium text-[#A2672D]">Ferramentas Profissionais</h3>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <img src={AboutIconImg2} alt="Equipamentos de Qualidade" className="h-16 w-16 object-contain" />
                <h3 className="font-medium text-[#A2672D]">Equipamentos de Qualidade</h3>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <img src={AboutIconImg3} alt="Cabelo Desejado" className="h-16 w-16 object-contain" />
                <h3 className="font-medium text-[#A2672D]">Cabelo Desejado</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-20 bg-gray-100 w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#A2672D]">
          Nossos Serviços
        </h1>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-8 w-full">
          {/* Serviço 1 */}
          <div className="flex flex-col md:flex-row items-stretch mb-12 rounded-lg shadow-lg overflow-hidden w-full">
            <div className="flex-1 w-full overflow-hidden">
              <img src={ServiceHair} alt="Cabeleireiro" className="w-full h-full object-cover md:rounded-l-lg rounded-t-lg transform transition-transform duration-300 hover:scale-90" />
            </div>
            <div className="flex-1 w-full bg-[#2a201c] text-white p-8 md:p-[6rem_2rem] flex flex-col justify-center items-center text-center md:text-left">
              <h3 className="text-3xl md:text-4xl mb-4">Cabeleireiro</h3>
              <p className="text-base md:text-lg leading-relaxed">
                Serviços profissionais para realçar sua beleza e estilo de forma única.
              </p>
              <Link to="/cabeleireiro" className="mt-6 inline-block bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 hover:shadow-xl transition-all duration-300 text-center">
                Ver mais
              </Link>
            </div>
          </div>

          {/* Serviço 2 */}
          <div className="flex flex-col md:flex-row items-stretch mb-12 rounded-lg shadow-lg overflow-hidden w-full">
            <div className="flex-1 w-full overflow-hidden">
              <img src={ServicoPeruca} alt="Extensões e Perucas" className="w-full h-full object-cover md:rounded-l-lg rounded-t-lg transform transition-transform duration-300 hover:scale-90" />
            </div>
            <div className="flex-1 w-full bg-[#2a201c] text-white p-8 md:p-[6rem_2rem] flex flex-col justify-center items-center text-center md:text-left">
              <h3 className="text-3xl md:text-4xl mb-4">Extensões e Perucas</h3>
              <p className="text-base md:text-lg leading-relaxed">
                Extensões e perucas de alta qualidade para transformar seu visual.
              </p>
              <Link to="/service-perucas" className="mt-6 inline-block bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 hover:shadow-xl transition-all duration-300 text-center">
                Ver mais
              </Link>
            </div>
          </div>

          {/* Serviço 3 */}
          <div className="flex flex-col md:flex-row items-stretch mb-12 rounded-lg shadow-lg overflow-hidden w-full">
            <div className="flex-1 w-full overflow-hidden">
              <img src={ServicoTrancas} alt="Tranças e Penteados" className="w-full h-full object-cover md:rounded-l-lg rounded-t-lg transform transition-transform duration-300 hover:scale-90" />
            </div>
            <div className="flex-1 w-full bg-[#2a201c] text-white p-8 md:p-[6rem_2rem] flex flex-col justify-center items-center text-center md:text-left">
              <h3 className="text-3xl md:text-4xl mb-4">Tranças e Penteados</h3>
              <p className="text-base md:text-lg leading-relaxed">
                Penteados elegantes e tranças personalizadas para todas as ocasiões.
              </p>
              <Link to="/service-trancas" className="mt-6 inline-block bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 hover:shadow-xl transition-all duration-300 text-center">
                Ver mais
              </Link>
            </div>
          </div>

          {/* Serviço 4 */}
          <div className="flex flex-col md:flex-row items-stretch mb-12 rounded-lg shadow-lg overflow-hidden w-full">
            <div className="flex-1 w-full overflow-hidden">
              <img src={ServicoEstetica} alt="Estética" className="w-full h-full object-cover md:rounded-l-lg rounded-t-lg transform transition-transform duration-300 hover:scale-90" />
            </div>
            <div className="flex-1 w-full bg-[#2a201c] text-white p-8 md:p-[6rem_2rem] flex flex-col justify-center items-center text-center md:text-left">
              <h3 className="text-3xl md:text-4xl mb-4">Estética</h3>
              <p className="text-base md:text-lg leading-relaxed">
                Tratamentos estéticos de qualidade para cuidado completo da sua beleza.
              </p>
              <Link to="/service-estetica" className="mt-6 inline-block bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 hover:shadow-xl transition-all duration-300 text-center">
                Ver mais
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section
        className="gallery bg-fixed px-4 py-20 w-full"
        id="galeria"
        style={{ backgroundImage: `url(${GaleriaBg})` }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#A2672D]">
          Nossa Galeria
        </h1>

        <LightGallery
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          elementClassNames="grid gap-8 grid-cols-[repeat(auto-fit,minmax(25rem,1fr))]"
        >
          <a href={GaleriaImg1} className="relative h-72 overflow-hidden group w-full">
            <img src={GaleriaImg1} alt="Galeria 1" className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <i className="fas fa-plus text-white text-[6rem]"></i>
            </div>
          </a>
          <a href={GaleriaImg2} className="relative h-72 overflow-hidden group w-full">
            <img src={GaleriaImg2} alt="Galeria 2" className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <i className="fas fa-plus text-white text-[6rem]"></i>
            </div>
          </a>
          <a href={GaleriaImg3} className="relative h-72 overflow-hidden group w-full">
            <img src={GaleriaImg3} alt="Galeria 3" className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <i className="fas fa-plus text-white text-[6rem]"></i>
            </div>
          </a>
          <a href={GaleriaImg4} className="relative h-72 overflow-hidden group w-full">
            <img src={GaleriaImg4} alt="Galeria 4" className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <i className="fas fa-plus text-white text-[6rem]"></i>
            </div>
          </a>
          <a href={GaleriaImg5} className="relative h-72 overflow-hidden group w-full">
            <img src={GaleriaImg5} alt="Galeria 5" className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <i className="fas fa-plus text-white text-[6rem]"></i>
            </div>
          </a>
          <a href={GaleriaImg6} className="relative h-72 overflow-hidden group w-full">
            <img src={GaleriaImg6} alt="Galeria 6" className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <i className="fas fa-plus text-white text-[6rem]"></i>
            </div>
          </a>
        </LightGallery>
      </section>

      {/* Fale Conosco */}
      <section
        className="visit relative py-20 bg-cover bg-center w-full"
        id="fale-conosco"
        style={{ backgroundImage: `url(${VisitBg})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-center mb-12 text-[#A2672D]">
          Fale Conosco
        </h1>
        <div className="relative z-10 flex flex-col md:flex-row flex-wrap w-full max-w-7xl mx-auto gap-8 px-4 md:px-8 justify-center">
          <form className="flex-1 min-w-160 border border-[#A2672D] p-8 md:p-10 flex flex-col w-full">
            <h3 className="text-2xl md:text-3xl text-center text-[#A2672D] pb-4 uppercase">
              Preencha e Envie o Formulário
            </h3>
            <div className="flex flex-col gap-6 mt-8 mb-8 w-full">
              <input type="text" placeholder="Seu nome" className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A2672D] bg-white" />
              <input type="email" placeholder="exemplo@gmail.com" className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A2672D] bg-white" />
              <input type="text" placeholder="Seu assunto" className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A2672D] bg-white" />
              <textarea placeholder="Sua mensagem" className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A2672D] resize-none bg-white h-37.5" />
            </div>
            <button type="button" className="w-full cursor-pointer bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 hover:shadow-xl transition-all duration-300">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </section>

      {/* Mapa */}
      <section className="mapa w-full m-0 p-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.743137128324!2d13.276269174142003!3d-8.995766992618421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a521fc061ae9735%3A0xa2241449a10c02b3!2sMirashell%20-%20Sal%C3%A3o%20de%20beleza!5e0!3m2!1spt-PT!2sao!4v1766308188636!5m2!1spt-PT!2sao"
          className="w-full h-100 border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <Footer />
    </>
  );
}
