import { useState } from "react";
import { Link } from "react-router-dom"; 

export default function DashboardAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // DADOS FICTÍCIOS
  const dadosEstatisticos = {
    receitaMes: "Kz 8.500.000",
    clientesAtendidos: 412,
    agendamentosHoje: 28,
    proximoAgendamento: "10:30 (Tranças Box Braid)",
  };

  const clientesRecentes = [
    { id: 101, nome: "Esmeralda Mendes", telefone: "923 123 456", servico: "Unhas de Gel", status: "Ativa" },
    { id: 102, nome: "Adilson Ngola", telefone: "910 987 654", servico: "Corte Masculino", status: "Novo" },
    { id: 103, nome: "Inês da Rocha", telefone: "937 555 111", servico: "Relaxamento", status: "Ativa" },
    { id: 104, nome: "Mário João", telefone: "940 333 222", servico: "Barba e Limpeza", status: "Ativa" },
    { id: 105, nome: "Vitória Gouveia", telefone: "951 678 901", servico: "Extensão Capilar", status: "Frequente" },
  ];

  const proximosAgendamentos = [
    { nome: "Pedro Silva", servico: "Pedicure VIP", hora: "09:00" },
    { nome: "Joana Freitas", servico: "Massagem Terapêutica", hora: "11:00" },
    { nome: "Carla Pires", servico: "Pintura + Secagem", hora: "15:30" },
  ];

  // Funções de Ação (Apenas stubs para demonstração)
  const handleEdit = (id) => {
    alert(`Ação: Editar Cliente ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Tem certeza que deseja eliminar o cliente ${id}?`)) {
      alert(`Ação: Cliente ${id} Eliminado`);
    }
  };

  const handleLogout = () => {
    alert("Ação: Logout Realizado!");
  };

  return (
    <div className="min-h-screen bg-stone-950 text-white flex">

      {/* SIDEBAR */}
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
              className="block p-3 rounded-lg bg-stone-800/60 border-l-4 border-amber-400 font-semibold text-amber-300"
            >
              <i className="fas fa-chart-line mr-3 w-5"></i>
              Dashboard
            </Link>

            <Link 
              to="/dashboard/admin/agendamentos/" 
              className="block p-3 rounded-lg hover:bg-stone-800/40 cursor-pointer"
            >
              <i className="fas fa-calendar-check mr-3 w-5 text-amber-400"></i>
              Agendamentos
            </Link>

            <Link 
              to="/servicos" 
              className="block p-3 rounded-lg hover:bg-stone-800/40 cursor-pointer"
            >
              <i className="fas fa-paint-brush mr-3 w-5 text-amber-400"></i>
              Serviços
            </Link>

            <Link 
              to="/categorias" 
              className="block p-3 rounded-lg hover:bg-stone-800/40 cursor-pointer"
            >
              <i className="fas fa-tags mr-3 w-5 text-amber-400"></i>
              Categorias
            </Link>

            <Link 
              to="/produtos" 
              className="block p-3 rounded-lg hover:bg-stone-800/40 cursor-pointer"
            >
              <i className="fas fa-box-open mr-3 w-5 text-amber-400"></i>
              Produtos
            </Link>

            <Link 
              to="/encomendas" 
              className="block p-3 rounded-lg hover:bg-stone-800/40 cursor-pointer"
            >
              <i className="fas fa-shipping-fast mr-3 w-5 text-amber-400"></i>
              Encomendas
            </Link>

            <Link 
              to="/equipe" 
              className="block p-3 rounded-lg hover:bg-stone-800/40 cursor-pointer"
            >
              <i className="fas fa-users-cog mr-3 w-5 text-amber-400"></i>
              Equipe
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
        {/* HEADER */}
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
            Painel de Gestão Mirashell
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
              <span className="text-sm opacity-80 hidden sm:block">Admin</span> {/* <-- ALTERADO AQUI */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-amber-600 rounded-full flex items-center justify-center">
                <i className="fas fa-user text-white text-base"></i>
              </div>
            </div>
          </div>
        </header>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="mt-20 p-4 sm:p-6 space-y-8 sm:space-y-10">
          
          {/* CARDS DE ESTATÍSTICAS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            
            {/* CARD 1: Receita do Mês */}
            <div className="bg-stone-900/40 border border-stone-800 backdrop-blur-xl p-6 rounded-xl shadow-xl flex flex-col hover:bg-stone-900/50 hover:scale-[1.02] transition-all cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/70 text-sm">Receita (Mês)</p>
                  <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-amber-400 truncate">{dadosEstatisticos.receitaMes}</h3>
                </div>
                <i className="fas fa-dollar-sign text-3xl sm:text-4xl text-amber-500 opacity-70 shrink-0"></i>
              </div>
              <p className="text-xs text-white/60 mt-2 truncate">
                <i className="fas fa-info-circle mr-1"></i> Total de Vendas no Período
              </p>
            </div>

            {/* CARD 2: Clientes Atendidos */}
            <div className="bg-stone-900/40 border border-stone-800 backdrop-blur-xl p-6 rounded-xl shadow-xl flex flex-col hover:bg-stone-900/50 hover:scale-[1.02] transition-all cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/70 text-sm">Clientes Atendidos</p>
                  <h3 className="text-2xl sm:text-3xl font-bold mt-1 truncate">{dadosEstatisticos.clientesAtendidos}</h3>
                </div>
                <i className="fas fa-users text-3xl sm:text-4xl text-amber-500 opacity-70 shrink-0"></i>
              </div>
              <p className="text-xs text-white/60 mt-2 truncate">
                <i className="fas fa-info-circle mr-1"></i> Quantidade Única no Mês
              </p>
            </div>

            {/* CARD 3: Agendamentos Hoje */}
            <div className="bg-stone-900/40 border border-stone-800 backdrop-blur-xl p-6 rounded-xl shadow-xl flex flex-col hover:bg-stone-900/50 hover:scale-[1.02] transition-all cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/70 text-sm">Agendamentos Hoje</p>
                  <h3 className="text-2xl sm:text-3xl font-bold mt-1 truncate">{dadosEstatisticos.agendamentosHoje}</h3>
                </div>
                <i className="fas fa-calendar-check text-3xl sm:text-4xl text-amber-500 opacity-70 shrink-0"></i>
              </div>
              <p className="text-xs text-white/60 mt-2 truncate">
                Próximo: {dadosEstatisticos.proximoAgendamento}
              </p>
            </div>
            
          </div>
          
          {/* PRÓXIMOS AGENDAMENTOS */}
          <div className="grid grid-cols-1"> 
            <div className="bg-stone-900/40 border border-stone-800 rounded-xl shadow-xl backdrop-blur-md p-4 sm:p-6">
              <h3 className="text-xl font-bold mb-4 text-amber-400">Próximos Agendamentos</h3>
              <div className="space-y-3">
                {proximosAgendamentos.map((agendamento, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg hover:bg-stone-800/50 transition border-b border-stone-800/40 last:border-b-0">
                    <div>
                      <p className="font-semibold truncate">{agendamento.nome}</p>
                      <p className="text-sm text-white/70 truncate">{agendamento.servico}</p>
                    </div>
                    <span className="text-amber-300 font-bold shrink-0">{agendamento.hora}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TABELA DE REGISTROS */}
          <div className="bg-stone-900/30 border border-stone-800 rounded-xl shadow-xl backdrop-blur-md p-4 sm:p-6">
            <h3 className="text-xl font-bold mb-4 text-amber-400">Clientes Recentes</h3>

            {/* PESQUISA E FILTRO LAYOUT (Responsivo) */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              {/* Barra de Pesquisa */}
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Pesquisar por nome ou serviço..."
                  className="w-full py-2 pl-10 pr-4 bg-stone-800 border border-stone-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-white/90 placeholder-white/50 transition-colors"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50"></i>
              </div>

              {/* Filtro por Status */}
              <div className="w-full sm:w-auto">
                <select 
                  className="w-full sm:w-44 py-2 px-3 bg-stone-800 border border-stone-700 rounded-lg focus:ring-amber-500 focus:border-amber-500 text-white/90 appearance-none pr-8 cursor-pointer"
                >
                  <option value="">Filtrar por Status</option>
                  <option value="ativa">Ativa</option>
                  <option value="frequente">Frequente</option>
                  <option value="novo">Novo</option>
                </select>
              </div>
            </div>

            {/* TABLE START (Adicionado overflow-x-auto para responsividade horizontal) */}
            <div className="overflow-x-auto">
              <table className="min-w-175 w-full text-left border-collapse text-sm"> 
                <thead>
                  <tr className="text-amber-300 border-b border-stone-800/70">
                    <th className="p-3 whitespace-nowrap">ID</th>
                    <th className="p-3 whitespace-nowrap">Nome</th>
                    <th className="p-3 whitespace-nowrap">Telefone</th>
                    <th className="p-3 whitespace-nowrap">Serviço Principal</th>
                    <th className="p-3 text-center whitespace-nowrap">Status</th>
                    <th className="p-3 text-center whitespace-nowrap">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {clientesRecentes.map((cliente) => (
                    <tr
                      key={cliente.id}
                      className="border-b border-stone-800/40 hover:bg-stone-900/40 transition-colors"
                    >
                      <td className="p-3 opacity-70 whitespace-nowrap">{cliente.id}</td>
                      <td className="p-3 font-medium whitespace-nowrap">{cliente.nome}</td>
                      <td className="p-3 whitespace-nowrap">{cliente.telefone}</td>
                      <td className="p-3 whitespace-nowrap">{cliente.servico}</td>
                      <td className="p-3 text-center whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-lg text-xs ${
                          cliente.status === 'Ativa' ? 'bg-green-600/30 text-green-300' :
                          cliente.status === 'Frequente' ? 'bg-blue-600/30 text-blue-300' :
                          'bg-amber-600/30 text-amber-300'
                        }`}>
                          {cliente.status}
                        </span>
                      </td>
                      {/* COLUNA DE AÇÕES */}
                      <td className="p-3 text-center whitespace-nowrap">
                        <div className="flex justify-center space-x-3 text-base">
                          <button 
                            className="text-amber-400 hover:text-amber-300 transition-colors"
                            onClick={() => handleEdit(cliente.id)}
                            title="Editar Cliente"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            className="text-red-500 hover:text-red-400 transition-colors"
                            onClick={() => handleDelete(cliente.id)}
                            title="Eliminar Cliente"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* TABLE END */}

            {/* PAGINAÇÃO (Responsiva) */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
              <p className="opacity-70 text-xs sm:text-sm">
                Mostrando 1 a 5 de {clientesRecentes.length} registros
              </p>
              
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-stone-900/40 border border-stone-800 rounded-lg text-amber-400 hover:bg-stone-800">
                  <i className="fas fa-chevron-left"></i>
                </button>

                <button className="px-4 py-1 bg-amber-600 rounded-lg text-white font-bold">
                  1
                </button>
                <button className="px-4 py-1 bg-stone-900/40 border border-stone-800 rounded-lg hover:bg-stone-800">
                  2
                </button>

                <button className="px-3 py-1 bg-stone-900/40 border border-stone-800 rounded-lg text-amber-400 hover:bg-stone-800">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}