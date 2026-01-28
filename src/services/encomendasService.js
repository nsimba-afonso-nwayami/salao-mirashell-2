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

/**
 * Atualiza apenas o status de uma encomenda específica
 * @param {number|string} id - ID da encomenda
 * @param {string} novoStatus - O novo status (ex: 'entregue', 'cancelado')
 */
export const atualizarStatusEncomenda = async (id, novoStatus) => {
  try {
    const response = await api.post(`encomendas/${id}/atualizar-status/`, {
      status: novoStatus,
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar status da encomenda ${id}:`, error);
    throw error;
  }
};

export const eliminarEncomenda = async (id) => {
  const response = await api.delete(`encomendas/${id}/`);
  return response.data;
};