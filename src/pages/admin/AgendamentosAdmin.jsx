import { useState } from "react";
import { Link } from "react-router-dom"; 

export default function AgendamentosAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroServico, setFiltroServico] = useState("");
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");

  // DADOS FICTÍCIOS DE AGENDAMENTOS (Mais detalhado que o Dashboard)
  const todosAgendamentos = [
    { id: 201, nomeCliente: "Esmeralda Mendes", servico: "Unhas de Gel", data: "2025-12-16", hora: "09:00", profissional: "Sofia", status: "Confirmado" },
    { id: 202, nomeCliente: "Adilson Ngola", servico: "Corte Masculino", data: "2025-12-16", hora: "10:00", profissional: "Pedro", status: "Confirmado" },
    { id: 203, nomeCliente: "Inês da Rocha", servico: "Relaxamento", data: "2025-12-17", hora: "14:30", profissional: "Sofia", status: "Pendente" },
    { id: 204, nomeCliente: "Mário João", servico: "Barba e Limpeza", data: "2025-12-17", hora: "16:00", profissional: "Pedro", status: "Cancelado" },
    { id: 205, nomeCliente: "Vitória Gouveia", servico: "Extensão Capilar", data: "2025-12-18", hora: "11:00", profissional: "Ana", status: "Concluído" },
    { id: 206, nomeCliente: "Luís Pereira", servico: "Massagem Terapêutica", data: "2025-12-18", hora: "13:30", profissional: "Ana", status: "Confirmado" },
    { id: 207, nomeCliente: "Carla Pires", servico: "Pintura + Secagem", data: "2025-12-19", hora: "15:30", profissional: "Sofia", status: "Pendente" },
  ];

  // LOGICA DE FILTRAGEM
  const agendamentosFiltrados = todosAgendamentos.filter(agendamento => {
    // 1. Filtro de Pesquisa (Nome/Serviço)
    const buscaMatch = termoPesquisa.toLowerCase() === '' || 
                       agendamento.nomeCliente.toLowerCase().includes(termoPesquisa.toLowerCase()) || 
                       agendamento.servico.toLowerCase().includes(termoPesquisa.toLowerCase());
    
    // 2. Filtro de Status
    const statusMatch = filtroStatus === '' || agendamento.status === filtroStatus;
    
    // 3. Filtro de Data
    const dataMatch = dataSelecionada === '' || agendamento.data === dataSelecionada;

    return buscaMatch && statusMatch && dataMatch;
  });


  // Funções de Ação (Apenas stubs para demonstração)
  const handleEdit = (id) => {
    alert(`Ação: Editar Agendamento ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Tem certeza que deseja eliminar o agendamento ${id}?`)) {
      alert(`Ação: Agendamento ${id} Eliminado`);
    }
  };
  
  const handleAdd = () => {
    alert("Ação: Abrir formulário para Novo Agendamento");
  };

  const handleLogout = () => {
    alert("Ação: Logout Realizado!");
  };
  
  // Função para mapear status para classes Tailwind
  const getStatusClasses = (status) => {
    switch (status) {
      case 'Confirmado':
        return 'bg-green-600/30 text-green-300';
      case 'Pendente':
        return 'bg-amber-600/30 text-amber-300';
      case 'Cancelado':
        return 'bg-red-600/30 text-red-300';
      case 'Concluído':
        return 'bg-blue-600/30 text-blue-300';
      default:
        return 'bg-stone-600/30 text-stone-300';
    }
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

          {/* MENU PRINCIPAL - ITENS ATUALIZADOS COM <Link> */}
          <nav className="space-y-4 text-lg">
            <Link 
              to="/dashboard/admin" 
              className="block p-3 rounded-lg hover:bg-stone-800/40 cursor-pointer"
            >
              <i className="fas fa-chart-line mr-3 w-5 text-amber-400"></i>
              Dashboard
            </Link>

            <Link 
              to="/dashboard/agendamentos" 
              className="block p-3 rounded-lg bg-stone-800/60 border-l-4 border-amber-400 font-semibold text-amber-300" // ATIVO
            >
              <i className="fas fa-calendar-check mr-3 w-5"></i>
              Agendamentos
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
            Gestão de Agendamentos
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

        {/* CONTEÚDO PRINCIPAL: TABELA DE AGENDAMENTOS */}
        <main className="mt-20 p-4 sm:p-6 space-y-8 sm:space-y-10">
          
          <div className="bg-stone-900/30 border border-stone-800 rounded-xl shadow-xl backdrop-blur-md p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h3 className="text-2xl font-bold text-amber-400">Lista de Agendamentos ({agendamentosFiltrados.length})</h3>
                <button 
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors shadow-lg"
                >
                    <i className="fas fa-plus"></i>
                    Novo Agendamento
                </button>
            </div>

            {/* BARRA DE PESQUISA E FILTROS */}
            <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center mb-6 gap-4 flex-wrap">
              
              {/* Pesquisa */}
              <div className="relative w-full sm:w-auto flex-1 min-w-62.5">
                <input
                  type="text"
                  placeholder="Pesquisar Cliente ou Serviço..."
                  value={termoPesquisa}
                  onChange={(e) => setTermoPesquisa(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 bg-stone-800 border border-stone-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-white/90 placeholder-white/50 transition-colors"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"></i>
              </div>

              {/* Filtro por Status */}
              <select 
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className="w-full sm:w-auto py-2 px-3 bg-stone-800 border border-stone-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-white/90 appearance-none pr-8 cursor-pointer"
              >
                <option value="">Status (Todos)</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Pendente">Pendente</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>

              {/* Filtro por Data */}
              <input
                type="date"
                value={dataSelecionada}
                onChange={(e) => setDataSelecionada(e.target.value)}
                className="w-full sm:w-auto py-2 px-3 bg-stone-800 border border-stone-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-white/90 cursor-pointer"
              />
              
              {/* Botão de Limpar Filtros */}
              {(filtroStatus || filtroServico || dataSelecionada || termoPesquisa) && (
                  <button 
                      onClick={() => {setFiltroStatus(''); setFiltroServico(''); setDataSelecionada(''); setTermoPesquisa('');}}
                      className="px-3 py-2 bg-stone-700/50 rounded-lg text-white/70 hover:bg-stone-700 transition-colors"
                  >
                      <i className="fas fa-sync-alt mr-1"></i> Limpar
                  </button>
              )}
            </div>

            {/* TABELA START (Adicionado overflow-x-auto) */}
            <div className="overflow-x-auto">
              <table className="min-w-full w-full text-left border-collapse text-sm"> 
                <thead>
                  <tr className="text-amber-300 border-b border-stone-800/70">
                    <th className="p-3 whitespace-nowrap">ID</th>
                    <th className="p-3 whitespace-nowrap">Cliente</th>
                    <th className="p-3 whitespace-nowrap">Serviço</th>
                    <th className="p-3 whitespace-nowrap">Data</th>
                    <th className="p-3 whitespace-nowrap">Hora</th>
                    <th className="p-3 whitespace-nowrap">Profissional</th>
                    <th className="p-3 text-center whitespace-nowrap">Status</th>
                    <th className="p-3 text-center whitespace-nowrap">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {agendamentosFiltrados.length > 0 ? (
                    agendamentosFiltrados.map((agendamento) => (
                      <tr
                        key={agendamento.id}
                        className="border-b border-stone-800/40 hover:bg-stone-900/40 transition-colors"
                      >
                        <td className="p-3 opacity-70 whitespace-nowrap">{agendamento.id}</td>
                        <td className="p-3 font-medium whitespace-nowrap">{agendamento.nomeCliente}</td>
                        <td className="p-3 whitespace-nowrap">{agendamento.servico}</td>
                        <td className="p-3 whitespace-nowrap">{agendamento.data}</td>
                        <td className="p-3 whitespace-nowrap font-bold text-amber-300">{agendamento.hora}</td>
                        <td className="p-3 whitespace-nowrap opacity-90">{agendamento.profissional}</td>
                        <td className="p-3 text-center whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusClasses(agendamento.status)}`}>
                            {agendamento.status}
                          </span>
                        </td>
                        {/* COLUNA DE AÇÕES */}
                        <td className="p-3 text-center whitespace-nowrap">
                          <div className="flex justify-center space-x-3 text-base">
                            <button 
                              className="text-amber-400 hover:text-amber-300 transition-colors"
                              onClick={() => handleEdit(agendamento.id)}
                              title="Editar Agendamento"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="text-red-500 hover:text-red-400 transition-colors"
                              onClick={() => handleDelete(agendamento.id)}
                              title="Eliminar Agendamento"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="p-6 text-center text-white/60">
                        Nenhum agendamento encontrado com os filtros aplicados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* TABLE END */}

            {/* PAGINAÇÃO (Simples) */}
            <div className="flex justify-between items-center mt-6">
              <p className="opacity-70 text-sm">
                Mostrando {agendamentosFiltrados.length} de {todosAgendamentos.length} Agendamentos
              </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}