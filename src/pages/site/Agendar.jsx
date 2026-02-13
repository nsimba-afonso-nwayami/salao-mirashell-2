import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import VisitBg from "../../assets/img/visit.png";
import toast from "react-hot-toast";

export default function Agendar() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "", // Adicionado
    servico: "",
    data: "",
    hora: "",
    observacoes: "",
    profissional: "",
  });

  const [servicos, setServicos] = useState([]);

  // Atualizar campos do form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Buscar serviços da API
  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await fetch("https://api2.nwayami.com/api/servicos/");
        const data = await response.json();
        setServicos(data);
      } catch {
        toast.error("Erro ao carregar serviços.");
      }
    };
    fetchServicos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const required = ["nome", "telefone", "servico", "data", "hora"]; // Telefone adicionado como obrigatório
    const missing = required.filter((field) => !formData[field]);
    if (missing.length > 0) {
      toast.error("Preencha os seguintes campos: " + missing.join(", "));
      return;
    }

    const payload = {
      nome: formData.nome,
      email: formData.email || "",
      telefone: formData.telefone, // Adicionado ao payload
      profissional: formData.profissional || null,
      servico: parseInt(formData.servico),
      data: formData.data,
      hora: formData.hora,
      observacoes: formData.observacoes || "",
    };

    const loadingToast = toast.loading("Enviando agendamento...");

    try {
      const response = await fetch(
        "https://api2.nwayami.com/api/agendamentos/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (response.ok) {
        toast.success("Agendamento realizado com sucesso!", {
          id: loadingToast,
        });
        setFormData({
          nome: "",
          email: "",
          telefone: "", // Resetar campo
          servico: "",
          data: "",
          hora: "",
          observacoes: "",
          profissional: "",
        });
      } else {
        toast.error("Erro ao agendar!", { id: loadingToast });
      }
    } catch {
      toast.error("Erro ao realizar o agendamento.", { id: loadingToast });
    }
  };

  return (
    <>
      <title>Agendar | Salão Mirashell</title>
      <Header />

      <section
        className="visit relative pt-32 pb-20 bg-cover bg-center w-full"
        id="agendar"
        style={{ backgroundImage: `url(${VisitBg})` }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <h1 className="relative z-10 text-4xl md:text-5xl font-bold text-center mb-12 text-[#A2672D]">
          Agendar Serviço
        </h1>

        <div className="relative z-10 flex flex-col md:flex-row flex-wrap w-full max-w-7xl mx-auto gap-8 px-4 md:px-8 justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex-1 w-full md:min-w-160 border border-[#A2672D] p-8 md:p-10 flex flex-col"
          >
            <h3 className="text-2xl md:text-3xl text-center text-[#A2672D] pb-4 uppercase">
              Preencha os Dados do Agendamento
            </h3>

            <div className="flex flex-col gap-6 mt-8 mb-8 w-full">
              <input
                type="text"
                name="nome"
                placeholder="Seu nome"
                required
                value={formData.nome}
                onChange={handleChange}
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A2672D] bg-white"
              />

              <input
                type="email"
                name="email"
                placeholder="exemplo@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A2672D] bg-white"
              />

              {/* Novo Campo de Telefone */}
              <input
                type="tel"
                name="telefone"
                placeholder="Seu telefone"
                required
                value={formData.telefone}
                onChange={handleChange}
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A2672D] bg-white"
              />

              <select
                name="servico"
                required
                value={formData.servico}
                onChange={handleChange}
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A2672D] bg-white"
              >
                <option value="">Selecione o serviço</option>
                {servicos.map((servico) => (
                  <option key={servico.id} value={servico.id}>
                    {servico.nome}
                  </option>
                ))}
              </select>

              <input
                type="date"
                name="data"
                required
                value={formData.data}
                onChange={handleChange}
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A2672D] bg-white"
              />

              <input
                type="time"
                name="hora"
                required
                value={formData.hora}
                onChange={handleChange}
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A2672D] bg-white"
              />

              <textarea
                name="observacoes"
                cols="10"
                rows="5"
                placeholder="Observações adicionais (opcional)"
                value={formData.observacoes}
                onChange={handleChange}
                className="w-full px-3 py-3 text-black text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A2672D] resize-none bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-[#A2672D] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#5a4d3e] hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Agendar Agora
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
