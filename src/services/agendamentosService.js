import { api } from "./api";

/* =========================
   LISTAGENS
========================= */

// Lista geral (admin)
export async function listarAgendamentos() {
  const { data } = await api.get("agendamentos/");
  return data;
}

// Listar por data
export async function listarAgendamentosPorData(dataSelecionada) {
  const { data } = await api.get(
    `agendamentos/agendamentos-por-data/?data=${dataSelecionada}`
  );
  return data;
}

// Listar por status
export async function listarAgendamentosPorStatus(status) {
  const { data } = await api.get(
    `agendamentos/agendamentos-por-status/?status=${status}`
  );
  return data;
}

// Meus agendamentos (caso use auth)
export async function listarMeusAgendamentos() {
  const { data } = await api.get("agendamentos/meus-agendamentos/");
  return data;
}

/* =========================
   CRUD
========================= */

export async function criarAgendamento(payload) {
  const { data } = await api.post("agendamentos/", payload);
  return data;
}

export async function atualizarAgendamento(id, payload) {
  const { data } = await api.put(`agendamentos/${id}/`, payload);
  return data;
}

export async function eliminarAgendamento(id) {
  await api.delete(`agendamentos/${id}/`);
}

/* =========================
   AÇÕES
========================= */

export async function aprovarAgendamento(id) {
  const { data } = await api.post(`agendamentos/${id}/aprovar/`);
  return data;
}

export async function cancelarAgendamento(id) {
  const { data } = await api.post(`agendamentos/${id}/cancelar/`);
  return data;
}

export async function atualizarStatusAgendamento(id, status) {
  const { data } = await api.post(
    `agendamentos/${id}/atualizar_status/`,
    { status }
  );
  return data;
}

/* =========================
   HORÁRIOS
========================= */

export async function listarHorariosDisponiveis(data, servicoId) {
  const { data: horarios } = await api.get(
    `agendamentos/horarios-disponiveis/?data=${data}&servico=${servicoId}`
  );
  return horarios;
}
