import { api } from "./api";

export const listarGaleria = async () => {
  const response = await api.get("images/list_create/");
  return response.data;
};

export const criarGaleria = async (formData) => {
  const response = await api.post("images/list_create/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const eliminarGaleria = async (id) => {
  const response = await api.delete(`images/delete/${id}/`);
  return response.data;
};
