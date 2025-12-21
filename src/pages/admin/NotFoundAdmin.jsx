import { useState } from "react";
import { Link } from "react-router-dom"; 
// Importação do logo circular Mirashell
import logoImg from "../../assets/img/LOGO.png";

export default function NotFoundAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    alert("Ação: Logout Realizado!");
  };
  
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex">

      {/* SIDEBAR MIRASHELL */}
      <aside
        className={`
          bg-white border-r border-stone-200 
          w-64 fixed top-0 left-0 h-screen p-6 shadow-lg
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}
          md:translate-x-0
          z-50 flex flex-col justify-between
          overflow-y-auto
        `}
      >
        <div>
          {/* BOTÃO FECHAR MOBILE */}
          <button
            className="md:hidden absolute top-4 right-4 text-2xl text-stone-600"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>

          {/* LOGO: MIRASHELL CIRCULAR */}
          <div className="flex flex-col items-center mb-10 mt-2">
            <div className="relative p-1 border-2 border-[#A2672D] rounded-full shadow-md overflow-hidden bg-white">
              <img 
                src={logoImg} 
                alt="MiraShell Logo" 
                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full" 
              />
            </div>
            <span className="mt-3 font-bold text-[#A2672D] tracking-widest text-sm uppercase">
              Mirashell
            </span>
          </div>

          {/* MENU PRINCIPAL */}
          <nav className="space-y-4 text-lg text-stone-600">
            <Link to="/dashboard/admin" className="block p-3 rounded-lg hover:bg-stone-50 transition-colors">
              <i className="fas fa-chart-line mr-3 w-5 text-[#A2672D]"></i> Dashboard
            </Link>
            <Link to="/dashboard/admin/agendamentos" className="block p-3 rounded-lg hover:bg-stone-50 transition-colors">
              <i className="fas fa-calendar-check mr-3 w-5 text-[#A2672D]"></i> Agendamentos
            </Link>
            <Link to="/dashboard/admin/servicos" className="block p-3 rounded-lg hover:bg-stone-50 transition-colors">
              <i className="fas fa-paint-brush mr-3 w-5 text-[#A2672D]"></i> Serviços
            </Link>
            <Link to="/dashboard/admin/categorias" className="block p-3 rounded-lg hover:bg-stone-50 transition-colors">
              <i className="fas fa-tags mr-3 w-5 text-[#A2672D]"></i> Categorias
            </Link>
            <Link to="/dashboard/admin/produtos" className="block p-3 rounded-lg hover:bg-stone-50 transition-colors">
              <i className="fas fa-box-open mr-3 w-5 text-[#A2672D]"></i> Produtos
            </Link>
            <Link to="/dashboard/admin/encomendas" className="block p-3 rounded-lg hover:bg-stone-50 transition-colors">
              <i className="fas fa-shipping-fast mr-3 w-5 text-[#A2672D]"></i> Encomendas
            </Link>
            <Link to="/dashboard/admin/equipe" className="block p-3 rounded-lg hover:bg-stone-50 transition-colors">
              <i className="fas fa-users-cog mr-3 w-5 text-[#A2672D]"></i> Equipe
            </Link>
          </nav>
        </div>

        {/* BOTÃO LOGOUT */}
        <button 
          onClick={handleLogout}
          className="
            w-full mt-8 flex items-center p-3 rounded-lg 
            bg-stone-50 border border-stone-200 
            hover:bg-stone-100 
            transition duration-200 font-semibold 
            text-[#A2672D] text-lg
          "
        >
          <i className="fas fa-sign-out-alt mr-3 w-5"></i>
          Sair
        </button>
      </aside>

      {/* BACKDROP MOBILE */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 md:ml-64 overflow-y-auto"> 
        {/* HEADER */}
        <header
          className="
            bg-white border-b border-stone-200
            fixed top-0 right-0 left-0 md:left-64
            h-16 flex items-center justify-between px-6 shadow-sm
            z-30
          "
        >
          <button
            className="md:hidden text-xl text-stone-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>

          <h2 className="text-lg font-light tracking-wide text-stone-800">
            Navegação Interrompida
          </h2>

          <div className="w-10 h-10 bg-[#A2672D] rounded-full flex items-center justify-center text-white font-bold shadow-md">
            A
          </div>
        </header>

        {/* CONTEÚDO PRINCIPAL: PÁGINA 404 */}
        <main className="mt-16 flex items-center justify-center h-[calc(100vh-4rem)] p-4 sm:p-6">
          <div className="text-center bg-white border border-stone-200 rounded-2xl shadow-xl p-8 sm:p-12 max-w-lg w-full">
            
            <div className="mb-6">
              <i className="fas fa-compass text-6xl text-stone-200 mb-4 block"></i>
              <h1 className="text-8xl font-black text-[#A2672D] mb-2">
                404
              </h1>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-stone-800 uppercase tracking-tight">
              Página Não Encontrada
            </h2>
            
            <p className="text-stone-500 mb-10 leading-relaxed">
              Ups! Parece que seguiu um caminho inexistente. A página que procura pode ter sido movida ou nunca existiu.
            </p>
            
            <Link
              to="/dashboard/admin"
              className="
                inline-flex items-center justify-center gap-3 
                px-8 py-3 bg-[#A2672D] text-white font-bold 
                rounded-xl hover:opacity-90 transition-all 
                shadow-lg shadow-stone-200 text-lg
              "
            >
              <i className="fas fa-home"></i>
              Voltar ao Início
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}