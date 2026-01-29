import { api } from "./api";

/**
 * Lista todas as faturas cadastradas
 */
export const listarFaturas = async () => {
  try {
    const response = await api.get("faturacao/");
    return response.data;
  } catch (error) {
    console.error("Erro ao listar faturas:", error);
    throw error;
  }
};

export const criarFatura = async (dados) => {
  try {
    const response = await api.post("faturacao/", dados);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar fatura:", error);
    throw error;
  }
};

/**
 * Atualiza uma fatura específica
 */
export const atualizarFatura = async (id, dados) => {
  try {
    const response = await api.patch(`faturacao/${id}/`, dados);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar fatura ${id}:`, error);
    throw error;
  }
};

/**
 * Obtém os detalhes de uma fatura específica
 */
export const obterFatura = async (id) => {
  try {
    const response = await api.get(`faturacao/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao obter fatura ${id}:`, error);
    throw error;
  }
};

/**
 * Elimina uma fatura
 */
export const eliminarFatura = async (id) => {
  try {
    const response = await api.delete(`faturacao/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao eliminar fatura ${id}:`, error);
    throw error;
  }
};

/**
 * Endpoints de Relatórios e Estatísticas (Baseados nos seus nomes de URL)
 */

export const obterTotalFaturacao = async () => {
  const response = await api.get("faturacao/total/");
  return response.data;
};

export const obterFaturacaoMensal = async () => {
  const response = await api.get("faturacao/mensal/");
  return response.data;
};

export const obterFaturacaoPorMetodo = async () => {
  const response = await api.get("faturacao/por_metodo/");
  return response.data;
};

export const obterFaturacaoPorTipo = async () => {
  const response = await api.get("faturacao/por_tipo/");
  return response.data;
};
