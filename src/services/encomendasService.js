import { api } from "./api";

export const listarEncomendas = async () => {
  const response = await api.get("encomendas/");
  return response.data;
};

export const criarEncomenda = async (dados) => {
  const response = await api.post("encomendas/", dados);
  return response.data;
};

export const atualizarEncomenda = async (id, dados) => {
  const response = await api.put(`encomendas/${id}/`, dados);
  return response.data;
};

export const eliminarEncomenda = async (id) => {
  const response = await api.delete(`encomendas/${id}/`);
  return response.data;
};