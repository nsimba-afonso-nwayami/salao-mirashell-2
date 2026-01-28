import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";

import {
  listarEncomendas,
  criarEncomenda,
  atualizarStatusEncomenda, // Importado o novo serviço
  eliminarEncomenda,
} from "../../services/encomendasService";
import { listarProdutos } from "../../services/produtosService";
import { encomendaSchema } from "../../validations/encomendaSchema";

export default function EncomendasAdmin() {
  const [encomendas, setEncomendas] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openNovo, setOpenNovo] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");

  const navigate = useNavigate();

  const statusOpcoes = ["pendente", "confirmada", "cancelada", "entregue"];

  const formatImageUrl = (url) => {
    if (!url) return "";
    return url.replace("/media/", "/api/media/");
  };

  const provinciasAngola = [
    "Bengo",
    "Benguela",
    "Bié",
    "Cabinda",
    "Cuando Cubango",
    "Cuanza Norte",
    "Cuanza Sul",
    "Cunene",
    "Huambo",
    "Huíla",
    "Luanda",
    "Lunda Norte",
    "Lunda Sul",
    "Malanje",
    "Moxico",
    "Namibe",
    "Uíge",
    "Zaire",
  ].sort();

  const formCriar = useForm({
    resolver: yupResolver(encomendaSchema),
    defaultValues: { quantidade: 1, status: "pendente" },
  });

  const watchedProdutoId = formCriar.watch("produto_id");
  const watchedQuantidade = formCriar.watch("quantidade");
  const produtoSelecionado = produtos.find(
    (p) => p.id === Number(watchedProdutoId),
  );
  const totalRealTime = produtoSelecionado
    ? Number(produtoSelecionado.preco) * (Number(watchedQuantidade) || 0)
    : 0;

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [dataEncomendas, dataProdutos] = await Promise.all([
        listarEncomendas(),
        listarProdutos(),
      ]);
      setEncomendas(dataEncomendas.sort((a, b) => b.id - a.id));
      setProdutos(dataProdutos);
    } catch (error) {
      toast.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const onSubmitCriar = async (data) => {
    try {
      const produtoSel = produtos.find((p) => p.id === Number(data.produto_id));
      if (!produtoSel) return toast.error("Selecione um produto");

      const payload = {
        ...data,
        status: "pendente",
        itens: [
          {
            produto: Number(produtoSel.id),
            quantidade: Number(data.quantidade),
            preco: Number(produtoSel.preco),
            total: Number(produtoSel.preco) * Number(data.quantidade),
          },
        ],
      };

      await criarEncomenda(payload);
      toast.success("Encomenda criada!");
      setOpenNovo(false);
      formCriar.reset();
      carregarDados();
    } catch (err) {
      toast.error("Erro ao criar encomenda");
    }
  };

  // Função simplificada usando o endpoint PATCH atualizar-status
  const handleMudarStatus = async (id, novoStatus) => {
    try {
      await atualizarStatusEncomenda(id, novoStatus);
      toast.success(`Status alterado para ${novoStatus}`);

      // Se for confirmada, prepara os dados e redireciona
      if (novoStatus === "confirmada") {
        const enc = encomendas.find((e) => e.id === id);
        const dadosParaFatura = {
          tipo: "produto", // Encomenda é geralmente venda de produto
          metodo_pagamento: "transferencia", // Valor padrão ou vindo da enc
          valor: enc.valor_total,
          pago: true,
          encomenda: enc.id,
          observacoes: `Fatura gerada automaticamente da encomenda #${enc.id}`,
        };

        // Redireciona passando os dados no estado da rota
        navigate("/dashboard/admin/faturas", {
          state: { criarFaturaAutomatica: dadosParaFatura },
        });
      } else {
        carregarDados();
      }
    } catch (err) {
      toast.error("Erro ao atualizar status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja eliminar a encomenda ${id}?`)) {
      try {
        await eliminarEncomenda(id);
        toast.success("Encomenda eliminada!");
        carregarDados();
      } catch (err) {
        toast.error("Erro ao eliminar");
      }
    }
  };

  const encomendasFiltradas = encomendas.filter((enc) => {
    const termo = termoPesquisa.toLowerCase();
    const statusMatch = filtroStatus === "" || enc.status === filtroStatus;
    const buscaMatch =
      termo === "" ||
      enc.nome_cliente?.toLowerCase().includes(termo) ||
      enc.telefone?.includes(termo) ||
      enc.id.toString().includes(termo);
    return buscaMatch && statusMatch;
  });

  return (
    <>
      <title>Encomendas | Dashboard Mirashell</title>
      <AdminLayout title="Gestão de Encomendas">
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h3 className="text-xl font-bold text-[#A2672D]">
              Lista de Encomendas ({encomendasFiltradas.length})
            </h3>
            <button
              onClick={() => {
                formCriar.reset({ quantidade: 1, status: "pendente" });
                setOpenNovo(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#A2672D] text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md cursor-pointer"
            >
              <i className="fas fa-plus"></i> Nova Encomenda
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative max-w-md flex-1">
              <input
                type="text"
                placeholder="Pesquisar cliente..."
                value={termoPesquisa}
                onChange={(e) => setTermoPesquisa(e.target.value)}
                className="w-full py-2 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-lg focus:ring-[#A2672D]"
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"></i>
            </div>

            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="py-2 px-4 bg-stone-50 border border-stone-200 rounded-lg text-stone-700 outline-none focus:ring-2 focus:ring-amber-400 capitalize cursor-pointer"
            >
              <option value="">Todos os Status</option>
              {statusOpcoes.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full w-full text-left border-collapse text-sm">
              <thead>
                <tr className="text-[#A2672D] border-b border-stone-200">
                  <th className="p-3">ID</th>
                  <th className="p-3">Cliente / Produto</th>
                  <th className="p-3">E-mail / Contacto</th>
                  <th className="p-3">Preço / Qtd</th>
                  <th className="p-3">Valor Total</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="text-stone-600">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="p-4 text-center">
                      Carregando...
                    </td>
                  </tr>
                ) : (
                  encomendasFiltradas.map((enc) => {
                    const item = enc.itens?.[0];
                    const detalhes = item?.produto_detalhes;

                    return (
                      <tr
                        key={enc.id}
                        className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                      >
                        <td className="p-3 font-bold text-stone-400">
                          #{enc.id}
                        </td>
                        <td className="p-3 font-medium text-stone-800">
                          <div className="flex items-center gap-3">
                            {detalhes?.imagem && (
                              <img
                                src={formatImageUrl(detalhes.imagem)}
                                alt=""
                                className="w-10 h-10 rounded-lg object-cover border border-stone-200 shadow-sm"
                              />
                            )}
                            <div>
                              <div className="text-sm font-bold">
                                {enc.nome_cliente}
                              </div>
                              <div className="text-[#A2672D] text-[11px] uppercase font-bold">
                                {detalhes?.nome || "---"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-xs">
                          <div className="italic text-stone-400">
                            {enc.email}
                          </div>
                          <div className="text-stone-700 font-mono">
                            {enc.telefone}
                          </div>
                        </td>
                        <td className="p-3 text-xs">
                          <div className="text-stone-500">
                            Unit:{" "}
                            {Number(detalhes?.preco || 0).toLocaleString()} Kz
                          </div>
                          <div className="font-bold text-stone-800">
                            Qtd: {item?.quantidade || 0}
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-[#A2672D] text-sm">
                            {Number(enc.valor_total).toLocaleString()} Kz
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span
                            className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${enc.status === "pendente" ? "bg-amber-100 text-amber-700" : enc.status === "entregue" ? "bg-green-100 text-green-700" : enc.status === "confirmada" ? "bg-blue-100 text-blue-700" : "bg-stone-100 text-stone-600"}`}
                          >
                            {enc.status}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center gap-2">
                            {enc.status?.toLowerCase() !== "confirmada" &&
                              enc.status?.toLowerCase() !== "entregue" && (
                                <button
                                  onClick={() =>
                                    handleMudarStatus(enc.id, "confirmada")
                                  }
                                  className="px-3 py-1 bg-green-100 text-green-700 rounded font-semibold hover:bg-green-200 transition cursor-pointer"
                                >
                                  Confirmar
                                </button>
                              )}

                            {enc.status?.toLowerCase() !== "cancelada" && (
                              <button
                                onClick={() =>
                                  handleMudarStatus(enc.id, "cancelada")
                                }
                                className="px-3 py-1 bg-red-50 text-red-600 rounded font-semibold hover:bg-red-100 transition cursor-pointer"
                              >
                                Cancelar
                              </button>
                            )}

                            {/* Botão extra para Entregue caso queira fechar o ciclo após confirmar */}
                            {enc.status?.toLowerCase() === "confirmada" && (
                              <button
                                onClick={() =>
                                  handleMudarStatus(enc.id, "entregue")
                                }
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-semibold hover:bg-blue-200 transition cursor-pointer"
                              >
                                Entregar
                              </button>
                            )}

                            <button
                              onClick={() => handleDelete(enc.id)}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded font-semibold hover:bg-red-200 transition cursor-pointer"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL CRIAR */}
        <Modal
          isOpen={openNovo}
          onClose={() => setOpenNovo(false)}
          title="Nova Encomenda"
          icon="fas fa-shipping-fast"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <form
              onSubmit={formCriar.handleSubmit(onSubmitCriar)}
              className="grid gap-4 md:grid-cols-2"
            >
              <div className="md:col-span-2">
                <label className="block text-stone-700 font-medium mb-1 text-sm">
                  Nome do Cliente
                </label>
                <input
                  {...formCriar.register("nome_cliente")}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 outline-none"
                />
                {formCriar.formState.errors.nome_cliente && (
                  <p className="text-red-500 text-xs mt-1">
                    {formCriar.formState.errors.nome_cliente.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1 text-sm">
                  Telefone
                </label>
                <input
                  {...formCriar.register("telefone")}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1 text-sm">
                  E-mail
                </label>
                <input
                  {...formCriar.register("email")}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-stone-700 font-medium mb-1 text-sm">
                  Endereço
                </label>
                <input
                  {...formCriar.register("endereco")}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1 text-sm">
                  Cidade
                </label>
                <input
                  {...formCriar.register("cidade")}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 outline-none"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1 text-sm">
                  Província
                </label>
                <select
                  {...formCriar.register("provincia")}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 bg-white outline-none"
                >
                  <option value="">Selecione...</option>
                  {provinciasAngola.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2 border-t pt-4 mt-2 grid gap-4 md:grid-cols-2">
                <h4 className="md:col-span-2 font-bold text-[#A2672D] uppercase text-xs">
                  Produto da Encomenda
                </h4>
                <div>
                  <label className="block text-stone-700 font-medium mb-1 text-sm">
                    Produto
                  </label>
                  <select
                    {...formCriar.register("produto_id")}
                    className="w-full px-4 py-2 rounded-lg border border-stone-300 bg-white outline-none"
                  >
                    <option value="">Selecione um produto</option>
                    {produtos.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nome}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-stone-700 font-medium mb-1 text-sm">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    min="1"
                    {...formCriar.register("quantidade")}
                    className="w-full px-4 py-2 rounded-lg border border-stone-300 outline-none"
                  />
                </div>
                <div className="md:col-span-2 bg-stone-50 border-2 border-dashed border-stone-200 p-4 rounded-xl flex justify-between items-center mt-2">
                  <div className="flex items-center gap-3">
                    {produtoSelecionado && (
                      <img
                        src={formatImageUrl(produtoSelecionado.imagem)}
                        className="w-12 h-12 rounded object-cover border border-stone-200"
                        alt=""
                      />
                    )}
                    <div>
                      <p className="text-stone-500 text-xs uppercase font-bold tracking-wider">
                        Total a Pagar
                      </p>
                      <p className="text-[10px] text-stone-400">
                        {produtoSelecionado
                          ? `${watchedQuantidade}x ${Number(produtoSelecionado.preco).toLocaleString()} Kz`
                          : "Selecione o produto"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#A2672D]">
                      {totalRealTime.toLocaleString()}{" "}
                      <small className="text-sm">Kz</small>
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setOpenNovo(false)}
                  className="px-6 py-2 bg-stone-200 text-stone-800 rounded-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-white font-semibold rounded-lg cursor-pointer bg-[#A2672D]"
                >
                  Criar Encomenda
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </AdminLayout>
    </>
  );
}
