import { api } from "./api";

/* =========================
    LISTAGENS
========================= */

// Lista todos os profissionais
export async function listarProfissionais() {
  const { data } = await api.get("profissionais/");
  return data;
}

// Obtém detalhes de um profissional específico
export async function obterProfissional(id) {
  const { data } = await api.get(`profissionais/${id}/`);
  return data;
}

/* =========================
    CRUD (Opcional, caso precise)
========================= */

export async function criarProfissional(payload) {
  const { data } = await api.post("profissionais/", payload);
  return data;
}

export async function atualizarProfissional(id, payload) {
  const { data } = await api.put(`profissionais/${id}/`, payload);
  return data;
}

export async function eliminarProfissional(id) {
  await api.delete(`profissionais/${id}/`);
}