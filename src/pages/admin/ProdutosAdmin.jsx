import { useState } from "react";
import { Link } from "react-router-dom"; 
// Importação do logo circular Mirashell
import logoImg from "../../assets/img/LOGO.png";

export default function ProdutosAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [ordenacao, setOrdenacao] = useState("nome_asc");

  // DADOS FICTÍCIOS DE PRODUTOS (Mantidos conforme seu código)
  const todosProdutos = [
    { id: 101, nome: "Shampoo Nutritivo (500ml)", preco: 4500, estoque: 15, categoria: "Cabelo", fornecedor: "Marca X", ativo: true },
    { id: 102, nome: "Condicionador Reconstrutor", preco: 3800, estoque: 8, categoria: "Cabelo", fornecedor: "Marca X", ativo: true },
    { id: 103, nome: "Esmalte Vermelho Fogo", preco: 1200, estoque: 35, categoria: "Unhas", fornecedor: "ColorNails", ativo: true },
    { id: 104, nome: "Creme Hidratante Corporal", preco: 6000, estoque: 5, categoria: "Estética", fornecedor: "BellaSpa", ativo: true },
    { id: 105, nome: "Óleo Reparador de Pontas", preco: 5500, estoque: 2, categoria: "Cabelo", fornecedor: "Marca X", ativo: false },
    { id: 106, nome: "Kit Manicure Completo", preco: 15000, estoque: 0, categoria: "Unhas", fornecedor: "ProTools", ativo: true },
  ];
  
  const categorias = ["Cabelo", "Unhas", "Estética"];

  // LÓGICA DE FILTRAGEM E ORDENAÇÃO (Mantida intacta)
  let produtosProcessados = todosProdutos.filter(produto => {
    const buscaMatch = termoPesquisa.toLowerCase() === '' || 
                       produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase());
    const categoriaMatch = filtroCategoria === '' || produto.categoria === filtroCategoria;
    return buscaMatch && categoriaMatch;
  });

  produtosProcessados.sort((a, b) => {
    switch (ordenacao) {
      case 'nome_asc': return a.nome.localeCompare(b.nome);
      case 'preco_desc': return b.preco - a.preco;
      case 'estoque_asc': return a.estoque - b.estoque;
      default: return 0;
    }
  });

  const handleEdit = (id) => alert(`Ação: Editar Produto ${id}`);
  const handleDelete = (id, nome) => {
    if (window.confirm(`Tem certeza que deseja ELIMINAR o produto "${nome}"? Esta ação é IRREVERSÍVEL.`)) {
      alert(`Ação: Produto ${nome} ELIMINADO.`);
    }
  };
  const handleAdd = () => alert("Ação: Abrir formulário para Novo Produto");
  const handleLogout = () => alert("Ação: Logout Realizado!");
  const formatarPreco = (preco) => `Kz ${preco.toLocaleString('pt-AO')}`;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex">

      {/* SIDEBAR COM ESTRUTURA E LINKS ORIGINAIS */}
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
          <button className="md:hidden absolute top-4 right-4 text-2xl text-stone-600" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-times"></i>
          </button>

          {/* LOGO CIRCULAR MIRASHELL */}
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
            <Link to="/categorias" className="block p-3 rounded-lg hover:bg-stone-50 text-stone-600 hover:text-[#A2672D]">
              <i className="fas fa-tags mr-3 w-5 text-[#A2672D]"></i> Categorias
            </Link>
            
            <Link 
              to="/produtos" 
              className="block p-3 rounded-lg bg-stone-100 border-l-4 border-[#A2672D] font-semibold text-[#A2672D]"
            >
              <i className="fas fa-box-open mr-3 w-5"></i> Produtos
            </Link>
            
            <Link to="/encomendas" className="block p-3 rounded-lg hover:bg-stone-50 text-stone-600 hover:text-[#A2672D]">
              <i className="fas fa-shipping-fast mr-3 w-5 text-[#A2672D]"></i> Encomendas
            </Link>
            <Link to="/equipe" className="block p-3 rounded-lg hover:bg-stone-50 text-stone-600 hover:text-[#A2672D]">
              <i className="fas fa-users-cog mr-3 w-5 text-[#A2672D]"></i> Equipe
            </Link>
          </nav>
        </div>

        <button onClick={handleLogout} className="w-full mt-8 flex items-center p-3 rounded-lg bg-white border border-stone-200 hover:bg-stone-50 transition font-semibold text-[#A2672D] text-lg shadow-sm">
          <i className="fas fa-sign-out-alt mr-3 w-5"></i> Sair
        </button>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 md:ml-64 overflow-y-auto"> 
        <header className="bg-white border-b border-stone-200 fixed top-0 right-0 left-0 md:left-64 h-16 flex items-center justify-between px-4 sm:px-6 shadow-sm z-30">
          <button className="md:hidden text-xl text-stone-600" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className="fas fa-bars"></i>
          </button>
          <h2 className="text-lg font-medium text-stone-700">Gestão de Produtos e Estoque</h2>
          <div className="w-10 h-10 bg-[#A2672D] rounded-full flex items-center justify-center text-white shadow-md">
            <i className="fas fa-user"></i>
          </div>
        </header>

        <main className="mt-20 p-4 sm:p-6 space-y-8">
          <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h3 className="text-xl font-bold text-[#A2672D]">Inventário ({produtosProcessados.length})</h3>
                <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-[#A2672D] text-white font-semibold rounded-lg hover:opacity-90 shadow-md transition-all">
                    <i className="fas fa-plus"></i> Novo Produto
                </button>
            </div>

            {/* BARRA DE PESQUISA, FILTROS E ORDENAÇÃO */}
            <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center mb-6 gap-4 flex-wrap">
              <div className="relative w-full sm:w-auto flex-1">
                <input
                  type="text"
                  placeholder="Pesquisar produto..."
                  value={termoPesquisa}
                  onChange={(e) => setTermoPesquisa(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-lg text-stone-700 placeholder-stone-400 focus:ring-[#A2672D] focus:border-[#A2672D]"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"></i>
              </div>

              <select 
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="w-full sm:w-44 py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-700"
              >
                <option value="">Categoria (Todas)</option>
                {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>

              <select 
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
                className="w-full sm:w-44 py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-700"
              >
                <option value="nome_asc">Nome A-Z</option>
                <option value="preco_desc">Preço (Maior)</option>
                <option value="estoque_asc">Estoque (Menor)</option>
              </select>
            </div>

            {/* TABELA DE PRODUTOS */}
            <div className="overflow-x-auto">
              <table className="min-w-full w-full text-left border-collapse text-sm"> 
                <thead>
                  <tr className="text-[#A2672D] border-b border-stone-200 uppercase tracking-wider text-xs font-bold">
                    <th className="p-3">ID</th>
                    <th className="p-3">Produto</th>
                    <th className="p-3">Categoria</th>
                    <th className="p-3 text-right">Preço</th>
                    <th className="p-3 text-center">Estoque</th>
                    <th className="p-3 text-center">Ações</th>
                  </tr>
                </thead>

                <tbody className="text-stone-600">
                  {produtosProcessados.length > 0 ? (
                    produtosProcessados.map((produto) => (
                      <tr key={produto.id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                        <td className="p-3 opacity-60">#{produto.id}</td>
                        <td className="p-3 font-medium text-stone-800">{produto.nome}</td>
                        <td className="p-3"><span className="bg-stone-100 px-2 py-1 rounded text-xs">{produto.categoria}</span></td>
                        <td className="p-3 text-right font-bold text-[#A2672D]">{formatarPreco(produto.preco)}</td>
                        <td className="p-3 text-center">
                            <span className={`font-bold ${produto.estoque <= 5 ? 'text-red-500' : 'text-stone-600'}`}>
                                {produto.estoque}
                            </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center space-x-3 text-base">
                            <button className="text-[#A2672D] hover:opacity-70" onClick={() => handleEdit(produto.id)}><i className="fas fa-edit"></i></button>
                            <button className="text-red-400 hover:text-red-600" onClick={() => handleDelete(produto.id, produto.nome)}><i className="fas fa-trash-alt"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="6" className="p-10 text-center text-stone-400 italic">Nenhum produto encontrado.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center text-stone-400 text-xs">
              <p>Total de {todosProdutos.length} produtos em sistema.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}