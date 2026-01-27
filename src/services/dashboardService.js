import { api } from "./api";

export async function getDashboardStats() {
  const [
    categorias, servicos, profissionais, clientes,
    agendamentos, produtos, pedidos, encomendas, admins,
  ] = await Promise.all([
    api.get("categorias/"), api.get("servicos/"),
    api.get("profissionais/"), api.get("clientes/"),
    api.get("agendamentos/"), api.get("produtos/"),
    api.get("pedidos/"), api.get("encomendas/"),
    api.get("admins/"),
  ]);

  const hoje = new Date().toLocaleDateString('en-CA'); 
  const listaAgendamentos = agendamentos.data || [];
  
  // 1. Agendamentos de Hoje (qualquer status)
  const agendamentosHoje = listaAgendamentos.filter((a) => {
    const dataAgendamento = a.data ? String(a.data).trim() : "";
    return dataAgendamento === hoje;
  });

  // 2. Todos os Pendentes (independente da data)
  const agendamentosPendentes = listaAgendamentos.filter(a => a.status === "pendente");

  // 3. Ordenação para a lista lateral (Próximos)
  const agendamentosOrdenados = [...agendamentosPendentes]
    .sort((a, b) => {
      const dataA = `${a.data}T${a.hora}`;
      const dataB = `${b.data}T${b.hora}`;
      return dataA.localeCompare(dataB);
    });

  const proximoAgendamento = agendamentosOrdenados[0] || null;

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
      totalPendentes: agendamentosPendentes.length, // Novo contador
    },
    proximoAgendamento,
    agendamentos: agendamentosOrdenados,
  };
}