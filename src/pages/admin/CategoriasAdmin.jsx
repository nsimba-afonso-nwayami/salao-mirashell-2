import { useState } from "react";
import { Link } from "react-router-dom"; 

export default function CategoriasAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  // DADOS FICTÍCIOS DE CATEGORIAS
  const todasCategorias = [
    { id: 10, nome: "Cabelo", descricao: "Serviços de corte, styling e tratamentos capilares.", servicosAssociados: 7, ativo: true },
    { id: 20, nome: "Unhas", descricao: "Manicure, pedicure e alongamento de unhas.", servicosAssociados: 4, ativo: true },
    { id: 30, nome: "Estética Facial", descricao: "Limpeza de pele, massagens faciais e sobrancelhas.", servicosAssociados: 3, ativo: true },
    { id: 40, nome: "Estética Corporal", descricao: "Massagens corporais e tratamentos de emagrecimento.", servicosAssociados: 2, ativo: true },
    { id: 50, nome: "Produtos", descricao: "Produtos para venda (shampoos, cremes, esmaltes).", servicosAssociados: 0, ativo: false },
  ];
  
  // LÓGICA DE FILTRAGEM
  const categoriasProcessadas = todasCategorias.filter(categoria => {
    // Filtro de Pesquisa (Busca em Nome e Descrição, mas só o nome é exibido)
    const termo = termoPesquisa.toLowerCase();
    return termo === '' || 
           categoria.nome.toLowerCase().includes(termo) || 
           categoria.descricao.toLowerCase().includes(termo);
  });

  // Funções de Ação (Stubs)
  const handleEdit = (id) => {
    alert(`Ação: Editar Categoria ${id}`);
  };

  const handleDelete = (id, nome) => {
    if (window.confirm(`Tem certeza que deseja ELIMINAR a categoria "${nome}"? Esta ação é IRREVERSÍVEL.`)) {
      alert(`Ação: Categoria ${nome} ELIMINADA.`);
    }
  };
  
  const handleAdd = () => {
    alert("Ação: Abrir formulário para Nova Categoria");
  };

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

          {/* MENU PRINCIPAL - ATUALIZANDO O ITEM ATIVO */}
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
            
            <Link 
              to="/categorias" 
              className="block p-3 rounded-lg bg-stone-800/60 border-l-4 border-amber-400 font-semibold text-amber-300" // ATIVO
            >
              <i className="fas fa-tags mr-3 w-5"></i> Categorias
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
            Gestão de Categorias
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

        {/* CONTEÚDO PRINCIPAL: TABELA DE CATEGORIAS */}
        <main className="mt-20 p-4 sm:p-6 space-y-8 sm:space-y-10">
          
          <div className="bg-stone-900/30 border border-stone-800 rounded-xl shadow-xl backdrop-blur-md p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h3 className="text-2xl font-bold text-amber-400">Estrutura de Categorias ({todasCategorias.length})</h3>
                <button 
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors shadow-lg"
                >
                    <i className="fas fa-plus"></i>
                    Nova Categoria
                </button>
            </div>

            {/* BARRA DE PESQUISA */}
            <div className="flex justify-start items-center mb-6 gap-4 w-full">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Pesquisar por nome ou descrição..."
                  value={termoPesquisa}
                  onChange={(e) => setTermoPesquisa(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 bg-stone-800 border border-stone-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-white/90 placeholder-white/50 transition-colors"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"></i>
              </div>
              
              {/* Botão de Limpar Pesquisa */}
              {termoPesquisa && (
                  <button 
                      onClick={() => setTermoPesquisa('')}
                      className="px-3 py-2 bg-stone-700/50 rounded-lg text-white/70 hover:bg-stone-700 transition-colors shrink-0"
                      title="Limpar pesquisa"
                  >
                      <i className="fas fa-sync-alt"></i>
                  </button>
              )}
            </div>

            {/* TABELA START (Ações atualizadas) */}
            <div className="overflow-x-auto">
              <table className="min-w-full w-full text-left border-collapse text-sm"> 
                <thead>
                  <tr className="text-amber-300 border-b border-stone-800/70">
                    <th className="p-3 whitespace-nowrap">ID</th>
                    <th className="p-3 whitespace-nowrap">Nome</th>
                    <th className="p-3 text-center whitespace-nowrap">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {categoriasProcessadas.length > 0 ? (
                    categoriasProcessadas.map((categoria) => (
                      <tr
                        key={categoria.id}
                        className="border-b border-stone-800/40 hover:bg-stone-900/40 transition-colors"
                      >
                        <td className="p-3 opacity-70 whitespace-nowrap">{categoria.id}</td>
                        <td className="p-3 font-medium whitespace-nowrap">{categoria.nome}</td>
                        
                        {/* COLUNA DE AÇÕES: Editar e Eliminar */}
                        <td className="p-3 text-center whitespace-nowrap">
                          <div className="flex justify-center space-x-3 text-base">
                            <button 
                              className="text-amber-400 hover:text-amber-300 transition-colors"
                              onClick={() => handleEdit(categoria.id)}
                              title="Editar Categoria"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            {/* Botão Eliminar */}
                            <button 
                              className="text-red-500 hover:text-red-400 transition-colors"
                              onClick={() => handleDelete(categoria.id, categoria.nome)}
                              title="Eliminar Categoria"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="p-6 text-center text-white/60">
                        Nenhuma categoria encontrada com o termo de pesquisa.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* TABLE END */}

            {/* Rodapé da Tabela */}
            <div className="flex justify-between items-center mt-6">
              <p className="opacity-70 text-sm">
                Total de {todasCategorias.length} Categorias
              </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}