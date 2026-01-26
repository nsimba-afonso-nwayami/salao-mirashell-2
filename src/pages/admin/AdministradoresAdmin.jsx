import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";

import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";

import {
  listarAdmins,
  criarAdmin,
  atualizarAdmin,
} from "../../services/adminService";
import { adminSchema } from "../../validations/adminSchema";

export default function AdministradoresAdmin() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openNovo, setOpenNovo] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [adminSelecionado, setAdminSelecionado] = useState(null);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(adminSchema),
  });

  const carregarDados = async () => {
    try {
      setLoading(true);
      const data = await listarAdmins();
      const ordenados = data.sort((a, b) => b.id - a.id);
      setAdmins(ordenados);
    } catch (error) {
      toast.error("Erro ao carregar administradores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const onSubmitCriar = async (data) => {
    try {
      await criarAdmin(data);
      toast.success("Administrador cadastrado!");
      setOpenNovo(false);
      reset();
      carregarDados();
    } catch (err) {
      const apiErrors = err.response?.data;
      if (apiErrors && typeof apiErrors === "object") {
        // Exibe detalhadamente o que a API rejeitou (ex: caracteres inválidos no username)
        Object.keys(apiErrors).forEach((field) => {
          const messages = Array.isArray(apiErrors[field])
            ? apiErrors[field].join(", ")
            : apiErrors[field];
          toast.error(`${field}: ${messages}`);
        });
      } else {
        toast.error("Erro ao cadastrar administrador.");
      }
    }
  };

  const onSubmitEditar = async (data) => {
    try {
      // Se a senha estiver vazia na edição, removemos do objeto para não sobrescrever com vazio
      const dadosParaEnviar = { ...data };
      if (!dadosParaEnviar.password) {
        delete dadosParaEnviar.password;
      }

      await atualizarAdmin(adminSelecionado.id, dadosParaEnviar);
      toast.success("Administrador atualizado!");
      setOpenEditar(false);
      carregarDados();
    } catch (err) {
      toast.error("Erro ao atualizar dados.");
    }
  };

  const prepararEdicao = (admin) => {
    setAdminSelecionado(admin);
    setValue("username", admin.username);
    setValue("email", admin.email);
    setValue("password", ""); // Senha limpa por segurança
    setOpenEditar(true);
  };

  const adminsFiltrados = admins.filter((item) => {
    const termo = termoPesquisa.toLowerCase();
    return (
      termo === "" ||
      item.username?.toLowerCase().includes(termo) ||
      item.email?.toLowerCase().includes(termo) ||
      item.id.toString().includes(termo)
    );
  });

  return (
    <>
      <title>Administradores | Dashboard Mirashell</title>
      <AdminLayout title="Gestão de Administradores">
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h3 className="text-xl font-bold text-[#A2672D]">
              Admins Ativos ({adminsFiltrados.length})
            </h3>
            <button
              onClick={() => {
                reset();
                setOpenNovo(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-[#A2672D] text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md cursor-pointer"
            >
              <i className="fas fa-user-plus"></i> Novo Administrador
            </button>
          </div>

          <div className="mb-6 relative max-w-md">
            <input
              type="text"
              placeholder="Pesquisar por nome, email ou ID..."
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
                  <th className="p-3">Username</th>
                  <th className="p-3">E-mail</th>
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
                ) : adminsFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-stone-400">
                      Nenhum administrador encontrado
                    </td>
                  </tr>
                ) : (
                  adminsFiltrados.map((admin) => (
                    <tr
                      key={admin.id}
                      className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                    >
                      <td className="p-3 font-bold text-stone-400">
                        #{admin.id}
                      </td>
                      <td className="p-3 font-medium text-stone-800">
                        {admin.username}
                      </td>
                      <td className="p-3">{admin.email}</td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => prepararEdicao(admin)}
                            className="px-3 py-1 bg-amber-100 text-amber-700 rounded font-semibold hover:bg-amber-200 transition cursor-pointer"
                          >
                            Editar
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
          title={openNovo ? "Novo Administrador" : "Editar Dados de Acesso"}
          icon={openNovo ? "fas fa-user-shield" : "fas fa-user-edit"}
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <form
              onSubmit={handleSubmit(openNovo ? onSubmitCriar : onSubmitEditar)}
              className="grid gap-6"
            >
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Username
                </label>
                <input
                  {...register("username")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A2672D] focus:outline-none"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A2672D] focus:outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Senha {openEditar && "(Deixe vazio para manter a atual)"}
                </label>
                <input
                  type="password"
                  {...register("password")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A2672D] focus:outline-none"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
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
                  {openNovo ? "Criar Administrador" : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </AdminLayout>
    </>
  );
}
