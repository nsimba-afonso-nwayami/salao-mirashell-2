import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import VisitBg from "../../assets/img/visit.png";
import toast from "react-hot-toast";

export default function Encomendar() {
  const { state } = useLocation();
  const produto = state?.produto || null;

  const [formData, setFormData] = useState({
    nome_cliente: "",
    telefone: "",
    email: "",
    endereco: "",
    cidade: "",
    provincia: "",
    quantidade: 1,
  });

  const total = produto ? formData.quantidade * produto.preco : 0;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!produto) {
      toast.error("Erro: Nenhum produto encontrado!");
      return;
    }

    const payload = {
      nome_cliente: formData.nome_cliente,
      telefone: formData.telefone,
      email: formData.email,
      endereco: formData.endereco,
      cidade: formData.cidade,
      provincia: formData.provincia,
      status: "pendente",
      itens: [
        {
          produto: produto.id,
          quantidade: Number(formData.quantidade),
          preco: produto.preco,
          total: total,
        },
      ],
    };

    const loadingToast = toast.loading("Enviando encomenda...");

    try {
      const response = await fetch("https://api2.nwayami.com/api/encomendas/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        toast.error("Erro ao enviar pedido.", { id: loadingToast });
        return;
      }

      toast.success("Pedido enviado com sucesso!", { id: loadingToast });
    } catch {
      toast.error("Erro ao enviar pedido.", { id: loadingToast });
    }
  };

  const enviarWhatsApp = () => {
    const mensagem = `
*NOVA ENCOMENDA – Salão Mirashell*

*Cliente:*
• Nome: ${formData.nome_cliente}
• Telefone: ${formData.telefone}
• Email: ${formData.email}
• Endereço: ${formData.endereco}
• Cidade: ${formData.cidade}
• Província: ${formData.provincia}

*Produto:*
• Nome: ${produto.nome}
• Descrição: ${produto.descricao}
• Quantidade: ${formData.quantidade}
• Preço unitário: ${produto.preco} Kz
• Total: ${total} Kz
    `;

    window.open(
      `https://wa.me/244923698462?text=${encodeURIComponent(mensagem)}`,
      "_blank"
    );
  };

  return (
    <>
      <title>Encomendar | Salão Mirashell</title>
      <Header />

      <section
        className="visit relative pt-32 pb-20 bg-cover bg-center w-full"
        style={{ backgroundImage: `url(${VisitBg})` }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-center mb-12 text-[#A2672D]">
          Detalhes da Encomenda
        </h1>

        <div className="relative z-10 flex justify-center w-full max-w-7xl mx-auto px-4 md:px-8">
          <form
            onSubmit={handleSubmit}
            className="w-full md:min-w-160 border border-[#A2672D] p-8 md:p-10 flex flex-col bg-transparent"
          >
            <h3 className="text-2xl md:text-3xl text-center text-[#A2672D] pb-6 uppercase">
              Dados do Cliente
            </h3>

            <div className="flex flex-col gap-6 mb-10">
              <input
                type="text"
                name="nome_cliente"
                placeholder="Seu nome completo"
                value={formData.nome_cliente}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#A2672D]"
              />

              <input
                type="tel"
                name="telefone"
                placeholder="Telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#A2672D]"
              />

              <input
                type="email"
                name="email"
                placeholder="Seu email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#A2672D]"
              />

              <input
                type="text"
                name="endereco"
                placeholder="Endereço completo"
                value={formData.endereco}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#A2672D]"
              />

              <input
                type="text"
                name="cidade"
                placeholder="Cidade"
                value={formData.cidade}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#A2672D]"
              />

              <select
                name="provincia"
                value={formData.provincia}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#A2672D]"
              >
                <option value="">Selecione a província</option>
                <option value="Bengo">Bengo</option>
                <option value="Benguela">Benguela</option>
                <option value="Bié">Bié</option>
                <option value="Cabinda">Cabinda</option>
                <option value="Cuando Cubango">Cuando Cubango</option>
                <option value="Cuanza Norte">Cuanza Norte</option>
                <option value="Cuanza Sul">Cuanza Sul</option>
                <option value="Cunene">Cunene</option>
                <option value="Huambo">Huambo</option>
                <option value="Huíla">Huíla</option>
                <option value="Luanda">Luanda</option>
                <option value="Lunda Norte">Lunda Norte</option>
                <option value="Lunda Sul">Lunda Sul</option>
                <option value="Malanje">Malanje</option>
                <option value="Moxico">Moxico</option>
                <option value="Namibe">Namibe</option>
                <option value="Uíge">Uíge</option>
                <option value="Zaire">Zaire</option>
              </select>
            </div>

            <h3 className="text-2xl md:text-3xl text-center text-[#A2672D] pb-6 uppercase">
              Dados do Produto
            </h3>

            <div className="flex flex-col gap-6 mb-10">
              <input
                type="text"
                value={produto?.nome || ""}
                readOnly
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md bg-gray-100"
              />

              <textarea
                value={produto?.descricao || ""}
                readOnly
                rows="4"
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md bg-gray-100 resize-none"
              />

              <input
                type="number"
                name="quantidade"
                min="1"
                value={formData.quantidade}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#A2672D]"
              />

              <input
                type="text"
                value={`Total: ${total} Kz`}
                readOnly
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md bg-gray-100 font-semibold"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 transition-all duration-300"
            >
              Confirmar Encomenda
            </button>

            <button
              type="button"
              onClick={enviarWhatsApp}
              className="w-full cursor-pointer mt-4 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-md shadow hover:scale-105 transition-all duration-300"
            >
              Encomendar pelo WhatsApp
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
