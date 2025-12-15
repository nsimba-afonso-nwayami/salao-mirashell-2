import { useState } from "react";
import { Link } from "react-router-dom"; 

export default function NotFoundAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Ação de Logout (Stub)
  const handleLogout = () => {
    alert("Ação: Logout Realizado!");
  };
  
  return (
    <div className="min-h-screen bg-stone-950 text-white flex">

      {/* SIDEBAR (Reutilizado) */}
      <aside
        className={`
          bg-stone-900/40 backdrop-blur-xl border-r border-stone-800 
          w-64 fixed top-0 left-0 h-screen p-6 shadow-2xl
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
            className="md:hidden absolute top-4 right-4 text-2xl text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>

          {/* LOGO: MIRASHELL */}
          <h1 className="text-2xl font-bold mb-10 tracking-wide mt-6 md:mt-0 text-amber-400">
            <i className="fas fa-cut mr-2"></i> Mira<span className="text-white">shell</span>
          </h1>

          {/* MENU PRINCIPAL (Nenhum item ativo) */}
          <nav className="space-y-4 text-lg">
            <Link to="/dashboard/admin" className="block p-3 rounded-lg hover:bg-stone-800/40 cursor-pointer">
              <i className="fas fa-chart-line mr-3 w-5 text-amber-400"></i> Dashboard
            </Link>
            <Link to="/dashboard/agendamentos" className="block p-3 rounded-lg hover:bg-stone-800/40 cursor-pointer">
              <i className="fas fa-calendar-check mr-3 w-5 text-amber-400"></i> Agendamentos
            </Link>
            <Link to="/servicos" className="block p-3 rounded-lg hover:bg-stone-800/40 cursor-pointer">
              <i className="fas fa-paint-brush mr-3 w-5 text-amber-400"></i> Serviços
            </Link>
            <Link to="/categorias" className="block p-3 rounded-lg hover:bg-stone-800/40 cursor-pointer">
              <i className="fas fa-tags mr-3 w-5 text-amber-400"></i> Categorias
            </Link>
            <Link to="/produtos" className="block p-3 rounded-lg hover:bg-stone-800/40 cursor-pointer">
              <i className="fas fa-box-open mr-3 w-5 text-amber-400"></i> Produtos
            </Link>
            <Link to="/encomendas" className="block p-3 rounded-lg hover:bg-stone-800/40 cursor-pointer">
              <i className="fas fa-shipping-fast mr-3 w-5 text-amber-400"></i> Encomendas
            </Link>
            <Link to="/equipe" className="block p-3 rounded-lg hover:bg-stone-800/40 cursor-pointer">
              <i className="fas fa-users-cog mr-3 w-5 text-amber-400"></i> Equipe
            </Link>
          </nav>
        </div>

        {/* BOTÃO LOGOUT */}
        <button 
          onClick={handleLogout}
          className="
            w-full mt-8 flex items-center p-3 rounded-lg 
            bg-stone-800 border border-stone-700 
            hover:bg-stone-700/60 
            transition duration-200 font-semibold 
            text-amber-400 text-lg
          "
        >
          <i className="fas fa-sign-out-alt mr-3 w-5"></i>
          Sair
        </button>
      </aside>

      {/* BACKDROP MOBILE */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 md:ml-64 overflow-y-auto"> 
        {/* HEADER (Reutilizado) */}
        <header
          className="
            bg-stone-900/40 backdrop-blur-xl border-b border-stone-800
            fixed top-0 right-0 left-0 md:left-64
            h-16 flex items-center justify-between px-4 sm:px-6 shadow-xl
            z-30
          "
        >
          {/* Botão mobile para abrir o sidebar */}
          <button
            className="md:hidden text-xl sm:text-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>

          <h2 className="text-lg sm:text-xl font-light tracking-wide text-white/90">
            Erro de Navegação
          </h2>

          {/* Notificações + Perfil */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="relative text-xl sm:text-2xl text-amber-400 hover:text-amber-300 transition-all">
              <i className="fas fa-bell"></i>
              <span
                className="
                  absolute -top-1 -right-1 bg-red-600 text-white text-[10px]
                  w-4 h-4 rounded-full flex items-center justify-center font-bold
                "
              >
                3
              </span>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-sm opacity-80 hidden sm:block">Admin</span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-amber-600 rounded-full flex items-center justify-center">
                <i className="fas fa-user text-white text-base"></i>
              </div>
            </div>
          </div>
        </header>

        {/* CONTEÚDO PRINCIPAL: PÁGINA 404 */}
        <main className="mt-16 flex items-center justify-center h-[calc(100vh-4rem)] p-4 sm:p-6">
          <div className="text-center bg-stone-900/30 border border-stone-800 rounded-xl shadow-2xl backdrop-blur-md p-8 sm:p-12 max-w-lg w-full">
            
            <h1 className="text-9xl font-extrabold text-amber-500 mb-4">
              404
            </h1>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Página Não Encontrada
            </h2>
            
            <p className="text-lg text-white/80 mb-8">
              A rota que você tentou acessar não existe ou foi removida.
            </p>
            
            <Link
              to="/dashboard/admin"
              className="
                inline-flex items-center justify-center gap-2 
                px-6 py-3 bg-amber-600 text-white font-semibold 
                rounded-lg hover:bg-amber-700 transition-colors 
                shadow-lg shadow-amber-900/50 text-lg
              "
            >
              <i className="fas fa-arrow-left"></i>
              Voltar ao Dashboard
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}