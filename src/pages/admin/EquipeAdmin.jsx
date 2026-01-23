import { useState } from "react";
import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";
import { toast } from "react-hot-toast";

export default function EquipeAdmin() {
  const [openNovo, setOpenNovo] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [membroSelecionado, setMembroSelecionado] = useState(null);
  const [filtroEspecialidade, setFiltroEspecialidade] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const todosMembros = [
    {
      id: 501,
      nome: "Sofia Almeida",
      especialidade: "Cabeleireira Master",
      telefone: "921 111 222",
      email: "sofia.a@salao.com",
      tipo: "Admin",
    },
    {
      id: 502,
      nome: "Carlos Viana",
      especialidade: "Manicure & Pedicure",
      telefone: "912 333 444",
      email: "carlos.v@salao.com",
      tipo: "Funcionário",
    },
    {
      id: 503,
      nome: "Helena Santos",
      especialidade: "Esteticista Facial",
      telefone: "934 555 666",
      email: "helena.s@salao.com",
      tipo: "Gerente",
    },
  ];

  const especialidades = [
    "Cabeleireira Master",
    "Manicure & Pedicure",
    "Esteticista Facial",
    "Massagista",
  ];
  const tiposUsuario = ["Admin", "Gerente", "Funcionário"];

  const membrosFiltrados = todosMembros.filter((membro) => {
    const termo = termoPesquisa.toLowerCase();
    const buscaMatch =
      termo === "" ||
      membro.nome.toLowerCase().includes(termo) ||
      membro.telefone.includes(termo) ||
      membro.id.toString().includes(termo);
    const especialidadeMatch =
      filtroEspecialidade === "" ||
      membro.especialidade === filtroEspecialidade;
    return buscaMatch && especialidadeMatch;
  });

  const handleEdit = (membro) => {
    setMembroSelecionado(membro);
    setOpenEditar(true);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Tem certeza que deseja eliminar o membro ${id}?`)) {
      toast.error(`Membro ${id} eliminado`);
    }
  };

  const getTipoClasses = (tipo) => {
    switch (tipo) {
      case "Admin":
        return "bg-red-100 text-red-700";
      case "Gerente":
        return "bg-blue-100 text-blue-700";
      case "Funcionário":
        return "bg-green-100 text-green-700";
      default:
        return "bg-stone-100 text-stone-700";
    }
  };

  return (
    <AdminLayout title="Gestão de Equipe">
      <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h3 className="text-xl font-bold text-[#A2672D]">
            Membros da Equipe ({membrosFiltrados.length})
          </h3>
          <button
            onClick={() => setOpenNovo(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#A2672D] text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md cursor-pointer"
          >
            <i className="fas fa-user-plus"></i> Novo Membro
          </button>
        </div>

        {/* BARRA DE PESQUISA E FILTROS */}
        <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center mb-6 gap-4 flex-wrap">
          <div className="relative w-full sm:w-auto flex-1">
            <input
              type="text"
              placeholder="Pesquisar nome, telefone ou ID..."
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
              className="w-full py-2 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-lg focus:ring-[#A2672D] focus:border-[#A2672D]"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"></i>
          </div>

          <select
            value={filtroEspecialidade}
            onChange={(e) => setFiltroEspecialidade(e.target.value)}
            className="w-full sm:w-auto py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-700"
          >
            <option value="">Especialidade (Todas)</option>
            {especialidades.map((esp) => (
              <option key={esp} value={esp}>
                {esp}
              </option>
            ))}
          </select>
        </div>

        {/* TABELA PADRONIZADA */}
        <div className="overflow-x-auto">
          <table className="min-w-full w-full text-left border-collapse text-sm">
            <thead>
              <tr className="text-[#A2672D] border-b border-stone-200">
                <th className="p-3">ID</th>
                <th className="p-3">Nome</th>
                <th className="p-3">Especialidade</th>
                <th className="p-3">Telefone</th>
                <th className="p-3 hidden lg:table-cell">E-mail</th>
                <th className="p-3 text-center">Tipo</th>
                <th className="p-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="text-stone-600">
              {membrosFiltrados.map((membro) => (
                <tr
                  key={membro.id}
                  className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                >
                  <td className="p-3 opacity-70">#{membro.id}</td>
                  <td className="p-3 font-medium text-stone-800">
                    {membro.nome}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {membro.especialidade}
                  </td>
                  <td className="p-3 whitespace-nowrap">{membro.telefone}</td>
                  <td className="p-3 hidden lg:table-cell text-xs">
                    {membro.email}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${getTipoClasses(membro.tipo)}`}
                    >
                      {membro.tipo}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(membro)}
                        className="px-3 py-1 bg-amber-100 text-amber-700 rounded font-semibold hover:bg-amber-200 transition cursor-pointer text-[11px]"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(membro.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded font-semibold hover:bg-red-200 transition cursor-pointer text-[11px]"
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

      {/* MODAL NOVO MEMBRO COM TODOS OS CAMPOS */}
      <Modal
        isOpen={openNovo}
        onClose={() => setOpenNovo(false)}
        title="Novo Membro"
        icon="fas fa-user-plus"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-800">
              Cadastrar Colaborador
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Preencha os dados do novo membro da equipe
            </p>
          </div>
          <form className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-stone-700 font-medium mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                placeholder="Nome do colaborador"
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Especialidade
              </label>
              <select className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none">
                <option value="">Selecione</option>
                {especialidades.map((esp) => (
                  <option key={esp}>{esp}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Tipo de Usuário
              </label>
              <select className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none">
                {tiposUsuario.map((tipo) => (
                  <option key={tipo}>{tipo}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Telefone
              </label>
              <input
                type="text"
                placeholder="9xx xxx xxx"
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                E-mail
              </label>
              <input
                type="email"
                placeholder="exemplo@salao.com"
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
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
                Salvar Membro
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* MODAL EDITAR MEMBRO COM TODOS OS CAMPOS */}
      <Modal
        isOpen={openEditar}
        onClose={() => setOpenEditar(false)}
        title="Editar Perfil"
        icon="fas fa-user-edit"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-800">
              Atualizar Dados
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Modifique as informações de {membroSelecionado?.nome}
            </p>
          </div>
          <form className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-stone-700 font-medium mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                defaultValue={membroSelecionado?.nome}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Especialidade
              </label>
              <select
                defaultValue={membroSelecionado?.especialidade}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                {especialidades.map((esp) => (
                  <option key={esp}>{esp}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Tipo de Usuário
              </label>
              <select
                defaultValue={membroSelecionado?.tipo}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                {tiposUsuario.map((tipo) => (
                  <option key={tipo}>{tipo}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Telefone
              </label>
              <input
                type="text"
                defaultValue={membroSelecionado?.telefone}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                E-mail
              </label>
              <input
                type="email"
                defaultValue={membroSelecionado?.email}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setOpenEditar(false)}
                className="px-6 py-3 bg-stone-200 text-stone-800 rounded-lg cursor-pointer"
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
