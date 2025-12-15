import { useState } from "react";
import { Link } from "react-router-dom"; 

export default function ProdutosAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [ordenacao, setOrdenacao] = useState("nome_asc"); // nome_asc, preco_desc, estoque_asc

  // DADOS FICTÍCIOS DE PRODUTOS
  const todosProdutos = [
    { id: 101, nome: "Shampoo Nutritivo (500ml)", preco: 4500, estoque: 15, categoria: "Cabelo", fornecedor: "Marca X", ativo: true },
    { id: 102, nome: "Condicionador Reconstrutor", preco: 3800, estoque: 8, categoria: "Cabelo", fornecedor: "Marca X", ativo: true },
    { id: 103, nome: "Esmalte Vermelho Fogo", preco: 1200, estoque: 35, categoria: "Unhas", fornecedor: "ColorNails", ativo: true },
    { id: 104, nome: "Creme Hidratante Corporal", preco: 6000, estoque: 5, categoria: "Estética", fornecedor: "BellaSpa", ativo: true },
    { id: 105, nome: "Óleo Reparador de Pontas", preco: 5500, estoque: 2, categoria: "Cabelo", fornecedor: "Marca X", ativo: false },
    { id: 106, nome: "Kit Manicure Completo", preco: 15000, estoque: 0, categoria: "Unhas", fornecedor: "ProTools", ativo: true },
  ];
  
  // Categorias disponíveis para o filtro
  const categorias = ["Cabelo", "Unhas", "Estética"];

  // LÓGICA DE FILTRAGEM E ORDENAÇÃO
  let produtosProcessados = todosProdutos.filter(produto => {
    // 1. Filtro de Pesquisa (Nome)
    const buscaMatch = termoPesquisa.toLowerCase() === '' || 
                       produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase());
    
    // 2. Filtro de Categoria
    const categoriaMatch = filtroCategoria === '' || produto.categoria === filtroCategoria;
    
    return buscaMatch && categoriaMatch;
  });

  // 3. Ordenação
  produtosProcessados.sort((a, b) => {
    switch (ordenacao) {
      case 'nome_asc':
        return a.nome.localeCompare(b.nome);
      case 'preco_desc':
        return b.preco - a.preco; // Preço maior primeiro
      case 'estoque_asc':
        return a.estoque - b.estoque; // Estoque menor primeiro
      default:
        return 0;
    }
  });

  // Funções de Ação (Stubs)
  const handleEdit = (id) => {
    alert(`Ação: Editar Produto ${id}`);
  };

  // Alterada para Eliminar (exclusão)
  const handleDelete = (id, nome) => {
    if (window.confirm(`Tem certeza que deseja ELIMINAR o produto "${nome}"? Esta ação é IRREVERSÍVEL.`)) {
      alert(`Ação: Produto ${nome} ELIMINADO.`);
    }
  };
  
  const handleAdd = () => {
    alert("Ação: Abrir formulário para Novo Produto");
  };

  const handleLogout = () => {
    alert("Ação: Logout Realizado!");
  };
  
  // Formata o preço para Kz (Kwanza)
  const formatarPreco = (preco) => {
    return `Kz ${preco.toLocaleString('pt-AO')}`;
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
            <Link to="/categorias" className="block p-3 rounded-lg hover:bg-stone-800/40 cursor-pointer">
              <i className="fas fa-tags mr-3 w-5 text-amber-400"></i> Categorias
            </Link>
            
            <Link 
              to="/produtos" 
              className="block p-3 rounded-lg bg-stone-800/60 border-l-4 border-amber-400 font-semibold text-amber-300" // ATIVO
            >
              <i className="fas fa-box-open mr-3 w-5"></i> Produtos
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
            Gestão de Produtos e Estoque
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

        {/* CONTEÚDO PRINCIPAL: TABELA DE PRODUTOS */}
        <main className="mt-20 p-4 sm:p-6 space-y-8 sm:space-y-10">
          
          <div className="bg-stone-900/30 border border-stone-800 rounded-xl shadow-xl backdrop-blur-md p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h3 className="text-2xl font-bold text-amber-400">Inventário de Produtos ({produtosProcessados.length})</h3>
                <button 
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors shadow-lg"
                >
                    <i className="fas fa-plus"></i>
                    Novo Produto
                </button>
            </div>

            {/* BARRA DE PESQUISA, FILTROS E ORDENAÇÃO */}
            <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center mb-6 gap-4 flex-wrap">
              
              {/* Pesquisa */}
              <div className="relative w-full sm:w-auto flex-1 min-w-50">
                <input
                  type="text"
                  placeholder="Pesquisar nome do produto..."
                  value={termoPesquisa}
                  onChange={(e) => setTermoPesquisa(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 bg-stone-800 border border-stone-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-white/90 placeholder-white/50 transition-colors"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"></i>
              </div>

              {/* Filtro por Categoria */}
              <select 
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="w-full sm:w-44 py-2 px-3 bg-stone-800 border border-stone-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-white/90 appearance-none pr-8 cursor-pointer"
              >
                <option value="">Categoria (Todas)</option>
                {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Ordenação */}
              <select 
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
                className="w-full sm:w-44 py-2 px-3 bg-stone-800 border border-stone-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-white/90 appearance-none pr-8 cursor-pointer"
              >
                <option value="nome_asc">Ordenar por: Nome A-Z</option>
                <option value="preco_desc">Ordenar por: Preço (Maior)</option>
                <option value="estoque_asc">Ordenar por: Estoque (Menor)</option>
              </select>
              
              {/* Botão de Limpar Filtros */}
              {(filtroCategoria || termoPesquisa) && (
                  <button 
                      onClick={() => {setFiltroCategoria(''); setTermoPesquisa(''); setOrdenacao('nome_asc');}}
                      className="px-3 py-2 bg-stone-700/50 rounded-lg text-white/70 hover:bg-stone-700 transition-colors"
                  >
                      <i className="fas fa-sync-alt mr-1"></i> Limpar
                  </button>
              )}
            </div>

            {/* TABELA START */}
            <div className="overflow-x-auto">
              <table className="min-w-full w-full text-left border-collapse text-sm"> 
                <thead>
                  <tr className="text-amber-300 border-b border-stone-800/70">
                    <th className="p-3 whitespace-nowrap">ID</th>
                    <th className="p-3 whitespace-nowrap">Nome do Produto</th>
                    <th className="p-3 whitespace-nowrap">Categoria</th>
                    {/* Fornecedor removido */}
                    <th className="p-3 whitespace-nowrap text-right">Preço Venda</th>
                    <th className="p-3 whitespace-nowrap text-center">Estoque</th>
                    {/* Status removido */}
                    <th className="p-3 text-center whitespace-nowrap">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {produtosProcessados.length > 0 ? (
                    produtosProcessados.map((produto) => (
                      <tr
                        key={produto.id}
                        className="border-b border-stone-800/40 hover:bg-stone-900/40 transition-colors"
                      >
                        <td className="p-3 opacity-70 whitespace-nowrap">{produto.id}</td>
                        <td className="p-3 font-medium whitespace-nowrap">{produto.nome}</td>
                        <td className="p-3 whitespace-nowrap opacity-90">{produto.categoria}</td>
                        {/* Célula Fornecedor removida */}
                        <td className="p-3 whitespace-nowrap font-bold text-amber-300 text-right">{formatarPreco(produto.preco)}</td>
                        <td className="p-3 whitespace-nowrap text-center">
                            {/* Mantendo o destaque de estoque baixo */}
                            <span className={`font-semibold ${
                                produto.estoque <= 5 ? 'text-red-400' : (produto.estoque <= 15 ? 'text-yellow-400' : 'text-green-400')
                            }`}>
                                {produto.estoque}
                            </span>
                        </td>
                        {/* Célula Status removida */}
                        
                        {/* COLUNA DE AÇÕES: Editar e Eliminar */}
                        <td className="p-3 text-center whitespace-nowrap">
                          <div className="flex justify-center space-x-3 text-base">
                            <button 
                              className="text-amber-400 hover:text-amber-300 transition-colors"
                              onClick={() => handleEdit(produto.id)}
                              title="Editar Produto"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            {/* Botão Eliminar */}
                            <button 
                              className="text-red-500 hover:text-red-400 transition-colors"
                              onClick={() => handleDelete(produto.id, produto.nome)}
                              title="Eliminar Produto"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-6 text-center text-white/60">
                        Nenhum produto encontrado com os filtros aplicados.
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
                Mostrando {produtosProcessados.length} de {todosProdutos.length} Produtos em Inventário
              </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}