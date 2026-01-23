import { useState } from "react";
import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";
import { toast } from "react-hot-toast";

export default function EncomendasAdmin() {
  const [openNovo, setOpenNovo] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [encomendaSelecionada, setEncomendaSelecionada] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [ordenacao, setOrdenacao] = useState("data_desc");

  const todasEncomendas = [
    {
      id: 301,
      cliente: "Maria Silva",
      telefone: "923 123 456",
      email: "maria.s@email.com",
      endereco: "Rua X, nº 123",
      data: "2025-12-10",
      status: "Entregue",
      produtos: ["Shampoo Nutritivo", "Esmalte"],
      total: 12500,
    },
    {
      id: 302,
      cliente: "João Costa",
      telefone: "911 000 777",
      email: "joao.c@email.com",
      endereco: "Av. Principal, Bloco 5",
      data: "2025-12-12",
      status: "Pendente",
      produtos: ["Creme Corporal"],
      total: 4500,
    },
    {
      id: 303,
      cliente: "Ana Mendes",
      telefone: "945 999 888",
      email: "ana.m@email.com",
      endereco: "Bairro Z, Casa 4",
      data: "2025-12-14",
      status: "Enviada",
      produtos: ["Kit Manicure", "Óleo Reparador"],
      total: 20000,
    },
  ];

  const statusOpcoes = ["Pendente", "Enviada", "Entregue", "Cancelada"];

  // LÓGICA DE FILTRAGEM
  const encomendasFiltradas = todasEncomendas.filter((enc) => {
    const termo = termoPesquisa.toLowerCase();
    const buscaMatch =
      termo === "" ||
      enc.cliente.toLowerCase().includes(termo) ||
      enc.telefone.includes(termo) ||
      enc.id.toString().includes(termo);
    const statusMatch = filtroStatus === "" || enc.status === filtroStatus;
    return buscaMatch && statusMatch;
  });

  const handleEdit = (encomenda) => {
    setEncomendaSelecionada(encomenda);
    setOpenEditar(true);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Tem certeza que deseja eliminar a encomenda ${id}?`)) {
      toast.error(`Encomenda ${id} eliminada`);
    }
  };

  const formatarPreco = (preco) => `Kz ${preco.toLocaleString("pt-AO")}`;

  const getStatusClasses = (status) => {
    switch (status) {
      case "Entregue":
        return "bg-green-100 text-green-700";
      case "Enviada":
        return "bg-blue-100 text-blue-700";
      case "Pendente":
        return "bg-amber-100 text-amber-700";
      case "Cancelada":
        return "bg-red-100 text-red-700";
      default:
        return "bg-stone-100 text-stone-700";
    }
  };

  return (
    <AdminLayout title="Gestão de Encomendas">
      <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h3 className="text-xl font-bold text-[#A2672D]">
            Lista de Encomendas ({encomendasFiltradas.length})
          </h3>
          <button
            onClick={() => setOpenNovo(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#A2672D] text-white font-semibold rounded-lg hover:opacity-90 transition-all shadow-md cursor-pointer"
          >
            <i className="fas fa-plus"></i> Nova Encomenda
          </button>
        </div>

        {/* FILTROS E PESQUISA */}
        <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center mb-6 gap-4 flex-wrap">
          <div className="relative w-full sm:w-auto flex-1">
            <input
              type="text"
              placeholder="Pesquisar cliente, telefone ou ID..."
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
              className="w-full py-2 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-lg focus:ring-[#A2672D] focus:border-[#A2672D]"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"></i>
          </div>

          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="w-full sm:w-auto py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg text-stone-700"
          >
            <option value="">Status (Todos)</option>
            {statusOpcoes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* TABELA ORIGINAL PRESERVADA */}
        <div className="overflow-x-auto">
          <table className="min-w-full w-full text-left border-collapse text-sm">
            <thead>
              <tr className="text-[#A2672D] border-b border-stone-200">
                <th className="p-3">ID</th>
                <th className="p-3">Cliente</th>
                <th className="p-3">Telefone</th>
                <th className="p-3 hidden lg:table-cell">E-mail</th>
                <th className="p-3">Endereço</th>
                <th className="p-3">Data</th>
                <th className="p-3">Produtos</th>
                <th className="p-3 text-right">Total</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="text-stone-600">
              {encomendasFiltradas.map((enc) => (
                <tr
                  key={enc.id}
                  className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                >
                  <td className="p-3 opacity-70">#{enc.id}</td>
                  <td className="p-3 font-medium text-stone-800">
                    {enc.cliente}
                  </td>
                  <td className="p-3 whitespace-nowrap">{enc.telefone}</td>
                  <td className="p-3 hidden lg:table-cell text-xs">
                    {enc.email}
                  </td>
                  <td className="p-3 text-xs max-w-37.5 truncate">
                    {enc.endereco}
                  </td>
                  <td className="p-3 whitespace-nowrap">{enc.data}</td>
                  <td className="p-3 text-[11px] text-stone-500 italic">
                    {enc.produtos.join(", ")}
                  </td>
                  <td className="p-3 text-right font-bold text-[#A2672D]">
                    {formatarPreco(enc.total)}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${getStatusClasses(enc.status)}`}
                    >
                      {enc.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => toast.success("Gerando PDF...")}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-semibold hover:bg-blue-200 transition cursor-pointer text-[11px]"
                      >
                        Fatura
                      </button>
                      <button
                        onClick={() => handleEdit(enc)}
                        className="px-3 py-1 bg-amber-100 text-amber-700 rounded font-semibold hover:bg-amber-200 transition cursor-pointer text-[11px]"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(enc.id)}
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

      {/* MODAL EDITAR */}
      <Modal
        isOpen={openEditar}
        onClose={() => setOpenEditar(false)}
        title="Editar Encomenda"
        icon="fas fa-edit"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-800">
              Editar Detalhes
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Atualize os dados da encomenda #{encomendaSelecionada?.id}
            </p>
          </div>
          <form className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-stone-700 font-medium mb-1">
                Cliente
              </label>
              <input
                type="text"
                defaultValue={encomendaSelecionada?.cliente}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Status
              </label>
              <select
                defaultValue={encomendaSelecionada?.status}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                {statusOpcoes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Total (Kz)
              </label>
              <input
                type="number"
                defaultValue={encomendaSelecionada?.total}
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

      {/* MODAL NOVO */}
      <Modal
        isOpen={openNovo}
        onClose={() => setOpenNovo(false)}
        title="Nova Encomenda"
        icon="fas fa-shipping-fast"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-800">
              Nova Encomenda
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Crie um novo registro de pedido
            </p>
          </div>
          <form className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-stone-700 font-medium mb-1">
                Nome do Cliente
              </label>
              <input
                type="text"
                placeholder="Nome completo"
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
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
                placeholder="cliente@email.com"
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
                Criar Encomenda
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </AdminLayout>
  );
}
