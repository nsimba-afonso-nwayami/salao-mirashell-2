import AdminLayout from "./components/AdminLayout";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/dashboardService";

export default function DashboardAdmin() {
  const [dadosEstatisticos, setDadosEstatisticos] = useState({
    receitaMes: "—",
    clientesAtendidos: 0,
    agendamentosHoje: 0,
    proximoAgendamento: "—",
  });

  const [proximosAgendamentos, setProximosAgendamentos] = useState([]);

  // CARREGAMENTO DOS DADOS
  useEffect(() => {
    async function carregarDashboard() {
      try {
        const data = await getDashboardStats();

        setDadosEstatisticos({
          receitaMes: "—", // pronto para endpoint financeiro futuramente
          clientesAtendidos: data.counts.clientes,
          agendamentosHoje: data.counts.agendamentosHoje,
          proximoAgendamento: data.proximoAgendamento
            ? `${data.proximoAgendamento.hora} (${data.proximoAgendamento.servico})`
            : "Nenhum agendamento",
        });

        setProximosAgendamentos(
          data.agendamentos.slice(0, 5).map((a) => ({
            nome: a.cliente,
            servico: a.servico,
            hora: a.hora,
          })),
        );
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      }
    }

    carregarDashboard();
  }, []);

  return (
    <AdminLayout title="Painel de Gestão Mirashell">
      {/* CARDS DE ESTATÍSTICAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white border border-stone-200 p-6 rounded-xl shadow-sm flex flex-col hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-stone-500 text-sm font-medium">
                Receita (Mês)
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-[#A2672D] truncate">
                {dadosEstatisticos.receitaMes}
              </h3>
            </div>
            <i className="fas fa-dollar-sign text-3xl sm:text-4xl text-[#A2672D] opacity-40 shrink-0"></i>
          </div>
          <p className="text-xs text-stone-400 mt-2 truncate">
            <i className="fas fa-info-circle mr-1"></i> Total de Vendas no
            Período
          </p>
        </div>

        <div className="bg-white border border-stone-200 p-6 rounded-xl shadow-sm flex flex-col hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-stone-500 text-sm font-medium">
                Clientes Atendidos
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-stone-800 truncate">
                {dadosEstatisticos.clientesAtendidos}
              </h3>
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
              <p className="text-stone-500 text-sm font-medium">
                Agendamentos Hoje
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-stone-800 truncate">
                {dadosEstatisticos.agendamentosHoje}
              </h3>
            </div>
            <i className="fas fa-calendar-check text-3xl sm:text-4xl text-[#A2672D] opacity-40 shrink-0"></i>
          </div>
          <p className="text-xs text-stone-500 mt-2 truncate font-medium">
            Próximo:{" "}
            <span className="text-[#A2672D]">
              {dadosEstatisticos.proximoAgendamento}
            </span>
          </p>
        </div>
      </div>

      {/* PRÓXIMOS AGENDAMENTOS */}
      <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
        <h3 className="text-xl font-bold mb-4 text-[#A2672D]">
          Próximos Agendamentos
        </h3>
        <div className="space-y-3">
          {proximosAgendamentos.length === 0 ? (
            <div className="text-center text-stone-400 text-sm py-6">
              <i className="fas fa-calendar-times text-2xl mb-2 block"></i>
              Não há agendamentos futuros no momento
            </div>
          ) : (
            proximosAgendamentos.map((agendamento, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 rounded-lg hover:bg-stone-50 transition border-b border-stone-100 last:border-b-0"
              >
                <div>
                  <p className="font-semibold text-stone-700 truncate">
                    {agendamento.nome}
                  </p>
                  <p className="text-sm text-stone-500 truncate">
                    {agendamento.servico}
                  </p>
                </div>
                <span className="text-[#A2672D] font-bold shrink-0">
                  {agendamento.hora}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
