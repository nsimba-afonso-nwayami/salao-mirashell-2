import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Footer() {
  return (
    <footer className="bg-[#A2672D] text-white">
      <div className="max-w-7xl mx-auto grid gap-8 px-4 md:px-8 grid-cols-1 md:grid-cols-3 py-12">
        {/* Box 1 */}
        <div>
          <h3 className="text-xl md:text-2xl py-3 font-semibold">
            Salão Mirashell
          </h3>
          <p className="text-base md:text-lg py-3 leading-relaxed">
            Cuide da sua beleza, eleve a sua auto estima e viva melhor!
          </p>
          <div className="flex flex-wrap mt-3 gap-3">
            <Link
              title="Facebook Mirashell"
              to="https://www.facebook.com/mirashellcabeleireirospa"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center text-[#A2672D] bg-white rounded-full text-xl hover:bg-[#5a4d3e] hover:text-white transition-all duration-300"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link
              title="Instagram Mirashell"
              to="https://www.instagram.com/mirashell_cabeleireiro_spa"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center text-[#A2672D] bg-white rounded-full text-xl hover:bg-[#5a4d3e] hover:text-white transition-all duration-300"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </Link>
            <Link
              title="Tiktok Mirashell"
              to="https://www.tiktok.com/@mirashell.cabeleir"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center text-[#A2672D] bg-white rounded-full text-xl hover:bg-[#5a4d3e] hover:text-white transition-all duration-300"
              rel="noopener noreferrer"
            >
              <i className="fab fa-tiktok"></i>
            </Link>
          </div>
        </div>

        {/* Box 2 */}
        <div>
          <h3 className="text-xl md:text-2xl py-3 font-semibold">
            Contato de Informação
          </h3>
          <Link
            to="tel:923698462"
            className="block text-base md:text-lg py-1 transition-all duration-300 hover:pl-3"
          >
            <i className="fas fa-phone pr-2"></i> +244 923698462
          </Link>
          <Link
            to="mailto:geral@mirashell.com"
            className="block text-base md:text-lg py-1 transition-all duration-300 hover:pl-3"
          >
            <i className="fas fa-envelope pr-2"></i> geral@mirashell.com
          </Link>
          <HashLink
            smooth
            to="/#localizacao"
            className="block text-base md:text-lg py-1 transition-all duration-300 hover:pl-3"
          >
            <i className="fas fa-map-marker-alt pr-2"></i> Kilamba, T22 8° andar
            Porta 81
          </HashLink>
        </div>

        {/* Box 3 */}
        <div>
          <h3 className="text-xl md:text-2xl py-3 font-semibold">
            Links Rápidos
          </h3>
          <Link
            to="/"
            className="block text-base md:text-lg py-1 transition-all duration-300 hover:pl-3"
          >
            <i className="fas fa-arrow-right pr-2"></i> Home
          </Link>
          <HashLink
            smooth
            to="/#sobre"
            className="block text-base md:text-lg py-1 transition-all duration-300 hover:pl-3"
          >
            <i className="fas fa-arrow-right pr-2"></i> Sobre
          </HashLink>
          <HashLink
            smooth
            to="/#servicos"
            className="block text-base md:text-lg py-1 transition-all duration-300 hover:pl-3"
          >
            <i className="fas fa-arrow-right pr-2"></i> Serviços
          </HashLink>
          <Link
            to="/agendar"
            className="block text-base md:text-lg py-1 transition-all duration-300 hover:pl-3"
          >
            <i className="fas fa-arrow-right pr-2"></i> Agendar
          </Link>
        </div>
      </div>

      {/* Crédito */}
      <div className="text-center text-base md:text-lg py-6 mt-6 border-t-2 border-white w-2/3 mx-auto">
        &copy; {new Date().getFullYear()} NWAYAMI | Todos os direitos
        reservados!
      </div>
    </footer>
  );
}
