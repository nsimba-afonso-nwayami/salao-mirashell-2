import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";

import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";

import {
  listarEncomendas,
  criarEncomenda,
  atualizarEncomenda,
  eliminarEncomenda,
} from "../../services/encomendasService";
import { listarProdutos } from "../../services/produtosService";
import { encomendaSchema } from "../../validations/encomendaSchema";

export default function EncomendasAdmin() {
  const [encomendas, setEncomendas] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openNovo, setOpenNovo] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [encomendaSelecionada, setEncomendaSelecionada] = useState(null);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");

  const statusOpcoes = ["pendente", "confirmada", "cancelada", "entregue"];

  // FUNÇÃO DE FORMATAÇÃO DE URL (Igual à sua página da Loja)
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
    "Icolo e Bengo",
    "Cassai Sul",
    "Moxico Leste",
  ].sort();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(encomendaSchema),
    defaultValues: { quantidade: 1, status: "pendente" },
  });

  const watchedProdutoId = watch("produto_id");
  const watchedQuantidade = watch("quantidade");
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
        nome_cliente: data.nome_cliente,
        telefone: data.telefone,
        email: data.email,
        endereco: data.endereco,
        cidade: data.cidade,
        provincia: data.provincia,
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
      reset();
      carregarDados();
    } catch (err) {
      const apiMessage =
        err.response?.data?.status?.[0] || "Erro ao criar encomenda";
      toast.error(apiMessage);
    }
  };

  const onSubmitEditar = async (data) => {
    try {
      const produtoSel = produtos.find((p) => p.id === Number(data.produto_id));
      const payload = {
        nome_cliente: data.nome_cliente,
        telefone: data.telefone,
        email: data.email,
        endereco: data.endereco,
        cidade: data.cidade,
        provincia: data.provincia,
        status: data.status.toLowerCase(),
        itens: [
          {
            produto: Number(produtoSel.id),
            quantidade: Number(data.quantidade),
            preco: Number(produtoSel.preco),
            total: Number(produtoSel.preco) * Number(data.quantidade),
          },
        ],
      };

      await atualizarEncomenda(encomendaSelecionada.id, payload);
      toast.success("Encomenda atualizada!");
      setOpenEditar(false);
      carregarDados();
    } catch (err) {
      toast.error("Erro ao atualizar dados.");
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

  const prepararEdicao = (enc) => {
    setEncomendaSelecionada(enc);
    setValue("nome_cliente", enc.nome_cliente);
    setValue("telefone", enc.telefone);
    setValue("email", enc.email);
    setValue("endereco", enc.endereco);
    setValue("cidade", enc.cidade);
    setValue("provincia", enc.provincia);
    setValue("status", enc.status.toLowerCase());

    if (enc.itens && enc.itens.length > 0) {
      setValue("produto_id", enc.itens[0].produto);
      setValue("quantidade", enc.itens[0].quantidade);
    }
    setOpenEditar(true);
  };

  const encomendasFiltradas = encomendas.filter((enc) => {
    const termo = termoPesquisa.toLowerCase();
    const statusMatch = filtroStatus === "" || enc.status === filtroStatus;
    const buscaMatch =
      termo === "" ||
      enc.nome_cliente?.toLowerCase().includes(termo) ||
      enc.telefone?.includes(termo) ||
      enc.id.toString().includes(termo) ||
      enc.email?.toLowerCase().includes(termo);
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
                reset({ quantidade: 1, status: "pendente" });
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
                ) : encomendasFiltradas.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="p-8 text-center text-stone-400 italic font-medium"
                    >
                      Nenhum resultado encontrado
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
                            className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                              enc.status === "pendente"
                                ? "bg-amber-100 text-amber-700"
                                : enc.status === "entregue"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-stone-100 text-stone-600"
                            }`}
                          >
                            {enc.status}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => prepararEdicao(enc)}
                              className="px-3 py-1 bg-amber-100 text-amber-700 rounded font-semibold hover:bg-amber-200 transition cursor-pointer"
                            >
                              Editar
                            </button>
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

        <Modal
          isOpen={openNovo || openEditar}
          onClose={() => {
            setOpenNovo(false);
            setOpenEditar(false);
          }}
          title={openNovo ? "Nova Encomenda" : "Editar Encomenda"}
          icon={openNovo ? "fas fa-shipping-fast" : "fas fa-edit"}
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <form
              onSubmit={handleSubmit(openNovo ? onSubmitCriar : onSubmitEditar)}
              className="grid gap-4 md:grid-cols-2"
            >
              {/* ... Seus campos de formulário (nome, telefone, email, etc - igual ao anterior) ... */}
              <div className="md:col-span-2">
                <label className="block text-stone-700 font-medium mb-1 text-sm">
                  Nome do Cliente
                </label>
                <input
                  {...register("nome_cliente")}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 outline-none"
                />
                {errors.nome_cliente && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.nome_cliente.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1 text-sm">
                  Telefone
                </label>
                <input
                  {...register("telefone")}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 outline-none"
                />
                {errors.telefone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.telefone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1 text-sm">
                  E-mail
                </label>
                <input
                  {...register("email")}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-stone-700 font-medium mb-1 text-sm">
                  Endereço
                </label>
                <input
                  {...register("endereco")}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1 text-sm">
                  Cidade
                </label>
                <input
                  {...register("cidade")}
                  className="w-full px-4 py-2 rounded-lg border border-stone-300 outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1 text-sm">
                  Província
                </label>
                <select
                  {...register("provincia")}
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
                    {...register("produto_id")}
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
                    {...register("quantidade")}
                    className="w-full px-4 py-2 rounded-lg border border-stone-300 outline-none"
                  />
                </div>

                {/* BOX DE RESUMO COM IMAGEM FORMATADA */}
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

              {openEditar && (
                <div className="md:col-span-2 border-t pt-4">
                  <label className="block text-stone-700 font-medium mb-1 text-sm">
                    Status
                  </label>
                  <select
                    {...register("status")}
                    className="w-full px-4 py-2 rounded-lg border border-stone-300 bg-white capitalize outline-none"
                  >
                    {statusOpcoes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpenNovo(false);
                    setOpenEditar(false);
                  }}
                  className="px-6 py-2 bg-stone-200 text-stone-800 rounded-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`px-6 py-2 text-white font-semibold rounded-lg cursor-pointer ${openNovo ? "bg-[#A2672D]" : "bg-amber-600"}`}
                >
                  {openNovo ? "Criar Encomenda" : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </AdminLayout>
    </>
  );
}
