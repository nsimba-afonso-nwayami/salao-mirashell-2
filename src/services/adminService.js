import { api } from "./api";

export const listarAdmins = async () => {
  const response = await api.get("admins/");
  return response.data;
};

export const criarAdmin = async (dados) => {
  const response = await api.post("admins/", dados);
  return response.data;
};

// Nova função de atualização
export const atualizarAdmin = async (id, dados) => {
  const response = await api.patch(`admins/${id}/`, dados);
  return response.data;
};

export const eliminarAdmin = async (id) => {
  const response = await api.delete(`admins/${id}/`);
  return response.data;
};