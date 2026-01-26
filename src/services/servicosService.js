import { api } from "./api";

export async function listarServicos() {
  const { data } = await api.get("servicos/");
  return data;
}

export async function criarServico(dados) {
  // Garante que o preço seja enviado como string se necessário
  const payload = { ...dados, preco: String(dados.preco) };
  const { data } = await api.post("servicos/", payload);
  return data;
}

export async function atualizarServico(id, dados) {
  const payload = { ...dados, preco: String(dados.preco) };
  const { data } = await api.put(`servicos/${id}/`, payload);
  return data;
}

export async function eliminarServico(id) {
  await api.delete(`servicos/${id}/`);
}