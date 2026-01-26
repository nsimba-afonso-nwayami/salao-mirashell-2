import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";

import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";

// Importação dos serviços e validação
import {
  listarServicos,
  criarServico,
  atualizarServico,
  eliminarServico,
} from "../../services/servicosService";
import { listarCategorias } from "../../services/categoriasService";
import { servicosSchema } from "../../validations/servicosSchema";

export default function ServicosAdmin() {
  const [servicos, setServicos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openNovo, setOpenNovo] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);

  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(servicosSchema),
  });

  // --- CARREGAMENTO DE DADOS ---
  const carregarDados = async () => {
    try {
      setLoading(true);
      const [dataServ, dataCat] = await Promise.all([
        listarServicos(),
        listarCategorias(),
      ]);
      setServicos(dataServ);
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

  // --- FUNÇÃO PARA OBTER NOME DA CATEGORIA PELO ID ---
  const obterNomeCategoria = (id) => {
    const categoria = categorias.find((cat) => cat.id === id);
    return categoria ? categoria.nome : `ID: ${id}`;
  };

  // --- AÇÕES DO CRUD ---
  const onSubmitCriar = async (data) => {
    try {
      await criarServico(data);
      toast.success("Serviço criado com sucesso!");
      setOpenNovo(false);
      reset();
      carregarDados();
    } catch (err) {
      toast.error("Erro ao criar serviço");
    }
  };

  const onSubmitEditar = async (data) => {
    try {
      await atualizarServico(servicoSelecionado.id, data);
      toast.success("Serviço atualizado!");
      setOpenEditar(false);
      carregarDados();
    } catch (err) {
      toast.error("Erro ao atualizar serviço");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja eliminar o serviço ${id}?`)) {
      try {
        await eliminarServico(id);
        toast.success("Serviço eliminado!");
        carregarDados();
      } catch (err) {
        toast.error("Erro ao eliminar");
      }
    }
  };

  const prepararEdicao = (servico) => {
    setServicoSelecionado(servico);
    setValue("nome", servico.nome);
    setValue("preco", servico.preco);
    setValue("categoria", servico.categoria);
    setOpenEditar(true);
  };

  // --- FILTROS ---
  const servicosFiltrados = servicos.filter((servico) => {
    const buscaMatch =
      termoPesquisa === "" ||
      servico.nome?.toLowerCase().includes(termoPesquisa.toLowerCase());
    const categoriaMatch =
      filtroCategoria === "" || String(servico.categoria) === filtroCategoria;
    return buscaMatch && categoriaMatch;
  });

  const formatarPreco = (preco) =>
    `Kz ${Number(preco).toLocaleString("pt-AO")}`;

  return (
    <AdminLayout title="Gestão de Serviços">
      <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h3 className="text-xl font-bold text-[#A2672D]">
            Lista de Serviços ({servicosFiltrados.length})
          </h3>
          <button
            onClick={() => {
              reset();
              setOpenNovo(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#A2672D] text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md cursor-pointer"
          >
            <i className="fas fa-plus"></i> Novo Serviço
          </button>
        </div>

        {/* FILTROS */}
        <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center mb-6 gap-4 flex-wrap">
          <div className="relative w-full sm:w-auto flex-1">
            <input
              type="text"
              placeholder="Pesquisar serviço..."
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

        {/* TABELA */}
        <div className="overflow-x-auto">
          <table className="min-w-full w-full text-left border-collapse text-sm">
            <thead>
              <tr className="text-[#A2672D] border-b border-stone-200">
                <th className="p-3">ID</th>
                <th className="p-3">Serviço</th>
                <th className="p-3">Categoria</th>
                <th className="p-3 text-right">Preço</th>
                <th className="p-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="text-stone-600">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center">
                    Carregando...
                  </td>
                </tr>
              ) : servicosFiltrados.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-8 text-center text-stone-400 italic font-medium"
                  >
                    Nenhum resultado encontrado
                  </td>
                </tr>
              ) : (
                servicosFiltrados.map((servico) => (
                  <tr
                    key={servico.id}
                    className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                  >
                    <td className="p-3 opacity-70">{servico.id}</td>
                    <td className="p-3 font-medium text-stone-800">
                      {servico.nome}
                    </td>
                    <td className="p-3">
                      <span className="bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full text-xs font-medium">
                        {obterNomeCategoria(servico.categoria)}
                      </span>
                    </td>
                    <td className="p-3 text-right font-bold text-[#A2672D]">
                      {formatarPreco(servico.preco)}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => prepararEdicao(servico)}
                          className="px-3 py-1 bg-amber-100 text-amber-700 rounded font-semibold hover:bg-amber-200 transition cursor-pointer"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(servico.id)}
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

      {/* MODAL NOVO */}
      <Modal
        isOpen={openNovo}
        onClose={() => setOpenNovo(false)}
        title="Novo Serviço"
        icon="fas fa-paint-brush"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <form onSubmit={handleSubmit(onSubmitCriar)} className="grid gap-6">
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Nome do Serviço
              </label>
              <input
                {...register("nome")}
                placeholder="Ex: Botox cabelo curto"
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
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.preco?.message}
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setOpenNovo(false)}
                className="px-6 py-3 bg-stone-200 text-stone-800 rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#A2672D] text-white font-semibold rounded-lg cursor-pointer"
              >
                Salvar Serviço
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* MODAL EDITAR */}
      <Modal
        isOpen={openEditar}
        onClose={() => setOpenEditar(false)}
        title="Editar Serviço"
        icon="fas fa-edit"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <form onSubmit={handleSubmit(onSubmitEditar)} className="grid gap-6">
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Nome do Serviço
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
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setOpenEditar(false)}
                className="px-6 py-3 bg-stone-200 text-stone-800 rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg cursor-pointer"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </AdminLayout>
  );
}
