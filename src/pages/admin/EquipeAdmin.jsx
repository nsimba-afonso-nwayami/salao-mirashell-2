import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";

import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";

import {
  listarProfissionais,
  criarProfissional,
  atualizarProfissional,
  eliminarProfissional,
} from "../../services/profissionaisService";
import { profissionalSchema } from "../../validations/profissionalSchema";

export default function EquipeAdmin() {
  const [profissionais, setProfissionais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openNovo, setOpenNovo] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [membroSelecionado, setMembroSelecionado] = useState(null);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profissionalSchema),
  });

  // --- CARREGAMENTO DE DADOS COM ORDENAÇÃO DECRESCENTE ---
  const carregarDados = async () => {
    try {
      setLoading(true);
      const data = await listarProfissionais();

      // Ordena do maior ID para o menor (Mais recente primeiro)
      const ordenados = data.sort((a, b) => b.id - a.id);

      setProfissionais(ordenados);
    } catch (error) {
      toast.error("Erro ao carregar profissionais");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const onSubmitCriar = async (data) => {
    try {
      await criarProfissional({ nome: data.nome, telefone: data.telefone });
      toast.success("Profissional cadastrado!");
      setOpenNovo(false);
      reset();
      carregarDados();
    } catch (err) {
      toast.error("Erro ao cadastrar");
    }
  };

  const onSubmitEditar = async (data) => {
    try {
      await atualizarProfissional(membroSelecionado.id, {
        nome: data.nome,
        telefone: data.telefone,
      });
      toast.success("Profissional atualizado!");
      setOpenEditar(false);
      carregarDados();
    } catch (err) {
      toast.error("Erro ao atualizar");
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(`Tem certeza que deseja eliminar o profissional ${id}?`)
    ) {
      try {
        await eliminarProfissional(id);
        toast.success("Profissional eliminado!");
        carregarDados();
      } catch (err) {
        toast.error("Erro ao eliminar");
      }
    }
  };

  const prepararEdicao = (membro) => {
    setMembroSelecionado(membro);
    setValue("nome", membro.nome);
    setValue("telefone", membro.telefone);
    setOpenEditar(true);
  };

  const profissionaisFiltrados = profissionais.filter((membro) => {
    const termo = termoPesquisa.toLowerCase();
    return (
      termo === "" ||
      membro.nome?.toLowerCase().includes(termo) ||
      membro.id.toString().includes(termo)
    );
  });

  return (
    <>
      <title>Profissionais | Dashboard Mirashell</title>
      <AdminLayout title="Gestão de Profissionais">
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h3 className="text-xl font-bold text-[#A2672D]">
              Equipe Ativa ({profissionaisFiltrados.length})
            </h3>
            <button
              onClick={() => {
                reset();
                setOpenNovo(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#A2672D] text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md cursor-pointer"
            >
              <i className="fas fa-plus"></i> Novo Profissional
            </button>
          </div>

          <div className="mb-6 relative max-w-md">
            <input
              type="text"
              placeholder="Pesquisar por nome ou ID..."
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
              className="w-full py-2 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-lg focus:ring-[#A2672D]"
            />
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"></i>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full w-full text-left border-collapse text-sm">
              <thead>
                <tr className="text-[#A2672D] border-b border-stone-200">
                  <th className="p-3">ID</th>
                  <th className="p-3">Nome</th>
                  <th className="p-3">Contacto</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="text-stone-600">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-4 text-center">
                      Carregando...
                    </td>
                  </tr>
                ) : profissionaisFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-stone-400">
                      Nenhum profissional cadastrado
                    </td>
                  </tr>
                ) : (
                  profissionaisFiltrados.map((membro) => (
                    <tr
                      key={membro.id}
                      className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                    >
                      <td className="p-3 font-bold text-stone-400">
                        #{membro.id}
                      </td>
                      <td className="p-3 font-medium text-stone-800">
                        {membro.nome}
                      </td>
                      <td className="p-3 font-mono">{membro.telefone}</td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => prepararEdicao(membro)}
                            className="px-3 py-1 bg-amber-100 text-amber-700 rounded font-semibold hover:bg-amber-200 transition cursor-pointer"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(membro.id)}
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
          title={openNovo ? "Novo Profissional" : "Editar Profissional"}
          icon={openNovo ? "fas fa-user-plus" : "fas fa-edit"}
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <form
              onSubmit={handleSubmit(openNovo ? onSubmitCriar : onSubmitEditar)}
              className="grid gap-6"
            >
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Nome do Profissional
                </label>
                <input
                  {...register("nome")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
                {errors.nome && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.nome.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Telefone
                </label>
                <input
                  {...register("telefone")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none font-mono"
                />
                {errors.telefone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.telefone.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpenNovo(false);
                    setOpenEditar(false);
                  }}
                  className="px-6 py-3 bg-stone-200 text-stone-800 rounded-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={`px-6 py-3 text-white font-semibold rounded-lg cursor-pointer ${openNovo ? "bg-[#A2672D]" : "bg-amber-600"}`}
                >
                  {openNovo ? "Salvar Profissional" : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </AdminLayout>
    </>
  );
}
