import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useState } from "react";
import logo from "../../assets/img/LOGO.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClasses =
    "text-white hover:text-[#5a4d3e] transition-colors duration-200";

  return (
    <header className="fixed top-0 left-0 w-full bg-[#A2672D] z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">

        {/* Logo */}
        <Link to="/" className="flex items-center" title="MiraShell Logo">
          <div className="relative p-1 border-2 border-[#A2672D] rounded-full shadow-md bg-white">
            <img
              src={logo}
              alt="MiraShell Logo"
              className="w-14 h-14 object-cover rounded-full"
            />
          </div>
        </Link>

        {/* Navegação */}
        <nav
          className={`
            fixed top-20 right-0 h-[calc(100vh-5rem)] w-64 bg-[#A2672D]
            flex flex-col gap-6 p-6
            transform transition-transform duration-300
            md:static md:h-auto md:w-auto md:flex-row md:gap-8 md:p-0
            ${menuOpen ? "translate-x-0" : "translate-x-full"}
            md:translate-x-0
          `}
        >
          <Link to="/" className={linkClasses}>Início</Link>

          <HashLink smooth to="/#sobre" className={linkClasses}>
            Sobre
          </HashLink>

          <HashLink smooth to="/#servicos" className={linkClasses}>
            Serviços
          </HashLink>

          <HashLink smooth to="/#galeria" className={linkClasses}>
            Galeria
          </HashLink>

          <Link to="/agendar" className={linkClasses}>
            Agendar
          </Link>

          <Link to="/loja" className={linkClasses}>
            Loja
          </Link>

          <HashLink smooth to="/#fale-conosco" className={linkClasses}>
            Fale Connosco
          </HashLink>
        </nav>

        {/* Ícones */}
        <div className="flex items-center gap-4 text-white">
          <Link
            to="/auth/login"
            className="text-xl hover:text-[#5a4d3e] transition-colors duration-200"
          >
            <i className="fas fa-user"></i>
          </Link>

          {/* Botão menu mobile */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </div>
    </header>
  );
}
