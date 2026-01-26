import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";

// Importação dos serviços e validação
import {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  eliminarProduto,
} from "../../services/produtosService";
import { listarCategorias } from "../../services/categoriasService";
import { produtoSchema } from "../../validations/produtoSchema";

export default function ProdutosAdmin() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openNovo, setOpenNovo] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");

  // FUNÇÃO PARA FORMATAR A URL DA IMAGEM
  const formatImageUrl = (url) => {
    if (!url) return "";
    return url.includes("/media/") && !url.includes("/api/media/")
      ? url.replace("/media/", "/api/media/")
      : url;
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(produtoSchema),
  });

  // --- CARREGAMENTO DE DADOS ---
  const carregarDados = async () => {
    try {
      setLoading(true);
      const [dataProd, dataCat] = await Promise.all([
        listarProdutos(),
        listarCategorias(),
      ]);
      setProdutos(dataProd);
      setCategorias(dataCat);
    } catch (error) {
      toast.error("Erro ao carregar dados da API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const obterNomeCategoria = (id) => {
    const categoria = categorias.find((cat) => cat.id === id);
    return categoria ? categoria.nome : `ID: ${id}`;
  };

  // --- HELPER PARA FORMDATA (Upload de Imagem) ---
  const prepararFormData = (data) => {
    const formData = new FormData();
    formData.append("nome", data.nome);
    formData.append("preco", data.preco);
    formData.append("estoque", data.estoque);
    formData.append("categoria", data.categoria);

    // Se houver arquivo selecionado, adiciona ao FormData
    if (data.imagem && data.imagem[0]) {
      formData.append("imagem", data.imagem[0]);
    }
    return formData;
  };

  // --- AÇÕES DO CRUD ---
  const onSubmitCriar = async (data) => {
    try {
      const formData = prepararFormData(data);
      await criarProduto(formData);
      toast.success("Produto criado com sucesso!");
      setOpenNovo(false);
      reset();
      carregarDados();
    } catch (err) {
      toast.error("Erro ao criar produto");
    }
  };

  const onSubmitEditar = async (data) => {
    try {
      const formData = prepararFormData(data);
      await atualizarProduto(produtoSelecionado.id, formData);
      toast.success("Produto atualizado!");
      setOpenEditar(false);
      carregarDados();
    } catch (err) {
      toast.error("Erro ao atualizar produto");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja eliminar o produto ${id}?`)) {
      try {
        await eliminarProduto(id);
        toast.success("Produto eliminado!");
        carregarDados();
      } catch (err) {
        toast.error("Erro ao eliminar");
      }
    }
  };

  const prepararEdicao = (produto) => {
    setProdutoSelecionado(produto);
    setValue("nome", produto.nome);
    setValue("preco", produto.preco);
    setValue("estoque", produto.estoque);
    setValue("categoria", produto.categoria);
    setOpenEditar(true);
  };

  // --- FILTROS, ORDENAÇÃO E LIMITE ---
  const produtosFiltrados = produtos
    .filter((produto) => {
      const buscaMatch =
        termoPesquisa === "" ||
        produto.nome?.toLowerCase().includes(termoPesquisa.toLowerCase());
      const categoriaMatch =
        filtroCategoria === "" || String(produto.categoria) === filtroCategoria;
      return buscaMatch && categoriaMatch;
    })
    .reverse() // COLOCA OS ÚLTIMOS (RECENTES) PRIMEIRO
    .slice(0, 10); // LIMITA AOS 10 PRIMEIROS RESULTADOS

  const formatarPreco = (preco) =>
    `Kz ${Number(preco).toLocaleString("pt-AO")}`;

  return (
    <AdminLayout title="Gestão de Produtos">
      <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h3 className="text-xl font-bold text-[#A2672D]">
            Lista de Produtos ({produtosFiltrados.length})
          </h3>
          <button
            onClick={() => {
              reset();
              setOpenNovo(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#A2672D] text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md cursor-pointer"
          >
            <i className="fas fa-plus"></i> Novo Produto
          </button>
        </div>

        <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center mb-6 gap-4 flex-wrap">
          <div className="relative w-full sm:w-auto flex-1">
            <input
              type="text"
              placeholder="Pesquisar produto..."
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
              className="w-full py-2 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-lg focus:ring-[#A2672D] focus:border-[#A2672D]"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"></i>
          </div>

          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="w-full sm:w-auto py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg cursor-pointer"
          >
            <option value="">Categoria (Todas)</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full w-full text-left border-collapse text-sm">
            <thead>
              <tr className="text-[#A2672D] border-b border-stone-200">
                <th className="p-3">ID</th>
                <th className="p-3">Produto</th>
                <th className="p-3">Categoria</th>
                <th className="p-3 text-center">Estoque</th>
                <th className="p-3 text-right">Preço</th>
                <th className="p-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="text-stone-600">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center">
                    Carregando...
                  </td>
                </tr>
              ) : produtosFiltrados.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="p-8 text-center text-stone-400 italic font-medium"
                  >
                    Nenhum resultado encontrado
                  </td>
                </tr>
              ) : (
                produtosFiltrados.map((produto) => (
                  <tr
                    key={produto.id}
                    className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                  >
                    <td className="p-3 opacity-70">{produto.id}</td>
                    <td className="p-3 font-medium text-stone-800">
                      <div className="flex items-center gap-2">
                        {produto.imagem && (
                          <img
                            src={formatImageUrl(produto.imagem)}
                            className="w-8 h-8 rounded object-cover border border-stone-200"
                            alt=""
                          />
                        )}
                        {produto.nome}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full text-xs font-medium">
                        {obterNomeCategoria(produto.categoria)}
                      </span>
                    </td>
                    <td
                      className={`p-3 text-center font-bold ${produto.estoque <= 5 ? "text-red-500" : ""}`}
                    >
                      {produto.estoque}
                    </td>
                    <td className="p-3 text-right font-bold text-[#A2672D]">
                      {formatarPreco(produto.preco)}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                          to="/loja"
                          className="px-3 py-1 bg-stone-100 text-stone-700 rounded font-semibold hover:bg-stone-200 transition cursor-pointer flex items-center gap-1"
                        >
                          Ver
                        </Link>
                        <button
                          onClick={() => prepararEdicao(produto)}
                          className="px-3 py-1 bg-amber-100 text-amber-700 rounded font-semibold hover:bg-amber-200 transition cursor-pointer"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(produto.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded font-semibold hover:bg-red-200 transition cursor-pointer"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
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
        title={openNovo ? "Novo Produto" : "Editar Produto"}
        icon={openNovo ? "fas fa-box-open" : "fas fa-edit"}
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <form
            onSubmit={handleSubmit(openNovo ? onSubmitCriar : onSubmitEditar)}
            className="grid gap-6"
          >
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Nome do Produto
              </label>
              <input
                {...register("nome")}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
              <p className="text-red-500 text-xs mt-1">
                {errors.nome?.message}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Categoria
                </label>
                <select
                  {...register("categoria")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                >
                  <option value="">Selecione a categoria</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 text-xs mt-1">
                  {errors.categoria?.message}
                </p>
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Preço (Kz)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("preco")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.preco?.message}
                </p>
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Estoque
                </label>
                <input
                  type="number"
                  {...register("estoque")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.estoque?.message}
                </p>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Imagem do Produto
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("imagem")}
                  className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.imagem?.message}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => {
                  setOpenNovo(false);
                  setOpenEditar(false);
                }}
                className="px-6 py-3 cursor-pointer bg-stone-200 text-stone-800 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`px-6 py-3 cursor-pointer text-white font-semibold rounded-lg ${openNovo ? "bg-[#A2672D]" : "bg-amber-600"}`}
              >
                {openNovo ? "Salvar Produto" : "Salvar Alterações"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </AdminLayout>
  );
}
