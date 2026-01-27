import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";

// Importações dos seus serviços e validações
import {
  listarAgendamentos,
  criarAgendamento,
  atualizarAgendamento,
  eliminarAgendamento,
  aprovarAgendamento,
  cancelarAgendamento,
} from "../../services/agendamentosService";
import { listarServicos } from "../../services/servicosService";
import { listarProfissionais } from "../../services/profissionaisService";
import { agendamentosSchema } from "../../validations/agendamentosSchema";

import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";

export default function AgendamentosAdmin() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openNovo, setOpenNovo] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);

  const [filtroStatus, setFiltroStatus] = useState("");
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(agendamentosSchema),
    defaultValues: { status: "pendente" },
  });

  // --- CARREGAMENTO DE DADOS ---
  const carregarDados = async () => {
    try {
      setLoading(true);
      const [dataAgend, dataServ, dataProf] = await Promise.all([
        listarAgendamentos(),
        listarServicos(),
        listarProfissionais(),
      ]);

      // Ordenando do último registro ao primeiro (ID decrescente)
      const ordenados = (dataAgend || []).sort((a, b) => b.id - a.id);

      setAgendamentos(ordenados);
      setServicos(dataServ || []);
      setProfissionais(dataProf || []);
    } catch (error) {
      toast.error("Erro ao carregar dados da API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // --- AÇÕES DO CRUD E STATUS ---
  const handleCriar = async (data) => {
    try {
      await criarAgendamento(data);
      toast.success("Agendamento criado com sucesso!");
      setOpenNovo(false);
      reset();
      carregarDados();
    } catch (err) {
      toast.error("Erro ao criar agendamento");
    }
  };

  const handleEditar = async (data) => {
    try {
      await atualizarAgendamento(agendamentoSelecionado.id, data);
      toast.success("Agendamento atualizado!");
      setOpenEditar(false);
      reset();
      carregarDados();
    } catch (err) {
      toast.error("Erro ao atualizar");
    }
  };

  const handleAprovar = async (id) => {
    try {
      await aprovarAgendamento(id);
      toast.success("Agendamento aprovado!");
      carregarDados();
    } catch (err) {
      toast.error("Erro ao aprovar");
    }
  };

  const handleCancelar = async (id) => {
    try {
      await cancelarAgendamento(id);
      toast.success("Agendamento cancelado!");
      carregarDados();
    } catch (err) {
      toast.error("Erro ao cancelar");
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(`Tem certeza que deseja eliminar o agendamento ${id}?`)
    ) {
      try {
        await eliminarAgendamento(id);
        toast.success("Eliminado com sucesso");
        carregarDados();
      } catch (err) {
        toast.error("Erro ao eliminar");
      }
    }
  };

  const prepararEdicao = (agendamento) => {
    setAgendamentoSelecionado(agendamento);
    reset(agendamento);
    setOpenEditar(true);
  };

  // --- FILTROS ---
  const agendamentosFiltrados = agendamentos.filter((ag) => {
    const buscaMatch =
      termoPesquisa === "" ||
      ag.nome?.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
      ag.servico_nome?.toLowerCase().includes(termoPesquisa.toLowerCase());
    const statusMatch =
      filtroStatus === "" ||
      ag.status?.toLowerCase() === filtroStatus.toLowerCase();
    const dataMatch = dataSelecionada === "" || ag.data === dataSelecionada;
    return buscaMatch && statusMatch && dataMatch;
  });

  const getStatusClasses = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmado":
        return "bg-green-100 text-green-700";
      case "pendente":
        return "bg-amber-100 text-amber-700";
      case "cancelado":
        return "bg-red-100 text-red-700";
      default:
        return "bg-stone-100 text-stone-700";
    }
  };

  return (
    <>
      <title>Agendamentos | Dashboard Mirashell</title>
      <AdminLayout title="Gestão de Agendamentos">
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h3 className="text-xl font-bold text-[#A2672D]">
              Lista de Agendamentos ({agendamentosFiltrados.length})
            </h3>
            <button
              onClick={() => {
                reset({ status: "pendente" });
                setOpenNovo(true);
              }}
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
                  <th className="p-3">Email</th>
                  <th className="p-3">Serviço</th>
                  <th className="p-3 text-center">Data/Hora</th>
                  <th className="p-3">Profissional</th>
                  <th className="p-3">Observações</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="text-stone-600">
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center p-4">
                      Carregando...
                    </td>
                  </tr>
                ) : agendamentosFiltrados.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="text-center p-8 text-stone-400 italic font-medium"
                    >
                      Nenhum resultado encontrado
                    </td>
                  </tr>
                ) : (
                  agendamentosFiltrados.map((ag) => (
                    <tr
                      key={ag.id}
                      className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                    >
                      <td className="p-3 opacity-70">{ag.id}</td>
                      <td className="p-3 font-medium text-stone-800">
                        {ag.nome}
                      </td>
                      <td className="p-3">{ag.email}</td>
                      <td className="p-3">{ag.servico_nome}</td>
                      <td className="p-3 text-center">
                        <div className="font-medium text-stone-700">
                          {ag.data}
                        </div>
                        <div className="text-xs font-bold text-[#A2672D]">
                          {ag.hora}
                        </div>
                      </td>
                      <td className="p-3">
                        {ag.profissional_nome || "Não atribuído"}
                      </td>
                      <td className="p-3 max-w-xs truncate">
                        {ag.observacoes}
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-medium uppercase ${getStatusClasses(ag.status)}`}
                        >
                          {ag.status}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => prepararEdicao(ag)}
                            className="px-3 py-1 bg-amber-100 text-amber-700 rounded font-semibold hover:bg-amber-200 transition cursor-pointer"
                          >
                            Editar
                          </button>
                          {ag.status?.toLowerCase() !== "confirmado" && (
                            <button
                              onClick={() => handleAprovar(ag.id)}
                              className="px-3 py-1 bg-green-100 text-green-700 rounded font-semibold hover:bg-green-200 transition cursor-pointer"
                            >
                              Confirmar
                            </button>
                          )}
                          {ag.status?.toLowerCase() !== "cancelado" && (
                            <button
                              onClick={() => handleCancelar(ag.id)}
                              className="px-3 py-1 bg-red-50 text-red-600 rounded font-semibold hover:bg-red-100 transition cursor-pointer"
                            >
                              Cancelar
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(ag.id)}
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
          title="Novo Agendamento"
          icon="fas fa-calendar-plus"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <form
              onSubmit={handleSubmit(handleCriar)}
              className="grid gap-6 md:grid-cols-2"
            >
              <div className="md:col-span-2">
                <label className="block text-stone-700 font-medium mb-1">
                  Nome do Cliente
                </label>
                <input
                  {...register("nome")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.nome?.message}
                </p>
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Email
                </label>
                <input
                  {...register("email")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Serviço
                </label>
                <select
                  {...register("servico")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                >
                  <option value="">Selecione o serviço</option>
                  {servicos.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nome}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 text-xs mt-1">
                  {errors.servico?.message}
                </p>
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Profissional
                </label>
                <select
                  {...register("profissional")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                >
                  <option value="">Selecione o profissional</option>
                  {profissionais.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 text-xs mt-1">
                  {errors.profissional?.message}
                </p>
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Data
                </label>
                <input
                  type="date"
                  {...register("data")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.data?.message}
                </p>
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Horário
                </label>
                <input
                  type="time"
                  {...register("hora")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.hora?.message}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-stone-700 font-medium mb-1">
                  Observações
                </label>
                <textarea
                  {...register("observacoes")}
                  rows="3"
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

        {/* MODAL EDITAR */}
        <Modal
          isOpen={openEditar}
          onClose={() => setOpenEditar(false)}
          title="Editar Agendamento"
          icon="fas fa-edit"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <form
              onSubmit={handleSubmit(handleEditar)}
              className="grid gap-6 md:grid-cols-2"
            >
              <div className="md:col-span-2">
                <label className="block text-stone-700 font-medium mb-1">
                  Nome do Cliente
                </label>
                <input
                  {...register("nome")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.nome?.message}
                </p>
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Email
                </label>
                <input
                  {...register("email")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.email?.message}
                </p>
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Status
                </label>
                <select
                  {...register("status")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                >
                  <option value="pendente">Pendente</option>
                  <option value="confirmado">Confirmado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
                <p className="text-red-500 text-xs mt-1">
                  {errors.status?.message}
                </p>
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Profissional
                </label>
                <select
                  {...register("profissional")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                >
                  <option value="">Selecione o profissional</option>
                  {profissionais.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nome}
                    </option>
                  ))}
                </select>
                <p className="text-red-500 text-xs mt-1">
                  {errors.profissional?.message}
                </p>
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Data
                </label>
                <input
                  type="date"
                  {...register("data")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.data?.message}
                </p>
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Horário
                </label>
                <input
                  type="time"
                  {...register("hora")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
                <p className="text-red-500 text-xs mt-1">
                  {errors.hora?.message}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-stone-700 font-medium mb-1">
                  Observações
                </label>
                <textarea
                  {...register("observacoes")}
                  rows="3"
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
                  className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg cursor-pointer"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </AdminLayout>
    </>
  );
}
