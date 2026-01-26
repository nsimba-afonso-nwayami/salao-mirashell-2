import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";

import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";

import {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  eliminarCategoria,
} from "../../services/categoriasService";
import { categoriaSchema } from "../../validations/categoriaSchema";

export default function CategoriasAdmin() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openNovo, setOpenNovo] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(categoriaSchema),
  });

  const carregarCategorias = async () => {
    try {
      setLoading(true);
      const data = await listarCategorias();
      setCategorias(data);
    } catch (error) {
      toast.error("Erro ao carregar categorias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const onSubmitCriar = async (data) => {
    try {
      await criarCategoria(data);
      toast.success("Categoria criada!");
      setOpenNovo(false);
      reset();
      carregarCategorias();
    } catch (err) {
      toast.error("Erro ao criar categoria");
    }
  };

  const onSubmitEditar = async (data) => {
    try {
      await atualizarCategoria(categoriaSelecionada.id, data);
      toast.success("Categoria atualizada!");
      setOpenEditar(false);
      carregarCategorias();
    } catch (err) {
      toast.error("Erro ao atualizar");
    }
  };

  const handleDelete = async (id, nome) => {
    if (
      window.confirm(
        `Eliminar categoria "${nome}"? Serviços associados podem ser afetados.`,
      )
    ) {
      try {
        await eliminarCategoria(id);
        toast.success("Categoria eliminada");
        carregarCategorias();
      } catch (err) {
        toast.error(
          "Erro ao eliminar. Verifique se existem serviços vinculados.",
        );
      }
    }
  };

  const prepararEdicao = (cat) => {
    setCategoriaSelecionada(cat);
    setValue("nome", cat.nome);
    setOpenEditar(true);
  };

  const categoriasFiltradas = categorias.filter(
    (cat) =>
      termoPesquisa === "" ||
      cat.nome.toLowerCase().includes(termoPesquisa.toLowerCase()),
  );

  return (
    <AdminLayout title="Gestão de Categorias">
      <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h3 className="text-xl font-bold text-[#A2672D]">
            Lista de Categorias ({categoriasFiltradas.length})
          </h3>
          <button
            onClick={() => {
              reset();
              setOpenNovo(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#A2672D] text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md cursor-pointer"
          >
            <i className="fas fa-plus"></i> Nova Categoria
          </button>
        </div>

        {/* FILTRO */}
        <div className="mb-6">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Pesquisar categoria..."
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
              className="w-full py-2 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-lg focus:ring-[#A2672D] focus:border-[#A2672D]"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"></i>
          </div>
        </div>

        {/* TABELA */}
        <div className="overflow-x-auto">
          <table className="min-w-full w-full text-left border-collapse text-sm">
            <thead>
              <tr className="text-[#A2672D] border-b border-stone-200">
                <th className="p-3">ID</th>
                <th className="p-3">Nome da Categoria</th>
                <th className="p-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="text-stone-600">
              {loading ? (
                <tr>
                  <td colSpan="3" className="p-4 text-center">
                    Carregando...
                  </td>
                </tr>
              ) : categoriasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-stone-400">
                    Nenhuma categoria encontrada
                  </td>
                </tr>
              ) : (
                categoriasFiltradas.map((cat) => (
                  <tr
                    key={cat.id}
                    className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                  >
                    <td className="p-3 opacity-70">#{cat.id}</td>
                    <td className="p-3 font-medium text-stone-800 uppercase tracking-wider">
                      {cat.nome}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => prepararEdicao(cat)}
                          className="px-3 py-1 bg-amber-100 text-amber-700 rounded font-semibold hover:bg-amber-200 transition cursor-pointer"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id, cat.nome)}
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
        title="Nova Categoria"
        icon="fas fa-tags"
      >
        <form
          onSubmit={handleSubmit(onSubmitCriar)}
          className="max-w-xl mx-auto space-y-4"
        >
          <div>
            <label className="block text-stone-700 font-medium mb-1">
              Nome da Categoria
            </label>
            <input
              {...register("nome")}
              placeholder="Ex: Cabeleireiro"
              className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
            <p className="text-red-500 text-xs mt-1">{errors.nome?.message}</p>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setOpenNovo(false)}
              className="px-6 py-2 cursor-pointer bg-stone-200 text-stone-800 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 cursor-pointer bg-[#A2672D] text-white font-semibold rounded-lg"
            >
              Criar Categoria
            </button>
          </div>
        </form>
      </Modal>

      {/* MODAL EDITAR */}
      <Modal
        isOpen={openEditar}
        onClose={() => setOpenEditar(false)}
        title="Editar Categoria"
        icon="fas fa-edit"
      >
        <form
          onSubmit={handleSubmit(onSubmitEditar)}
          className="max-w-xl mx-auto space-y-4"
        >
          <div>
            <label className="block text-stone-700 font-medium mb-1">
              Nome da Categoria
            </label>
            <input
              {...register("nome")}
              className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
            <p className="text-red-500 text-xs mt-1">{errors.nome?.message}</p>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setOpenEditar(false)}
              className="px-6 py-2 cursor-pointer bg-stone-200 text-stone-800 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 cursor-pointer bg-amber-600 text-white font-semibold rounded-lg"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </Modal>
    </AdminLayout>
  );
}
