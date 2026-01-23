import { api } from "./api";

export async function getDashboardStats() {
  const [
    categorias,
    servicos,
    profissionais,
    clientes,
    agendamentos,
    produtos,
    pedidos,
    encomendas,
    admins,
  ] = await Promise.all([
    api.get("categorias/"),
    api.get("servicos/"),
    api.get("profissionais/"),
    api.get("clientes/"),
    api.get("agendamentos/"),
    api.get("produtos/"),
    api.get("pedidos/"),
    api.get("encomendas/"),
    api.get("admins/"),
  ]);

  // DATA HOJE CORRETA
  const hoje = new Date().toISOString().split("T")[0];

  // AGENDAMENTOS DE HOJE
  const agendamentosHoje = agendamentos.data.filter((a) => a.data === hoje);

  // FUTUROS + PENDENTES ORDENADOS
  const agendamentosOrdenados = [...agendamentos.data]
    .filter((a) => a.status === "pendente")
    .sort((a, b) => a.hora.localeCompare(b.hora));

  const proximoAgendamento =
    agendamentosHoje[0] || agendamentosOrdenados[0] || null;

  return {
    counts: {
      categorias: categorias.data.length,
      servicos: servicos.data.length,
      profissionais: profissionais.data.length,
      clientes: clientes.data.length,
      produtos: produtos.data.length,
      pedidos: pedidos.data.length,
      encomendas: encomendas.data.length,
      admins: admins.data.length,
      agendamentosHoje: agendamentosHoje.length,
    },

    proximoAgendamento,
    agendamentos: agendamentosOrdenados,
  };
}
