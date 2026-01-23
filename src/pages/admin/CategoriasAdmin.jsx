import { useState } from "react";
import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";
import { toast } from "react-hot-toast";

export default function CategoriasAdmin() {
  const [openNovo, setOpenNovo] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const todasCategorias = [
    {
      id: 10,
      nome: "Cabelo",
      descricao: "Serviços de corte, styling e tratamentos capilares.",
      servicosAssociados: 7,
    },
    {
      id: 20,
      nome: "Unhas",
      descricao: "Manicure, pedicure e alongamento de unhas.",
      servicosAssociados: 4,
    },
    {
      id: 30,
      nome: "Estética Facial",
      descricao: "Limpeza de pele e massagens faciais.",
      servicosAssociados: 3,
    },
  ];

  const categoriasFiltradas = todasCategorias.filter(
    (cat) =>
      termoPesquisa === "" ||
      cat.nome.toLowerCase().includes(termoPesquisa.toLowerCase()),
  );

  const handleEdit = (categoria) => {
    setCategoriaSelecionada(categoria);
    setOpenEditar(true);
  };

  const handleDelete = (id, nome) => {
    if (
      window.confirm(`Tem certeza que deseja eliminar a categoria "${nome}"?`)
    ) {
      toast.error(`Categoria ${nome} eliminada`);
    }
  };

  // ===============================
  // JSX (IGUAL AO SEU)
  // ===============================

  return (
    <AdminLayout title="Gestão de Categorias">
      <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h3 className="text-xl font-bold text-[#A2672D]">
            Lista de Categorias ({categoriasFiltradas.length})
          </h3>
          <button
            onClick={() => setOpenNovo(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#A2672D] text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md cursor-pointer"
          >
            <i className="fas fa-plus"></i> Nova Categoria
          </button>
        </div>

        {/* FILTROS */}
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
                <th className="p-3">Nome</th>
                <th className="p-3">Descrição</th>
                <th className="p-3 text-center">Itens Associados</th>
                <th className="p-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="text-stone-600">
              {categoriasFiltradas.map((categoria) => (
                <tr
                  key={categoria.id}
                  className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                >
                  <td className="p-3 opacity-70">#{categoria.id}</td>
                  <td className="p-3 font-medium text-stone-800">
                    {categoria.nome}
                  </td>
                  <td className="p-3 max-w-xs truncate">
                    {categoria.descricao}
                  </td>
                  <td className="p-3 text-center font-bold text-[#A2672D]">
                    {categoria.servicosAssociados}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(categoria)}
                        className="px-3 py-1 bg-amber-100 text-amber-700 rounded font-semibold hover:bg-amber-200 transition cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(categoria.id, categoria.nome)
                        }
                        className="px-3 py-1 bg-red-100 text-red-700 rounded font-semibold hover:bg-red-200 transition cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL NOVA CATEGORIA */}
      <Modal
        isOpen={openNovo}
        onClose={() => setOpenNovo(false)}
        title="Nova Categoria"
        icon="fas fa-tags"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-800">
              Nova Categoria
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Defina uma nova categoria para agrupar serviços ou produtos
            </p>
          </div>
          <form className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-stone-700 font-medium mb-1">
                Nome da Categoria
              </label>
              <input
                type="text"
                placeholder="Ex: Estética Facial"
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-stone-700 font-medium mb-1">
                Descrição
              </label>
              <textarea
                rows="3"
                placeholder="Breve descrição da categoria..."
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setOpenNovo(false)}
                className="px-6 py-3 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#A2672D] text-white font-semibold rounded-lg cursor-pointer"
              >
                Criar Categoria
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* MODAL EDITAR CATEGORIA */}
      <Modal
        isOpen={openEditar}
        onClose={() => setOpenEditar(false)}
        title="Editar Categoria"
        icon="fas fa-edit"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-800">
              Editar Categoria
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Atualize as informações da categoria selecionada
            </p>
          </div>
          <form className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-stone-700 font-medium mb-1">
                Nome da Categoria
              </label>
              <input
                type="text"
                defaultValue={categoriaSelecionada?.nome || ""}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-stone-700 font-medium mb-1">
                Descrição
              </label>
              <textarea
                rows="3"
                defaultValue={categoriaSelecionada?.descricao || ""}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setOpenEditar(false)}
                className="px-6 py-3 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#A2672D] text-white font-semibold rounded-lg cursor-pointer"
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
