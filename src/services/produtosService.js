import { api } from "./api";

export const listarProdutos = async () => {
  const response = await api.get("/produtos/");
  return response.data;
};

/**
 * Para criar, 'data' deve ser um objeto FormData
 * Ex: const data = new FormData(); data.append('imagem', file);
 */
export const criarProduto = async (data) => {
  const response = await api.post("/produtos/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

/**
 * Para atualizar, 'data' deve ser um objeto FormData
 */
export const atualizarProduto = async (id, data) => {
  const response = await api.put(`/produtos/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const eliminarProduto = async (id) => {
  const response = await api.delete(`/produtos/${id}/`);
  return response.data;
};