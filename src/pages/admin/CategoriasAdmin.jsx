import { useState } from "react";
import { Link } from "react-router-dom"; 
// Importação do logo conforme o padrão Mirashell
import logoImg from "../../assets/img/LOGO.png";

export default function CategoriasAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  // DADOS FICTÍCIOS DE CATEGORIAS (Mantidos)
  const todasCategorias = [
    { id: 10, nome: "Cabelo", descricao: "Serviços de corte, styling e tratamentos capilares.", servicosAssociados: 7, ativo: true },
    { id: 20, nome: "Unhas", descricao: "Manicure, pedicure e alongamento de unhas.", servicosAssociados: 4, ativo: true },
    { id: 30, nome: "Estética Facial", descricao: "Limpeza de pele, massagens faciais e sobrancelhas.", servicosAssociados: 3, ativo: true },
    { id: 40, nome: "Estética Corporal", descricao: "Massagens corporais e tratamentos de emagrecimento.", servicosAssociados: 2, ativo: true },
    { id: 50, nome: "Produtos", descricao: "Produtos para venda (shampoos, cremes, esmaltes).", servicosAssociados: 0, ativo: false },
  ];
  
  // LÓGICA DE FILTRAGEM (Mantida)
  const categoriasProcessadas = todasCategorias.filter(categoria => {
    const termo = termoPesquisa.toLowerCase();
    return termo === '' || 
           categoria.nome.toLowerCase().includes(termo) || 
           categoria.descricao.toLowerCase().includes(termo);
  });

  // Funções de Ação (Mantidas)
  const handleEdit = (id) => alert(`Ação: Editar Categoria ${id}`);
  const handleDelete = (id, nome) => {
    if (window.confirm(`Tem certeza que deseja ELIMINAR a categoria "${nome}"? Esta ação é IRREVERSÍVEL.`)) {
      alert(`Ação: Categoria ${nome} ELIMINADA.`);
    }
  };
  const handleAdd = () => alert("Ação: Abrir formulário para Nova Categoria");
  const handleLogout = () => alert("Ação: Logout Realizado!");

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex">

      {/* SIDEBAR - ESTRUTURA E LINKS ORIGINAIS */}
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
          <button
            className="md:hidden absolute top-4 right-4 text-2xl text-stone-600"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>

          {/* LOGO: MIRASHELL PADRÃO */}
          <div className="flex flex-col items-center mb-10 mt-2">
            <div className="relative p-1 border-2 border-[#A2672D] rounded-full shadow-md overflow-hidden bg-white">
               <img src={logoImg} alt="MiraShell Logo" className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full" />
            </div>
            <span className="mt-3 font-bold text-[#A2672D] tracking-widest text-sm uppercase">Mirashell</span>
          </div>

          <nav className="space-y-4 text-lg">
            <Link to="/" className="block p-3 rounded-lg hover:bg-stone-50 text-stone-600 hover:text-[#A2672D]">
              <i className="fas fa-chart-line mr-3 w-5 text-[#A2672D]"></i> Dashboard
            </Link>
            <Link to="/agendamentos" className="block p-3 rounded-lg hover:bg-stone-50 text-stone-600 hover:text-[#A2672D]">
              <i className="fas fa-calendar-check mr-3 w-5 text-[#A2672D]"></i> Agendamentos
            </Link>
            <Link to="/servicos" className="block p-3 rounded-lg hover:bg-stone-50 text-stone-600 hover:text-[#A2672D]">
              <i className="fas fa-paint-brush mr-3 w-5 text-[#A2672D]"></i> Serviços
            </Link>
            
            <Link 
              to="/categorias" 
              className="block p-3 rounded-lg bg-stone-100 border-l-4 border-[#A2672D] font-semibold text-[#A2672D]"
            >
              <i className="fas fa-tags mr-3 w-5"></i> Categorias
            </Link>
            
            <Link to="/produtos" className="block p-3 rounded-lg hover:bg-stone-50 text-stone-600 hover:text-[#A2672D]">
              <i className="fas fa-box-open mr-3 w-5 text-[#A2672D]"></i> Produtos
            </Link>
            <Link to="/encomendas" className="block p-3 rounded-lg hover:bg-stone-50 text-stone-600 hover:text-[#A2672D]">
              <i className="fas fa-shipping-fast mr-3 w-5 text-[#A2672D]"></i> Encomendas
            </Link>
            <Link to="/equipe" className="block p-3 rounded-lg hover:bg-stone-50 text-stone-600 hover:text-[#A2672D]">
              <i className="fas fa-users-cog mr-3 w-5 text-[#A2672D]"></i> Equipe
            </Link>
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full mt-8 flex items-center p-3 rounded-lg bg-white border border-stone-200 hover:bg-stone-50 transition font-semibold text-[#A2672D] text-lg"
        >
          <i className="fas fa-sign-out-alt mr-3 w-5"></i>
          Sair
        </button>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 md:ml-64 overflow-y-auto"> 
        <header
          className="
            bg-white border-b border-stone-200
            fixed top-0 right-0 left-0 md:left-64
            h-16 flex items-center justify-between px-4 sm:px-6 shadow-sm
            z-30
          "
        >
          <button className="md:hidden text-xl text-stone-600" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className="fas fa-bars"></i>
          </button>

          <h2 className="text-lg sm:text-xl font-medium tracking-wide text-stone-700">
            Gestão de Categorias
          </h2>

          <div className="flex items-center gap-3">
            <span className="text-sm opacity-80 hidden sm:block text-stone-500 font-medium">Admin</span>
            <div className="w-10 h-10 bg-[#A2672D] rounded-full flex items-center justify-center text-white shadow-md">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </header>

        <main className="mt-20 p-4 sm:p-6 space-y-8">
          
          <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h3 className="text-xl font-bold text-[#A2672D]">Estrutura de Categorias ({todasCategorias.length})</h3>
                <button 
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-[#A2672D] text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md"
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
                  placeholder="Pesquisar categoria..."
                  value={termoPesquisa}
                  onChange={(e) => setTermoPesquisa(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-lg focus:ring-[#A2672D] focus:border-[#A2672D] text-stone-700 placeholder-stone-400"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"></i>
              </div>
              
              {termoPesquisa && (
                  <button 
                      onClick={() => setTermoPesquisa('')}
                      className="px-3 py-2 bg-stone-100 rounded-lg text-stone-500 hover:bg-stone-200 transition-colors shrink-0"
                      title="Limpar pesquisa"
                  >
                      <i className="fas fa-sync-alt"></i>
                  </button>
              )}
            </div>

            {/* TABELA DE CATEGORIAS */}
            <div className="overflow-x-auto">
              <table className="min-w-full w-full text-left border-collapse text-sm"> 
                <thead>
                  <tr className="text-[#A2672D] border-b border-stone-200 uppercase tracking-wider text-xs font-bold">
                    <th className="p-3">ID</th>
                    <th className="p-3">Nome</th>
                    <th className="p-3 text-center">Ações</th>
                  </tr>
                </thead>

                <tbody className="text-stone-600">
                  {categoriasProcessadas.length > 0 ? (
                    categoriasProcessadas.map((categoria) => (
                      <tr
                        key={categoria.id}
                        className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                      >
                        <td className="p-3 opacity-60">#{categoria.id}</td>
                        <td className="p-3 font-medium text-stone-800">{categoria.nome}</td>
                        
                        <td className="p-3 text-center">
                          <div className="flex justify-center space-x-3 text-base">
                            <button 
                              className="text-[#A2672D] hover:opacity-70 transition-colors"
                              onClick={() => handleEdit(categoria.id)}
                              title="Editar Categoria"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="text-red-400 hover:text-red-600 transition-colors"
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
                      <td colSpan="3" className="p-10 text-center text-stone-400 italic">
                        Nenhuma categoria encontrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex justify-between items-center text-stone-400 text-xs">
              <p>Total de {todasCategorias.length} categorias cadastradas.</p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}