import { useState } from "react";
import { Link } from "react-router-dom"; 
// Importação do logo circular Mirashell
import logoImg from "../../assets/img/LOGO.png";

export default function EncomendasAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [ordenacao, setOrdenacao] = useState("data_desc");

  // DADOS FICTÍCIOS DE ENCOMENDAS
  const todasEncomendas = [
    { 
      id: 301, 
      cliente: "Maria Silva", 
      telefone: "923 123 456", 
      email: "maria.s@email.com", 
      endereco: "Rua X, nº 123", 
      data: "2025-12-10", 
      status: "Entregue", 
      produtos: ["Shampoo Nutritivo", "Esmalte"], 
      total: 12500 
    },
    { 
      id: 302, 
      cliente: "João Costa", 
      telefone: "911 000 777", 
      email: "joao.c@email.com", 
      endereco: "Av. Principal, Bloco 5", 
      data: "2025-12-12", 
      status: "Pendente", 
      produtos: ["Creme Corporal"], 
      total: 4500 
    },
    { 
      id: 303, 
      cliente: "Ana Mendes", 
      telefone: "945 999 888", 
      email: "ana.m@email.com", 
      endereco: "Bairro Z, Casa 4", 
      data: "2025-12-14", 
      status: "Enviada", 
      produtos: ["Kit Manicure", "Óleo Reparador"], 
      total: 20000 
    },
  ];
  
  const statusOpcoes = ["Pendente", "Enviada", "Entregue", "Cancelada"];

  // LÓGICA DE FILTRAGEM E ORDENAÇÃO
  let encomendasProcessadas = todasEncomendas.filter(encomenda => {
    const termo = termoPesquisa.toLowerCase();
    const buscaMatch = termo === '' || 
                       encomenda.cliente.toLowerCase().includes(termo) || 
                       encomenda.telefone.includes(termo) ||
                       encomenda.id.toString().includes(termo);
    const statusMatch = filtroStatus === '' || encomenda.status === filtroStatus;
    return buscaMatch && statusMatch;
  });

  encomendasProcessadas.sort((a, b) => {
    switch (ordenacao) {
      case 'data_desc': return new Date(b.data) - new Date(a.data);
      case 'total_desc': return b.total - a.total;
      case 'cliente_asc': return a.cliente.localeCompare(b.cliente);
      default: return 0;
    }
  });

  const handleGeneratePDF = (id) => alert(`Ação: Gerar PDF/Fatura da Encomenda ${id}`);
  const handleDelete = (id, cliente) => {
    if (window.confirm(`Tem certeza que deseja ELIMINAR a Encomenda ${id} do cliente ${cliente}? Esta ação é IRREVERSÍVEL.`)) {
      alert(`Ação: Encomenda ${id} ELIMINADA.`);
    }
  };
  const handleAdd = () => alert("Ação: Abrir formulário para Nova Encomenda Manual");
  const handleLogout = () => alert("Ação: Logout Realizado!");
  const formatarPreco = (preco) => `Kz ${preco.toLocaleString('pt-AO')}`;

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Entregue': return 'bg-green-600/30 text-green-300';
      case 'Enviada': return 'bg-blue-600/30 text-blue-300';
      case 'Pendente': return 'bg-yellow-600/30 text-yellow-300';
      case 'Cancelada': return 'bg-red-600/30 text-red-300';
      default: return 'bg-stone-600/30 text-stone-300';
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex">

      {/* SIDEBAR MIRASHELL */}
      <aside className={`bg-white border-r border-stone-200 w-64 fixed top-0 left-0 h-screen p-6 shadow-lg transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 z-50 flex flex-col justify-between overflow-y-auto`}>
        <div>
          <button className="md:hidden absolute top-4 right-4 text-2xl text-stone-600" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-times"></i>
          </button>

          {/* LOGO CIRCULAR */}
          <div className="flex flex-col items-center mb-10 mt-2">
            <div className="relative p-1 border-2 border-[#A2672D] rounded-full shadow-md overflow-hidden bg-white">
               <img src={logoImg} alt="MiraShell Logo" className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full" />
            </div>
            <span className="mt-3 font-bold text-[#A2672D] tracking-widest text-sm uppercase">Mirashell</span>
          </div>

          <nav className="space-y-4 text-lg text-stone-600">
            <Link to="/dashboard/admin" className="block p-3 rounded-lg hover:bg-stone-50"><i className="fas fa-chart-line mr-3 w-5 text-[#A2672D]"></i> Dashboard</Link>
            <Link to="/dashboard/agendamentos" className="block p-3 rounded-lg hover:bg-stone-50"><i className="fas fa-calendar-check mr-3 w-5 text-[#A2672D]"></i> Agendamentos</Link>
            <Link to="/servicos" className="block p-3 rounded-lg hover:bg-stone-50"><i className="fas fa-paint-brush mr-3 w-5 text-[#A2672D]"></i> Serviços</Link>
            <Link to="/categorias" className="block p-3 rounded-lg hover:bg-stone-50"><i className="fas fa-tags mr-3 w-5 text-[#A2672D]"></i> Categorias</Link>
            <Link to="/produtos" className="block p-3 rounded-lg hover:bg-stone-50"><i className="fas fa-box-open mr-3 w-5 text-[#A2672D]"></i> Produtos</Link>
            <Link to="/encomendas" className="block p-3 rounded-lg bg-stone-100 border-l-4 border-[#A2672D] font-semibold text-[#A2672D]"><i className="fas fa-shipping-fast mr-3 w-5"></i> Encomendas</Link>
            <Link to="/equipe" className="block p-3 rounded-lg hover:bg-stone-50"><i className="fas fa-users-cog mr-3 w-5 text-[#A2672D]"></i> Equipe</Link>
          </nav>
        </div>
        <button onClick={handleLogout} className="w-full mt-8 flex items-center p-3 rounded-lg bg-stone-50 border border-stone-200 hover:bg-stone-100 transition font-semibold text-[#A2672D]"><i className="fas fa-sign-out-alt mr-3 w-5"></i> Sair</button>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 md:ml-64 overflow-y-auto"> 
        <header className="bg-white border-b border-stone-200 fixed top-0 right-0 left-0 md:left-64 h-16 flex items-center justify-between px-6 shadow-sm z-30">
          <button className="md:hidden text-xl text-stone-600" onClick={() => setSidebarOpen(!sidebarOpen)}><i className="fas fa-bars"></i></button>
          <h2 className="text-lg font-light text-stone-800 tracking-wide">Gestão de Encomendas</h2>
          <div className="w-10 h-10 bg-[#A2672D] rounded-full flex items-center justify-center text-white"><i className="fas fa-user"></i></div>
        </header>

        <main className="mt-20 p-4 sm:p-6 space-y-8 sm:space-y-10">
          <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4 text-stone-900">
                <h3 className="text-2xl font-bold text-[#A2672D]">Lista de Encomendas ({todasEncomendas.length})</h3>
                <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-[#A2672D] text-white font-semibold rounded-lg hover:opacity-90 transition shadow-lg"><i className="fas fa-box-open"></i> Nova Encomenda</button>
            </div>

            {/* FILTROS E PESQUISA */}
            <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center mb-6 gap-4 flex-wrap">
              <div className="relative w-full sm:w-auto flex-1 min-w-50">
                <input
                  type="text"
                  placeholder="Pesquisar cliente, telefone ou ID..."
                  value={termoPesquisa}
                  onChange={(e) => setTermoPesquisa(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-lg focus:ring-[#A2672D] focus:border-[#A2672D] text-stone-800 placeholder-stone-400 transition-colors"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"></i>
              </div>

              <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} className="w-full sm:w-44 py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-[#A2672D] text-stone-700 cursor-pointer">
                <option value="">Status (Todos)</option>
                {statusOpcoes.map(status => <option key={status} value={status}>{status}</option>)}
              </select>

              <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)} className="w-full sm:w-44 py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-[#A2672D] text-stone-700 cursor-pointer">
                <option value="data_desc">Data (Recente)</option>
                <option value="total_desc">Valor (Maior)</option>
                <option value="cliente_asc">Cliente A-Z</option>
              </select>
              
              {(filtroStatus || termoPesquisa) && (
                  <button onClick={() => {setFiltroStatus(''); setTermoPesquisa(''); setOrdenacao('data_desc');}} className="px-3 py-2 bg-stone-200 rounded-lg text-stone-600 hover:bg-stone-300 transition-colors"><i className="fas fa-sync-alt mr-1"></i> Limpar</button>
              )}
            </div>

            {/* TABELA - ESTRUTURA ORIGINAL PRESERVADA */}
            <div className="overflow-x-auto">
              <table className="min-w-full w-full text-left border-collapse text-sm"> 
                <thead>
                  <tr className="text-[#A2672D] border-b border-stone-200">
                    <th className="p-3 whitespace-nowrap">ID</th>
                    <th className="p-3 whitespace-nowrap">Cliente</th>
                    <th className="p-3 whitespace-nowrap">Telefone</th>
                    <th className="p-3 whitespace-nowrap hidden lg:table-cell">E-mail</th>
                    <th className="p-3">Endereço</th>
                    <th className="p-3 whitespace-nowrap">Data</th>
                    <th className="p-3 whitespace-nowrap">Produtos</th>
                    <th className="p-3 whitespace-nowrap text-right">Total</th>
                    <th className="p-3 whitespace-nowrap text-center">Status</th>
                    <th className="p-3 text-center whitespace-nowrap">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {encomendasProcessadas.length > 0 ? (
                    encomendasProcessadas.map((encomenda) => (
                      <tr key={encomenda.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors text-stone-700">
                        <td className="p-3 opacity-70 whitespace-nowrap">{encomenda.id}</td>
                        <td className="p-3 font-medium whitespace-nowrap text-stone-900">{encomenda.cliente}</td>
                        <td className="p-3 whitespace-nowrap opacity-90">{encomenda.telefone}</td>
                        <td className="p-3 whitespace-nowrap opacity-70 hidden lg:table-cell text-xs">{encomenda.email}</td>
                        <td className="p-3 text-xs max-w-37.5 truncate opacity-80">{encomenda.endereco}</td>
                        <td className="p-3 whitespace-nowrap opacity-80">{encomenda.data}</td>
                        <td className="p-3 text-stone-500 text-xs">{encomenda.produtos.join(', ')}</td>
                        <td className="p-3 whitespace-nowrap font-bold text-[#A2672D] text-right">{formatarPreco(encomenda.total)}</td>
                        <td className="p-3 text-center whitespace-nowrap">
                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusClasses(encomenda.status)}`}>
                                {encomenda.status}
                            </span>
                        </td>
                        <td className="p-3 text-center whitespace-nowrap">
                          <div className="flex justify-center space-x-3 text-base">
                            <button className="text-blue-500 hover:text-blue-700 transition-colors" onClick={() => handleGeneratePDF(encomenda.id)} title="Gerar PDF / Fatura"><i className="fas fa-file-pdf"></i></button>
                            <button className="text-red-500 hover:text-red-700 transition-colors" onClick={() => handleDelete(encomenda.id, encomenda.cliente)} title="Eliminar Encomenda"><i className="fas fa-trash-alt"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="10" className="p-6 text-center text-stone-400">Nenhuma encomenda encontrada.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-6">
              <p className="text-stone-400 text-sm">Total de {todasEncomendas.length} Encomendas em Sistema</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}