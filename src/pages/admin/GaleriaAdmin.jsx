import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";

import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";

import {
  listarGaleria,
  criarGaleria,
  eliminarGaleria,
} from "../../services/galeriaService";
import { galeriaSchema } from "../../validations/galeriaSchema";

export default function GaleriaAdmin() {
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openNovo, setOpenNovo] = useState(false);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(galeriaSchema),
  });

  const formatImageUrl = (url) => {
    if (!url) return "";
    return url.includes("/media/") && !url.includes("/api/media/")
      ? url.replace("/media/", "/api/media/")
      : url;
  };

  const carregarDados = async () => {
    try {
      setLoading(true);
      const data = await listarGaleria();
      const ordenados = data.sort((a, b) => b.id - a.id);
      setFotos(ordenados);
    } catch (error) {
      toast.error("Erro ao carregar galeria");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const onSubmitCriar = async (data) => {
    // Trava de segurança no envio
    if (fotos.length >= 6) {
      toast.error("Limite de 6 imagens atingido! Elimine uma para continuar.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await criarGaleria(formData);
      toast.success("Foto publicada com sucesso!");
      setOpenNovo(false);
      reset();
      carregarDados();
    } catch (err) {
      console.error("Erro detalhado da API:", err.response?.data);
      toast.error("Erro ao subir imagem. Verifique os campos.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja eliminar a imagem ${id}?`)) {
      try {
        await eliminarGaleria(id);
        toast.success("Imagem eliminada!");
        carregarDados();
      } catch (err) {
        toast.error("Erro ao eliminar");
      }
    }
  };

  const fotosFiltradas = fotos.filter(
    (f) =>
      termoPesquisa === "" ||
      f.title?.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
      f.id.toString().includes(termoPesquisa),
  );

  return (
    <>
      <title>Galeria | Dashboard Mirashell</title>
      <AdminLayout title="Gestão da Galeria">
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h3 className="text-xl font-bold text-[#A2672D]">
              Imagens na Galeria ({fotos.length}/6)
            </h3>

            {/* Botão com feedback visual de bloqueio */}
            <button
              onClick={() => {
                if (fotos.length >= 6) {
                  toast.error("Limite atingido! Elimine uma imagem primeiro.");
                } else {
                  reset();
                  setOpenNovo(true);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 font-semibold rounded-lg transition-all shadow-md cursor-pointer ${
                fotos.length >= 6
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-[#A2672D] text-white hover:opacity-90"
              }`}
            >
              <i
                className={`fas ${fotos.length >= 6 ? "fa-lock" : "fa-plus"}`}
              ></i>
              {fotos.length >= 6 ? "Limite Atingido" : "Nova Imagem"}
            </button>
          </div>

          <div className="mb-6 relative max-w-md">
            <input
              type="text"
              placeholder="Pesquisar por título ou ID..."
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
                  <th className="p-3">Preview</th>
                  <th className="p-3">Título</th>
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
                ) : fotosFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-stone-400">
                      Nenhuma imagem encontrada
                    </td>
                  </tr>
                ) : (
                  fotosFiltradas.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                    >
                      <td className="p-3 font-bold text-stone-400">
                        #{item.id}
                      </td>
                      <td className="p-3">
                        <img
                          src={formatImageUrl(item.image)}
                          className="w-16 h-12 rounded object-cover border border-stone-200"
                          alt=""
                        />
                      </td>
                      <td className="p-3 font-medium text-stone-800">
                        {item.title}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded font-semibold hover:bg-red-200 transition cursor-pointer"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Modal
          isOpen={openNovo}
          onClose={() => setOpenNovo(false)}
          title="Nova Imagem"
          icon="fas fa-camera"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <form onSubmit={handleSubmit(onSubmitCriar)} className="grid gap-6">
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Título da Imagem
                </label>
                <input
                  {...register("title")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                  placeholder="Ex: Decoração de Casamento"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Ficheiro (Máx 5MB)
                </label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  {...register("image")}
                  className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer"
                />
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.image.message}
                  </p>
                )}
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
                  className="px-6 py-3 text-white font-semibold rounded-lg cursor-pointer bg-[#A2672D]"
                >
                  Salvar Imagem
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </AdminLayout>
    </>
  );
}
