import { useState } from "react";
import { Link } from "react-router-dom"; 
// Importação do logo conforme o padrão que você definiu
import logoImg from "../../assets/img/LOGO.png";

export default function AgendamentosAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroServico, setFiltroServico] = useState("");
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");

  // DADOS FICTÍCIOS DE AGENDAMENTOS (MANTIDOS)
  const todosAgendamentos = [
    { id: 201, nomeCliente: "Esmeralda Mendes", servico: "Unhas de Gel", data: "2025-12-16", hora: "09:00", profissional: "Sofia", status: "Confirmado" },
    { id: 202, nomeCliente: "Adilson Ngola", servico: "Corte Masculino", data: "2025-12-16", hora: "10:00", profissional: "Pedro", status: "Confirmado" },
    { id: 203, nomeCliente: "Inês da Rocha", servico: "Relaxamento", data: "2025-12-17", hora: "14:30", profissional: "Sofia", status: "Pendente" },
    { id: 204, nomeCliente: "Mário João", servico: "Barba e Limpeza", data: "2025-12-17", hora: "16:00", profissional: "Pedro", status: "Cancelado" },
    { id: 205, nomeCliente: "Vitória Gouveia", servico: "Extensão Capilar", data: "2025-12-18", hora: "11:00", profissional: "Ana", status: "Concluído" },
    { id: 206, nomeCliente: "Luís Pereira", servico: "Massagem Terapêutica", data: "2025-12-18", hora: "13:30", profissional: "Ana", status: "Confirmado" },
    { id: 207, nomeCliente: "Carla Pires", servico: "Pintura + Secagem", data: "2025-12-19", hora: "15:30", profissional: "Sofia", status: "Pendente" },
  ];

  // LOGICA DE FILTRAGEM (MANTIDA)
  const agendamentosFiltrados = todosAgendamentos.filter(agendamento => {
    const buscaMatch = termoPesquisa.toLowerCase() === '' || 
                       agendamento.nomeCliente.toLowerCase().includes(termoPesquisa.toLowerCase()) || 
                       agendamento.servico.toLowerCase().includes(termoPesquisa.toLowerCase());
    const statusMatch = filtroStatus === '' || agendamento.status === filtroStatus;
    const dataMatch = dataSelecionada === '' || agendamento.data === dataSelecionada;
    return buscaMatch && statusMatch && dataMatch;
  });

  const handleEdit = (id) => alert(`Ação: Editar Agendamento ${id}`);
  const handleDelete = (id) => {
    if (window.confirm(`Tem certeza que deseja eliminar o agendamento ${id}?`)) {
      alert(`Ação: Agendamento ${id} Eliminado`);
    }
  };
  const handleAdd = () => alert("Ação: Abrir formulário para Novo Agendamento");
  const handleLogout = () => alert("Ação: Logout Realizado!");
  
  // Mapeamento de status para o seu novo padrão de cores
  const getStatusClasses = (status) => {
    switch (status) {
      case 'Confirmado': return 'bg-green-100 text-green-700';
      case 'Pendente': return 'bg-amber-100 text-amber-700';
      case 'Cancelado': return 'bg-red-100 text-red-700';
      case 'Concluído': return 'bg-blue-100 text-blue-700';
      default: return 'bg-stone-100 text-stone-700';
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex">

      {/* SIDEBAR (REESTILIZADO IGUAL AO DASHBOARD) */}
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

          {/* LOGO CIRCULAR MANTIDA */}
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
            <Link 
              to="/" 
              className="block p-3 rounded-lg hover:bg-stone-50 text-stone-600 hover:text-[#A2672D]"
            >
              <i className="fas fa-chart-line mr-3 w-5"></i>
              Dashboard
            </Link>

            <Link 
              to="/agendamentos/" 
              className="block p-3 rounded-lg bg-stone-100 border-l-4 border-[#A2672D] font-semibold text-[#A2672D]"
            >
              <i className="fas fa-calendar-check mr-3 w-5 text-[#A2672D]"></i>
              Agendamentos
            </Link>

            <Link 
              to="/servicos" 
              className="block p-3 rounded-lg hover:bg-stone-50 cursor-pointer text-stone-600 hover:text-[#A2672D] transition-colors"
            >
              <i className="fas fa-paint-brush mr-3 w-5 text-[#A2672D]"></i>
              Serviços
            </Link>

            <Link 
              to="/categorias" 
              className="block p-3 rounded-lg hover:bg-stone-50 cursor-pointer text-stone-600 hover:text-[#A2672D] transition-colors"
            >
              <i className="fas fa-tags mr-3 w-5 text-[#A2672D]"></i>
              Categorias
            </Link>

            <Link 
              to="/produtos" 
              className="block p-3 rounded-lg hover:bg-stone-50 cursor-pointer text-stone-600 hover:text-[#A2672D] transition-colors"
            >
              <i className="fas fa-box-open mr-3 w-5 text-[#A2672D]"></i>
              Produtos
            </Link>

            <Link 
              to="/encomendas" 
              className="block p-3 rounded-lg hover:bg-stone-50 cursor-pointer text-stone-600 hover:text-[#A2672D] transition-colors"
            >
              <i className="fas fa-shipping-fast mr-3 w-5 text-[#A2672D]"></i>
              Encomendas
            </Link>

            <Link 
              to="/equipe" 
              className="block p-3 rounded-lg hover:bg-stone-50 cursor-pointer text-stone-600 hover:text-[#A2672D] transition-colors"
            >
              <i className="fas fa-users-cog mr-3 w-5 text-[#A2672D]"></i>
              Equipe
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

      {/* BACKDROP MOBILE */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm md:hidden z-40" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 md:ml-64 overflow-y-auto"> 
        <header className="bg-white border-b border-stone-200 fixed top-0 right-0 left-0 md:left-64 h-16 flex items-center justify-between px-4 sm:px-6 shadow-sm z-30">
          <button className="md:hidden text-xl sm:text-2xl text-stone-600" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className="fas fa-bars"></i>
          </button>
          <h2 className="text-lg sm:text-xl font-medium tracking-wide text-stone-700">Gestão de Agendamentos</h2>
          <div className="flex items-center gap-4">
             <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#A2672D] rounded-full flex items-center justify-center">
                <i className="fas fa-user text-white text-base"></i>
              </div>
          </div>
        </header>

        <main className="mt-20 p-4 sm:p-6 space-y-8">
          <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h3 className="text-xl font-bold text-[#A2672D]">Lista de Agendamentos ({agendamentosFiltrados.length})</h3>
                <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-[#A2672D] text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md">
                    <i className="fas fa-plus"></i> Novo Agendamento
                </button>
            </div>

            {/* FILTROS (REESTILIZADOS) */}
            <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center mb-6 gap-4 flex-wrap">
              <div className="relative w-full sm:w-auto flex-1">
                <input
                  type="text"
                  placeholder="Pesquisar Cliente ou Serviço..."
                  value={termoPesquisa}
                  onChange={(e) => setTermoPesquisa(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-lg focus:ring-[#A2672D] focus:border-[#A2672D] text-stone-700"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"></i>
              </div>

              <select 
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="w-full sm:w-auto py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-700"
              >
                <option value="">Status (Todos)</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Pendente">Pendente</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>

              <input
                type="date"
                value={dataSelecionada}
                onChange={(e) => setDataSelecionada(e.target.value)}
                className="w-full sm:w-auto py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-700"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full w-full text-left border-collapse text-sm"> 
                <thead>
                  <tr className="text-[#A2672D] border-b border-stone-200">
                    <th className="p-3">ID</th>
                    <th className="p-3">Cliente</th>
                    <th className="p-3">Serviço</th>
                    <th className="p-3 text-center">Data/Hora</th>
                    <th className="p-3">Profissional</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="text-stone-600">
                  {agendamentosFiltrados.length > 0 ? (
                    agendamentosFiltrados.map((agendamento) => (
                      <tr key={agendamento.id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                        <td className="p-3 opacity-70">{agendamento.id}</td>
                        <td className="p-3 font-medium text-stone-800">{agendamento.nomeCliente}</td>
                        <td className="p-3">{agendamento.servico}</td>
                        <td className="p-3 text-center">
                          <div className="font-medium text-stone-700">{agendamento.data}</div>
                          <div className="text-xs font-bold text-[#A2672D]">{agendamento.hora}</div>
                        </td>
                        <td className="p-3">{agendamento.profissional}</td>
                        <td className="p-3 text-center">
                          <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusClasses(agendamento.status)}`}>
                            {agendamento.status}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center space-x-3 text-base">
                            <button className="text-[#A2672D] hover:opacity-70" onClick={() => handleEdit(agendamento.id)}><i className="fas fa-edit"></i></button>
                            <button className="text-red-500 hover:text-red-600" onClick={() => handleDelete(agendamento.id)}><i className="fas fa-trash-alt"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="7" className="p-6 text-center text-stone-400">Nenhum registro encontrado.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}