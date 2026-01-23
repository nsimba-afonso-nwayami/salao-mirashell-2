import { useState } from "react";
import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";
import { toast } from "react-hot-toast";

export default function AgendamentosAdmin() {
  const [openNovo, setOpenNovo] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState("");
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const todosAgendamentos = [
    {
      id: 201,
      nomeCliente: "Esmeralda Mendes",
      servico: "Unhas de Gel",
      data: "2025-12-16",
      hora: "09:00",
      profissional: "Sofia",
      status: "Confirmado",
      telefone: "923123456",
      email: "esmeralda@mail.com",
    },
    {
      id: 202,
      nomeCliente: "Adilson Ngola",
      servico: "Corte Masculino",
      data: "2025-12-16",
      hora: "10:00",
      profissional: "Pedro",
      status: "Confirmado",
      telefone: "912456789",
      email: "adilson@mail.com",
    },
  ];

  const agendamentosFiltrados = todosAgendamentos.filter((agendamento) => {
    const buscaMatch =
      termoPesquisa.toLowerCase() === "" ||
      agendamento.nomeCliente
        .toLowerCase()
        .includes(termoPesquisa.toLowerCase()) ||
      agendamento.servico.toLowerCase().includes(termoPesquisa.toLowerCase());
    const statusMatch =
      filtroStatus === "" || agendamento.status === filtroStatus;
    const dataMatch =
      dataSelecionada === "" || agendamento.data === dataSelecionada;
    return buscaMatch && statusMatch && dataMatch;
  });

  const handleEdit = (agendamento) => {
    setAgendamentoSelecionado(agendamento);
    setOpenEditar(true);
  };

  const handleDelete = (id) => {
    if (
      window.confirm(`Tem certeza que deseja eliminar o agendamento ${id}?`)
    ) {
      toast.error(`Agendamento ${id} eliminado`);
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "Confirmado":
        return "bg-green-100 text-green-700";
      case "Pendente":
        return "bg-amber-100 text-amber-700";
      case "Cancelado":
        return "bg-red-100 text-red-700";
      default:
        return "bg-stone-100 text-stone-700";
    }
  };

  return (
    <AdminLayout title="Gestão de Agendamentos">
      <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h3 className="text-xl font-bold text-[#A2672D]">
            Lista de Agendamentos ({agendamentosFiltrados.length})
          </h3>
          <button
            onClick={() => setOpenNovo(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#A2672D] text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md cursor-pointer"
          >
            <i className="fas fa-plus"></i> Novo Agendamento
          </button>
        </div>

        {/* FILTROS */}
        <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center mb-6 gap-4 flex-wrap">
          <div className="relative w-full sm:w-auto flex-1">
            <input
              type="text"
              placeholder="Pesquisar Cliente ou Serviço..."
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
              className="w-full py-2 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-lg focus:ring-[#A2672D] focus:border-[#A2672D]"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"></i>
          </div>

          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="w-full sm:w-auto py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg"
          >
            <option value="">Status (Todos)</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Pendente">Pendente</option>
            <option value="Cancelado">Cancelado</option>
          </select>

          <input
            type="date"
            value={dataSelecionada}
            onChange={(e) => setDataSelecionada(e.target.value)}
            className="w-full sm:w-auto py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg"
          />
        </div>

        {/* TABELA */}
        <div className="overflow-x-auto">
          <table className="min-w-full w-full text-left border-collapse text-sm">
            <thead>
              <tr className="text-[#A2672D] border-b border-stone-200">
                <th className="p-3">ID</th>
                <th className="p-3">Cliente</th>
                <th className="p-3">Serviço</th>
                <th className="p-3 text-center">Data/Hora</th>
                <th className="p-3">Profissional</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="text-stone-600">
              {agendamentosFiltrados.map((agendamento) => (
                <tr
                  key={agendamento.id}
                  className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                >
                  <td className="p-3 opacity-70">{agendamento.id}</td>
                  <td className="p-3 font-medium text-stone-800">
                    {agendamento.nomeCliente}
                  </td>
                  <td className="p-3">{agendamento.servico}</td>
                  <td className="p-3 text-center">
                    <div className="font-medium text-stone-700">
                      {agendamento.data}
                    </div>
                    <div className="text-xs font-bold text-[#A2672D]">
                      {agendamento.hora}
                    </div>
                  </td>
                  <td className="p-3">{agendamento.profissional}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${getStatusClasses(agendamento.status)}`}
                    >
                      {agendamento.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(agendamento)}
                        className="px-3 py-1 bg-amber-100 text-amber-700 rounded font-semibold hover:bg-amber-200 transition cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(agendamento.id)}
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

      {/* MODAL NOVO AGENDAMENTO */}
      <Modal
        isOpen={openNovo}
        onClose={() => setOpenNovo(false)}
        title="Novo Agendamento"
        icon="fas fa-calendar-plus"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-800">
              Novo Agendamento
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Preencha os dados abaixo para agendar o atendimento
            </p>
          </div>
          <form className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-stone-700 font-medium mb-1">
                Nome do Cliente
              </label>
              <input
                type="text"
                placeholder="Digite o nome completo"
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Telefone
              </label>
              <input
                type="tel"
                placeholder="9XX XXX XXX"
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="email@exemplo.com"
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Serviço
              </label>
              <select className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none">
                <option value="">Selecione o serviço</option>
                <option>Corte Masculino</option>
                <option>Unhas de Gel</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Profissional
              </label>
              <select className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none">
                <option value="">Selecione o profissional</option>
                <option>Sofia</option>
                <option>Pedro</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Data
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Horário
              </label>
              <input
                type="time"
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
                Confirmar Agendamento
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* MODAL EDITAR AGENDAMENTO */}
      <Modal
        isOpen={openEditar}
        onClose={() => setOpenEditar(false)}
        title="Editar Agendamento"
        icon="fas fa-edit"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-800">
              Editar Agendamento
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Atualize as informações do agendamento abaixo
            </p>
          </div>
          <form className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-stone-700 font-medium mb-1">
                Nome do Cliente
              </label>
              <input
                type="text"
                defaultValue={agendamentoSelecionado?.nomeCliente || ""}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Telefone
              </label>
              <input
                type="tel"
                defaultValue={agendamentoSelecionado?.telefone || ""}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue={agendamentoSelecionado?.email || ""}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Serviço
              </label>
              <select
                defaultValue={agendamentoSelecionado?.servico || ""}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                <option>Corte Masculino</option>
                <option>Unhas de Gel</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Profissional
              </label>
              <select
                defaultValue={agendamentoSelecionado?.profissional || ""}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                <option>Sofia</option>
                <option>Pedro</option>
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Data
              </label>
              <input
                type="date"
                defaultValue={agendamentoSelecionado?.data || ""}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Horário
              </label>
              <input
                type="time"
                defaultValue={agendamentoSelecionado?.hora || ""}
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
