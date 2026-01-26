import { api } from "./api";

export async function listarCategorias() {
  const { data } = await api.get("categorias/");
  return data;
}

export async function criarCategoria(dados) {
  const { data } = await api.post("categorias/", dados);
  return data;
}

export async function atualizarCategoria(id, dados) {
  const { data } = await api.put(`categorias/${id}/`, dados);
  return data;
}

export async function eliminarCategoria(id) {
  await api.delete(`categorias/${id}/`);
}