import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import AdminLayout from "./components/AdminLayout";
import { useLocation, useNavigate } from "react-router-dom";
import {
  listarFaturas,
  eliminarFatura,
  obterTotalFaturacao,
  obterFaturacaoMensal,
  criarFatura,
} from "../../services/faturasService";

export default function FaturasAdmin() {
  const [faturas, setFaturas] = useState([]);
  const [resumo, setResumo] = useState({ total: 0, mensal: 0 });
  const [loading, setLoading] = useState(true);

  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [filtroMetodo, setFiltroMetodo] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const metodosPagamento = ["dinheiro", "transferencia", "multicaixa"];

  // --- CARREGAMENTO DE DADOS ---
  const carregarDados = async () => {
    try {
      setLoading(true);
      const [dataFaturas, dataTotal, dataMensal] = await Promise.all([
        listarFaturas(),
        obterTotalFaturacao(),
        obterFaturacaoMensal(),
      ]);

      // Ordenar por ID decrescente (mais recentes primeiro)
      setFaturas((dataFaturas || []).sort((a, b) => b.id - a.id));
      setResumo({
        total: dataTotal?.total || 0,
        mensal: dataMensal?.total_mes || 0,
      });
    } catch (error) {
      toast.error("Erro ao carregar dados da API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const verificarFaturaAutomatica = async () => {
      if (location.state?.criarFaturaAutomatica) {
        const dados = location.state.criarFaturaAutomatica;

        try {
          toast.loading("Gerando fatura automática...");
          await criarFatura(dados);
          toast.dismiss();
          toast.success("Fatura gerada e registada com sucesso!");

          // Limpa o estado da navegação para não criar de novo se der F5
          navigate(location.pathname, { replace: true, state: {} });

          // Recarrega a lista para mostrar a nova fatura
          carregarDados();
        } catch (error) {
          toast.dismiss();
          toast.error("Erro ao gerar fatura automática");
        }
      } else {
        carregarDados();
      }
    };

    verificarFaturaAutomatica();
  }, [location.state]);

  // --- AÇÕES ---
  const handleBaixarPDF = (id) => {
    toast.success(`Gerando PDF da fatura ${id}...`);
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja eliminar a fatura ${id}?`)) {
      try {
        await eliminarFatura(id);
        toast.success("Eliminado com sucesso");
        carregarDados(); // Recarrega para atualizar tabela e totais
      } catch (err) {
        toast.error("Erro ao eliminar");
      }
    }
  };

  // --- FILTROS ---
  const faturasFiltradas = faturas.filter((fat) => {
    const buscaMatch =
      termoPesquisa === "" ||
      fat.id.toString().includes(termoPesquisa) ||
      (fat.tipo &&
        fat.tipo.toLowerCase().includes(termoPesquisa.toLowerCase())) ||
      (fat.observacoes &&
        fat.observacoes.toLowerCase().includes(termoPesquisa.toLowerCase()));

    const metodoMatch =
      filtroMetodo === "" || fat.metodo_pagamento === filtroMetodo;

    return buscaMatch && metodoMatch;
  });

  return (
    <>
      <title>Faturas | Dashboard Mirashell</title>
      <AdminLayout title="Faturas Mirashell">
        {/* CARDS DE RESUMO */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <p className="text-stone-500 text-sm font-medium uppercase">
              Faturamento Total
            </p>
            <h4 className="text-2xl font-bold text-[#A2672D] mt-1">
              {Number(resumo.total).toLocaleString()} Kz
            </h4>
          </div>
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <p className="text-stone-500 text-sm font-medium uppercase">
              Faturamento Mensal
            </p>
            <h4 className="text-2xl font-bold text-stone-800 mt-1">
              {Number(resumo.mensal).toLocaleString()} Kz
            </h4>
          </div>
          <div className="bg-[#A2672D] p-6 rounded-xl shadow-sm">
            <p className="text-white/80 text-sm font-medium uppercase">
              Total de Faturas
            </p>
            <h4 className="text-2xl font-bold text-white mt-1">
              {faturas.length}
            </h4>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <h3 className="text-xl font-bold text-[#A2672D]">
              Lista de Faturas ({faturasFiltradas.length})
            </h3>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Pesquisar por ID, Tipo ou Observação..."
                value={termoPesquisa}
                onChange={(e) => setTermoPesquisa(e.target.value)}
                className="w-full py-2 px-4 bg-stone-50 border border-stone-200 rounded-lg focus:ring-[#A2672D] outline-none"
              />
            </div>

            <select
              value={filtroMetodo}
              onChange={(e) => setFiltroMetodo(e.target.value)}
              className="py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg outline-none capitalize"
            >
              <option value="">Método de Pagamento (Todos)</option>
              {metodosPagamento.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full w-full text-left border-collapse text-sm">
              <thead>
                <tr className="text-[#A2672D] border-b border-stone-200">
                  <th className="p-3 font-bold">ID</th>
                  <th className="p-3 font-bold">Tipo</th>
                  <th className="p-3 font-bold">Método</th>
                  <th className="p-3 font-bold">Valor</th>
                  <th className="p-3 font-bold">Pago</th>
                  <th className="p-3 font-bold">Ref (Ped/Enc/Agend)</th>
                  <th className="p-3 font-bold">Observações</th>
                  <th className="p-3 text-center font-bold">Ações</th>
                </tr>
              </thead>
              <tbody className="text-stone-600">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center p-4">
                      Carregando...
                    </td>
                  </tr>
                ) : faturasFiltradas.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center p-8 text-stone-400 italic font-medium"
                    >
                      Nenhum resultado encontrado
                    </td>
                  </tr>
                ) : (
                  faturasFiltradas.map((fat) => (
                    <tr
                      key={fat.id}
                      className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                    >
                      <td className="p-3 font-bold text-stone-400">{fat.id}</td>
                      <td className="p-3 capitalize">{fat.tipo || "---"}</td>
                      <td className="p-3 capitalize">
                        {fat.metodo_pagamento || "---"}
                      </td>
                      <td className="p-3 font-bold text-[#A2672D]">
                        {fat.valor
                          ? `${Number(fat.valor).toLocaleString()} Kz`
                          : "0 Kz"}
                      </td>
                      <td className="p-3">
                        <span
                          className={`font-semibold ${fat.pago ? "text-green-600" : "text-red-600"}`}
                        >
                          {fat.pago ? "Sim" : "Não"}
                        </span>
                      </td>
                      <td className="p-3 text-xs">
                        <div className="flex flex-col gap-1 text-stone-500 font-medium">
                          {fat.pedido && <span>Pedido: #{fat.pedido}</span>}
                          {fat.encomenda && (
                            <span>Encomenda: #{fat.encomenda}</span>
                          )}
                          {fat.agendamento && (
                            <span>Agendamento: #{fat.agendamento}</span>
                          )}
                          {!fat.pedido &&
                            !fat.encomenda &&
                            !fat.agendamento && <span>Avulsa</span>}
                        </div>
                      </td>
                      <td
                        className="p-3 max-w-50 truncate"
                        title={fat.observacoes}
                      >
                        {fat.observacoes || "---"}
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleBaixarPDF(fat.id)}
                            className="px-3 py-1 bg-stone-100 text-stone-700 rounded font-semibold hover:bg-stone-200 transition cursor-pointer"
                          >
                            Baixar PDF
                          </button>
                          <button
                            onClick={() => handleDelete(fat.id)}
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
      </AdminLayout>
    </>
  );
}
