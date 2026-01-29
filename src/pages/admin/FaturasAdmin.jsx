import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { faturasSchema } from "../../validations/faturasSchema";
import {
  listarFaturas,
  eliminarFatura,
  obterTotalFaturacao,
  obterFaturacaoMensal,
  criarFatura,
  atualizarFatura,
} from "../../services/faturasService";

export default function FaturasAdmin() {
  const [faturas, setFaturas] = useState([]);
  const [resumo, setResumo] = useState({ total: 0, mensal: 0 });
  const [loading, setLoading] = useState(true);

  const [openEditar, setOpenEditar] = useState(false);
  const [faturaSelecionada, setFaturaSelecionada] = useState(null);

  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [filtroMetodo, setFiltroMetodo] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const metodosPagamento = ["dinheiro", "transferencia", "cartao"];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(faturasSchema),
  });

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
      // Se não houver dados no state ou se já processamos, saímos
      if (!location.state?.criarFaturaAutomatica) {
        carregarDados();
        return;
      }

      const dados = location.state.criarFaturaAutomatica;

      try {
        // IMPORTANTE: Limpamos o estado IMEDIATAMENTE antes do await
        // para que um re-render não dispare a função de novo
        navigate(location.pathname, { replace: true, state: {} });

        toast.loading("Gerando fatura automática...");
        await criarFatura(dados);
        toast.dismiss();
        toast.success("Fatura gerada e registada com sucesso!");

        carregarDados();
      } catch (error) {
        toast.dismiss();
        toast.error("Erro ao gerar fatura automática");
      }
    };

    verificarFaturaAutomatica();
  }, [location.state]); // Ele observa o state da rota

  // --- AÇÕES ---
  const prepararEdicao = (fatura) => {
    setFaturaSelecionada(fatura);
    setValue("metodo_pagamento", fatura.metodo_pagamento);
    setValue("pago", fatura.pago);
    setOpenEditar(true);
  };

  const onSubmitEditar = async (data) => {
    try {
      await atualizarFatura(faturaSelecionada.id, data);
      toast.success("Fatura atualizada com sucesso!");
      setOpenEditar(false);
      carregarDados();
    } catch (err) {
      toast.error("Erro ao atualizar fatura");
    }
  };

  const handleBaixarPDF = (id) => {
    const fatura = faturas.find((f) => f.id === id);
    if (!fatura) return toast.error("Fatura não encontrada");

    const doc = new jsPDF();
    const dataEmissao = new Date().toLocaleDateString("pt-PT");

    // Lógica para definir a referência única
    let referenciaTexto = "Avulsa";
    if (fatura.encomenda) referenciaTexto = `Encomenda #${fatura.encomenda}`;
    else if (fatura.agendamento)
      referenciaTexto = `Agendamento #${fatura.agendamento}`;
    else if (fatura.pedido) referenciaTexto = `Pedido #${fatura.pedido}`;

    // --- CABEÇALHO ---
    doc.setFontSize(20);
    doc.setTextColor("#A2672D");
    doc.text("MIRASHELL FATURA - DASHBOARD", 15, 20);

    doc.setFontSize(10);
    doc.setTextColor("#666666");
    doc.text(`Fatura Nº: #00${fatura.id}`, 15, 28);
    doc.text(`Data de Emissão: ${dataEmissao}`, 15, 33);
    doc.text(`Estado: ${fatura.pago ? "PAGO" : "PENDENTE"}`, 15, 38);

    // --- TABELA DE DETALHES ---
    const colunas = ["Campo", "Descrição"];
    const linhas = [
      ["Tipo de Serviço/Venda", fatura.tipo || "Não especificado"],
      ["Método de Pagamento", fatura.metodo_pagamento || "---"],
      ["Referência", referenciaTexto],
      ["Observações", fatura.observacoes || "Sem observações"],
    ];

    autoTable(doc, {
      startY: 45,
      head: [colunas],
      body: linhas,
      theme: "striped",
      headStyles: { fillColor: [162, 103, 45] },
      styles: { fontSize: 10, cellPadding: 5 },
    });

    // --- TOTAL ---
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.setTextColor("#000000");
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL: ${Number(fatura.valor).toLocaleString()} Kz`, 15, finalY);

    // --- RODAPÉ ---
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.setTextColor("#999999");
    doc.text(
      "Este documento serve como comprovativo de faturação oficial da Mirashell.",
      15,
      doc.internal.pageSize.height - 10,
    );

    doc.save(`Fatura_Mirashell_${fatura.id}.pdf`);
    toast.success("PDF gerado com sucesso!");
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
                            onClick={() => prepararEdicao(fat)}
                            className="px-3 py-1 bg-amber-100 text-amber-700 rounded hover:bg-amber-200 transition cursor-pointer"
                          >
                            Atualizar
                          </button>
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

        {/* MODAL EDITAR FATURA */}
        <Modal
          isOpen={openEditar}
          onClose={() => setOpenEditar(false)}
          title={`Atualizar Fatura #${faturaSelecionada?.id}`}
          icon="fas fa-file-invoice-dollar"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <form
              onSubmit={handleSubmit(onSubmitEditar)}
              className="grid gap-6"
            >
              {/* Campo: Método de Pagamento */}
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Método de Pagamento
                </label>
                <select
                  {...register("metodo_pagamento")}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-[#A2672D] focus:outline-none capitalize bg-white"
                >
                  <option value="">Selecione o método</option>
                  {metodosPagamento.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                {errors.metodo_pagamento && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.metodo_pagamento.message}
                  </p>
                )}
              </div>

              {/* Campo: Status de Pagamento (Checkbox Estilizado) */}
              <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-lg border border-stone-200">
                <input
                  type="checkbox"
                  id="pago"
                  {...register("pago")}
                  className="w-5 h-5 accent-[#A2672D] cursor-pointer"
                />
                <label
                  htmlFor="pago"
                  className="text-stone-700 font-medium cursor-pointer select-none"
                >
                  Marcar fatura como paga
                </label>
              </div>

              {/* Botões de Ação */}
              <div className="flex justify-end gap-3 mt-4 border-t border-stone-100 pt-6">
                <button
                  type="button"
                  onClick={() => setOpenEditar(false)}
                  className="px-6 py-3 cursor-pointer bg-stone-200 text-stone-800 rounded-lg hover:bg-stone-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 cursor-pointer bg-[#A2672D] text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md"
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
