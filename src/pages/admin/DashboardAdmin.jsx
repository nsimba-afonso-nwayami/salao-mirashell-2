import AdminLayout from "./components/AdminLayout";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../../services/dashboardService";

export default function DashboardAdmin() {
  const [loading, setLoading] = useState(true);
  const [dadosEstatisticos, setDadosEstatisticos] = useState({
    receitaMes: "—",
    totalEncomendas: 0,
    agendamentosHoje: 0,
    agendamentosPendentes: 0,
    servicos: 0,
    produtos: 0,
    profissionais: 0,
    categorias: 0,
    proximoAgendamento: "—",
  });

  const [proximosAgendamentos, setProximosAgendamentos] = useState([]);

  useEffect(() => {
    async function carregarDashboard() {
      try {
        setLoading(true);
        const data = await getDashboardStats();

        setDadosEstatisticos({
          receitaMes: "—",
          totalEncomendas: data.counts.encomendas,
          agendamentosHoje: data.counts.agendamentosHoje,
          agendamentosPendentes: data.counts.totalPendentes,
          servicos: data.counts.servicos,
          produtos: data.counts.produtos,
          profissionais: data.counts.profissionais,
          categorias: data.counts.categorias,
          proximoAgendamento: data.proximoAgendamento
            ? `${data.proximoAgendamento.hora} (${data.proximoAgendamento.servico_nome})`
            : "Nenhum agendamento",
        });

        setProximosAgendamentos(data.agendamentos.slice(0, 5));
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarDashboard();
  }, []);

  return (
    <>
      <title>Dashboard Mirashell</title>
      <AdminLayout title="Painel de Gestão Mirashell">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {/* Receita */}
          <div className="bg-white border border-stone-200 p-6 rounded-xl shadow-sm flex flex-col hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-stone-500 text-sm font-medium">
                  Receita (Mês)
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-[#A2672D]">
                  {dadosEstatisticos.receitaMes}
                </h3>
              </div>
              <i className="fas fa-dollar-sign text-3xl text-[#A2672D] opacity-40"></i>
            </div>
          </div>

          {/* Encomendas */}
          <Link
            to="/dashboard/admin/encomendas"
            className="bg-white border border-stone-200 p-6 rounded-xl shadow-sm flex flex-col hover:shadow-md hover:scale-[1.01] transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-stone-500 text-sm font-medium">
                  Total Encomendas
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-stone-800">
                  {dadosEstatisticos.totalEncomendas}
                </h3>
              </div>
              <i className="fas fa-box text-3xl text-[#A2672D] opacity-40"></i>
            </div>
            <p className="text-xs text-stone-400 mt-2">
              Gerir pedidos de produtos
            </p>
          </Link>

          {/* Agendamentos Pendentes (Geral) */}
          <Link
            to="/dashboard/admin/agendamentos"
            className="bg-white border border-stone-200 p-6 rounded-xl shadow-sm flex flex-col hover:shadow-md hover:scale-[1.01] transition-all border-l-4 border-l-[#A2672D]"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-stone-500 text-sm font-medium">
                  Total Pendentes
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-stone-800">
                  {dadosEstatisticos.agendamentosPendentes}
                </h3>
              </div>
              <i className="fas fa-clock text-3xl text-[#A2672D] opacity-40"></i>
            </div>
            <p className="text-xs text-stone-400 mt-2">
              Todos os agendamentos em espera
            </p>
          </Link>

          {/* Agendamentos de Hoje */}
          <Link
            to="/dashboard/admin/agendamentos"
            className="bg-white border border-stone-200 p-6 rounded-xl shadow-sm flex flex-col hover:shadow-md hover:scale-[1.01] transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-stone-500 text-sm font-medium">
                  Agendamentos Hoje
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-stone-800">
                  {dadosEstatisticos.agendamentosHoje}
                </h3>
              </div>
              <i className="fas fa-calendar-check text-3xl text-[#A2672D] opacity-40"></i>
            </div>
            <p className="text-xs text-stone-500 mt-2 font-medium italic truncate">
              Próximo:{" "}
              <span className="text-[#A2672D]">
                {dadosEstatisticos.proximoAgendamento}
              </span>
            </p>
          </Link>

          {/* Serviços */}
          <Link
            to="/dashboard/admin/servicos"
            className="bg-white border border-stone-200 p-6 rounded-xl shadow-sm flex flex-col hover:shadow-md hover:scale-[1.01] transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-stone-500 text-sm font-medium">Serviços</p>
                <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-stone-800">
                  {dadosEstatisticos.servicos}
                </h3>
              </div>
              <i className="fas fa-cut text-3xl text-[#A2672D] opacity-40"></i>
            </div>
          </Link>

          {/* Produtos */}
          <Link
            to="/dashboard/admin/produtos"
            className="bg-white border border-stone-200 p-6 rounded-xl shadow-sm flex flex-col hover:shadow-md hover:scale-[1.01] transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-stone-500 text-sm font-medium">Produtos</p>
                <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-stone-800">
                  {dadosEstatisticos.produtos}
                </h3>
              </div>
              <i className="fas fa-shopping-bag text-3xl text-[#A2672D] opacity-40"></i>
            </div>
          </Link>

          {/* Profissionais */}
          <Link
            to="/dashboard/admin/equipe"
            className="bg-white border border-stone-200 p-6 rounded-xl shadow-sm flex flex-col hover:shadow-md hover:scale-[1.01] transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-stone-500 text-sm font-medium">
                  Profissionais
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-stone-800">
                  {dadosEstatisticos.profissionais}
                </h3>
              </div>
              <i className="fas fa-user-tie text-3xl text-[#A2672D] opacity-40"></i>
            </div>
          </Link>

          {/* Categorias */}
          <Link
            to="/dashboard/admin/categorias"
            className="bg-white border border-stone-200 p-6 rounded-xl shadow-sm flex flex-col hover:shadow-md hover:scale-[1.01] transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-stone-500 text-sm font-medium">Categorias</p>
                <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-stone-800">
                  {dadosEstatisticos.categorias}
                </h3>
              </div>
              <i className="fas fa-tags text-3xl text-[#A2672D] opacity-40"></i>
            </div>
          </Link>
        </div>

        {/* LISTA LATERAL ABAIXO */}
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#A2672D]">
              Lista de Espera Pendente
            </h3>
            <Link
              to="/dashboard/admin/agendamentos"
              className="text-sm font-semibold text-[#A2672D] hover:underline"
            >
              Ver todos <i className="fas fa-arrow-right ml-1"></i>
            </Link>
          </div>
          {/* Mapeamento dos agendamentos pendentes aqui... (mesma lógica anterior) */}
          <div className="space-y-3">
            {loading ? (
              <p className="text-center text-stone-400 py-6 italic">
                Sincronizando...
              </p>
            ) : (
              proximosAgendamentos.map((ag, index) => (
                <Link
                  key={index}
                  to="/dashboard/admin/agendamentos"
                  className="flex justify-between items-center p-4 rounded-lg hover:bg-stone-50 transition border border-stone-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-[#A2672D]">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-stone-800 leading-tight">
                        {ag.nome}
                      </p>
                      <p className="text-sm text-stone-500">
                        {ag.servico_nome}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[#A2672D] font-bold block">
                      {ag.hora}
                    </span>
                    <span className="text-[10px] uppercase text-stone-400 font-bold tracking-tighter">
                      {ag.data}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
