import { useState } from "react";
import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";
import { toast } from "react-hot-toast";

export default function ServicosAdmin() {
  const [openNovo, setOpenNovo] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const todosServicos = [
    {
      id: 1,
      nome: "Corte e Lavagem (Masculino)",
      preco: 3500,
      duracaoMin: 30,
      categoria: "Cabelo",
      ativo: true,
    },
    {
      id: 2,
      nome: "Manicure Clássica",
      preco: 2000,
      duracaoMin: 45,
      categoria: "Unhas",
      ativo: true,
    },
    {
      id: 3,
      nome: "Tranças Box Braid (Completo)",
      preco: 18000,
      duracaoMin: 180,
      categoria: "Cabelo",
      ativo: true,
    },
  ];

  const categorias = ["Cabelo", "Unhas", "Estética"];

  const servicosFiltrados = todosServicos.filter((servico) => {
    const buscaMatch =
      termoPesquisa.toLowerCase() === "" ||
      servico.nome.toLowerCase().includes(termoPesquisa.toLowerCase());
    const categoriaMatch =
      filtroCategoria === "" || servico.categoria === filtroCategoria;
    return buscaMatch && categoriaMatch;
  });

  const handleEdit = (servico) => {
    setServicoSelecionado(servico);
    setOpenEditar(true);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Tem certeza que deseja eliminar o serviço ${id}?`)) {
      toast.error(`Serviço ${id} eliminado`);
    }
  };

  const formatarPreco = (preco) => `Kz ${preco.toLocaleString("pt-AO")}`;

  return (
    <AdminLayout title="Gestão de Serviços">
      <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h3 className="text-xl font-bold text-[#A2672D]">
            Lista de Serviços ({servicosFiltrados.length})
          </h3>
          <button
            onClick={() => setOpenNovo(true)}
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
            className="w-full sm:w-auto py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg"
          >
            <option value="">Categoria (Todas)</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
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
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="text-stone-600">
              {servicosFiltrados.map((servico) => (
                <tr
                  key={servico.id}
                  className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                >
                  <td className="p-3 opacity-70">{servico.id}</td>
                  <td className="p-3 font-medium text-stone-800">
                    {servico.nome}
                  </td>
                  <td className="p-3">{servico.categoria}</td>
                  <td className="p-3 text-right font-bold text-[#A2672D]">
                    {formatarPreco(servico.preco)}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${servico.ativo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                    >
                      {servico.ativo ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(servico)}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL NOVO SERVIÇO (Seguindo o padrão Agendamentos) */}
      <Modal
        isOpen={openNovo}
        onClose={() => setOpenNovo(false)}
        title="Novo Serviço"
        icon="fas fa-paint-brush"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-800">Novo Serviço</h2>
            <p className="text-stone-500 text-sm mt-1">
              Cadastre um novo serviço no sistema
            </p>
          </div>
          <form className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-stone-700 font-medium mb-1">
                Nome do Serviço
              </label>
              <input
                type="text"
                placeholder="Ex: Manicure e Pedicure"
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Categoria
              </label>
              <select className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none">
                <option value="">Selecione</option>
                {categorias.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Preço (Kz)
              </label>
              <input
                type="number"
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-stone-700 font-medium mb-1">
                Duração Estimada (Minutos)
              </label>
              <input
                type="number"
                placeholder="Ex: 60"
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
                Salvar Serviço
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* MODAL EDITAR SERVIÇO (Seguindo o padrão Agendamentos) */}
      <Modal
        isOpen={openEditar}
        onClose={() => setOpenEditar(false)}
        title="Editar Serviço"
        icon="fas fa-edit"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-800">
              Editar Serviço
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Atualize os dados do serviço selecionado
            </p>
          </div>
          <form className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-stone-700 font-medium mb-1">
                Nome do Serviço
              </label>
              <input
                type="text"
                defaultValue={servicoSelecionado?.nome || ""}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Categoria
              </label>
              <select
                defaultValue={servicoSelecionado?.categoria || ""}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                {categorias.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Preço (Kz)
              </label>
              <input
                type="number"
                defaultValue={servicoSelecionado?.preco || ""}
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
