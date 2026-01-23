import { useState } from "react";
import AdminLayout from "./components/AdminLayout";
import Modal from "./components/Modal";
import { toast } from "react-hot-toast";

export default function ProdutosAdmin() {
  const [openNovo, setOpenNovo] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [ordenacao, setOrdenacao] = useState("nome_asc");

  const todosProdutos = [
    {
      id: 101,
      nome: "Shampoo Nutritivo (500ml)",
      preco: 4500,
      estoque: 15,
      categoria: "Cabelo",
      fornecedor: "Marca X",
      ativo: true,
      imagem: "",
    },
    {
      id: 102,
      nome: "Condicionador Reconstrutor",
      preco: 3800,
      estoque: 8,
      categoria: "Cabelo",
      fornecedor: "Marca X",
      ativo: true,
      imagem: "",
    },
    {
      id: 103,
      nome: "Esmalte Vermelho Fogo",
      preco: 1200,
      estoque: 35,
      categoria: "Unhas",
      fornecedor: "ColorNails",
      ativo: true,
      imagem: "",
    },
  ];

  const categorias = ["Cabelo", "Unhas", "Estética"];

  // LÓGICA DE FILTRAGEM E ORDENAÇÃO
  let produtosProcessados = todosProdutos.filter((produto) => {
    const buscaMatch =
      termoPesquisa === "" ||
      produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase());
    const categoriaMatch =
      filtroCategoria === "" || produto.categoria === filtroCategoria;
    return buscaMatch && categoriaMatch;
  });

  produtosProcessados.sort((a, b) => {
    if (ordenacao === "nome_asc") return a.nome.localeCompare(b.nome);
    if (ordenacao === "preco_desc") return b.preco - a.preco;
    if (ordenacao === "estoque_asc") return a.estoque - b.estoque;
    return 0;
  });

  const handleEdit = (produto) => {
    setProdutoSelecionado(produto);
    setOpenEditar(true);
  };

  const handleDelete = (id, nome) => {
    if (window.confirm(`Deseja eliminar o produto "${nome}"?`)) {
      toast.error(`Produto ${nome} eliminado.`);
    }
  };

  const formatarPreco = (preco) => `Kz ${preco.toLocaleString("pt-AO")}`;

  return (
    <AdminLayout title="Gestão de Produtos e Estoque">
      <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h3 className="text-xl font-bold text-[#A2672D]">
            Inventário ({produtosProcessados.length})
          </h3>
          <button
            onClick={() => setOpenNovo(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#A2672D] text-white font-semibold rounded-lg hover:opacity-90 shadow-md transition-all cursor-pointer"
          >
            <i className="fas fa-plus"></i> Novo Produto
          </button>
        </div>

        {/* FILTROS E PESQUISA */}
        <div className="flex flex-col lg:flex-row justify-start items-start lg:items-center mb-6 gap-4 flex-wrap">
          <div className="relative w-full sm:w-auto flex-1">
            <input
              type="text"
              placeholder="Pesquisar produto..."
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
              className="w-full py-2 pl-10 pr-4 bg-stone-50 border border-stone-200 rounded-lg focus:ring-[#A2672D] focus:border-[#A2672D]"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"></i>
          </div>

          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="w-full sm:w-44 py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg"
          >
            <option value="">Categoria (Todas)</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
            className="w-full sm:w-44 py-2 px-3 bg-stone-50 border border-stone-200 rounded-lg"
          >
            <option value="nome_asc">Nome A-Z</option>
            <option value="preco_desc">Preço (Maior)</option>
            <option value="estoque_asc">Estoque (Menor)</option>
          </select>
        </div>

        {/* TABELA */}
        <div className="overflow-x-auto">
          <table className="min-w-full w-full text-left border-collapse text-sm">
            <thead>
              <tr className="text-[#A2672D] border-b border-stone-200">
                <th className="p-3">ID</th>
                <th className="p-3">Produto</th>
                <th className="p-3">Categoria</th>
                <th className="p-3 text-right">Preço</th>
                <th className="p-3 text-center">Estoque</th>
                <th className="p-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="text-stone-600">
              {produtosProcessados.map((produto) => (
                <tr
                  key={produto.id}
                  className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                >
                  <td className="p-3 opacity-60">#{produto.id}</td>
                  <td className="p-3 font-medium text-stone-800">
                    {produto.nome}
                  </td>
                  <td className="p-3">
                    <span className="bg-stone-100 px-2 py-1 rounded text-xs">
                      {produto.categoria}
                    </span>
                  </td>
                  <td className="p-3 text-right font-bold text-[#A2672D]">
                    {formatarPreco(produto.preco)}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`font-bold ${produto.estoque <= 5 ? "text-red-500" : "text-stone-600"}`}
                    >
                      {produto.estoque}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(produto)}
                        className="px-3 py-1 bg-amber-100 text-amber-700 rounded font-semibold hover:bg-amber-200 transition cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(produto.id, produto.nome)}
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

      {/* MODAL NOVO PRODUTO */}
      <Modal
        isOpen={openNovo}
        onClose={() => setOpenNovo(false)}
        title="Novo Produto"
        icon="fas fa-box-open"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-800">
              Cadastrar Produto
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Adicione um novo item ao seu inventário
            </p>
          </div>
          <form className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-stone-700 font-medium mb-1">
                Nome do Produto
              </label>
              <input
                type="text"
                placeholder="Ex: Shampoo Nutritivo"
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
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Estoque Inicial
              </label>
              <input
                type="number"
                placeholder="Quantidade"
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Fornecedor
              </label>
              <input
                type="text"
                placeholder="Nome do fornecedor"
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-stone-700 font-medium mb-1">
                Imagem do Produto (URL ou Upload)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="flex-1 px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
                <button
                  type="button"
                  className="px-4 py-3 bg-stone-100 border border-stone-300 rounded-lg hover:bg-stone-200 transition"
                >
                  <i className="fas fa-upload"></i>
                </button>
              </div>
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
                Salvar Produto
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* MODAL EDITAR PRODUTO */}
      <Modal
        isOpen={openEditar}
        onClose={() => setOpenEditar(false)}
        title="Editar Produto"
        icon="fas fa-edit"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-800">
              Editar Produto
            </h2>
            <p className="text-stone-500 text-sm mt-1">
              Atualize as informações e estoque do item
            </p>
          </div>
          <form className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-stone-700 font-medium mb-1">
                Nome do Produto
              </label>
              <input
                type="text"
                defaultValue={produtoSelecionado?.nome || ""}
                className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">
                Categoria
              </label>
              <select
                defaultValue={produtoSelecionado?.categoria || ""}
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
                defaultValue={produtoSelecionado?.preco || ""}
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
                Atualizar Produto
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </AdminLayout>
  );
}
