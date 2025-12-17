import { useState } from "react";
import { Link } from "react-router-dom"; 
import logoImg from "../../assets/img/LOGO.png";

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
    <div className="min-h-screen bg-stone-50 text-stone-800 flex">

      {/* SIDEBAR */}
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
          {/* BOTÃO FECHAR MOBILE */}
          <button
            className="md:hidden absolute top-4 right-4 text-2xl text-stone-600"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>

          {/* LOGO: MIRASHELL COM IMAGEM */}
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

          {/* MENU PRINCIPAL */}
          <nav className="space-y-4 text-lg">
            <Link 
              to="/" 
              className="block p-3 rounded-lg bg-stone-100 border-l-4 border-[#A2672D] font-semibold text-[#A2672D]"
            >
              <i className="fas fa-chart-line mr-3 w-5"></i>
              Dashboard
            </Link>

            <Link 
              to="/agendamentos/" 
              className="block p-3 rounded-lg hover:bg-stone-50 cursor-pointer text-stone-600 hover:text-[#A2672D] transition-colors"
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

        {/* BOTÃO LOGOUT */}
        <button 
          onClick={handleLogout}
          className="
            w-full mt-8 flex items-center p-3 rounded-lg 
            bg-white border border-stone-200 
            hover:bg-stone-50 
            transition duration-200 font-semibold 
            text-[#A2672D] text-lg shadow-sm
          "
        >
          <i className="fas fa-sign-out-alt mr-3 w-5"></i>
          Sair
        </button>
      </aside>

      {/* BACKDROP MOBILE */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 md:ml-64 overflow-y-auto"> 
        {/* HEADER */}
        <header
          className="
            bg-white border-b border-stone-200
            fixed top-0 right-0 left-0 md:left-64
            h-16 flex items-center justify-between px-4 sm:px-6 shadow-sm
            z-30
          "
        >
          <button
            className="md:hidden text-xl sm:text-2xl text-stone-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>

          <h2 className="text-lg sm:text-xl font-medium tracking-wide text-stone-700">
            Painel de Gestão Mirashell
          </h2>

          <div className="flex items-center gap-4 sm:gap-6">
            <button className="relative text-xl sm:text-2xl text-[#A2672D] hover:opacity-80 transition-all">
              <i className="fas fa-bell"></i>
              <span
                className="
                  absolute -top-1 -right-1 bg-red-500 text-white text-[10px]
                  w-4 h-4 rounded-full flex items-center justify-center font-bold
                "
              >
                3
              </span>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-stone-500 hidden sm:block">Admin</span>
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#A2672D] rounded-full flex items-center justify-center">
                <i className="fas fa-user text-white text-base"></i>
              </div>
            </div>
          </div>
        </header>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="mt-20 p-4 sm:p-6 space-y-8 sm:space-y-10">
          
          {/* CARDS DE ESTATÍSTICAS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            
            <div className="bg-white border border-stone-200 p-6 rounded-xl shadow-sm flex flex-col hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-stone-500 text-sm font-medium">Receita (Mês)</p>
                  <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-[#A2672D] truncate">{dadosEstatisticos.receitaMes}</h3>
                </div>
                <i className="fas fa-dollar-sign text-3xl sm:text-4xl text-[#A2672D] opacity-40 shrink-0"></i>
              </div>
              <p className="text-xs text-stone-400 mt-2 truncate">
                <i className="fas fa-info-circle mr-1"></i> Total de Vendas no Período
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-6 rounded-xl shadow-sm flex flex-col hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-stone-500 text-sm font-medium">Clientes Atendidos</p>
                  <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-stone-800 truncate">{dadosEstatisticos.clientesAtendidos}</h3>
                </div>
                <i className="fas fa-users text-3xl sm:text-4xl text-[#A2672D] opacity-40 shrink-0"></i>
              </div>
              <p className="text-xs text-stone-400 mt-2 truncate">
                <i className="fas fa-info-circle mr-1"></i> Quantidade Única no Mês
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-6 rounded-xl shadow-sm flex flex-col hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-stone-500 text-sm font-medium">Agendamentos Hoje</p>
                  <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-stone-800 truncate">{dadosEstatisticos.agendamentosHoje}</h3>
                </div>
                <i className="fas fa-calendar-check text-3xl sm:text-4xl text-[#A2672D] opacity-40 shrink-0"></i>
              </div>
              <p className="text-xs text-stone-500 mt-2 truncate font-medium">
                Próximo: <span className="text-[#A2672D]">{dadosEstatisticos.proximoAgendamento}</span>
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1"> 
            <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
              <h3 className="text-xl font-bold mb-4 text-[#A2672D]">Próximos Agendamentos</h3>
              <div className="space-y-3">
                {proximosAgendamentos.map((agendamento, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg hover:bg-stone-50 transition border-b border-stone-100 last:border-b-0">
                    <div>
                      <p className="font-semibold text-stone-700 truncate">{agendamento.nome}</p>
                      <p className="text-sm text-stone-500 truncate">{agendamento.servico}</p>
                    </div>
                    <span className="text-[#A2672D] font-bold shrink-0">{agendamento.hora}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="text-xl font-bold mb-4 text-[#A2672D]">Clientes Recentes</h3>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Pesquisar por nome ou serviço..."
                  className="w-full py-2 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-lg focus:ring-[#A2672D] focus:border-[#A2672D] text-stone-700 placeholder-stone-400 transition-colors"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"></i>
              </div>

              <div className="w-full sm:w-auto">
                <select 
                  className="w-full sm:w-44 py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-[#A2672D] focus:border-[#A2672D] text-stone-700 appearance-none pr-8 cursor-pointer"
                >
                  <option value="">Filtrar por Status</option>
                  <option value="ativa">Ativa</option>
                  <option value="frequente">Frequente</option>
                  <option value="novo">Novo</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-175 w-full text-left border-collapse text-sm"> 
                <thead>
                  <tr className="text-[#A2672D] border-b border-stone-200">
                    <th className="p-3 whitespace-nowrap">ID</th>
                    <th className="p-3 whitespace-nowrap">Nome</th>
                    <th className="p-3 whitespace-nowrap">Telefone</th>
                    <th className="p-3 whitespace-nowrap">Serviço Principal</th>
                    <th className="p-3 text-center whitespace-nowrap">Status</th>
                    <th className="p-3 text-center whitespace-nowrap">Ações</th>
                  </tr>
                </thead>

                <tbody className="text-stone-600">
                  {clientesRecentes.map((cliente) => (
                    <tr
                      key={cliente.id}
                      className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                    >
                      <td className="p-3 opacity-70 whitespace-nowrap">{cliente.id}</td>
                      <td className="p-3 font-medium text-stone-800 whitespace-nowrap">{cliente.nome}</td>
                      <td className="p-3 whitespace-nowrap">{cliente.telefone}</td>
                      <td className="p-3 whitespace-nowrap">{cliente.servico}</td>
                      <td className="p-3 text-center whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
                          cliente.status === 'Ativa' ? 'bg-green-100 text-green-700' :
                          cliente.status === 'Frequente' ? 'bg-blue-100 text-blue-700' :
                          'bg-[#A2672D]/10 text-[#A2672D]'
                        }`}>
                          {cliente.status}
                        </span>
                      </td>
                      <td className="p-3 text-center whitespace-nowrap">
                        <div className="flex justify-center space-x-3 text-base">
                          <button 
                            className="text-[#A2672D] hover:opacity-70 transition-colors"
                            onClick={() => handleEdit(cliente.id)}
                            title="Editar Cliente"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button 
                            className="text-red-500 hover:text-red-600 transition-colors"
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

            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
              <p className="text-stone-500 text-xs sm:text-sm">
                Mostrando 1 a 5 de {clientesRecentes.length} registros
              </p>
              
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-white border border-stone-200 rounded-lg text-[#A2672D] hover:bg-stone-50 shadow-sm">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="px-4 py-1 bg-[#A2672D] rounded-lg text-white font-bold shadow-sm">
                  1
                </button>
                <button className="px-4 py-1 bg-white border border-stone-200 rounded-lg text-stone-600 hover:bg-stone-50 shadow-sm">
                  2
                </button>
                <button className="px-3 py-1 bg-white border border-stone-200 rounded-lg text-[#A2672D] hover:bg-stone-50 shadow-sm">
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