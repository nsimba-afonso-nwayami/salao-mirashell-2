import { useState } from "react";
import { Link } from "react-router-dom"; 
import logoImg from "../../assets/img/LOGO.png"; // Importando seu logo

export default function ServicosAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [ordenacao, setOrdenacao] = useState("nome_asc");

  // DADOS FICTÍCIOS DE SERVIÇOS (Mantidos conforme seu código)
  const todosServicos = [
    { id: 1, nome: "Corte e Lavagem (Masculino)", preco: 3500, duracaoMin: 30, categoria: "Cabelo", ativo: true },
    { id: 2, nome: "Manicure Clássica", preco: 2000, duracaoMin: 45, categoria: "Unhas", ativo: true },
    { id: 3, nome: "Tranças Box Braid (Completo)", preco: 18000, duracaoMin: 180, categoria: "Cabelo", ativo: true },
    { id: 4, nome: "Massagem Relaxante (60min)", preco: 8000, duracaoMin: 60, categoria: "Estética", ativo: true },
    { id: 5, nome: "Pedicure VIP", preco: 4500, duracaoMin: 60, categoria: "Unhas", ativo: true },
    { id: 6, nome: "Coloração Raiz", preco: 6000, duracaoMin: 90, categoria: "Cabelo", ativo: true },
    { id: 7, nome: "Limpeza de Pele Profunda", preco: 7500, duracaoMin: 75, categoria: "Estética", ativo: false },
  ];
  
  const categorias = ["Cabelo", "Unhas", "Estética"];

  // LÓGICA DE FILTRAGEM E ORDENAÇÃO (Mantida intacta)
  let servicosProcessados = todosServicos.filter(servico => {
    const buscaMatch = termoPesquisa.toLowerCase() === '' || 
                       servico.nome.toLowerCase().includes(termoPesquisa.toLowerCase());
    const categoriaMatch = filtroCategoria === '' || servico.categoria === filtroCategoria;
    return buscaMatch && categoriaMatch;
  });

  servicosProcessados.sort((a, b) => {
    switch (ordenacao) {
      case 'nome_asc':
        return a.nome.localeCompare(b.nome);
      case 'preco_desc':
        return b.preco - a.preco;
      default:
        return 0;
    }
  });

  const handleEdit = (id) => alert(`Ação: Editar Serviço ${id}`);
  const handleDelete = (id) => {
    if (window.confirm(`Tem certeza que deseja desativar/eliminar o serviço ${id}?`)) {
      alert(`Ação: Serviço ${id} Eliminado`);
    }
  };
  const handleAdd = () => alert("Ação: Abrir formulário para Novo Serviço");
  const handleLogout = () => alert("Ação: Logout Realizado!");
  const formatarPreco = (preco) => `Kz ${preco.toLocaleString('pt-AO')}`;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex">

      {/* SIDEBAR - ESTRUTURA ORIGINAL COM ESTILO MIRASHELL */}
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

          {/* CONTAINER DA LOGO CIRCULAR (Como você definiu) */}
          <div className="flex flex-col items-center mb-10 mt-2">
            <div className="relative p-1 border-2 border-[#A2672D] rounded-full shadow-md overflow-hidden bg-white">
               <img 
                src={logoImg} 
                alt="MiraShell Logo" 
                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full" 
              />
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
            
            <Link 
              to="/servicos" 
              className="block p-3 rounded-lg bg-stone-100 border-l-4 border-[#A2672D] font-semibold text-[#A2672D]"
            >
              <i className="fas fa-paint-brush mr-3 w-5"></i> Serviços
            </Link>
            
            <Link to="/categorias" className="block p-3 rounded-lg hover:bg-stone-50 text-stone-600 hover:text-[#A2672D]">
              <i className="fas fa-tags mr-3 w-5 text-[#A2672D]"></i> Categorias
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
          className="w-full mt-8 flex items-center p-3 rounded-lg bg-white border border-stone-200 hover:bg-stone-50 transition font-semibold text-[#A2672D] text-lg shadow-sm"
        >
          <i className="fas fa-sign-out-alt mr-3 w-5"></i>
          Sair
        </button>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 md:ml-64 overflow-y-auto"> 
        <header className="bg-white border-b border-stone-200 fixed top-0 right-0 left-0 md:left-64 h-16 flex items-center justify-between px-4 sm:px-6 shadow-sm z-30">
          <button className="md:hidden text-xl text-stone-600" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className="fas fa-bars"></i>
          </button>
          <h2 className="text-lg font-medium text-stone-700">Gestão de Serviços</h2>
          <div className="flex items-center gap-3">
             <div className="w-9 h-9 bg-[#A2672D] rounded-full flex items-center justify-center text-white">
                <i className="fas fa-user"></i>
              </div>
          </div>
        </header>

        <main className="mt-20 p-4 sm:p-6 space-y-8">
          <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h3 className="text-xl font-bold text-[#A2672D]">Serviços Oferecidos ({servicosProcessados.length})</h3>
                <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-[#A2672D] text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md">
                    <i className="fas fa-plus"></i> Novo Serviço
                </button>
            </div>

            {/* FILTROS E PESQUISA (Original) */}
            <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center mb-6 gap-4 flex-wrap">
              <div className="relative w-full sm:w-auto flex-1">
                <input
                  type="text"
                  placeholder="Pesquisar nome do serviço..."
                  value={termoPesquisa}
                  onChange={(e) => setTermoPesquisa(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-lg text-stone-700"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"></i>
              </div>

              <select 
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="w-full sm:w-44 py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-700"
              >
                <option value="">Categoria (Todas)</option>
                {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select 
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
                className="w-full sm:w-44 py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-700"
              >
                <option value="nome_asc">Ordenar por: Nome A-Z</option>
                <option value="preco_desc">Ordenar por: Preço (Maior)</option>
              </select>
            </div>

            {/* TABELA (Estrutura mantida) */}
            <div className="overflow-x-auto">
              <table className="min-w-full w-full text-left border-collapse text-sm"> 
                <thead>
                  <tr className="text-[#A2672D] border-b border-stone-200">
                    <th className="p-3">ID</th>
                    <th className="p-3">Nome do Serviço</th>
                    <th className="p-3">Categoria</th>
                    <th className="p-3 text-right">Preço</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-stone-600">
                  {servicosProcessados.length > 0 ? (
                    servicosProcessados.map((servico) => (
                      <tr key={servico.id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                        <td className="p-3 opacity-70">{servico.id}</td>
                        <td className="p-3 font-medium text-stone-800">{servico.nome}</td>
                        <td className="p-3">{servico.categoria}</td>
                        <td className="p-3 text-right font-bold text-[#A2672D]">{formatarPreco(servico.preco)}</td>
                        <td className="p-3 text-center">
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            servico.ativo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {servico.ativo ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center space-x-3 text-base">
                            <button className="text-[#A2672D] hover:opacity-70" onClick={() => handleEdit(servico.id)}><i className="fas fa-edit"></i></button>
                            <button className="text-red-500 hover:text-red-400" onClick={() => handleDelete(servico.id)}>
                              <i className={`fas ${servico.ativo ? 'fa-trash-alt' : 'fa-undo'}`}></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="6" className="p-6 text-center text-stone-400">Nenhum serviço encontrado.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center text-stone-500 text-sm">
              <p>Mostrando {servicosProcessados.length} de {todosServicos.length} Serviços</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}